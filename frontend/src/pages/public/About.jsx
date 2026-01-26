import FeatureCard from '../../components/cyphill/FeatureCard'
import SectionHeader from '../../components/cyphill/SectionHeader'

const principles = [
  {
    title: 'Modular by design',
    description:
      'Each feature works independently while integrating seamlessly into the platform.',
  },
  {
    title: 'Role-based experiences',
    description:
      'Users only see the tools and data that matter for their work in the cassava value chain.',
  },
  {
    title: 'Content-driven impact',
    description:
      'Knowledge is the foundation, supported by verified research and advisory services.',
  },
  {
    title: 'Data-centric growth',
    description:
      'Farm, market, and research data become assets for insights and future AI.',
  },
]

/**
 * Overview of the platform vision and design philosophy.
 */
const About = () => {
  return (
    <div className="flex flex-col gap-12 pb-20 bg-white rounded-[48px] p-8 lg:p-16 shadow-sm">
      <SectionHeader
        title="A digital infrastructure for cassava"
        subtitle="Cassava Digital is built to solve fragmented knowledge, limited expert access, and disconnected markets by unifying everything into a trusted ecosystem."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {principles.map((item) => (
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

export default About
