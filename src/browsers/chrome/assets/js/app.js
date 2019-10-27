import $ from 'jquery'

$.get(window.chrome.extension.getURL(`/assets/js/front.js`)).then(code => {
  let $code = $(`<script type="text/javascript">${code}</script>`)
  $('head', document).append($code)
})
