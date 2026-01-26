import FeatureCard from '../../components/cyphill/FeatureCard'
import SectionHeader from '../../components/cyphill/SectionHeader'

const services = [
  {
    title: 'Consultation requests',
    description:
      'Farmers submit questions and receive expert responses with clear documentation.',
  },
  {
    title: 'Live chat & video',
    description:
      'Schedule live sessions to resolve urgent farm and processing challenges.',
  },
  {
    title: 'Advisory knowledge base',
    description:
      'Reuse previous consultations to build a trusted advisory archive.',
  },
]

/**
 * Public overview of the consultancy module.
 */
const ConsultancyOverview = () => {
  return (
    <div className="flex flex-col gap-10">
      <SectionHeader
        title="Consultancy & support"
        subtitle="Direct access to agronomists and consultants, with workflows for paid and free advisory services."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {services.map((item) => (
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

export default ConsultancyOverview
