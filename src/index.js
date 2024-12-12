module.exports = function(eruda) {
  const { Tool, util } = eruda
  const { evalCss } = util

  const ConfigManager = require('./ConfigManager')
  const DomRenderer = require('./DomRenderer')
  const EventHandler = require('./EventHandler')

  class Config extends Tool {
    constructor() {
      super()
      this.name = 'config'
      this._style = evalCss(require('./style.scss'))
      
      // 初始化各个模块
      this._configManager = new ConfigManager()
      this._domRenderer = new DomRenderer(this._configManager)
      this._eventHandler = new EventHandler(this._configManager, this._domRenderer)
    }

    init($el, container) {
      super.init($el, container)
      this._eruda = eruda
      this._container = container
      
      // 渲染初始视图
      this._domRenderer.renderTree($el)
      
      // 绑定事件处理
      this._eventHandler.bindEvents($el[0])
    }
  }

  return new Config()
}
