import { internalIpV4Sync } from 'internal-ip'

export default function getIpAdress() {
  const ipAdress = internalIpV4Sync()
  return ipAdress
}
