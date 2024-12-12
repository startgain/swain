const $ = require('./utils')

class EventHandler {
  constructor(configManager, domRenderer) {
    this._configManager = configManager
    this._domRenderer = domRenderer
  }

  // 绑定所有事件
  bindEvents(el) {
    el.addEventListener('click', this._handleClick.bind(this))
  }

  // 处理点击事件
  _handleClick(e) {
    const target = e.target
    const handlers = {
      'array-add-btn': () => this._handleArrayAdd(target),
      'array-delete-btn': () => this._handleArrayDelete(target),
      'object-add-btn': () => this._handleObjectAdd(target),
      'object-delete-btn': () => this._handleObjectDelete(target),
      'expand-btn': () => this._handleExpand(target),
      'detail-btn': () => this._handleDetail(target),
      'goto-btn': () => this._handleGoto(target)
    }

    for (const [className, handler] of Object.entries(handlers)) {
      const prefixedClass = $.prefix(className)
      if (target.classList.contains(prefixedClass)) {
        handler()
        e.stopPropagation()
        break
      }
    }
  }

  // 处理数组添加
  _handleArrayAdd(target) {
    const path = target.getAttribute('data-path')
    const modal = this._domRenderer.createModal(this._createTypeSelector())
    
    const typeSelector = $.one(modal, '.type-selector')
    typeSelector.addEventListener('click', (e) => {
      if (e.target.classList.contains($.prefix('type-btn'))) {
        const type = e.target.getAttribute('data-type')
        const newValue = this._getDefaultValueByType(type)
        const index = this._configManager.addArrayItem(path, newValue)
        
        if (index !== -1) {
          const parentItem = target.closest($.prefixSelector('.item'))
          const arrayItems = $.one(parentItem, '.items')
          // 使用DomRenderer的renderItem方法来渲染
          const newItemHtml = this._domRenderer.renderItem(index, newValue, path, true)
          arrayItems.insertAdjacentHTML('beforeend', newItemHtml)
        }
        
        modal.remove()
      }
    })

    this._bindModalClose(modal)
    target.closest($.prefixSelector('.config')).appendChild(modal)
  }

  // 处理数组删除
  _handleArrayDelete(target) {
    const path = target.getAttribute('data-path')
    const index = parseInt(target.getAttribute('data-index'))
    // 找到最近的任意类型的项容器（包括普通item、array-item和object-item）
    const itemContainer = target.closest($.prefixSelector('.item, .array-item, .object-item'))
    const parentNode = itemContainer && itemContainer.parentNode
    
    if (this._configManager.removeArrayItem(path, index)) {
      if (itemContainer) {
        itemContainer.remove()
      }
      
      // 更新后续项的索引
      if (parentNode) {
        const items = $.all(parentNode, $.prefixSelector('.array-item'))
        items.forEach((item, i) => {
          const deleteBtn = $.one(item, '.array-delete-btn')
          if (deleteBtn) {
            deleteBtn.setAttribute('data-index', i)
          }
          const keySpan = $.one(item, '.key')
          if (keySpan) {
            keySpan.textContent = i
          }
        })
      }
    }
  }

  // 处理对象添加
  _handleObjectAdd(target) {
    const path = target.getAttribute('data-path')
    const modal = this._domRenderer.createModal(this._createPropertyForm())
    
    const typeSelector = $.one(modal, '.type-selector')
    typeSelector.addEventListener('click', (e) => {
      if (e.target.classList.contains($.prefix('type-btn'))) {
        const type = e.target.getAttribute('data-type')
        const propertyName = $.one(modal, '.property-name').value.trim()
        
        if (!propertyName) {
          alert('请输入属性名')
          return
        }
        
        const newValue = this._getDefaultValueByType(type)
        if (this._configManager.addObjectProperty(path, propertyName, newValue)) {
          const parentItem = target.closest($.prefixSelector('.item'))
          const objectItems = $.one(parentItem, '.items')
          // 使用DomRenderer的renderItem方法来渲染
          const newItemHtml = this._domRenderer.renderItem(propertyName, newValue, path, true)
          objectItems.insertAdjacentHTML('beforeend', newItemHtml)
          modal.remove()
        } else {
          alert('属性名已存在')
        }
      }
    })

    this._bindModalClose(modal)
    target.closest($.prefixSelector('.config')).appendChild(modal)
  }

  // 处理对象删除
  _handleObjectDelete(target) {
    const path = target.getAttribute('data-path')
    const key = target.getAttribute('data-key')
    
    if (this._configManager.removeObjectProperty(path, key)) {
      // 找到最近的任意类型的项容器（包括普通item、array-item和object-item）
      const itemContainer = target.closest($.prefixSelector('.item, .array-item, .object-item'))
      if (itemContainer) {
        itemContainer.remove()
      }
    }
  }

  // 处理展开/折叠
  _handleExpand(target) {
    const item = target.closest($.prefixSelector('.item'))
    if (item.classList.contains($.prefix('collapsed'))) {
      item.classList.remove($.prefix('collapsed'))
      target.textContent = '▾'
    } else {
      item.classList.add($.prefix('collapsed'))
      target.textContent = '▸'
    }
  }

  // 处理详情按钮
  _handleDetail(target) {
    if (target.classList.contains($.prefix('no-desc'))) {
      return
    }

    const path = target.getAttribute('data-path')
    const fieldInfo = this._configManager.getFieldDetails(path)
    const modal = this._domRenderer.createModal(this._createDetailView(path, fieldInfo))
    
    this._bindModalClose(modal)
    target.closest($.prefixSelector('.config')).appendChild(modal)
  }

  // 处理编辑按钮
  _handleGoto(target) {
    const path = target.getAttribute('data-path')
    const value = this._configManager.getValue(path)
    const modal = this._domRenderer.createModal(this._createEditView(path, value))
    
    this._setupEditHandlers(modal, target, path, value)
    this._bindModalClose(modal)
    target.closest($.prefixSelector('.config')).appendChild(modal)
  }

  // 创建类型选择器
  _createTypeSelector() {
    return $.prefixHTML(`
      <div class="close-btn">×</div>
      <div class="field-name">选择要添加的数据类型</div>
      <div class="type-selector">
        <button class="type-btn" data-type="string">字符串</button>
        <button class="type-btn" data-type="number">数字</button>
        <button class="type-btn" data-type="boolean">布尔值</button>
        <button class="type-btn" data-type="array">数组</button>
        <button class="type-btn" data-type="object">对象</button>
      </div>
    `)
  }

  // 创建属性表单
  _createPropertyForm() {
    return $.prefixHTML(`
      <div class="close-btn">×</div>
      <div class="field-name">添加新属性</div>
      <div class="property-form">
        <div class="form-group">
          <label>属性名：</label>
          <input type="text" class="property-name" placeholder="输入属性名">
        </div>
        <div class="form-group">
          <label>值类型：</label>
          <div class="type-selector">
            <button class="type-btn" data-type="string">字符串</button>
            <button class="type-btn" data-type="number">数字</button>
            <button class="type-btn" data-type="boolean">布尔值</button>
            <button class="type-btn" data-type="array">数组</button>
            <button class="type-btn" data-type="object">对象</button>
          </div>
        </div>
      </div>
    `)
  }

  // 创建详情视图
  _createDetailView(path, fieldInfo) {
    return $.prefixHTML(`
      <div class="close-btn">×</div>
      <div class="field-name">${fieldInfo.name}</div>
      <div class="field-path">${path}</div>
      <div class="field-desc">${fieldInfo.desc}</div>
    `)
  }

  // 创建编辑视图
  _createEditView(path, value) {
    const type = typeof value
    const inputHtml = type === 'boolean' 
      ? this._createBooleanInput(value)
      : Array.isArray(value)
        ? this._createArrayEditor(value)
        : this._createSimpleInput(value)

    return $.prefixHTML(`
      <div class="close-btn">×</div>
      <div class="field-name">编辑 ${path}</div>
      <div style="margin: 10px 0;">
        ${inputHtml}
      </div>
      <div style="text-align: right;">
        <button class="save-btn">保存</button>
      </div>
    `)
  }

  // 创建布尔值输入
  _createBooleanInput(value) {
    return $.prefixHTML(`
      <div class="switch-container">
        <label class="switch-wrapper">
          <input type="checkbox" class="toggle-input" ${value ? 'checked' : ''}>
          <span class="switch-slider"></span>
        </label>
        <span class="current-value">${value ? 'true' : 'false'}</span>
      </div>
    `)
  }

  // 创建数组编辑器
  _createArrayEditor(value) {
    return $.prefixHTML(`
      <div class="array-editor">
        <div class="array-items">
          ${value.map((item, index) => `
            <div class="array-item">
              <input type="text" class="array-input" value="${item}" data-index="${index}">
              <button class="remove-item" data-index="${index}">×</button>
            </div>
          `).join('')}
        </div>
        <button class="add-item">+ 添加项</button>
      </div>
    `)
  }

  // 创建简单输入
  _createSimpleInput(value) {
    return $.prefixHTML(`
      <input type="text" class="edit-input" value="${value}" style="width: 100%; padding: 5px;">
    `)
  }

  // 设置编辑处理器
  _setupEditHandlers(modal, target, path, value) {
    const type = typeof value
    const input = type === 'boolean'
      ? $.one(modal, '.toggle-input')
      : Array.isArray(value)
        ? null
        : $.one(modal, '.edit-input')

    if (type === 'boolean' && input) {
      const valueDisplay = $.one(modal, '.current-value')
      input.addEventListener('change', () => {
        valueDisplay.textContent = input.checked ? 'true' : 'false'
      })
    }

    if (Array.isArray(value)) {
      this._setupArrayEditorHandlers(modal)
    }

    const saveBtn = $.one(modal, '.save-btn')
    saveBtn.addEventListener('click', () => {
      let newValue
      if (type === 'boolean') {
        newValue = input.checked
      } else if (Array.isArray(value)) {
        const inputs = $.all(modal, '.array-input')
        newValue = Array.from(inputs).map(input => input.value)
      } else {
        newValue = input.value
      }

      const parsedValue = this._configManager.setValue(path, newValue)
      const itemContainer = target.closest($.prefixSelector('.item, .array-item, .object-item, .item'))
      if (itemContainer) {
        this._domRenderer.updateValueDisplay(itemContainer, parsedValue)
      }
      modal.remove()
    })
  }

  // 设置数组编辑器处理器
  _setupArrayEditorHandlers(modal) {
    const arrayEditor = $.one(modal, '.array-editor')
    const addItemBtn = $.one(arrayEditor, '.add-item')
    
    addItemBtn.addEventListener('click', () => {
      const arrayItems = $.one(arrayEditor, '.array-items')
      const newIndex = $.all(arrayEditor, '.array-item').length
      const newItem = $.create('div', 'array-item')
      newItem.innerHTML = $.prefixHTML(`
        <input type="text" class="array-input" value="" data-index="${newIndex}">
        <button class="remove-item" data-index="${newIndex}">×</button>
      `)
      arrayItems.appendChild(newItem)
    })

    arrayEditor.addEventListener('click', (e) => {
      if (e.target.classList.contains($.prefix('remove-item'))) {
        const item = e.target.closest($.prefixSelector('.array-item'))
        item.remove()
        this._updateArrayIndices(arrayEditor)
      }
    })
  }

  // 更新数组索引
  _updateArrayIndices(arrayEditor) {
    const items = $.all(arrayEditor, '.array-item')
    items.forEach((item, index) => {
      const input = $.one(item, '.array-input')
      const removeBtn = $.one(item, '.remove-item')
      input.dataset.index = index
      removeBtn.dataset.index = index
    })
  }

  // 绑定模态框关闭
  _bindModalClose(modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains($.prefix('close-btn'))) {
        modal.remove()
      }
    })
  }

  // 根据类型获取默认值
  _getDefaultValueByType(type) {
    switch(type) {
    case 'string': return ''
    case 'number': return 0
    case 'boolean': return false
    case 'array': return []
    case 'object': return {}
    default: return null
    }
  }
}

module.exports = EventHandler 