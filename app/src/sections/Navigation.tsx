import { useEffect, useState } from 'react';
import { siteConfig, navigationConfig } from '../config';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!siteConfig.brandName && navigationConfig.links.length === 0) {
    return null;
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-500"
      style={{
        height: 72,
        padding: '0 5vw',
        backgroundColor: scrolled ? 'rgba(5, 5, 5, 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
      }}
    >
      <a
        href="#hero"
        onClick={(e) => handleClick(e, '#hero')}
        className="text-white no-underline flex items-center"
        style={{
          fontFamily: "'GeistMono', monospace",
          fontSize: 18,
          fontWeight: 400,
          letterSpacing: '-0.5px',
          gap: 8,
        }}
      >
        {/* Logo icon - stylized M */}
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ flexShrink: 0 }}>
          <path
            d="M4 22V6L14 16L24 6V22"
            stroke="#F0C85A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 6L14 16L24 6"
            stroke="#F0C85A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.4"
          />
        </svg>
        {siteConfig.brandName}
      </a>

      <div className="hidden md:flex items-center" style={{ gap: 40 }}>
        {navigationConfig.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => handleClick(e, link.href)}
            className="nav-link"
          >
            {link.label}
          </a>
        ))}
      </div>

      {navigationConfig.ctaText && (
        <a
          href="#footer"
          onClick={(e) => handleClick(e, '#footer')}
          className="hidden md:inline-block"
          style={{
            fontFamily: "'GeistMono', monospace",
            fontSize: 12,
            fontWeight: 400,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: '#050505',
            background: '#F0C85A',
            padding: '10px 24px',
            borderRadius: 999,
            textDecoration: 'none',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.background = '#F4F4F4';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.background = '#F0C85A';
          }}
        >
          {navigationConfig.ctaText}
        </a>
      )}

      {/* Mobile menu button */}
      <button
        className="md:hidden flex flex-col"
        style={{
          gap: 5,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 8,
        }}
        aria-label="Menu"
      >
        <span style={{ width: 24, height: 1.5, background: '#F4F4F4', display: 'block' }} />
        <span style={{ width: 24, height: 1.5, background: '#F4F4F4', display: 'block' }} />
        <span style={{ width: 16, height: 1.5, background: '#F4F4F4', display: 'block' }} />
      </button>
    </nav>
  );
}
