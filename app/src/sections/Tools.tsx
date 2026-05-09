import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  MessageSquare, PenTool, Code2, BarChart3, Search, Globe, FileText, Sparkles,
} from 'lucide-react';
import { toolsConfig } from '../config';

const iconMap: Record<string, React.ElementType> = {
  MessageSquare, PenTool, Code2, BarChart3, Search, Globe, FileText, Sparkles,
};

export default function Tools() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredTool, setHoveredTool] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const center = centerRef.current;
    if (!section || !center) return;

    gsap.set(center, { scale: 0, opacity: 0 });
    cardRefs.current.filter(Boolean).forEach((card) => {
      gsap.set(card, { scale: 0.5, opacity: 0 });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(center, {
              scale: 1,
              opacity: 1,
              duration: 0.8,
              ease: 'back.out(1.7)',
            });

            cardRefs.current.filter(Boolean).forEach((card, i) => {
              gsap.to(card, {
                scale: 1,
                opacity: 1,
                duration: 0.6,
                delay: 0.3 + i * 0.08,
                ease: 'back.out(1.5)',
              });
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  if (!toolsConfig.items.length) return null;

  return (
    <section
      id="tools"
      ref={sectionRef}
      style={{
        padding: 'clamp(100px, 15vh, 180px) 5vw',
        background: 'transparent',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div className="text-center" style={{ marginBottom: 40 }}>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              fontWeight: 300,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#F0C85A',
              marginBottom: 16,
            }}
          >
            {toolsConfig.sectionLabel}
          </div>
          <h2
            style={{
              fontFamily: "'EB Garamond', serif",
              fontWeight: 400,
              fontSize: 'clamp(32px, 5vw, 64px)',
              lineHeight: 1.15,
              letterSpacing: '-1px',
              color: '#ffffff',
              margin: 0,
            }}
          >
            {toolsConfig.title}
          </h2>
        </div>

        {/* Orbital Layout */}
        <div
          className="hidden md:block relative mx-auto"
          style={{
            width: 'min(700px, 70vw)',
            height: 'min(700px, 70vw)',
            marginTop: 60,
          }}
        >
          {/* Center element */}
          <div
            ref={centerRef}
            className="absolute top-1/2 left-1/2"
            style={{
              width: 'min(200px, 25vw)',
              height: 'min(200px, 25vw)',
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              background: 'rgba(18, 16, 16, 0.6)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'glow-pulse 3s ease-in-out infinite',
              zIndex: 2,
            }}
          >
            <span
              style={{
                fontFamily: "'GeistMono', monospace",
                fontSize: 64,
                fontWeight: 400,
                color: '#F0C85A',
                letterSpacing: '-2px',
              }}
            >
              M
            </span>
          </div>

          {/* Orbiting cards */}
          <div
            ref={orbitRef}
            className="absolute"
            style={{
              inset: 0,
              animation: 'orbit-rotate 60s linear infinite',
            }}
          >
            {toolsConfig.items.map((tool, i) => {
              const angle = (i / toolsConfig.items.length) * 360;
              const radius = 50;
              const rad = (angle * Math.PI) / 180;
              const x = 50 + Math.cos(rad) * radius;
              const y = 50 + Math.sin(rad) * radius;
              const IconComp = iconMap[tool.icon] || Sparkles;

              return (
                <div
                  key={tool.name}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  className="absolute glass-card cursor-pointer"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: `translate(-50%, -50%) rotate(-${angle}deg)`,
                    width: 140,
                    padding: 16,
                    textAlign: 'center',
                    zIndex: 3,
                    animation: `orbit-rotate 60s linear infinite reverse`,
                  }}
                  onMouseEnter={() => setHoveredTool(i)}
                  onMouseLeave={() => setHoveredTool(null)}
                >
                  <IconComp
                    size={32}
                    color="#F0C85A"
                    style={{ margin: '0 auto' }}
                    strokeWidth={1.5}
                  />
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      fontWeight: 400,
                      color: '#F4F4F4',
                      marginTop: 8,
                    }}
                  >
                    {tool.name}
                  </div>

                  {/* Tooltip */}
                  {hoveredTool === i && (
                    <div
                      className="absolute"
                      style={{
                        bottom: 'calc(100% + 12px)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 200,
                        padding: '12px 16px',
                        background: 'rgba(18, 16, 16, 0.9)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 8,
                        zIndex: 10,
                        pointerEvents: 'none',
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'EB Garamond', serif",
                          fontSize: 14,
                          fontWeight: 500,
                          color: '#F4F4F4',
                          marginBottom: 4,
                        }}
                      >
                        {tool.name}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 12,
                          fontWeight: 200,
                          color: '#B9B9B9',
                          lineHeight: 1.5,
                        }}
                      >
                        {tool.description}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: Grid layout */}
        <div className="md:hidden grid grid-cols-2 gap-4" style={{ marginTop: 40 }}>
          {toolsConfig.items.map((tool) => {
            const IconComp = iconMap[tool.icon] || Sparkles;
            return (
              <div
                key={tool.name}
                className="glass-card"
                style={{ padding: 20, textAlign: 'center' }}
              >
                <IconComp
                  size={28}
                  color="#F0C85A"
                  style={{ margin: '0 auto 8px' }}
                  strokeWidth={1.5}
                />
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    fontWeight: 400,
                    color: '#F4F4F4',
                  }}
                >
                  {tool.name}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    fontWeight: 200,
                    color: '#B9B9B9',
                    marginTop: 4,
                    lineHeight: 1.4,
                  }}
                >
                  {tool.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
