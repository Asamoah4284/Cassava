import FeatureCard from '../../components/cyphill/FeatureCard'
import SectionHeader from '../../components/cyphill/SectionHeader'

const marketplaces = [
  {
    title: 'Cassava produce marketplace',
    description:
      'Farmers list harvests, buyers source locally, and transactions stay traceable.',
  },
  {
    title: 'Input & tools marketplace',
    description:
      'Verified sellers provide fertilizers, tools, and pesticides with clear pricing.',
  },
]

/**
 * Public preview of the marketplace module.
 */
const MarketplacePreview = () => {
  return (
    <div className="flex flex-col gap-10">
      <SectionHeader
        title="Marketplace preview"
        subtitle="Two connected marketplaces help farmers sell cassava and purchase verified inputs with confidence."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {marketplaces.map((item) => (
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

export default MarketplacePreview
