import dynamic from 'next/dynamic'

const AuthUserSetter = dynamic(() => import('./AuthUserSetter'))

export default process.env.NODE_ENV === 'development' ? AuthUserSetter : () => null
