const $ = require('./utils')

class ConfigManager {
  constructor() {
    this.registerSettings()
  }

  registerSettings(config = {}, fieldDetails = {}) {
    this._config = config
    this._fieldDetails = fieldDetails
  }

  // 获取配置值
  getValue(path) {
    return $.getValueByPath(this._config, path)
  }

  // 设置配置值
  setValue(path, value) {
    const originalValue = this.getValue(path)
    const originalType = $.getType(originalValue)
    const convertedValue = $.convertValue(value, originalType)
    $.setValueByPath(this._config, path, convertedValue)
    return convertedValue
  }

  // 添加数组项
  addArrayItem(path, value) {
    const array = this.getValue(path)
    if (Array.isArray(array)) {
      array.push(value)
      return array.length - 1
    }
    return -1
  }

  // 删除数组项
  removeArrayItem(path, index) {
    const array = this.getValue(path)
    if (Array.isArray(array) && index >= 0 && index < array.length) {
      array.splice(index, 1)
      return true
    }
    return false
  }

  // 添加对象属性
  addObjectProperty(path, key, value) {
    const obj = this.getValue(path)
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
    const obj = this.getValue(path)
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
    return this._fieldDetails[path]
  }

  // 判断字段是否有描述
  hasFieldDetails(path) {
    return Object.hasOwn(this._fieldDetails, path)
  }
}

module.exports = ConfigManager 