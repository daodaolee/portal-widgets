import { pinyin } from 'pinyin-pro';
export default function (chinese: string) {
  let pinyinString = pinyin(chinese, { toneType: 'none' })
  if (pinyinString) {
    pinyinString = pinyinString.replace(/\s+/g, '');
  }
  return pinyinString
}
