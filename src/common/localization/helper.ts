export function addHelper (enDictionary: Record<string, any>) {
  // @ts-ignore
  window['translateHelper'] = (phrase: string, strict = false) => {
    const length = typeof strict === 'number' && strict

    Object.keys(enDictionary).forEach(key => {
      recursiveSearch(enDictionary[key], key)
    })

    function recursiveSearch (item: any, code: string) {
      if (!item) return

      if (typeof item === 'object') {
        return Object.keys(item).forEach(key => {
          recursiveSearch(item[key], code)
        })
      }

      if (!item.match || !item.match(new RegExp(phrase, 'igm'))) return

      const check = strict
        ? length && item.length === length || item === phrase
        : true

      if (check) console.log(code, item)
    }
  }
}
