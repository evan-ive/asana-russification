export default (enDictionary) => {
  window.translateHelper = function translateHelper (phrase, strict) {

    let length = typeof strict === 'number' && strict

    Object.keys(enDictionary).forEach(key => {
      recursiveSearch(enDictionary[key], key)
    })

    function recursiveSearch (item, code) {
      if (!item) return

      if (typeof item === 'object') {
        return Object.keys(item).forEach(key => {
          recursiveSearch(item[key], code)
        })
      }

      if (!item.match || !item.match(new RegExp(phrase, 'igm'))) return

      let check = strict
        ? length && item.length === length || item === phrase
        : true

      if (check) {
        console.log(code, item)
      }
    }
  }
}
