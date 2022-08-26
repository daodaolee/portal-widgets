import { systemInfo } from '@/utils/tools'

export default function (e: KeyboardEvent) {
  const info = systemInfo()
  if (info === 'win') {
    return e.ctrlKey ? '_blank' : '_self'
  } else if (info === 'mac') {
    return e.metaKey ? '_blank' : '_self'
  }
}
