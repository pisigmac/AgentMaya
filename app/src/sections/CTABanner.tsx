import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ctaBannerConfig } from '../config';

interface CTABannerProps {
  onOpenContact: () => void;
}

export default function CTABanner({ onOpenContact }: CTABannerProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const children = content.children;
    gsap.set(children, { opacity: 0, y: 30 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(children, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: 'power3.out',
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  if (!ctaBannerConfig.headline) return null;

  return (
    <section
      ref={sectionRef}
      style={{
        padding: 'clamp(80px, 15vh, 160px) 5vw',
        position: 'relative',
        zIndex: 2,
        background: 'radial-gradient(ellipse at center, rgba(240, 200, 90, 0.08) 0%, transparent 60%)',
      }}
    >
      <div
        ref={contentRef}
        style={{
          maxWidth: 800,
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontFamily: "'EB Garamond', serif",
            fontWeight: 400,
            fontSize: 'clamp(28px, 4vw, 56px)',
            lineHeight: 1.15,
            letterSpacing: '-1px',
            color: '#F4F4F4',
            margin: 0,
            textWrap: 'balance',
          }}
        >
          {ctaBannerConfig.headline}
        </h2>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 200,
            fontSize: 'clamp(16px, 1.3vw, 20px)',
            lineHeight: 1.7,
            color: '#B9B9B9',
            maxWidth: 560,
            margin: '20px auto 0',
            textWrap: 'pretty',
          }}
        >
          {ctaBannerConfig.description}
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center"
          style={{ gap: 16, marginTop: 40 }}
        >
          <button
            className="cursor-pointer"
            style={{
              background: '#F0C85A',
              color: '#050505',
              fontFamily: "'GeistMono', monospace",
              fontSize: 13,
              fontWeight: 400,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              padding: '14px 32px',
              borderRadius: 999,
              border: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.background = '#F4F4F4';
              (e.target as HTMLElement).style.boxShadow = '0 0 30px rgba(240, 200, 90, 0.2)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background = '#F0C85A';
              (e.target as HTMLElement).style.boxShadow = 'none';
            }}
          >
            {ctaBannerConfig.primaryCta}
          </button>

          <button
            onClick={onOpenContact}
            className="cursor-pointer"
            style={{
              background: 'transparent',
              color: '#B9B9B9',
              fontFamily: "'GeistMono', monospace",
              fontSize: 13,
              fontWeight: 400,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              padding: '14px 32px',
              borderRadius: 999,
              border: '1px solid #282222',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.borderColor = '#F0C85A';
              (e.target as HTMLElement).style.color = '#F0C85A';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.borderColor = '#282222';
              (e.target as HTMLElement).style.color = '#B9B9B9';
            }}
          >
            {ctaBannerConfig.secondaryCta}
          </button>
        </div>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 200,
            fontSize: 12,
            color: '#6B6B6B',
            marginTop: 24,
          }}
        >
          {ctaBannerConfig.trustText}
        </p>
      </div>
    </section>
  );
}
