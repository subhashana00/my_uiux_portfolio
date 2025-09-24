import { useEffect, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  CheckCircle, 
  Download, 
  Mail, 
  Calendar, 
  User, 
  CreditCard,
  ArrowRight,
  Home,
  MessageCircle
} from "lucide-react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

export default function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const receiptRef = useRef<HTMLDivElement>(null);
  const { serviceData, customerData, paymentId } = location.state || {};

  useEffect(() => {
    // Redirect to freelance page if no payment data
    if (!serviceData || !customerData || !paymentId) {
      navigate('/freelance');
    }
  }, [serviceData, customerData, paymentId, navigate]);

  // Generate receipt data
  const receiptData = {
    invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    subtotal: serviceData?.price || 0,
    tax: 0, // No tax for now
    total: serviceData?.price || 0,
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid'
  };

  const downloadReceipt = async () => {
    if (!receiptRef.current) return;

    try {
      // Create a temporary receipt element for PDF generation
      const receiptElement = document.createElement('div');
      receiptElement.innerHTML = `
        <div style="
          width: 210mm;
          min-height: 297mm;
          margin: 0;
          padding: 20mm;
          background: white;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 14px;
          line-height: 1.6;
          color: #000;
          box-sizing: border-box;
        ">
          <!-- Header -->
          <div style="border-bottom: 3px solid #000; padding-bottom: 20px; margin-bottom: 30px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <div>
                <div style="
                  width: 120px;
                  height: 60px;
                  background: #000;
                  color: white;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 24px;
                  font-weight: bold;
                  margin-bottom: 10px;
                ">PS.</div>
                <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Prabhath Subhashana</h1>
                <p style="margin: 5px 0 0 0; color: #666;">UI/UX Designer & Developer</p>
              </div>
              <div style="text-align: right;">
                <h2 style="margin: 0; font-size: 32px; font-weight: bold; color: #007BFF;">RECEIPT</h2>
                <p style="margin: 5px 0 0 0; font-size: 16px;">#${receiptData.invoiceNumber}</p>
              </div>
            </div>
          </div>

          <!-- Bill To & Payment Info -->
          <div style="display: flex; justify-content: space-between; margin-bottom: 40px;">
            <div style="flex: 1; padding-right: 30px;">
              <h3 style="margin: 0 0 15px 0; font-size: 18px; font-weight: bold; color: #007BFF;">Bill To:</h3>
              <p style="margin: 0; font-weight: bold; font-size: 16px;">${customerData?.firstName} ${customerData?.lastName}</p>
              ${customerData?.company ? `<p style="margin: 5px 0;">${customerData.company}</p>` : ''}
              <p style="margin: 5px 0;">${customerData?.email}</p>
              <p style="margin: 5px 0;">${customerData?.phone}</p>
              <p style="margin: 5px 0;">
                ${customerData?.address}<br>
                ${customerData?.city}, ${customerData?.zipCode}<br>
                ${customerData?.country}
              </p>
            </div>
            <div style="flex: 1; text-align: right;">
              <h3 style="margin: 0 0 15px 0; font-size: 18px; font-weight: bold; color: #007BFF;">Payment Details:</h3>
              <div style="margin-bottom: 10px;">
                <span style="font-weight: bold;">Date:</span> ${receiptData.date}
              </div>
              <div style="margin-bottom: 10px;">
                <span style="font-weight: bold;">Payment ID:</span> ${paymentId}
              </div>
              <div style="margin-bottom: 10px;">
                <span style="font-weight: bold;">Payment Method:</span> ${receiptData.paymentMethod}
              </div>
              <div style="margin-bottom: 10px;">
                <span style="font-weight: bold;">Status:</span> 
                <span style="color: #28a745; font-weight: bold;">${receiptData.paymentStatus}</span>
              </div>
            </div>
          </div>

          <!-- Service Details -->
          <div style="margin-bottom: 40px;">
            <h3 style="margin: 0 0 20px 0; font-size: 18px; font-weight: bold; color: #007BFF;">Service Details:</h3>
            <table style="width: 100%; border-collapse: collapse; border: 2px solid #000;">
              <thead>
                <tr style="background: #f8f9fa;">
                  <th style="border: 1px solid #000; padding: 15px; text-align: left; font-weight: bold;">Description</th>
                  <th style="border: 1px solid #000; padding: 15px; text-align: right; font-weight: bold; width: 120px;">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="border: 1px solid #000; padding: 15px; vertical-align: top;">
                    <div style="font-weight: bold; margin-bottom: 8px;">${serviceData?.title}</div>
                    <div style="color: #666; margin-bottom: 10px;">${serviceData?.description}</div>
                    <div style="font-size: 12px;">
                      <strong>Includes:</strong>
                      <ul style="margin: 5px 0; padding-left: 20px;">
                        ${serviceData?.features?.map((feature: string) => `<li>${feature}</li>`).join('') || ''}
                      </ul>
                    </div>
                  </td>
                  <td style="border: 1px solid #000; padding: 15px; text-align: right; vertical-align: top; font-weight: bold; font-size: 16px;">
                    $${serviceData?.price?.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Totals -->
          <div style="margin-bottom: 40px;">
            <div style="max-width: 300px; margin-left: auto;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 15px; border-bottom: 1px solid #ddd; font-weight: bold;">Subtotal:</td>
                  <td style="padding: 10px 15px; text-align: right; border-bottom: 1px solid #ddd;">$${receiptData.subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 15px; border-bottom: 1px solid #ddd; font-weight: bold;">Tax:</td>
                  <td style="padding: 10px 15px; text-align: right; border-bottom: 1px solid #ddd;">$${receiptData.tax.toFixed(2)}</td>
                </tr>
                <tr style="background: #007BFF; color: white;">
                  <td style="padding: 15px; font-weight: bold; font-size: 18px;">Total Paid:</td>
                  <td style="padding: 15px; text-align: right; font-weight: bold; font-size: 18px;">$${receiptData.total.toFixed(2)}</td>
                </tr>
              </table>
            </div>
          </div>

          <!-- Footer -->
          <div style="border-top: 2px solid #000; padding-top: 20px; text-align: center; color: #666;">
            <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: bold;">Thank you for your business!</p>
            <p style="margin: 0;">For questions about this receipt, contact us at prabathsubashana18@gmail.com</p>
            <div style="margin-top: 20px; font-size: 12px;">
              <p style="margin: 0;">This is a computer-generated receipt and does not require a signature.</p>
              <p style="margin: 5px 0 0 0;">Generated on ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      `;

      // Add to DOM temporarily
      receiptElement.style.position = 'fixed';
      receiptElement.style.left = '-9999px';
      receiptElement.style.top = '0';
      document.body.appendChild(receiptElement);

      // Generate PDF
      const canvas = await html2canvas(receiptElement.children[0] as HTMLElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Clean up
      document.body.removeChild(receiptElement);

      // Download PDF
      pdf.save(`Receipt-${receiptData.invoiceNumber}.pdf`);
      
    } catch (error) {
      console.error('Error generating receipt:', error);
      alert('Failed to generate receipt. Please try again.');
    }
  };

  if (!serviceData || !customerData || !paymentId) {
    return null;
  }

  const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;
  const estimatedDelivery = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString();

  return (
    <div className="min-h-screen bg-white">
      {/* Hidden receipt template for PDF generation */}
      <div ref={receiptRef} style={{ position: 'absolute', left: '-9999px', top: '0' }}>
        {/* This will be used as a fallback if needed */}
      </div>
      
      {/* Header */}
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[24px] font-medium text-black tracking-[1.23px]">
                Payment Successful
              </h1>
              <p className="text-gray-600 text-[14px] tracking-[1.23px]">
                Thank you for your purchase!
              </p>
            </div>
            <Link to="/">
              <Button
                variant="outline"
                className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 sm:px-8 py-12">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-[48px] font-medium text-black tracking-[1.23px] mb-4">
            Payment Successful!
          </h1>
          <p className="text-[18px] text-gray-600 tracking-[1.23px] max-w-2xl mx-auto">
            Your order has been confirmed and we'll start working on your project immediately. 
            You'll receive a confirmation email shortly with all the details.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Order Details */}
          <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="w-6 h-6 text-blue-600" />
              <h2 className="text-[24px] font-medium text-black tracking-[1.23px]">
                Order Details
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-[18px] font-medium text-black tracking-[1.23px] mb-2">
                  {serviceData.title}
                </h3>
                <p className="text-[14px] text-gray-600 tracking-[1.23px] mb-4">
                  {serviceData.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-[14px]">
                <div>
                  <span className="text-gray-600 tracking-[1.23px]">Order Number:</span>
                  <p className="font-medium text-black tracking-[1.23px]">{orderNumber}</p>
                </div>
                <div>
                  <span className="text-gray-600 tracking-[1.23px]">Payment ID:</span>
                  <p className="font-medium text-black tracking-[1.23px] truncate">{paymentId}</p>
                </div>
                <div>
                  <span className="text-gray-600 tracking-[1.23px]">Total Paid:</span>
                  <p className="font-medium text-black tracking-[1.23px]">${serviceData.price}</p>
                </div>
                <div>
                  <span className="text-gray-600 tracking-[1.23px]">Estimated Delivery:</span>
                  <p className="font-medium text-black tracking-[1.23px]">{estimatedDelivery}</p>
                </div>
              </div>

              <div className="border-t-2 border-gray-100 pt-6">
                <h4 className="text-[16px] font-medium text-black tracking-[1.23px] mb-3">
                  Included Features:
                </h4>
                <ul className="space-y-2">
                  {serviceData.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-[14px] text-gray-600 tracking-[1.23px]">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-blue-600" />
              <h2 className="text-[24px] font-medium text-black tracking-[1.23px]">
                Customer Details
              </h2>
            </div>

            <div className="space-y-4 text-[14px]">
              <div>
                <span className="text-gray-600 tracking-[1.23px] block mb-1">Full Name:</span>
                <p className="font-medium text-black tracking-[1.23px]">
                  {customerData.firstName} {customerData.lastName}
                </p>
              </div>

              <div>
                <span className="text-gray-600 tracking-[1.23px] block mb-1">Email:</span>
                <p className="font-medium text-black tracking-[1.23px]">{customerData.email}</p>
              </div>

              <div>
                <span className="text-gray-600 tracking-[1.23px] block mb-1">Phone:</span>
                <p className="font-medium text-black tracking-[1.23px]">{customerData.phone}</p>
              </div>

              {customerData.company && (
                <div>
                  <span className="text-gray-600 tracking-[1.23px] block mb-1">Company:</span>
                  <p className="font-medium text-black tracking-[1.23px]">{customerData.company}</p>
                </div>
              )}

              <div>
                <span className="text-gray-600 tracking-[1.23px] block mb-1">Address:</span>
                <p className="font-medium text-black tracking-[1.23px]">
                  {customerData.address}<br />
                  {customerData.city}, {customerData.zipCode}<br />
                  {customerData.country}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-blue-600" />
            <h2 className="text-[24px] font-medium text-black tracking-[1.23px]">
              What Happens Next?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-[18px] font-medium">
                1
              </div>
              <h3 className="text-[16px] font-medium text-black tracking-[1.23px] mb-2">
                Confirmation Email
              </h3>
              <p className="text-[14px] text-gray-600 tracking-[1.23px]">
                You'll receive a detailed confirmation email within 5 minutes
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-[18px] font-medium">
                2
              </div>
              <h3 className="text-[16px] font-medium text-black tracking-[1.23px] mb-2">
                Project Kickoff
              </h3>
              <p className="text-[14px] text-gray-600 tracking-[1.23px]">
                We'll reach out within 24 hours to discuss project details
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-[18px] font-medium">
                3
              </div>
              <h3 className="text-[16px] font-medium text-black tracking-[1.23px] mb-2">
                Delivery
              </h3>
              <p className="text-[14px] text-gray-600 tracking-[1.23px]">
                Your completed project will be delivered by {estimatedDelivery}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={downloadReceipt}
            className="bg-black text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all text-[16px] font-medium tracking-[1.23px] px-8"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Receipt
          </Button>

          <Link to="/contact">
            <Button
              variant="outline"
              className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all text-[16px] font-medium tracking-[1.23px] px-8"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Contact Support
            </Button>
          </Link>

          <Link to="/freelance">
            <Button
              variant="outline"
              className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all text-[16px] font-medium tracking-[1.23px] px-8"
            >
              More Services
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}