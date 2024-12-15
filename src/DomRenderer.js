const $ = require('./utils')

class DomRenderer {
  constructor(configManager) {
    this._configManager = configManager
  }

  // 渲染值
  renderValue(value) {
    const type = $.getType(value)
    let html
    switch(type) {
    case 'null':
      html = '<span class="value">null</span>'
      break
    case 'string':
      html = `<span class="value string">"${$.escape(value)}"</span>`
      break
    case 'number':
      html = `<span class="value number">${value}</span>`
      break
    case 'boolean':
      html = `<span class="value boolean">${value}</span>`
      break
    case 'array':
      html = '<span class="value array">[]</span>'
      break
    case 'object':
      html = '<span class="value object">{}</span>'
      break
    default:
      html = `<span class="value">${$.escape(String(value))}</span>`
    }
    return $.prefixHTML(html)
  }

  // 渲染单个项
  renderItem(key, value, path = '', isLast = true, routeMapConfig = []) {
    const currentPath = path ? `${path}.${key}` : key
    
    if (value === null) {
      return this._renderSimpleItem(key, value, currentPath, isLast)
    }
    
    if (Array.isArray(value)) {
      return this._renderArrayItem(key, value, currentPath, isLast)
    }
    
    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      return this._renderObjectItem(key, value, currentPath, isLast, routeMapConfig)
    }
    
    return this._renderSimpleItem(key, value, currentPath, isLast)
  }

  // 渲染简单类型项
  _renderSimpleItem(key, value, path, isLast) {
    const showDeleteBtn = path.split('.').length > 1
    const parentPath = path.split('.').slice(0, -1).join('.')
    const parentValue = this._configManager.getValue(parentPath)
    const isInArray = Array.isArray(parentValue)
    const deleteButtonClass = isInArray ? 'array-delete-btn' : 'object-delete-btn'
    const deleteButtonAttr = isInArray ? 'data-index' : 'data-key'
    
    // 判断值是否是引用类型
    const isReference = typeof value === 'object' && value !== null
    const itemClass = isReference ? 'item' : (isInArray ? 'array-item' : 'object-item')

    return $.prefixHTML(`
      <div class="${itemClass}">
        <span class="key">${$.escape(key)}</span>: ${this.renderValue(value)}${isLast ? '' : ','}
        <span class="goto-btn" data-path="${path}"></span>
        <span class="detail-btn ${this._configManager.hasFieldDetails(path) ? '' : 'no-desc'}" data-path="${path}"></span>
        ${showDeleteBtn ? `<span class="${deleteButtonClass}" data-path="${parentPath}" ${deleteButtonAttr}="${key}">×</span>` : ''}
      </div>
    `)
  }

  // 渲染数组类型项
  _renderArrayItem(key, value, path, isLast) {
    const items = value.map((v, i) => ({index: i, value: v}))
    const showDeleteBtn = path.split('.').length > 1
    const parentPath = path.split('.').slice(0, -1).join('.')
    const parentValue = this._configManager.getValue(parentPath)
    const isInArray = Array.isArray(parentValue)
    const deleteButtonClass = isInArray ? 'array-delete-btn' : 'object-delete-btn'
    const deleteButtonAttr = isInArray ? 'data-index' : 'data-key'
    
    return $.prefixHTML(`
      <div class="item">
        <span class="expand-btn">▾</span>
        <span class="key">${$.escape(key)}</span>: [
        ${showDeleteBtn ? `<span class="${deleteButtonClass}" data-path="${parentPath}" ${deleteButtonAttr}="${key}">×</span>` : ''}
        <div class="items">
          ${items.map(({index, value: v}, i) => {
    const itemPath = `${path}.${index}`
    const isObject = typeof v === 'object' && v !== null
    if (isObject) {
      return Array.isArray(v)
        ? this._renderArrayItem(index, v, itemPath, i === items.length - 1)
        : this._renderObjectItem(index, v, itemPath, i === items.length - 1)
    }
    return `
              <div class="array-item">
                <span class="key">${index}</span>: ${this.renderValue(v)}${i === items.length - 1 ? '' : ','}
                <span class="goto-btn" data-path="${itemPath}"></span>
                <span class="detail-btn ${this._configManager.hasFieldDetails(itemPath) ? '' : 'no-desc'}" data-path="${itemPath}"></span>
                <span class="array-delete-btn" data-path="${path}" data-index="${index}">×</span>
              </div>
            `
  }).join('')}
  </div>
  ]${isLast ? '' : ','}
  <span class="array-add-btn" data-path="${path}">+</span>
      </div>
    `)
  }

  // 渲染对象类型项
  _renderObjectItem(key, value, path, isLast, routeMapConfig=[]) {
    console.log('🚀 ~ DomRenderer ~ _renderObjectItem ~ routeMapConfig:', routeMapConfig)
    const items = Object.entries(value)
    // 对items进行排序
    if(routeMapConfig.length>0){
      const sortFields = routeMapConfig
      items.sort((a, b) => {
        const indexA = sortFields.indexOf(a[0]) 
        const indexB = sortFields.indexOf(b[0])
        
        // 如果两个元素都不在sortFields中，保持原顺序
        if (indexA === -1 && indexB === -1) return 1
        // 如果只有a不在sortFields中，a应该排在后面
        if (indexA === -1) return 1
        // 如果只有b不在sortFields中，b应该排在后面
        if (indexB === -1) return -1
        // 如果两个元素都在sortFields中，按照在sortFields中的顺序排序
        return indexA - indexB
      })
    }
    
    const showDeleteBtn = path.split('.').length > 1
    const parentPath = path.split('.').slice(0, -1).join('.')
    const parentValue = this._configManager.getValue(parentPath)
    const isInArray = Array.isArray(parentValue)
    const deleteButtonClass = isInArray ? 'array-delete-btn' : 'object-delete-btn'
    const deleteButtonAttr = isInArray ? 'data-index' : 'data-key'
    return $.prefixHTML(`
      <div class="${routeMapConfig.includes(key) ? 'item sort-field' : 'item'}">
        <span class="expand-btn">▾</span>
        <span class="key">${$.escape(key)}</span>: {
        ${showDeleteBtn ? `<span class="${deleteButtonClass}" data-path="${parentPath}" ${deleteButtonAttr}="${key}">×</span>` : ''}
        <div class="items">
          ${items.map(([k, v], index) => {
    const itemPath = `${path}.${k}`
    const isObject = typeof v === 'object' && v !== null
    if (isObject) {
      return Array.isArray(v)
        ? this._renderArrayItem(k, v, itemPath, index === items.length - 1)
        : this._renderObjectItem(k, v, itemPath, index === items.length - 1, routeMapConfig)
    }
    return `
              <div class="${routeMapConfig.includes(k) ? 'object-item sort-field' : 'object-item'}">
                <span class="key">${$.escape(k)}</span>: ${this.renderValue(v)}${index === items.length - 1 ? '' : ','}
                <span class="goto-btn" data-path="${itemPath}"></span>
                <span class="detail-btn ${this._configManager.hasFieldDetails(itemPath) ? '' : 'no-desc'}" data-path="${itemPath}"></span>
                <span class="object-delete-btn" data-path="${path}" data-key="${k}">×</span>
              </div>
            `
  }).join('')}
  </div>
  }${isLast ? '' : ','}
  <span class="object-add-btn" data-path="${path}">+</span>
      </div>
    `)
  }

  // 渲染整个配置树
  renderTree($el) {
    const configs = this._configManager._configs
    const hash = location.hash.slice(2)
    const itemsHtml = configs.map(config => {
      const key = config.id
      const configClass = `config-${key}`
      const routeMapConfig = hash ? (config.routeMapConfig[hash] || []) : []
      return $.prefixHTML(`
        <div class="config-group ${configClass}">
          <button class="toggle-btn" data-config-id="${key}">
            ${key}
          </button>
          <div class="config-content">
            ${this.renderItem(key, config.config,'',true, routeMapConfig)}
          </div>
        </div>
      `)
    }).join('')

    const html = $.prefixHTML('<div class="json-wrapper">')
      + $.prefixHTML('<div class="json-tree">')
      + itemsHtml
      + '</div></div>'
    $el.html(html)
  }

  // 创建模态框
  createModal(content) {
    const overlay = $.create('div', 'modal-overlay')
    const modal = $.create('div', 'detail-modal', content)
    overlay.appendChild(modal)
    return overlay
  }

  // 更新值的显示
  updateValueDisplay(item, value) {
    const valueSpan = $.one(item, '.value')
    if (valueSpan) {
      const type = $.getType(value)
      switch(type) {
      case 'null':
        valueSpan.textContent = 'null'
        valueSpan.className = $.prefix('value')
        break
      case 'string':
        valueSpan.textContent = `"${$.escape(value)}"`
        valueSpan.className = $.prefix('value string')
        break
      case 'number':
        valueSpan.textContent = value
        valueSpan.className = $.prefix('value number')
        break
      case 'boolean':
        valueSpan.textContent = value
        valueSpan.className = $.prefix('value boolean')
        break
      case 'array':
        valueSpan.textContent = `[${value.length} items]`
        valueSpan.className = $.prefix('value array')
        break
      case 'object':
        valueSpan.textContent = '{...}'
        valueSpan.className = $.prefix('value object')
        break
      default:
        valueSpan.textContent = String(value)
        valueSpan.className = $.prefix('value')
      }
    }
  }
}

module.exports = DomRenderer 