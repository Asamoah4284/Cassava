import { useEffect, useState } from 'react'
import FeatureCard from '../../components/cyphill/FeatureCard'
import SectionHeader from '../../components/cyphill/SectionHeader'
import { getResearch } from '../../api/client'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const staticHighlights = [
  {
    title: 'Research publishing',
    description:
      'Upload papers, tag by category, and make findings accessible to farmers and experts.',
  },
  {
    title: 'Approval workflows',
    description:
      'Moderation and review flows ensure research is verified and trusted.',
  },
  {
    title: 'Engagement analytics',
    description:
      'Track downloads, citations, and real-world adoption from the field.',
  },
]

const imageUrl = (path) => {
  if (!path) return null
  if (path.startsWith('http')) return path
  return `${API_BASE}${path.startsWith('/') ? '' : '/'}${path}`
}

/**
 * Overview page for the research & innovation hub.
 * Lists lecturer research posts from the API, then static highlights.
 */
const ResearchHighlights = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState(null)

  useEffect(() => {
    getResearch()
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="flex flex-col gap-10">
      <SectionHeader
        title="Research & innovation hub"
        subtitle="Bridge the gap between labs and farms with a structured research repository and engagement insights."
      />

      {loading ? (
        <p className="text-center text-slate-600">Loading research…</p>
      ) : posts.length > 0 ? (
        <section>
          <h2 className="mb-4 text-xl font-semibold text-slate-900">Research on cassava</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post._id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-green-200/70"
              >
                {post.image && (
                  <img
                    src={imageUrl(post.image)}
                    alt=""
                    className="mb-4 h-40 w-full rounded-lg border border-slate-200 object-cover"
                  />
                )}
                <h3 className="text-lg font-semibold text-slate-900">{post.title}</h3>
                {post.author && (
                  <p className="mt-1 text-sm text-slate-500">By {post.author}</p>
                )}
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {post.summary}
                </p>
                {post.document && (
                  <a
                    href={post.document.startsWith('http') ? post.document : `${API_BASE}${post.document.startsWith('/') ? '' : '/'}${post.document}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm font-medium text-green-600 hover:text-green-700"
                  >
                    Download research document
                  </a>
                )}
                {post.body && (
                  <>
                    <button
                      type="button"
                      onClick={() => setExpandedId(expandedId === post._id ? null : post._id)}
                      className="mt-3 text-sm font-medium text-green-600 hover:text-green-700"
                    >
                      {expandedId === post._id ? 'Show less' : 'Read more'}
                    </button>
                    {expandedId === post._id && (
                      <div className="mt-3 border-t border-slate-200 pt-3 text-sm leading-relaxed text-slate-600 whitespace-pre-wrap">
                        {post.body}
                      </div>
                    )}
                  </>
                )}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section>
        <h2 className="mb-4 text-xl font-semibold text-slate-900">Platform features</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {staticHighlights.map((item) => (
            <FeatureCard
              key={item.title}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default ResearchHighlights
