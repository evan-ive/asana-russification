import { codes } from './dictionaries/codes'
import { phrases } from './dictionaries/phrases'
import { addHelper } from './helper'

export function init () {
  /**
   * Оставляем флаг локализации
   * (для AsanaPlugin'а)
   */
  sessionStorage['ap_localization'] = 1

  const translated = rewriteDictionary()
  if (translated) return

  const listener = () => {
    if (!rewriteDictionary()) return
    document.removeEventListener('DOMNodeInserted', listener)
  }

  document.addEventListener('DOMNodeInserted', listener)
}

function rewriteDictionary () {
  // @ts-ignore
  const dictionaries = window['_asana_voiceboxes']
  if (!dictionaries) return false

  const { en: enDictionary } = dictionaries
  if (!enDictionary) return false

  Object.keys(enDictionary).forEach(key => {
    const item = enDictionary[key]
    if (codes[key]) return item[1] = codes[key]

    recursiveSearch(item, 1)
  })

  /**
   * Добавляем хэлпер для поиска фраз
   */
  addHelper(enDictionary)

  return !!enDictionary
}

function recursiveSearch (item: any, key: string | number) {
  const currentItem = item[key]

  if (typeof currentItem === 'object') {

    Object.keys(currentItem).forEach(key => {
      recursiveSearch(currentItem, key)
    })

  } else if (phrases[currentItem]) {
    item[key] = phrases[currentItem]
  }

  return item
}
