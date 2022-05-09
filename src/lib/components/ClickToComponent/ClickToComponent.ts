import ClickToComponent from '@useweb/click-to-component'

export default process.env.NODE_ENV === 'development' ? ClickToComponent : () => null
