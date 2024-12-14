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
      eruda.erudaConfig = this
    }

    init($el, container) {
      this._el = $el
      super.init($el, container)
      this._eruda = eruda
      this._container = container
      
      // 初始化各个模块
      this._configManager = new ConfigManager()
      this._domRenderer = new DomRenderer(this._configManager)
      this._eventHandler = new EventHandler(this._configManager, this._domRenderer)
      
      // 渲染初始视图
      this._domRenderer.renderTree($el)
      
      // 绑定事件处理
      this._eventHandler.bindEvents($el[0])
    }
    
    // 更新配置和字段说明
    registerSettings(configs) {
      this._configManager.registerSettings(configs)
      // 重新渲染视图
      this._domRenderer.renderTree(this._el)
      return this
    }
  }

  return new Config()
}
