import nodemailer from 'nodemailer';

const ALLOWED_ORIGINS = [
  'https://agentmaya.in',
  'https://www.agentmaya.in',
  'http://agentmaya.in',
  'http://localhost',
  'http://localhost:5173',
];

function parseBody(req: any): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk: any) => (body += chunk));
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

export default async function handler(req: any, res: any) {
  const origin = req.headers?.origin || '';
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, message: 'Method not allowed.' }));
    return;
  }

  const body = await parseBody(req);
  const { name, email, phone, subject, message } = body;

  const errors: Record<string, string> = {};
  if (!name?.trim()) errors.name = 'Name is required.';
  if (!email?.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Invalid email address.';
  }
  if (!message?.trim()) errors.message = 'Message is required.';

  if (Object.keys(errors).length > 0) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, errors }));
    return;
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim();
  const cleanPhone = phone?.trim() || 'Not provided';
  const cleanSubject = subject?.trim() || 'General Inquiry';
  const cleanMessage = message.trim();

  const emailBody = `New Contact Form Submission — AgentMaya
========================================

Name:    ${cleanName}
Email:   ${cleanEmail}
Phone:   ${cleanPhone}
Subject: ${cleanSubject}

Message:
${cleanMessage}

========================================
Sent via agentmaya.in contact form
IP: ${req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown'}
Time: ${new Date().toISOString()}
`;

  const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true,
    auth: {
      user: 'contact@agentmaya.in',
      pass: process.env.SMTP_PASSWORD || '',
    },
  });

  try {
    await transporter.sendMail({
      from: '"AgentMaya Contact Form" <contact@agentmaya.in>',
      to: 'contact@agentmaya.in',
      replyTo: cleanEmail,
      subject: `New Inquiry: ${cleanSubject} from ${cleanName}`,
      text: emailBody,
    });

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: true, message: "Message sent successfully!" }));
  } catch (error) {
    console.error('Email send error:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, message: 'Message could not be sent. Please try again later.' }));
  }
}
