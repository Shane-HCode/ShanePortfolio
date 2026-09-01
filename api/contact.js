// api/contact.js
import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, message } = req.body

    // Validation
    const errors = {}
    if (!name || name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters'
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address'
    }
    if (!message || message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters'
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ 
        success: false, 
        errors,
        message: 'Please fix the errors in your form'
      })
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Send admin email
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `New Contact: ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p style="color: #999; font-size: 12px;">
          Sent from your portfolio contact form
        </p>
      `,
      replyTo: email,
    })

    // Send user thank you email
    await transporter.sendMail({
      from: `"Shane Henricus" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thank you for reaching out, ${name}!`,
      html: `
        <h2>Hello ${name}! 👋</h2>
        <p>Thank you for reaching out to me. I've received your message and will get back to you within 24-48 hours.</p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0;"><strong>Next Steps:</strong> I'll review your message and respond as soon as possible.</p>
        </div>
        <p>Best regards,<br>Shane Henricus</p>
      `,
    })

    return res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully!'
    })

  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to send your message. Please try again later.'
    })
  }
}