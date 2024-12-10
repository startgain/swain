module.exports = function (eruda) {
  let { Tool, util } = eruda
  let { evalCss } = util
  
  // 导入工具函数
  const { prefix, prefixHTML, prefixSelector, $ } = require('./utils')

  class Config extends Tool {
    constructor(...args) {
      super(...args)
      this.name = 'config'
      this._style = evalCss(require('./style.scss'))
      this._fieldDetails = window.CONFIG_DETAILS || {}
    }

    _renderItem(key, value, path = '', isLast = true) {
      const currentPath = path ? `${path}.${key}` : key
      
      if (value === null) {
        return prefixHTML(`
          <div class="item">
            <span class="key">${key}</span>: ${this._renderValue(value)}${isLast ? '' : ','}
            <span class="goto-btn" data-path="${currentPath}"></span>
            <span class="detail-btn ${this._fieldDetails[currentPath] ? '' : 'no-desc'}" data-path="${currentPath}"></span>
          </div>
        `)
      }
      
      if (Array.isArray(value)) {
        const items = value.map((v, i) => ({index: i, value: v}))
        return prefixHTML(`
          <div class="item">
            <span class="expand-btn">▾</span>
            <span class="key">${key}</span>: [
            <div class="items">
              ${items.map(({index, value: v}, i) => `
                <div class="array-item">
                  ${this._renderItem(index, v, currentPath, i === items.length - 1)}
                  <button class="array-delete-btn" data-path="${currentPath}" data-index="${index}" title="删除此项">×</button>
                </div>
              `).join('')}
            </div>
            ]${isLast ? '' : ','} <button class="array-add-btn" data-path="${currentPath}" title="添加项">+</button>
          </div>
        `)
      }

      if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
        const items = Object.entries(value)
        return prefixHTML(`
          <div class="item">
            <span class="expand-btn">▾</span>
            <span class="key">${key}</span>: {
            <div class="items">
              ${items.map(([k, v], index) => `
                <div class="object-item">
                  ${this._renderItem(k, v, currentPath, index === items.length - 1)}
                  <button class="object-delete-btn" data-path="${currentPath}" data-key="${k}" title="删除此项">×</button>
                </div>
              `).join('')}
            </div>
            }${isLast ? '' : ','} <button class="object-add-btn" data-path="${currentPath}" title="添加属性">+</button>
          </div>
        `)
      }
      
      return prefixHTML(`
        <div class="item">
          <span class="key">${key}</span>: ${this._renderValue(value)}${isLast ? '' : ','}
          <span class="goto-btn" data-path="${currentPath}"></span>
          <span class="detail-btn ${this._fieldDetails[currentPath] ? '' : 'no-desc'}" data-path="${currentPath}"></span>
        </div>
      `)
    }

    _renderValue(value) {
      if (value === null) {
        return '<span class="value">null</span>'
      }
      if (typeof value === 'string') {
        return `<span class="value string">"${value}"</span>`
      }
      if (typeof value === 'number') {
        return `<span class="value number">${value}</span>`
      }
      if (typeof value === 'boolean') {
        return `<span class="value boolean">${value}</span>`
      }
      if (Array.isArray(value)) {
        return `<span class="value array">[${value.length} items]</span>`
      }
      return `<span class="value">${value}</span>`
    }

    init($el, container) {
      super.init($el, container)
      this._eruda = eruda
      this._container = container
      this._renderJson($el)
      this._bindEvent($el[0])
    }

    _renderJson($el) {
      // 保存当前滚动位置
      const scrollTop = $el[0].scrollTop

      const config = window.LOCAL_CONFIG || {}
      
      let html = prefixHTML('<div class="json-wrapper">')
      html += prefixHTML('<div class="json-tree">')
      html += this._renderItem('LOCAL_CONFIG', config)
      html += '</div>'
      html += '</div>'
      $el.html(html)
      
      // 恢复滚动位置
      $el[0].scrollTop = scrollTop
    }

    _bindEvent(el) {
      el.addEventListener('click', (e) => {
        const target = e.target

        // 处理数组添加按钮
        if (target.classList.contains(prefix('array-add-btn'))) {
          const path = target.getAttribute('data-path')
          const pathParts = path.split('.')
          let currentObj = window
          
          // 获取数组对象
          for (const part of pathParts) {
            if (currentObj && typeof currentObj === 'object') {
              currentObj = currentObj[part]
            }
          }

          // 添加新项
          if (Array.isArray(currentObj)) {
            // 创建类型选择弹窗
            const existingModal = $.one(el, '.modal-overlay')
            if (existingModal) {
              existingModal.remove()
            }

            const overlay = document.createElement('div')
            overlay.className = prefix('modal-overlay')
            
            const modal = document.createElement('div')
            modal.className = prefix('detail-modal')
            modal.innerHTML = prefixHTML(`
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
            
            overlay.appendChild(modal)
            
            // 绑定类型选择事件
            const typeSelector = $.one(modal, '.type-selector')
            typeSelector.addEventListener('click', (e) => {
              if (e.target.classList.contains(prefix('type-btn'))) {
                const type = e.target.getAttribute('data-type')
                let newItem
                
                switch(type) {
                case 'string':
                  newItem = ''
                  break
                case 'number':
                  newItem = 0
                  break
                case 'boolean':
                  newItem = false
                  break
                case 'array':
                  newItem = []
                  break
                case 'object':
                  newItem = {}
                  break
                }
                
                currentObj.push(newItem)
                const parentItem = target.closest(prefixSelector('.item'))
                const arrayItems = $.one(parentItem, '.items')
                const newItemHtml = prefixHTML(`
                  <div class="array-item">
                    ${this._renderItem(currentObj.length - 1, newItem, path, true)}
                    <button class="array-delete-btn" data-path="${path}" data-index="${currentObj.length - 1}" title="删除此项">×</button>
                  </div>
                `)
                arrayItems.insertAdjacentHTML('beforeend', newItemHtml)
                overlay.remove()
              }
            })
            
            overlay.addEventListener('click', (e) => {
              if (e.target === overlay || e.target.classList.contains(prefix('close-btn'))) {
                overlay.remove()
              }
            })
            
            el.appendChild(overlay)
          }
          e.stopPropagation()
        }

        // 处理数组删除按钮
        if (target.classList.contains(prefix('array-delete-btn'))) {
          const path = target.getAttribute('data-path')
          const index = parseInt(target.getAttribute('data-index'))
          const pathParts = path.split('.')
          let currentObj = window
          
          // 获取数组对象
          for (const part of pathParts) {
            if (currentObj && typeof currentObj === 'object') {
              currentObj = currentObj[part]
            }
          }

          // 删除项
          if (Array.isArray(currentObj) && index >= 0 && index < currentObj.length) {
            currentObj.splice(index, 1)
            // 删除DOM元素
            const arrayItem = target.closest(prefixSelector('.array-item'))
            arrayItem.remove()
            // 更新后续项的索引
            const items = $.all(el, `[data-path="${path}"].array-delete-btn`)
            items.forEach((item, i) => {
              item.setAttribute('data-index', i)
            })
          }
          e.stopPropagation()
        }

        // 处理展开/折叠按钮
        if (target.classList.contains(prefix('expand-btn'))) {
          const item = target.closest(prefixSelector('.item'))
          if (item.classList.contains(prefix('collapsed'))) {
            item.classList.remove(prefix('collapsed'))
            target.textContent = '▾'
          } else {
            item.classList.add(prefix('collapsed'))
            target.textContent = '▸'
          }
          e.stopPropagation()
        }
        
        if (target.classList.contains(prefix('detail-btn'))) {
          // 如果按钮no-desc类，直接返回
          if (target.classList.contains(prefix('no-desc'))) {
            return
          }

          const path = target.getAttribute('data-path')
          const fieldInfo = this._fieldDetails[path]
          const existingModal = $.one(el, '.modal-overlay')
          if (existingModal) {
            existingModal.remove()
          }
          
          const overlay = document.createElement('div')
          overlay.className = prefix('modal-overlay')
          
          const modal = document.createElement('div')
          modal.className = prefix('detail-modal')
          
          modal.innerHTML = prefixHTML(`
            <div class="close-btn">×</div>
            <div class="field-name">${fieldInfo.name}</div>
            <div class="field-path">${path}</div>
            <div class="field-desc">${fieldInfo.desc}</div>
          `)
          
          overlay.appendChild(modal)
          
          overlay.addEventListener('click', (e) => {
            if (e.target === overlay || e.target.classList.contains(prefix('close-btn'))) {
              overlay.remove()
            }
          })
          
          el.appendChild(overlay)
          e.stopPropagation()
        }

        if (target.classList.contains(prefix('goto-btn'))) {
          const path = target.getAttribute('data-path')
          const pathParts = path.split('.')
          let currentObj = window
          
          // 路径获取前值
          for (const part of pathParts) {
            if (currentObj && typeof currentObj === 'object') {
              currentObj = currentObj[part]
            } else {
              currentObj = undefined
              break
            }
          }

          // 判断值的类型
          const type = typeof currentObj

          // 创建编辑窗
          const existingModal = $.one(el, '.modal-overlay')
          if (existingModal) {
            existingModal.remove()
          }

          const overlay = document.createElement('div')
          overlay.className = prefix('modal-overlay')

          const modal = document.createElement('div')
          modal.className = prefix('detail-modal')
          
          // 根据类型使用不同的输入控件
          const inputHtml = type === 'boolean' 
            ? `<div class="${prefix('switch-container')}">
                <label class="${prefix('switch-wrapper')}">
                  <input type="checkbox" class="${prefix('toggle-input')}" ${currentObj ? 'checked' : ''}>
                  <span class="${prefix('switch-slider')}"></span>
                </label>
                <span class="${prefix('current-value')}">${currentObj ? 'true' : 'false'}</span>
               </div>`
            : Array.isArray(currentObj)
              ? `<div class="${prefix('array-editor')}">
                <div class="${prefix('array-items')}">
                  ${currentObj.map((item, index) => `
                    <div class="${prefix('array-item')}">
                      <input type="text" class="${prefix('array-input')}" value="${item}" data-index="${index}">
                      <button class="${prefix('remove-item')}" data-index="${index}">×</button>
                    </div>
                  `).join('')}
                </div>
                <button class="${prefix('add-item')}">+ 添加项</button>
              </div>`
              : `<input type="text" class="${prefix('edit-input')}" value="${currentObj}" style="width: 100%; padding: 5px;">`

          modal.innerHTML = prefixHTML(`
            <div class="close-btn">×</div>
            <div class="field-name">编辑 ${path}</div>
            <div style="margin: 10px 0;">
              ${inputHtml}
            </div>
            <div style="text-align: right;">
              <button class="save-btn" style="padding: 5px 10px; background: #2196f3; color: white; border: none; border-radius: 4px; cursor: pointer;">保存</button>
            </div>
          `)

          overlay.appendChild(modal)

          // 绑定保存按钮事件
          const saveBtn = $.one(modal, '.save-btn')
          
          // 根据类型获取不同的输入控件
          const input = type === 'boolean'
            ? $.one(modal, '.toggle-input')
            : Array.isArray(currentObj)
              ? null // 数组类型不需要单个input
              : $.one(modal, '.edit-input')
          
          // 只在非布尔类型和非数组型时设置focus
          if (type !== 'boolean' && !Array.isArray(currentObj) && input) {
            input.focus()
          }

          // 如果是布尔类型，添加切换事件来更新显示的值
          if (type === 'boolean' && input) {
            const valueDisplay = $.one(modal, '.current-value')
            input.addEventListener('change', () => {
              valueDisplay.textContent = input.checked ? 'true' : 'false'
            })
          }

          // 如果是数组类型，添加数组相关的事件处理
          if (Array.isArray(currentObj)) {
            const arrayEditor = $.one(modal, '.array-editor')
            const addItemBtn = $.one(arrayEditor, '.add-item')
            
            // 添加新项
            addItemBtn.addEventListener('click', () => {
              const arrayItems = $.one(arrayEditor, '.array-items')
              const newIndex = $.all(arrayEditor, '.array-item').length
              const newItem = document.createElement('div')
              newItem.className = prefix('array-item')
              newItem.innerHTML = prefixHTML(`
                <input type="text" class="array-input" value="" data-index="${newIndex}">
                <button class="remove-item" data-index="${newIndex}">×</button>
              `)
              arrayItems.appendChild(newItem)
            })

            // 删除项
            arrayEditor.addEventListener('click', (e) => {
              if (e.target.classList.contains(prefix('remove-item'))) {
                const item = e.target.closest(prefixSelector('.array-item'))
                item.remove()
                // 更新剩余项的索引
                const items = $.all(arrayEditor, '.array-item')
                items.forEach((item, index) => {
                  const input = $.one(item, '.array-input')
                  const removeBtn = $.one(item, '.remove-item')
                  input.dataset.index = index
                  removeBtn.dataset.index = index
                })
              }
            })
          }
          
          saveBtn.addEventListener('click', () => {
            let newValue
            if (type === 'boolean') {
              newValue = $.one(modal, '.toggle-input').checked
            } else if (Array.isArray(currentObj)) {
              // 获取所有数组输入项的值
              const inputs = $.all(modal, '.array-input')
              newValue = Array.from(inputs).map(input => input.value)
            } else {
              newValue = $.one(modal, '.edit-input').value
            }

            let obj = window
            
            // 遍历路径直到倒第二个部分
            for (let i = 0; i < pathParts.length - 1; i++) {
              obj = obj[pathParts[i]]
            }
            
            // 设置新值
            const lastPart = pathParts[pathParts.length - 1]
            try {
              // 获取原始值的类型
              const originalValue = obj[lastPart]
              const originalType = typeof originalValue
              
              // 根据原始类型转换新值
              let parsedValue
              if (Array.isArray(originalValue)) {
                parsedValue = newValue // 数组类型直接使用新值
              } else {
                switch(originalType) {
                case 'boolean':
                  parsedValue = newValue
                  break
                case 'number':
                  parsedValue = Number(newValue)
                  if (isNaN(parsedValue)) {
                    parsedValue = originalValue
                  }
                  break
                case 'string':
                  parsedValue = String(newValue)
                  break
                default:
                  parsedValue = newValue
                }
              }
              
              obj[lastPart] = parsedValue
              
              // 更新DOM显示
              const item = target.closest(prefixSelector('.item'))
              const valueSpan = $.one(item, '.value')
              if (valueSpan) {
                if (typeof parsedValue === 'string') {
                  valueSpan.textContent = `"${parsedValue}"`
                } else if (Array.isArray(parsedValue)) {
                  valueSpan.textContent = `[${parsedValue.length} items]`
                } else {
                  valueSpan.textContent = parsedValue
                }
              }
              
              overlay.remove()
            } catch (err) {
              console.error('Failed to update value:', err)
            }
          })

          // 绑定关闭按钮事件
          overlay.addEventListener('click', (e) => {
            if (e.target === overlay || e.target.classList.contains(prefix('close-btn'))) {
              overlay.remove()
            }
          })

          el.appendChild(overlay)
          e.stopPropagation()
        }

        // 处理对象添加按钮
        if (target.classList.contains(prefix('object-add-btn'))) {
          const path = target.getAttribute('data-path')
          const pathParts = path.split('.')
          let currentObj = window
          
          // 获取对象
          for (const part of pathParts) {
            if (currentObj && typeof currentObj === 'object') {
              currentObj = currentObj[part]
            }
          }

          // 添加新属性
          if (typeof currentObj === 'object' && !Array.isArray(currentObj)) {
            // 创建属性添加弹窗
            const existingModal = $.one(el, '.modal-overlay')
            if (existingModal) {
              existingModal.remove()
            }

            const overlay = document.createElement('div')
            overlay.className = prefix('modal-overlay')
            
            const modal = document.createElement('div')
            modal.className = prefix('detail-modal')
            modal.innerHTML = prefixHTML(`
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
            
            overlay.appendChild(modal)
            
            // 绑定类型选择事件
            const typeSelector = $.one(modal, '.type-selector')
            typeSelector.addEventListener('click', (e) => {
              if (e.target.classList.contains(prefix('type-btn'))) {
                const type = e.target.getAttribute('data-type')
                const propertyName = $.one(modal, '.property-name').value.trim()
                
                if (!propertyName) {
                  alert('请输入属性名')
                  return
                }

                if (Object.hasOwn(currentObj, propertyName)) {
                  alert('属性名已存在')
                  return
                }

                let newValue
                switch(type) {
                case 'string':
                  newValue = ''
                  break
                case 'number':
                  newValue = 0
                  break
                case 'boolean':
                  newValue = false
                  break
                case 'array':
                  newValue = []
                  break
                case 'object':
                  newValue = {}
                  break
                }
                
                currentObj[propertyName] = newValue
                const parentItem = target.closest(prefixSelector('.item'))
                const objectItems = $.one(parentItem, '.items')
                const newPropertyHtml = prefixHTML(`
                  <div class="object-item">
                    ${this._renderItem(propertyName, newValue, path, true)}
                    <button class="object-delete-btn" data-path="${path}" data-key="${propertyName}" title="删除此项">×</button>
                  </div>
                `)
                objectItems.insertAdjacentHTML('beforeend', newPropertyHtml)
                overlay.remove()
              }
            })
            
            overlay.addEventListener('click', (e) => {
              if (e.target === overlay || e.target.classList.contains(prefix('close-btn'))) {
                overlay.remove()
              }
            })
            
            el.appendChild(overlay)
          }
          e.stopPropagation()
        }

        // 处理对象删除按钮
        if (target.classList.contains(prefix('object-delete-btn'))) {
          const path = target.getAttribute('data-path')
          const key = target.getAttribute('data-key')
          const pathParts = path.split('.')
          let currentObj = window
          
          // 获取对象
          for (const part of pathParts) {
            if (currentObj && typeof currentObj === 'object') {
              currentObj = currentObj[part]
            }
          }

          // 删除属性
          if (typeof currentObj === 'object' && !Array.isArray(currentObj)) {
            delete currentObj[key]
            // 删除DOM元素
            const objectItem = target.closest(prefixSelector('.object-item'))
            objectItem.remove()
          }
          e.stopPropagation()
        }
      })
    }

    show() {
      super.show()
    }

    hide() {
      super.hide()
    }

    destroy() {
      super.destroy()
      evalCss.remove(this._style)
    }
  }

  return new Config()
}
