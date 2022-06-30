import { gtagEvent } from '../../../../../lib/utils/integrations/google/googleAnalytics/gtag/gtag'

type GaOpenProjectProps = {
  type: 'App' | 'OSS' | 'Plugins'
  name: string
}

export default function ga_openProject({ type, name }: GaOpenProjectProps) {
  gtagEvent({
    category: 'Projects',
    action: 'Open Project',
    name,
    type,
  })
}
