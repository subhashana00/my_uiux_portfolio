import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { handleDemo } from "./routes/demo";
import { createPaymentIntent, handleStripeWebhook, validatePaymentIntent } from "./routes/payment";

export function createServer() {
  const app = express();

  // Security middleware
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:"],
        scriptSrc: process.env.NODE_ENV === 'production' 
          ? ["'self'", "https://js.stripe.com"] 
          : ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://js.stripe.com"], // Allow Stripe scripts
        connectSrc: ["'self'", "https://api.stripe.com", "https://api.emailjs.com", "ws:", "wss:"], // Add WebSocket support for HMR and EmailJS
        frameSrc: ["'self'", "https://js.stripe.com"],
      },
    },
    crossOriginEmbedderPolicy: false, // Allow Stripe integration
  }));

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
      error: "Too many requests from this IP, please try again later.",
    },
    standardHeaders: true,
    legacyHeaders: false,
  });

  // Stricter rate limit for payment endpoints
  const paymentLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit payment attempts
    message: {
      error: "Too many payment attempts, please try again later.",
    },
  });

  // Apply rate limiting to API routes
  app.use('/api/', limiter);

  // CORS configuration
  const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
      ? [process.env.FRONTEND_URL || 'https://yourdomain.com'] 
      : ['http://localhost:8080', 'http://127.0.0.1:8080'],
    credentials: true,
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
  
  // Raw body for Stripe webhooks (must be before express.json())
  app.use('/api/stripe/webhook', express.raw({ type: 'application/json' }));
  
  app.use(express.json({ limit: '10mb' })); // Limit request size
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Security headers for API responses
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "pong";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Payment routes with additional rate limiting
  app.post("/api/create-payment-intent", paymentLimiter, validatePaymentIntent, createPaymentIntent);
  app.post("/api/stripe/webhook", handleStripeWebhook);

  // Global error handler
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Error:', err);
    
    const isDevelopment = process.env.NODE_ENV !== 'production';
    
    res.status(err.status || 500).json({
      error: isDevelopment ? err.message : 'Internal server error',
      ...(isDevelopment && { stack: err.stack })
    });
  });

  return app;
}
