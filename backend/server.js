// backend/server.js
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// CORS configuration - Allow multiple origins
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
  process.env.FRONTEND_URL // For production
].filter(Boolean) // Remove any undefined values

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true)
    
    // Check if the origin is allowed
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      console.log('❌ Blocked origin:', origin)
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Validation
const validateForm = (data) => {
  const errors = {}
  
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!data.email || !emailRegex.test(data.email)) {
    errors.email = 'Please enter a valid email address'
  }
  
  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

// Email templates
const getUserEmailHTML = (name) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .container { background: #f9f9f9; border-radius: 10px; padding: 30px; }
        h2 { color: #2d3748; }
        .highlight { background: #e2e8f0; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #718096; }
        .social-links a { margin-right: 15px; color: #4299e1; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Hello ${name}! 👋</h2>
        <p>Thank you for reaching out to me. I've received your message and will get back to you within 24-48 hours.</p>
        <div class="highlight">
          <p style="margin: 0;"><strong>Next Steps:</strong> I'll review your message and respond as soon as possible.</p>
        </div>
        <p>In the meantime, feel free to connect with me:</p>
        <div class="social-links">
          <a href="https://github.com/Shane-HCode">GitHub</a>
          <a href="https://www.linkedin.com/in/shane-henricus-496034297/">LinkedIn</a>
          <a href="https://www.instagram.com/_shanehenri/">Instagram</a>
        </div>
        <div class="footer">
          <p>Best regards,<br><strong>Shane Henricus</strong></p>
        </div>
      </div>
    </body>
  </html>
`

const getAdminEmailHTML = ({ name, email, message }) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .container { background: #f9f9f9; border-radius: 10px; padding: 30px; }
        h2 { color: #2d3748; border-bottom: 2px solid #4299e1; padding-bottom: 10px; }
        .field { background: white; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .field label { font-weight: bold; color: #4a5568; display: block; margin-bottom: 5px; }
        .message-content { background: #f7fafc; padding: 15px; border-radius: 8px; white-space: pre-wrap; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #718096; font-size: 14px; }
        .badge { display: inline-block; background: #48bb78; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>📩 New Contact Form Submission <span class="badge">NEW</span></h2>
        <p><em>Received at: ${new Date().toLocaleString()}</em></p>
        
        <div class="field">
          <label>👤 Name</label>
          <p style="margin: 0; font-size: 16px;"><strong>${name}</strong></p>
        </div>
        
        <div class="field">
          <label>📧 Email</label>
          <p style="margin: 0; font-size: 16px;">
            <a href="mailto:${email}" style="color: #4299e1; text-decoration: none;">${email}</a>
          </p>
        </div>
        
        <div class="field">
          <label>💬 Message</label>
          <div class="message-content">${message}</div>
        </div>
        
        <div style="margin: 20px 0; padding: 15px; background: #ebf8ff; border-radius: 8px; border-left: 4px solid #4299e1;">
          <strong>Quick Action:</strong> 
          <a href="mailto:${email}" style="color: #4299e1;">Reply to ${name}</a>
        </div>
        
        <div class="footer">
          <p>Sent from your portfolio contact form</p>
        </div>
      </div>
    </body>
  </html>
`

// Send email function
const sendEmails = async (formData) => {
  const { name, email, message } = formData
  
  // Validate environment variables
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('Email credentials not configured')
  }
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // Add timeout settings
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  })

  // Verify transporter
  await transporter.verify()

  // Admin email
  const adminMailOptions = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: `New Contact: ${name}`,
    html: getAdminEmailHTML({ name, email, message }),
    replyTo: email,
  }

  // User thank you email
  const userMailOptions = {
    from: `"Shane Henricus" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Thank you for reaching out, ${name}!`,
    html: getUserEmailHTML(name),
  }

  // Send both emails
  const [adminResult, userResult] = await Promise.all([
    transporter.sendMail(adminMailOptions),
    transporter.sendMail(userMailOptions)
  ])

  console.log('✅ Admin email sent:', adminResult.messageId)
  console.log('✅ User email sent:', userResult.messageId)
  
  return { success: true }
}

// API Endpoint - Contact Form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body
    
    // Validate input
    const { isValid, errors } = validateForm({ name, email, message })
    
    if (!isValid) {
      return res.status(400).json({
        success: false,
        errors,
        message: 'Please fix the errors in your form'
      })
    }
    
    // Send emails
    await sendEmails({ name, email, message })
    
    res.json({
      success: true,
      message: 'Your message has been sent successfully!'
    })
    
  } catch (error) {
    console.error('❌ Error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to send your message. Please try again later.'
    })
  }
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    allowedOrigins: allowedOrigins,
    environment: process.env.NODE_ENV || 'development'
  })
})

// Test endpoint to verify email configuration
app.get('/api/test-email', async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })
    
    await transporter.verify()
    
    res.json({ 
      success: true, 
      message: 'Email configuration is working correctly!'
    })
  } catch (error) {
    console.error('Email test failed:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Email configuration failed: ' + error.message 
    })
  }
})