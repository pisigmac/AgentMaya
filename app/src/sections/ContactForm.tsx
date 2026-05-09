import { useState, useEffect, useRef } from 'react';
import { X, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const subjectOptions = [
  'Sales Inquiry',
  'Product Demo Request',
  'Enterprise Plan',
  'Partnership',
  'General Question',
];

export default function ContactForm({ isOpen, onClose }: ContactFormProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Sales Inquiry',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Reset form on close after a delay
      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', subject: 'Sales Inquiry', message: '' });
        setErrors({});
        setStatus('idle');
        setStatusMessage('');
      }, 300);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Close on overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      let result;
      try {
        result = await response.json();
      } catch {
        result = { success: false, message: 'Something went wrong. Please try again later.' };
      }

      if (response.ok && result.success) {
        setStatus('success');
        setStatusMessage(result.message || "Message sent! We'll get back to you shortly.");
        setFormData({ name: '', email: '', phone: '', subject: 'Sales Inquiry', message: '' });
      } else {
        setStatus('error');
        setStatusMessage(result.message || 'Something went wrong. Please try again later.');
      }
    } catch {
      setStatus('error');
      setStatusMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    background: 'rgba(255, 255, 255, 0.04)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    color: '#F4F4F4',
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    fontWeight: 300,
    outline: 'none',
    transition: 'all 0.25s ease',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 12,
    fontWeight: 400,
    color: '#B9B9B9',
    letterSpacing: '1px',
    textTransform: 'uppercase' as const,
    marginBottom: 8,
    display: 'block',
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        background: isOpen ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0)',
        backdropFilter: isOpen ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: isOpen ? 'blur(12px)' : 'none',
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div
        ref={modalRef}
        style={{
          width: '100%',
          maxWidth: 520,
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'rgba(18, 16, 16, 0.9)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 20,
          padding: 'clamp(28px, 4vw, 40px)',
          position: 'relative',
          transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
          opacity: isOpen ? 1 : 0,
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#B9B9B9',
            transition: 'all 0.2s ease',
            zIndex: 2,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(240, 200, 90, 0.15)';
            (e.currentTarget as HTMLElement).style.color = '#F0C85A';
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(240, 200, 90, 0.3)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255, 0.06)';
            (e.currentTarget as HTMLElement).style.color = '#B9B9B9';
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.08)';
          }}
        >
          <X size={18} strokeWidth={1.5} />
        </button>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#F0C85A',
              marginBottom: 10,
            }}
          >
            Talk to Sales
          </div>
          <h3
            style={{
              fontFamily: "'EB Garamond', serif",
              fontWeight: 400,
              fontSize: 'clamp(24px, 4vw, 32px)',
              lineHeight: 1.2,
              color: '#F4F4F4',
              margin: 0,
              letterSpacing: '-0.5px',
            }}
          >
            Get in Touch
          </h3>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 200,
              fontSize: 14,
              color: '#B9B9B9',
              marginTop: 8,
              lineHeight: 1.6,
            }}
          >
            Fill out the form below and our team will reach out to you shortly.
          </p>
        </div>

        {/* Status messages */}
        {status === 'success' && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '16px 20px',
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: 12,
              marginBottom: 24,
            }}
          >
            <CheckCircle size={20} color="#10B981" />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: '#10B981',
                fontWeight: 400,
              }}
            >
              {statusMessage}
            </span>
          </div>
        )}

        {status === 'error' && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '16px 20px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              borderRadius: 12,
              marginBottom: 24,
            }}
          >
            <AlertCircle size={20} color="#EF4444" />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: '#EF4444',
                fontWeight: 400,
              }}
            >
              {statusMessage}
            </span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div style={{ display: 'grid', gap: 20 }}>
            {/* Name */}
            <div>
              <label style={labelStyle}>Full Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                style={{
                  ...inputStyle,
                  borderColor: errors.name ? 'rgba(239, 68, 68, 0.5)' : 'rgba(255, 255, 255, 0.1)',
                }}
                onFocus={(e) => {
                  if (!errors.name) e.currentTarget.style.borderColor = 'rgba(240, 200, 90, 0.4)';
                }}
                onBlur={(e) => {
                  if (!errors.name) e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              />
              {errors.name && (
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#EF4444', marginTop: 6, display: 'block' }}>
                  {errors.name}
                </span>
              )}
            </div>

            {/* Email & Phone row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@company.com"
                  style={{
                    ...inputStyle,
                    borderColor: errors.email ? 'rgba(239, 68, 68, 0.5)' : 'rgba(255, 255, 255, 0.1)',
                  }}
                  onFocus={(e) => {
                    if (!errors.email) e.currentTarget.style.borderColor = 'rgba(240, 200, 90, 0.4)';
                  }}
                  onBlur={(e) => {
                    if (!errors.email) e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                />
                {errors.email && (
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#EF4444', marginTop: 6, display: 'block' }}>
                    {errors.email}
                  </span>
                )}
              </div>
              <div>
                <label style={labelStyle}>Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  style={inputStyle}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(240, 200, 90, 0.4)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label style={labelStyle}>Subject *</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                style={{
                  ...inputStyle,
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  cursor: 'pointer',
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(240, 200, 90, 0.4)'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}
              >
                {subjectOptions.map((opt) => (
                  <option key={opt} value={opt} style={{ background: '#121010', color: '#F4F4F4' }}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label style={labelStyle}>Message *</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us about your needs..."
                rows={4}
                style={{
                  ...inputStyle,
                  borderColor: errors.message ? 'rgba(239, 68, 68, 0.5)' : 'rgba(255, 255, 255, 0.1)',
                  resize: 'vertical' as const,
                  minHeight: 100,
                }}
                onFocus={(e) => {
                  if (!errors.message) e.currentTarget.style.borderColor = 'rgba(240, 200, 90, 0.4)';
                }}
                onBlur={(e) => {
                  if (!errors.message) e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              />
              {errors.message && (
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#EF4444', marginTop: 6, display: 'block' }}>
                  {errors.message}
                </span>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '16px 32px',
                background: isSubmitting ? 'rgba(240, 200, 90, 0.5)' : '#F0C85A',
                color: '#050505',
                fontFamily: "'GeistMono', monospace",
                fontSize: 13,
                fontWeight: 400,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                borderRadius: 999,
                border: 'none',
                cursor: isSubmitting ? 'wait' : 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                marginTop: 8,
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  (e.currentTarget as HTMLElement).style.background = '#F4F4F4';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(240, 200, 90, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  (e.currentTarget as HTMLElement).style.background = '#F0C85A';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }
              }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </div>
        </form>

        {/* Footer note */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 200,
            fontSize: 11,
            color: '#6B6B6B',
            textAlign: 'center',
            marginTop: 20,
          }}
        >
          Or email us directly at{' '}
          <a
            href="mailto:contact@agentmaya.in"
            style={{ color: '#F0C85A', textDecoration: 'none' }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.textDecoration = 'underline'; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.textDecoration = 'none'; }}
          >
            contact@agentmaya.in
          </a>
        </p>
      </div>
    </div>
  );
}
