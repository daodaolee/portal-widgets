export default function (e: KeyboardEvent) {
  return e.metaKey ? '_blank' : '_self'
}