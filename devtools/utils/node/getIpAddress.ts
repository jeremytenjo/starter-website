import { internalIpV4Sync } from 'internal-ip'

export default function getIpAddress() {
  const ipAdress = internalIpV4Sync()
  return ipAdress
}
