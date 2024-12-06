;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory)
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory()
  } else {
    root.erudaSwain = factory()
  }
})(this, function () {
  return function (eruda) {
    var Tool = eruda.Tool,
      util = eruda.util

    var Swain = Tool.extend({
      name: 'swain',
      init: function ($el) {
        this.callSuper(Tool, 'init', arguments)
        this._style = util.evalCss(
          [
            '.eruda-dev-tools .eruda-tools .eruda-swain {padding: 10px;}',
            '.eruda-tip {padding: 10px; background: #fff; color: #263238;}',
          ].join('.eruda-dev-tools .eruda-tools .eruda-swain ')
        )
        $el.html('<div class="eruda-tip">Put whatever you want here:)</div>')
      },
      show: function () {
        this.callSuper(Tool, 'show', arguments)
      },
      hide: function () {
        this.callSuper(Tool, 'hide', arguments)
      },
      destroy: function () {
        this.callSuper(Tool, 'destroy', arguments)
        util.evalCss.remove(this._style)
      },
    })

    return new Swain()
  }
})
