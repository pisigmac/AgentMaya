import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { architectureConfig } from '../config';

export default function CinematicVision() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    if (!section || !text) return;

    const children = text.children;
    gsap.set(children, { opacity: 0, y: 40 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(children, {
              opacity: 1,
              y: 0,
              duration: 1.2,
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

  if (!architectureConfig.sectionLabel && !architectureConfig.title) {
    return null;
  }

  return (
    <section
      id="cinematic"
      ref={sectionRef}
      style={{
        padding: '150px 5vw 80px',
        background: '#050505',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        {architectureConfig.sectionLabel && (
          <div
            className="mb-6"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              fontWeight: 300,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#F0C85A',
              opacity: 0.8,
            }}
          >
            {architectureConfig.sectionLabel}
          </div>
        )}
        <div
          className="mb-16"
          style={{
            width: '100%',
            height: 1,
            background: 'rgba(255, 255, 255, 0.1)',
          }}
        />

        <div className="relative">
          {/* Video or fallback image */}
          <div
            className="relative overflow-hidden"
            style={{
              width: '100%',
              maxWidth: '80vw',
              margin: '0 auto',
              aspectRatio: '21/9',
              borderRadius: 12,
              background: '#0a0a0a',
            }}
          >
            {architectureConfig.videoPath ? (
              <video
                ref={videoRef}
                src={architectureConfig.videoPath}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                style={{ display: 'block' }}
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1200 50%, #0a0a0a 100%)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Animated gradient overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at 30% 50%, rgba(240, 200, 90, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(37, 99, 235, 0.08) 0%, transparent 50%)',
                  }}
                />
                {/* Floating particles effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    style={{
                      width: '60%',
                      height: '60%',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(240, 200, 90, 0.05) 0%, transparent 70%)',
                      animation: 'glow-pulse 4s ease-in-out infinite',
                    }}
                  />
                </div>
                <div
                  className="relative z-10 text-center"
                  style={{
                    fontFamily: "'GeistMono', monospace",
                    fontSize: 'clamp(14px, 2vw, 24px)',
                    fontWeight: 200,
                    color: 'rgba(240, 200, 90, 0.6)',
                    letterSpacing: '4px',
                    textTransform: 'uppercase',
                  }}
                >
                  <span style={{ color: '#F0C85A', fontWeight: 400 }}>AgentMaya</span> — Intelligence at Scale
                </div>
              </div>
            )}
          </div>

          <div
            ref={textRef}
            className="flex flex-col md:flex-row md:items-center"
            style={{ marginTop: 100, gap: '60px' }}
          >
            {architectureConfig.title && (
              <h2
                style={{
                  fontFamily: "'EB Garamond', serif",
                  fontWeight: 400,
                  fontSize: 'clamp(28px, 4vw, 56px)',
                  lineHeight: 1.15,
                  letterSpacing: '-1px',
                  color: '#ffffff',
                  margin: 0,
                  flex: '0 0 50%',
                  textWrap: 'balance',
                }}
              >
                {architectureConfig.title}
              </h2>
            )}
            {architectureConfig.description && (
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 200,
                  fontSize: 16,
                  lineHeight: 1.85,
                  color: '#B9B9B9',
                  margin: 0,
                  flex: '1 1 50%',
                  textWrap: 'pretty',
                }}
              >
                {architectureConfig.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
