import { Link } from 'react-router-dom';
import { posts } from '../blogPosts';

export default function BlogList() {
  return (
    <div style={{ minHeight: '100vh', background: '#0f0f0f' }}>
      {/* Nav */}
      <nav style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1100, margin: '0 auto' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: '-0.025em' }}>
            <span style={{ background: 'linear-gradient(135deg, #c8956c, #d4a87a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>GPT</span>
            <span style={{ color: '#f0ece4', fontWeight: 500 }}>Search</span>
            <span style={{ background: 'linear-gradient(135deg, #c8956c, #d4a87a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Boost</span>
          </span>
        </Link>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <Link to="/" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#9a9189', textDecoration: 'none' }}>← Home</Link>
          <Link to="/#contact" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, background: 'linear-gradient(135deg, #c8956c, #d4a87a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textDecoration: 'none' }}>Book a Call</Link>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 32px 56px' }}>
        <div style={{ marginBottom: 8 }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#c8956c' }}>Resources</span>
        </div>
        <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 400, color: '#f0ece4', lineHeight: 1.1, margin: '12px 0 20px' }}>
          Learn GEO. <span style={{ color: '#c8956c', fontStyle: 'italic' }}>Stay Ahead.</span>
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: '#8a837b', maxWidth: 520, lineHeight: 1.6, margin: 0 }}>
          Guides, playbooks, and tools to help your business get recommended by AI search engines.
        </p>
      </div>

      {/* Posts Grid */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px 96px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
          {posts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
              <div
                style={{
                  background: '#141414',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 16,
                  padding: '28px 28px 24px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  transition: 'border-color 0.25s ease, transform 0.25s ease',
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(200,149,108,0.4)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{
                    fontSize: 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                    letterSpacing: '0.09em', textTransform: 'uppercase',
                    color: post.tagColor, background: `${post.tagColor}18`,
                    padding: '4px 10px', borderRadius: 6,
                  }}>{post.tag}</span>
                  <span style={{ fontSize: 12, color: '#6b6560', fontFamily: "'DM Sans', sans-serif" }}>{post.readTime}</span>
                </div>
                <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 20, fontWeight: 400, color: '#f0ece4', lineHeight: 1.35, margin: 0, flexGrow: 1 }}>
                  {post.title}
                </h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#8a837b', lineHeight: 1.65, margin: 0 }}>
                  {post.excerpt}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#c8956c', fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, marginTop: 4 }}>
                  Read article →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
