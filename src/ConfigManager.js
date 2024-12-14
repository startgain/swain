const $ = require('./utils')

class ConfigManager {
  constructor() {
    this._configs = []
    this.registerSettings()
  }

  registerSettings(configs = [[{}, {}, '']]) {
    this._configs = configs.map(([config, fieldDetails, rootName], index) => ({
      id: rootName || `config_${index}`,
      config,
      fieldDetails
    }))
  }

  getConfigById(id) {
    return this._configs.find(cfg => cfg.id === id)
  }

  // 获取配置值
  getValue(path) {
    const [id, ...restPath] = path.split('.')
    const config = this.getConfigById(id)
    return config ? $.getValueByPath(config.config, restPath.join('.')) : undefined
  }

  // 设置配置值
  setValue(path, value) {
    const [id, ...restPath] = path.split('.')
    const config = this.getConfigById(id)
    if (!config) return

    const originalValue = $.getValueByPath(config.config, restPath.join('.'))
    const originalType = $.getType(originalValue)
    const convertedValue = $.convertValue(value, originalType)
    $.setValueByPath(config.config, restPath.join('.'), convertedValue)
    return convertedValue
  }

  // 添加数组项
  addArrayItem(path, value) {
    const [id, ...restPath] = path.split('.')
    const config = this.getConfigById(id)
    if (!config) return

    const array = $.getValueByPath(config.config, restPath.join('.'))
    if (Array.isArray(array)) {
      array.push(value)
      return array.length - 1
    }
    return -1
  }

  // 删除数组项
  removeArrayItem(path, index) {
    const [id, ...restPath] = path.split('.')
    const config = this.getConfigById(id)
    if (!config) return false

    const array = $.getValueByPath(config.config, restPath.join('.'))
    if (Array.isArray(array) && index >= 0 && index < array.length) {
      array.splice(index, 1)
      return true
    }
    return false
  }

  // 添加对象属性
  addObjectProperty(path, key, value) {
    const [id, ...restPath] = path.split('.')
    const config = this.getConfigById(id)
    if (!config) return false

    const obj = $.getValueByPath(config.config, restPath.join('.'))
    if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
      if (Object.hasOwn(obj, key)) {
        return false
      }
      obj[key] = value
      return true
    }
    return false
  }

  // 删除对象属性
  removeObjectProperty(path, key) {
    const [id, ...restPath] = path.split('.')
    const config = this.getConfigById(id)
    if (!config) return false

    const obj = $.getValueByPath(config.config, restPath.join('.'))
    if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
      if (Object.hasOwn(obj, key)) {
        delete obj[key]
        return true
      }
    }
    return false
  }

  // 获取字段描述
  getFieldDetails(path) {
    const [id, ...restPath] = path.split('.')
    const config = this.getConfigById(id)
    return config ? config.fieldDetails[restPath.join('.')] : undefined
  }

  // 判断字段是否有描述
  hasFieldDetails(path) {
    const [id, ...restPath] = path.split('.')
    const config = this.getConfigById(id)
    return config ? Object.hasOwn(config.fieldDetails, restPath.join('.')) : false
  }
}

module.exports = ConfigManager 