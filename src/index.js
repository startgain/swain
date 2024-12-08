module.exports = function (eruda) {
  let { Tool, util } = eruda
  let { evalCss } = util
  
  // 导入工具函数
  const { prefix, prefixHTML, prefixSelector, $ } = require('./utils')

  class Config extends Tool {
    constructor() {
      super()
      this.name = 'config'
      this._style = evalCss(require('./style.scss'))
      
      // 使用外部字段说明
      this._fieldDetails = window.CONFIG_DETAILS
    }

    init($el, container) {
      super.init($el, container)
      this._eruda = eruda
      this._container = container
      this._renderJson($el)
      this._bindEvent($el[0])
    }

    _renderJson($el) {
      const config = window.LOCAL_CONFIG || {}
      const self = this
      
      // 使用模板字符串定义完整的 HTML 结构
      const renderValue = (value) => {
        let valueHtml = ''
        if (value === null) {
          valueHtml = '<span class="value">null</span>'
        } else if (typeof value === 'string') {
          valueHtml = `<span class="value string">"${value}"</span>`
        } else if (typeof value === 'boolean') {
          valueHtml = `<span class="value boolean">${value}</span>`
        } else if (typeof value === 'number') {
          valueHtml = `<span class="value number">${value}</span>`
        } else if (Array.isArray(value)) {
          valueHtml = `<span class="value array">[${value.length} items]</span>`
        } else {
          valueHtml = `<span class="value">${value}</span>`
        }
        return valueHtml
      }

      const renderItem = (key, value, path = '', isLast = true) => {
        console.log('🚀 ~ Config ~ renderItem ~ value:', value,Array.isArray(value)?'Array':typeof value === 'object'?'Object':'Other')
        const currentPath = path ? `${path}.${key}` : key
        
        if (typeof value === 'object' && value !== null) {
          const isArray = Array.isArray(value)
          const items = Object.entries(value)
          return prefixHTML(`
            <div class="item">
              <span class="expand-btn">▾</span>
              <span class="key">${key}</span>: ${isArray ? '[' : '{'}
              <div class="items">
                ${items.map(([k, v], index) => renderItem(k, v, currentPath, index === items.length - 1)).join('')}
              </div>
              ${isArray ? ']' : '}'} ${isLast ? '' : ','}
            </div>
          `)
        } else {
          return prefixHTML(`
            <div class="item">
              <span class="key">${key}</span>: ${renderValue(value)}${isLast ? '' : ','}
              <span class="goto-btn" data-path="${currentPath}"></span>
              <span class="detail-btn ${self._fieldDetails[currentPath] ? '' : 'no-desc'}" data-path="${currentPath}"></span>
            </div>
          `)
        }
      }

      let html = prefixHTML('<div class="json-tree">')
      html += renderItem('LOCAL_CONFIG', config)
      html += '</div>'
      $el.html(html)
    }

    _bindEvent(el) {
      const self = this
      
      el.addEventListener('click', (e) => {
        const target = e.target
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
          const path = target.getAttribute('data-path')
          const fieldInfo = self._fieldDetails[path]
          const existingModal = $.one(el, '.modal-overlay')
          if (existingModal) {
            existingModal.remove()
          }
          
          const overlay = document.createElement('div')
          overlay.className = prefix('modal-overlay')
          
          const modal = document.createElement('div')
          modal.className = prefix('detail-modal')
          
          // 根据是否有字段说明显示不同的内容
          if (fieldInfo) {
            modal.innerHTML = prefixHTML(`
              <div class="close-btn">×</div>
              <div class="field-name">${fieldInfo.name}</div>
              <div class="field-path">${path}</div>
              <div class="field-desc">${fieldInfo.desc}</div>
            `)
          } else {
            modal.innerHTML = prefixHTML(`
              <div class="close-btn">×</div>
              <div class="field-path">${path}</div>
              <div class="field-desc no-desc">暂无字段介绍</div>
            `)
          }
          
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
          
          // 遍历路径获取前值
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
          
          // 只在非布���类型和非数组类型时设置focus
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
            
            // 遍历路径直到倒��第二个部分
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
              overlay.remove()
              // 重新渲染JSON树
              self._renderJson(self._$el)
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
