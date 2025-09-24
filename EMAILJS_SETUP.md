# EmailJS Setup Guide

## 🚀 Installation Complete ✅
The `@emailjs/browser` package has been successfully installed and the contact form is ready to send real emails!

## � Content Security Policy Fixed ✅
Updated the server CSP to allow EmailJS API connections. The CSP error should now be resolved!

## �📋 What You Need to Configure

### 1. EmailJS Dashboard Setup
1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Login with your account
3. You already have service ID: `service_svj8159`

### 2. Create Email Template
You need to create an email template in your EmailJS dashboard:

**Template ID**: `template_contact` (or update the ID in Contact.tsx)

**Template Variables** (use these exact names in your template):
- `{{from_name}}` - Sender's full name
- `{{from_email}}` - Sender's email address
- `{{subject}}` - Email subject
- `{{message}}` - Email message content
- `{{to_name}}` - Your name (Prabhath Subhashana)
- `{{reply_to}}` - Reply-to email address

**Sample Email Template**:
```
Subject: New Contact Form Message: {{subject}}

Hello {{to_name}},

You have received a new message through your portfolio contact form.

From: {{from_name}} ({{from_email}})
Subject: {{subject}}

Message:
{{message}}

---
This email was sent from your portfolio contact form.
Reply directly to this email to respond to {{from_name}}.
```

### 3. Get Your Public Key
1. In EmailJS dashboard, go to "Account" → "General"
2. Copy your **Public Key**
3. Replace `YOUR_PUBLIC_KEY` in `Contact.tsx` with your actual public key

### 4. Update Contact.tsx
Find this line in `client/pages/Contact.tsx`:
```typescript
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Replace with your actual public key
```

Replace `YOUR_PUBLIC_KEY` with your actual EmailJS public key.

## 🎯 Current Configuration

**Service ID**: `service_svj8159` ✅ (Already configured)
**Template ID**: `template_contact` (You need to create this)
**Public Key**: `YOUR_PUBLIC_KEY` (You need to replace this)
**CSP Policy**: ✅ Fixed - EmailJS API access enabled

## 🔧 How It Works

1. User fills out the contact form
2. Form validation checks required fields and email format
3. EmailJS sends the email using your service and template
4. Success/error toast messages are shown to the user
5. Form resets on successful submission

## 🎨 Features Included

- ✅ Form validation (required fields + email format)
- ✅ Loading state during submission
- ✅ Success/error toast notifications with custom styling
- ✅ Form reset after successful submission
- ✅ Professional email template parameters
- ✅ Error handling and user feedback
- ✅ CSP policy updated for EmailJS API access

## 🚨 Important Notes

1. **Rate Limiting**: EmailJS has monthly email limits based on your plan
2. **Template Creation**: You must create the email template in EmailJS dashboard
3. **Public Key**: Must be replaced with your actual key from EmailJS dashboard
4. **Testing**: Test the form after configuration to ensure emails are delivered

## 📞 Contact Methods Available

Your contact page now includes:
- ✅ Real email form (EmailJS) - CSP fixed!
- ✅ WhatsApp floating button (+94 71 690 3566)
- ✅ Email link (prabhathsubhashana@gmail.com)
- ✅ LinkedIn profile link

## 🎊 You're Almost Done!

Just complete steps 2 and 3 above (create template + add public key) and your contact form will send real emails!

## 🔍 Testing the Fix

1. Open your portfolio at `http://localhost:8081`
2. Go to the Contact page
3. Fill out the form and submit
4. You should no longer see CSP errors in the browser console
5. Once you add your public key and create the template, emails will be sent successfully!