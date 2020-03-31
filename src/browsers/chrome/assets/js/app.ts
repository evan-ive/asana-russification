import $ from 'jquery'

// @ts-ignore
const baseURL: string = window.chrome.extension.getURL('/').slice(0, -1)
const files: string[] = ['vendors', 'front']

;(() => {
  $(document).on('DOMNodeInserted', e => {
    if ($('head', document)[0]) {
      $(document).off(e)
      files.map(file => $('head', document).append(`<script src="${baseURL}/assets/js/${file}.js"></script>`))
    }
  })
})()
