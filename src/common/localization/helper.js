export default (enDictionary) => {

  window.translateHelper = function (phrase, strict) {

    let length = typeof strict === 'number' && strict

    Object.keys(enDictionary).forEach(key => {
      recursiveSearch(enDictionary[key], key)
    })

    function recursiveSearch (item, code) {

      if (typeof item === 'object') {

        return Object.keys(item).forEach(key => {
          recursiveSearch(item[key], code)
        })

      }

      if (!item.match || !item.match(phrase)) {
        return
      }

      let check

      if (strict) {
        check = length && item.length === length || item === phrase
      } else {
        check = true
      }

      if (check) {
        console.log(code, item)
      }

    }

  }

}