import { footerConfig } from '../config';

export default function Footer() {
  if (!footerConfig.heading && footerConfig.columns.length === 0) {
    return null;
  }

  return (
    <footer
      id="footer"
      style={{
        padding: 'clamp(60px, 10vh, 120px) 5vw 40px',
        background: '#050505',
        position: 'relative',
        zIndex: 2,
        borderTop: '1px solid #282222',
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        {/* Heading */}
        {footerConfig.heading && (
          <h2
            style={{
              fontFamily: "'EB Garamond', serif",
              fontWeight: 400,
              fontSize: 'clamp(32px, 5vw, 72px)',
              lineHeight: 1.1,
              letterSpacing: '-1.44px',
              color: '#ffffff',
              marginBottom: 'clamp(40px, 6vh, 80px)',
              textWrap: 'balance',
            }}
          >
            {footerConfig.heading}
          </h2>
        )}

        {/* Link Columns */}
        {footerConfig.columns.length > 0 && (
          <div
            className="grid grid-cols-2 md:grid-cols-4"
            style={{ gap: 40, marginBottom: 80 }}
          >
            {footerConfig.columns.map((column, colIndex) => (
              <div key={colIndex} className="flex flex-col" style={{ gap: 12 }}>
                {column.title && (
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 12,
                      fontWeight: 500,
                      letterSpacing: '3px',
                      textTransform: 'uppercase',
                      color: '#B9B9B9',
                      marginBottom: 8,
                    }}
                  >
                    {column.title}
                  </span>
                )}
                {column.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 200,
                      fontSize: 14,
                      color: '#6B6B6B',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                      width: 'fit-content',
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.color = '#F4F4F4';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.color = '#6B6B6B';
                    }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Bottom Bar */}
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between"
          style={{
            paddingTop: 24,
            borderTop: '1px solid #282222',
            gap: 16,
          }}
        >
          <div className="flex items-center" style={{ gap: 12 }}>
            {footerConfig.copyright && (
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 200,
                  fontSize: 12,
                  color: '#6B6B6B',
                }}
              >
                {footerConfig.copyright}
              </span>
            )}
          </div>

          {/* Status indicator */}
          <div className="flex items-center" style={{ gap: 16 }}>
            <div className="flex items-center" style={{ gap: 8 }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#10B981',
                  boxShadow: '0 0 8px #10B981',
                  display: 'inline-block',
                  animation: 'glow-pulse 2s ease-in-out infinite',
                }}
              />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 200,
                  fontSize: 12,
                  color: '#6B6B6B',
                }}
              >
                All systems operational
              </span>
            </div>

            {footerConfig.bottomLinks.length > 0 && (
              <div className="flex items-center" style={{ gap: 24 }}>
                {footerConfig.bottomLinks.map((bottomLink) => (
                  <a
                    key={bottomLink.label}
                    href={bottomLink.href || '#'}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 200,
                      fontSize: 12,
                      color: '#6B6B6B',
                      textDecoration: 'none',
                      transition: 'color 0.3s',
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.color = '#F4F4F4';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.color = '#6B6B6B';
                    }}
                  >
                    {bottomLink.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
