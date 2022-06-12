import dynamic from 'next/dynamic'

const ClickToComponent = dynamic(() => import('@useweb/click-to-component'))

export default process.env.NODE_ENV === 'development' ? ClickToComponent : () => null
