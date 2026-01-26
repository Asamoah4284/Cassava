import FeatureCard from '../../components/cyphill/FeatureCard'
import SectionHeader from '../../components/cyphill/SectionHeader'

const highlights = [
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

/**
 * Overview page for the research & innovation hub.
 */
const ResearchHighlights = () => {
  return (
    <div className="flex flex-col gap-10">
      <SectionHeader
        title="Research & innovation hub"
        subtitle="Bridge the gap between labs and farms with a structured research repository and engagement insights."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {highlights.map((item) => (
          <FeatureCard
            key={item.title}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  )
}

export default ResearchHighlights
