import { useParams, Link } from 'react-router-dom';
import { posts } from '../blogPosts';

function renderBlock(block, i) {
  if (block.type === 'h2') return (
    <h2 key={i} style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 400, color: '#f0ece4', margin: '48px 0 16px', lineHeight: 1.3 }}>
      {block.text}
    </h2>
  );
  if (block.type === 'p') return (
    <p key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: '#b0a89f', lineHeight: 1.8, margin: '0 0 20px' }}>
      {block.text}
    </p>
  );
  if (block.type === 'stat') return (
    <div key={i} style={{ borderLeft: '3px solid #c8956c', background: 'rgba(200,149,108,0.07)', borderRadius: '0 10px 10px 0', padding: '18px 24px', margin: '28px 0' }}>
      <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 18, color: '#d4a87a', lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>{block.text}</p>
    </div>
  );
  if (block.type === 'list') return (
    <ul key={i} style={{ listStyle: 'none', padding: 0, margin: '12px 0 24px' }}>
      {block.items.map((item, j) => (
        <li key={j} style={{ display: 'flex', gap: 14, fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: '#b0a89f', lineHeight: 1.75, marginBottom: 14 }}>
          <span style={{ color: '#c8956c', flexShrink: 0, marginTop: 3 }}>→</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
  return null;
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);
  const currentIdx = posts.findIndex(p => p.slug === slug);
  const prev = posts[currentIdx - 1];
  const next = posts[currentIdx + 1];

  if (!post) {
    return (
      <div style={{ minHeight: '100vh', background: '#0f0f0f', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#8a837b', fontSize: 18 }}>Article not found.</p>
        <Link to="/blog" style={{ color: '#c8956c', fontFamily: "'DM Sans', sans-serif", fontSize: 15 }}>← Back to Blog</Link>
      </div>
    );
  }

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
        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          <Link to="/blog" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#9a9189', textDecoration: 'none' }}>← All Articles</Link>
          <Link to="/#contact" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, background: 'linear-gradient(135deg, #c8956c, #d4a87a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textDecoration: 'none' }}>Book a Call</Link>
        </div>
      </nav>

      {/* Article */}
      <article style={{ maxWidth: 720, margin: '0 auto', padding: '64px 32px 80px' }}>
        {/* Meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
          <span style={{
            fontSize: 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
            letterSpacing: '0.09em', textTransform: 'uppercase',
            color: post.tagColor, background: `${post.tagColor}18`,
            padding: '4px 10px', borderRadius: 6,
          }}>{post.tag}</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#6b6560' }}>{post.readTime} · {post.date}</span>
        </div>

        {/* Title */}
        <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(30px, 5vw, 48px)', fontWeight: 400, color: '#f0ece4', lineHeight: 1.15, margin: '0 0 32px' }}>
          {post.title}
        </h1>

        {/* Excerpt */}
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: '#c8956c', lineHeight: 1.6, margin: '0 0 40px', borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: 40 }}>
          {post.excerpt}
        </p>

        {/* Body */}
        <div>{post.content.map(renderBlock)}</div>

        {/* CTA */}
        <div style={{ marginTop: 64, background: '#141414', border: '1px solid rgba(200,149,108,0.25)', borderRadius: 16, padding: '36px 32px', textAlign: 'center' }}>
          <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 26, fontWeight: 400, color: '#f0ece4', margin: '0 0 12px' }}>
            Ready to Get Recommended by AI?
          </h3>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: '#8a837b', margin: '0 0 24px', lineHeight: 1.6 }}>
            Book a free strategy call and we'll show you exactly where your AI visibility stands.
          </p>
          <Link to="/#book-call" style={{
            display: 'inline-block', textDecoration: 'none',
            background: 'linear-gradient(135deg, #c8956c, #d4a87a)',
            color: '#1a0f00', fontFamily: "'DM Sans', sans-serif",
            fontSize: 15, fontWeight: 700, padding: '14px 32px', borderRadius: 10,
          }}>
            Book a Free Call →
          </Link>
        </div>

        {/* Prev / Next */}
        {(prev || next) && (
          <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: prev && next ? '1fr 1fr' : '1fr', gap: 16 }}>
            {prev && (
              <Link to={`/blog/${prev.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '20px 22px', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(200,149,108,0.3)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: '#6b6560', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>← Previous</div>
                  <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 16, color: '#f0ece4', lineHeight: 1.4 }}>{prev.title}</div>
                </div>
              </Link>
            )}
            {next && (
              <Link to={`/blog/${next.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '20px 22px', textAlign: 'right', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(200,149,108,0.3)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: '#6b6560', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Next →</div>
                  <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 16, color: '#f0ece4', lineHeight: 1.4 }}>{next.title}</div>
                </div>
              </Link>
            )}
          </div>
        )}
      </article>
    </div>
  );
}
