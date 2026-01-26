import FeatureCard from '../../components/cyphill/FeatureCard'
import SectionHeader from '../../components/cyphill/SectionHeader'

const channels = [
  {
    title: 'Support desk',
    description:
      'Get help with onboarding, content submissions, or account questions.',
  },
  {
    title: 'Partnerships',
    description:
      'Discuss NGO, government, and enterprise collaborations for cassava growth.',
  },
  {
    title: 'Research contributions',
    description:
      'Share datasets, findings, and innovation briefs with the ecosystem.',
  },
]

/**
 * Contact and support entry point.
 */
const ContactSupport = () => {
  return (
    <div className="flex flex-col gap-10">
      <SectionHeader
        title="Contact & support"
        subtitle="Reach the Cassava Digital team for onboarding, partnerships, and support."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {channels.map((item) => (
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

export default ContactSupport
