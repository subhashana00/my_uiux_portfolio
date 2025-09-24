import { RequestHandler } from "express";
import Stripe from "stripe";
import { body, validationResult } from "express-validator";

// Initialize Stripe with secret key from environment variables only
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const isDevelopment = process.env.NODE_ENV !== 'production';

// In development, allow missing Stripe key for testing
if (!stripeSecretKey && !isDevelopment) {
  throw new Error('STRIPE_SECRET_KEY environment variable is required in production');
}

// Only initialize Stripe if we have a valid key
const stripe = stripeSecretKey && !stripeSecretKey.includes('your_secret_key_here') 
  ? new Stripe(stripeSecretKey, { apiVersion: "2025-08-27.basil" })
  : null;

interface PaymentIntentRequest {
  serviceId: string;
  amount: number; // in cents
  customerData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company?: string;
    address: string;
    city: string;
    country: string;
    zipCode: string;
  };
}

// Validation middleware for payment intent
export const validatePaymentIntent = [
  body('serviceId').trim().notEmpty().withMessage('Service ID is required').escape(),
  body('amount').isInt({ min: 100 }).withMessage('Amount must be at least $1.00 (100 cents)'),
  body('customerData.firstName').trim().notEmpty().withMessage('First name is required').escape(),
  body('customerData.lastName').trim().notEmpty().withMessage('Last name is required').escape(),
  body('customerData.email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('customerData.phone').trim().notEmpty().withMessage('Phone number is required').escape(),
  body('customerData.address').trim().notEmpty().withMessage('Address is required').escape(),
  body('customerData.city').trim().notEmpty().withMessage('City is required').escape(),
  body('customerData.country').trim().notEmpty().withMessage('Country is required').escape(),
  body('customerData.zipCode').trim().notEmpty().withMessage('Zip code is required').escape(),
  body('customerData.company').optional().trim().escape(),
];

export const createPaymentIntent: RequestHandler = async (req, res) => {
  try {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { serviceId, amount, customerData } = req.body as PaymentIntentRequest;

    // Development mode - simulate payment without Stripe
    if (!stripe) {
      console.log('⚠️  Development mode: Simulating payment without Stripe');
      console.log('📝 Service ID:', serviceId);
      console.log('💰 Amount:', amount);
      console.log('👤 Customer:', customerData.firstName, customerData.lastName);
      
      return res.json({
        clientSecret: 'pi_dev_fake_client_secret_for_development_testing',
        customerId: 'cus_dev_fake_customer_id',
        paymentIntentId: 'pi_dev_fake_payment_intent_id',
        developmentMode: true,
        message: 'This is a simulated payment in development mode. To enable real payments, add your Stripe API keys to the .env file.'
      });
    }

    // Production mode - use real Stripe
    // Create a customer in Stripe
    const customer = await stripe.customers.create({
      name: `${customerData.firstName} ${customerData.lastName}`,
      email: customerData.email,
      phone: customerData.phone,
      address: {
        line1: customerData.address,
        city: customerData.city,
        country: customerData.country,
        postal_code: customerData.zipCode,
      },
      metadata: {
        serviceId: serviceId,
        company: customerData.company || '',
      },
    });

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        serviceId: serviceId,
        customerName: `${customerData.firstName} ${customerData.lastName}`,
        customerEmail: customerData.email,
        customerId: customer.id,
      },
      description: `Payment for service: ${serviceId}`,
      receipt_email: customerData.email,
    });

    // Return the client secret
    res.json({
      clientSecret: paymentIntent.client_secret,
      customerId: customer.id,
      paymentIntentId: paymentIntent.id,
    });

  } catch (error) {
    console.error("Error creating payment intent:", error);
    
    if (error instanceof Stripe.errors.StripeError) {
      return res.status(400).json({
        error: error.message,
        type: error.type,
      });
    }

    res.status(500).json({
      error: "An unexpected error occurred while processing your payment"
    });
  }
};

// Webhook handler for Stripe events (optional but recommended)
export const handleStripeWebhook: RequestHandler = async (req, res) => {
  // Development mode - just log webhook attempts
  if (!stripe) {
    console.log('⚠️  Development mode: Webhook received but Stripe not configured');
    return res.status(200).json({ received: true, developmentMode: true });
  }

  const sig = req.headers['stripe-signature'] as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (!endpointSecret) {
      throw new Error('Stripe webhook secret not configured');
    }

    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return res.status(400).send(`Webhook Error: ${err}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('PaymentIntent succeeded:', paymentIntent.id);
      
      // Here you can:
      // - Send confirmation email to customer
      // - Update your database
      // - Start the service delivery process
      // - Send notification to your team
      
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object as Stripe.PaymentIntent;
      console.log('PaymentIntent failed:', failedPayment.id);
      
      // Handle failed payment
      // - Log the failure
      // - Notify customer if needed
      
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};