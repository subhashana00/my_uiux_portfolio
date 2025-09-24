import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  CreditCard, 
  ShieldCheck, 
  ArrowLeft, 
  Check, 
  X, 
  User, 
  Mail, 
  Phone,
  MapPin,
  Building,
  Loader2,
  AlertCircle,
  MessageCircle,
  ExternalLink
} from "lucide-react";

// PaymentUnavailable Component
function PaymentUnavailable({ serviceData }: { serviceData: ServiceData }) {
  const whatsappMessage = `Hi Prabhath, I'm interested in the ${serviceData.title} service ($${serviceData.price}). Could you help me proceed with the order?`;
  const emailSubject = `Service Inquiry: ${serviceData.title}`;
  const emailBody = `Hi Prabhath,\n\nI'm interested in the ${serviceData.title} service ($${serviceData.price}).\n\nCould you help me proceed with the order?\n\nThank you!`;
  
  return (
    <div className="lg:col-span-2">
      <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 lg:p-12">
        {/* Alert Icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-orange-600" />
          </div>
          
          <h2 className="text-[24px] lg:text-[28px] font-medium text-black tracking-[1.23px] mb-4">
            Payment Gateway Temporarily Unavailable
          </h2>
          
          <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6 mb-8">
            <p className="text-[16px] text-gray-700 tracking-[1.23px] leading-relaxed">
              Sorry, our payment gateway is currently unavailable. For further information or to proceed, please contact us via WhatsApp or email. Thank you for your understanding!
            </p>
          </div>
        </div>

        {/* Service Details Reminder */}
        <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 mb-8">
          <h3 className="text-[18px] font-medium text-black tracking-[1.23px] mb-4">
            Service Details:
          </h3>
          <div className="space-y-2">
            <p className="text-[16px] text-gray-700 tracking-[1.23px]">
              <span className="font-medium">Service:</span> {serviceData.title}
            </p>
            <p className="text-[16px] text-gray-700 tracking-[1.23px]">
              <span className="font-medium">Price:</span> ${serviceData.price}
            </p>
            <p className="text-[14px] text-gray-600 tracking-[1.23px] mt-3">
              {serviceData.description}
            </p>
          </div>
        </div>

        {/* Contact Options */}
        <div className="space-y-4">
          <h3 className="text-[18px] font-medium text-black tracking-[1.23px] mb-6 text-center">
            Get in Touch to Complete Your Order
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* WhatsApp Contact */}
            <a
              href={`https://wa.me/+94773469948?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white border-2 border-green-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all px-6 py-4 text-[16px] font-medium tracking-[1.23px]"
            >
              <MessageCircle className="w-5 h-5" />
              Contact via WhatsApp
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Email Contact */}
            <a
              href={`mailto:prabathsubashana18@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`}
              className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white border-2 border-blue-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all px-6 py-4 text-[16px] font-medium tracking-[1.23px]"
            >
              <Mail className="w-5 h-5" />
              Send Email
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
          <p className="text-[14px] text-blue-800 tracking-[1.23px] text-center">
            💡 <span className="font-medium">Tip:</span> When contacting us, please mention the service name and any specific requirements you have.
          </p>
        </div>
      </div>
    </div>
  );
}

// Initialize Stripe with publishable key from environment variables
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

// Feature flag to temporarily disable payment gateway
// TO RE-ENABLE PAYMENTS: Simply change this to true
const PAYMENT_GATEWAY_ENABLED = false; // Set to true to re-enable payments

if (!stripePublishableKey && PAYMENT_GATEWAY_ENABLED) {
  console.error('VITE_STRIPE_PUBLISHABLE_KEY environment variable is required');
}

const stripePromise = stripePublishableKey && PAYMENT_GATEWAY_ENABLED ? loadStripe(stripePublishableKey) : null;

interface ServiceData {
  id: string;
  title: string;
  price: number;
  features: string[];
  description: string;
}

interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
}

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#000000',
      fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
      fontSmoothing: 'antialiased',
      '::placeholder': {
        color: '#6b7280',
      },
    },
    invalid: {
      color: '#ef4444',
      iconColor: '#ef4444',
    },
  },
  hidePostalCode: true, // This hides ZIP code from Stripe card element
};

function CheckoutForm({ serviceData, customerData, setCustomerData }: {
  serviceData: ServiceData;
  customerData: CustomerData;
  setCustomerData: (data: CustomerData) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCustomerDataChange = (field: keyof CustomerData, value: string) => {
    setCustomerData({ ...customerData, [field]: value });
  };

  const validateForm = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'country']; // Removed zipCode
    const missingFields = requiredFields.filter(field => !customerData[field as keyof CustomerData]);
    
    if (missingFields.length > 0) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields.",
      });
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerData.email)) {
      toast({
        variant: "destructive",
        title: "Invalid Email",
        description: "Please enter a valid email address.",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    try {
      // Create payment intent on the server
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceId: serviceData.id,
          amount: serviceData.price * 100, // Convert to cents
          customerData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();

      // Confirm payment with Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${customerData.firstName} ${customerData.lastName}`,
            email: customerData.email,
            phone: customerData.phone,
            address: {
              line1: customerData.address,
              city: customerData.city,
              country: customerData.country,
              postal_code: customerData.zipCode,
            },
          },
        },
      });

      if (result.error) {
        setPaymentError(result.error.message || 'Payment failed');
        toast({
          variant: "destructive",
          title: "Payment Failed",
          description: result.error.message || 'Please try again.',
        });
      } else {
        setPaymentSucceeded(true);
        toast({
          title: "Payment Successful!",
          description: "Thank you for your purchase. You'll receive a confirmation email shortly.",
          className: "border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white",
        });

        // Redirect to success page after a delay
        setTimeout(() => {
          navigate('/payment-success', { 
            state: { 
              serviceData, 
              customerData,
              paymentId: result.paymentIntent.id 
            } 
          });
        }, 2000);
      }
    } catch (error) {
      setPaymentError('An unexpected error occurred. Please try again.');
      toast({
        variant: "destructive",
        title: "Payment Error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentSucceeded) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-[24px] font-medium text-black tracking-[1.23px] mb-4">
          Payment Successful!
        </h2>
        <p className="text-gray-600 tracking-[1.23px] mb-6">
          Redirecting to confirmation page...
        </p>
        <div className="flex justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Customer Information */}
      <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-6 h-6 text-blue-600" />
          <h2 className="text-[24px] font-medium text-black tracking-[1.23px]">
            Customer Information
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[14px] font-medium text-black mb-2 tracking-[1.23px]">
              First Name *
            </label>
            <Input
              type="text"
              value={customerData.firstName}
              onChange={(e) => handleCustomerDataChange('firstName', e.target.value)}
              className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow"
              placeholder="first name"
              required
            />
          </div>

          <div>
            <label className="block text-[14px] font-medium text-black mb-2 tracking-[1.23px]">
              Last Name *
            </label>
            <Input
              type="text"
              value={customerData.lastName}
              onChange={(e) => handleCustomerDataChange('lastName', e.target.value)}
              className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow"
              placeholder="last name"
              required
            />
          </div>

          <div>
            <label className="block text-[14px] font-medium text-black mb-2 tracking-[1.23px]">
              Email Address *
            </label>
            <Input
              type="email"
              value={customerData.email}
              onChange={(e) => handleCustomerDataChange('email', e.target.value)}
              className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow"
              placeholder="test@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-[14px] font-medium text-black mb-2 tracking-[1.23px]">
              Phone Number *
            </label>
            <Input
              type="tel"
              value={customerData.phone}
              onChange={(e) => handleCustomerDataChange('phone', e.target.value)}
              className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow"
              placeholder="+94 (71) 123-4567"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-[14px] font-medium text-black mb-2 tracking-[1.23px]">
              Company (Optional)
            </label>
            <Input
              type="text"
              value={customerData.company}
              onChange={(e) => handleCustomerDataChange('company', e.target.value)}
              className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow"
              placeholder="Your Company Name"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-[14px] font-medium text-black mb-2 tracking-[1.23px]">
              Address *
            </label>
            <Input
              type="text"
              value={customerData.address}
              onChange={(e) => handleCustomerDataChange('address', e.target.value)}
              className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow"
              placeholder="123 Main Street"
              required
            />
          </div>

          <div>
            <label className="block text-[14px] font-medium text-black mb-2 tracking-[1.23px]">
              City *
            </label>
            <Input
              type="text"
              value={customerData.city}
              onChange={(e) => handleCustomerDataChange('city', e.target.value)}
              className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow"
              placeholder="Colombo"
              required
            />
          </div>

          <div>
            <label className="block text-[14px] font-medium text-black mb-2 tracking-[1.23px]">
              Country *
            </label>
            <Input
              type="text"
              value={customerData.country}
              onChange={(e) => handleCustomerDataChange('country', e.target.value)}
              className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow"
              placeholder="Sri Lanka"
              required
            />
          </div>

          <div>
            <label className="block text-[14px] font-medium text-black mb-2 tracking-[1.23px]">
              ZIP Code (Optional)
            </label>
            <Input
              type="text"
              value={customerData.zipCode}
              onChange={(e) => handleCustomerDataChange('zipCode', e.target.value)}
              className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow"
              placeholder="10001"
            />
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
        <div className="flex items-center gap-3 mb-6">
          <CreditCard className="w-6 h-6 text-blue-600" />
          <h2 className="text-[24px] font-medium text-black tracking-[1.23px]">
            Payment Information
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-[14px] font-medium text-black mb-2 tracking-[1.23px]">
              Card Details *
            </label>
            <div className="p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
              <CardElement options={CARD_ELEMENT_OPTIONS} />
            </div>
          </div>

          {paymentError && (
            <div className="flex items-center gap-2 p-4 bg-red-50 border-2 border-red-200 rounded">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-600 text-[14px] tracking-[1.23px]">{paymentError}</p>
            </div>
          )}

          <div className="flex items-center gap-3 p-4 bg-gray-50 border-2 border-gray-200">
            <ShieldCheck className="w-5 h-5 text-green-600" />
            <p className="text-[14px] text-gray-600 tracking-[1.23px]">
              Your payment information is encrypted and secure
            </p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <Button
          type="submit"
          disabled={!stripe || isProcessing}
          className="bg-black text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all text-[16px] font-medium tracking-[1.23px] px-12 py-6"
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing Payment...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Pay ${serviceData.price}
            </div>
          )}
        </Button>
      </div>
    </form>
  );
}

export default function Payment() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [serviceData, setServiceData] = useState<ServiceData | null>(null);
  const [customerData, setCustomerData] = useState<CustomerData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
  });

  useEffect(() => {
    // Get service data from URL parameters
    const serviceId = searchParams.get('service');
    const title = searchParams.get('title');
    const price = searchParams.get('price');
    const features = searchParams.get('features');
    const description = searchParams.get('description');

    if (serviceId && title && price && features && description) {
      setServiceData({
        id: serviceId,
        title: decodeURIComponent(title),
        price: parseInt(price),
        features: JSON.parse(decodeURIComponent(features)),
        description: decodeURIComponent(description),
      });
    } else {
      // Redirect to freelance page if no service data
      navigate('/freelance');
    }
  }, [searchParams, navigate]);

  if (!serviceData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 tracking-[1.23px]">Loading payment page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/freelance">
                <Button
                  variant="outline"
                  className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Services
                </Button>
              </Link>
              <div>
                <h1 className="text-[24px] font-medium text-black tracking-[1.23px]">
                  Secure Checkout
                </h1>
                <p className="text-gray-600 text-[14px] tracking-[1.23px]">
                  {PAYMENT_GATEWAY_ENABLED 
                    ? "Complete your purchase securely with Stripe"
                    : "Payment gateway temporarily unavailable - Contact us to proceed"
                  }
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {PAYMENT_GATEWAY_ENABLED && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-md shadow-sm">
                  <span className="text-[10px] text-gray-500 font-medium tracking-wide">Powered by</span>
                  <img
                    src="/images/logos/stripe_logo.png"
                    alt="Stripe"
                    className="h-5 w-auto"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Service Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 sticky top-8">
              <h2 className="text-[20px] font-medium text-black tracking-[1.23px] mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-[18px] font-medium text-black tracking-[1.23px] mb-2">
                    {serviceData.title}
                  </h3>
                  <p className="text-[14px] text-gray-600 tracking-[1.23px] mb-4">
                    {serviceData.description}
                  </p>
                </div>

                <div className="border-t-2 border-gray-100 pt-4">
                  <h4 className="text-[16px] font-medium text-black tracking-[1.23px] mb-3">
                    Included Features:
                  </h4>
                  <ul className="space-y-2">
                    {serviceData.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-[14px] text-gray-600 tracking-[1.23px]">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t-2 border-gray-100 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[16px] text-black tracking-[1.23px]">Subtotal:</span>
                    <span className="text-[16px] text-black tracking-[1.23px]">${serviceData.price}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[16px] text-black tracking-[1.23px]">Processing Fee:</span>
                    <span className="text-[16px] text-black tracking-[1.23px]">$0</span>
                  </div>
                  <div className="border-t-2 border-black pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[20px] font-medium text-black tracking-[1.23px]">Total:</span>
                      <span className="text-[20px] font-medium text-black tracking-[1.23px]">${serviceData.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form or Unavailable Message */}
          {PAYMENT_GATEWAY_ENABLED ? (
            <div className="lg:col-span-2">
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  serviceData={serviceData}
                  customerData={customerData}
                  setCustomerData={setCustomerData}
                />
              </Elements>
            </div>
          ) : (
            <PaymentUnavailable serviceData={serviceData} />
          )}
        </div>
      </div>
    </div>
  );
}