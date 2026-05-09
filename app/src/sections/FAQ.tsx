import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { faqConfig } from '../config';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const items = itemRefs.current.filter(Boolean) as HTMLDivElement[];

    items.forEach((item) => {
      gsap.set(item, { opacity: 0, y: 20 });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = items.indexOf(entry.target as HTMLDivElement);
            gsap.to(entry.target, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: idx * 0.06,
              ease: 'power3.out',
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!faqConfig.items.length) return null;

  return (
    <section
      id="faq"
      ref={sectionRef}
      style={{
        padding: 'clamp(60px, 10vh, 120px) 5vw',
        background: 'transparent',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        {/* Header */}
        <div className="text-center" style={{ marginBottom: 60 }}>
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
            {faqConfig.sectionLabel}
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
            {faqConfig.title}
          </h2>
        </div>

        {/* Accordion */}
        <div>
          {faqConfig.items.map((item, index) => (
            <div
              key={index}
              ref={(el) => { itemRefs.current[index] = el; }}
              style={{
                borderBottom: '1px solid #282222',
                padding: '24px 0',
              }}
            >
              <button
                className="w-full flex items-center justify-between text-left cursor-pointer"
                style={{ background: 'none', border: 'none', padding: 0 }}
                onClick={() => toggleQuestion(index)}
                aria-expanded={openIndex === index}
              >
                <h3
                  style={{
                    fontFamily: "'EB Garamond', serif",
                    fontWeight: 400,
                    fontSize: 18,
                    color: '#F4F4F4',
                    margin: 0,
                    paddingRight: 16,
                    lineHeight: 1.4,
                  }}
                >
                  {item.question}
                </h3>
                <span
                  style={{
                    color: '#B9B9B9',
                    fontSize: 20,
                    fontWeight: 300,
                    transition: 'transform 0.3s ease',
                    transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)',
                    flexShrink: 0,
                  }}
                >
                  +
                </span>
              </button>

              <div
                style={{
                  maxHeight: openIndex === index ? 300 : 0,
                  opacity: openIndex === index ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 400ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms ease',
                }}
              >
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 200,
                    fontSize: 15,
                    lineHeight: 1.8,
                    color: '#B9B9B9',
                    paddingTop: 16,
                    maxWidth: 700,
                    margin: 0,
                  }}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
