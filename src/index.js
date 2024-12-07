module.exports = function (eruda) {
  let { Tool, util } = eruda
  let { evalCss } = util

  class Config extends Tool {
    constructor() {
      super()
      this.name = 'config'
      
      // 注入CSS样式
      this._style = evalCss([
        '.eruda-dev-tools .eruda-tools .eruda-config {padding: 10px; font-family: monospace; overflow-y: auto; height: 100%;}',
        '.eruda-json-tree {background: #fff; color: #263238;}',
        '.eruda-item {padding: 3px 0 3px 22px; position: relative;}',
        '.eruda-key {color: #881391;}',
        '.eruda-value {color: #1a1aa6;}',
        '.eruda-value.eruda-string {color: #c41a16;}',
        '.eruda-value.eruda-boolean {color: #0d22aa;}',
        '.eruda-value.eruda-number {color: #1c00cf;}',
        '.eruda-expand-btn {position: absolute; left: 0; cursor: pointer; width: 20px; height: 20px; line-height: 20px; text-align: center; font-size: 20px; font-family: "Courier New", Courier, monospace; color: #666; transition: transform 0.15s ease;}',
        '.eruda-collapsed > .eruda-expand-btn {transform: rotate(0deg);}',
        '.eruda-collapsed > .eruda-items {display: none;}',
        '.eruda-items {padding-left: 5px;}',
        '.eruda-goto-btn {margin-left: 5px; width: 16px; height: 16px; cursor: pointer; background: url(./src/assets/edit.svg) no-repeat center; background-size: contain; display: inline-block; vertical-align: middle;}',
        '.eruda-detail-btn {margin-left: 5px; width: 16px; height: 16px; cursor: pointer; background: url(./src/assets/info.svg) no-repeat center; background-size: contain; display: inline-block; vertical-align: middle;}',
        '.eruda-dev-tools .eruda-tools .eruda-config .eruda-detail-btn {margin-left: 5px; color: #9c27b0; cursor: pointer; font-size: 12px;}',
        '.eruda-modal-overlay {position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.3); display: flex; align-items: center; justify-content: center; z-index: 1000;}',
        '.eruda-detail-modal {background: #fff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.2); width: 80%; position: relative;}',
        '.eruda-detail-modal .eruda-field-name {font-weight: bold; color: #2196f3; margin-bottom: 8px; font-size: 12px;}',
        '.eruda-detail-modal .eruda-field-path {color: #666; font-size: 10px; margin-bottom: 8px;}',
        '.eruda-detail-modal .eruda-field-desc {color: #333; line-height: 1.4; font-size: 11px;}',
        '.eruda-detail-modal .eruda-close-btn {position: absolute; right: 8px; top: 8px; color: #666; cursor: pointer; font-size: 16px; line-height: 1;}'
      ].join('.eruda-dev-tools .eruda-tools .eruda-config '))

      // 添加完整的字段说明数据
      this._fieldDetails = {
        'LOCAL_CONFIG.apiUrl': {
          name: 'API基地址',
          desc: '用于设置API请求的基础URL，所有接口请求都会基于此地址'
        },
        'LOCAL_CONFIG.debug': {
          name: '调试模式',
          desc: '控制是否开启调试模式，开启后会显示更多调试信息'
        },
        'LOCAL_CONFIG.env': {
          name: '环境配置',
          desc: '当前运行环境，可选值：development/production/test'
        },
        'LOCAL_CONFIG.version': {
          name: '版本号',
          desc: '当前应用的版本号'
        },
        'LOCAL_CONFIG.api.baseUrl': {
          name: 'API服务器地址',
          desc: 'API服务器的基础URL，用于所有API请求'
        },
        'LOCAL_CONFIG.api.timeout': {
          name: '请求超时时间',
          desc: 'API请求的超时时间，单位为毫秒'
        },
        // ... 其他字段说明
      }
    }

    init($el, container) {
      super.init($el, container)
      this._eruda = eruda
      this._container = container
      
      // 获取配置并渲染
      const config = window.LOCAL_CONFIG || {}
      this._renderJson($el, config)
      this._bindEvent($el[0])
    }

    _renderJson($el) {
      const config = window.LOCAL_CONFIG || {}
      let html = '<div class="eruda-json-tree">'
      
      // 渲染具体的值
      const renderValue = (value, path) => {
        let valueHtml = ''
        if (value === null) {
          valueHtml = '<span class="eruda-value">null</span>'
        } else if (typeof value === 'string') {
          valueHtml = `<span class="eruda-value eruda-string">"${value}"</span>`
        } else if (typeof value === 'boolean') {
          valueHtml = `<span class="eruda-value eruda-boolean">${value}</span>`
        } else if (typeof value === 'number') {
          valueHtml = `<span class="eruda-value eruda-number">${value}</span>`
        } else {
          valueHtml = `<span class="eruda-value">${value}</span>`
        }
        
        if (typeof value !== 'object' || value === null) {
          return valueHtml
        }
        return valueHtml
      }

      // 递归渲染JSON项
      const renderItem = (key, value, path = '', isLast = true) => {
        const currentPath = path ? `${path}.${key}` : key
        
        if (typeof value === 'object' && value !== null) {
          const isArray = Array.isArray(value)
          const items = Object.entries(value)
          return `
            <div class="eruda-item">
              <span class="eruda-expand-btn">▾</span>
              <span class="eruda-key">${key}</span>: ${isArray ? '[' : '{'}
              <div class="eruda-items">
                ${items.map(([k, v], index) => renderItem(k, v, currentPath, index === items.length - 1)).join('')}
              </div>
              ${isArray ? ']' : '}'} ${isLast ? '' : ','}
            </div>
          `
        } else {
          return `
            <div class="eruda-item">
              <span class="eruda-key">${key}</span>: ${renderValue(value, currentPath)}${isLast ? '' : ','}
              <span class="eruda-goto-btn" data-path="${currentPath}"></span>
              <span class="eruda-detail-btn" data-path="${currentPath}"></span>
            </div>
          `
        }
      }

      html += renderItem('LOCAL_CONFIG', config)
      html += '</div>'
      $el.html(html)
    }

    _bindEvent(el) {
      const self = this
      
      el.addEventListener('click', (e) => {
        const target = e.target
        if (target.classList.contains('eruda-expand-btn')) {
          const item = target.closest('.eruda-item')
          if (item.classList.contains('eruda-collapsed')) {
            item.classList.remove('eruda-collapsed')
            target.textContent = '▾'
          } else {
            item.classList.add('eruda-collapsed')
            target.textContent = '▸'
          }
          e.stopPropagation()
        }
        
        if (target.classList.contains('eruda-detail-btn')) {
          const path = target.getAttribute('data-path')
          const fieldInfo = self._fieldDetails[path]
          if (fieldInfo) {
            const existingModal = el.querySelector('.eruda-modal-overlay')
            if (existingModal) {
              existingModal.remove()
            }
            
            const overlay = document.createElement('div')
            overlay.className = 'eruda-modal-overlay'
            
            const modal = document.createElement('div')
            modal.className = 'eruda-detail-modal'
            modal.innerHTML = `
              <div class="eruda-close-btn">×</div>
              <div class="eruda-field-name">${fieldInfo.name}</div>
              <div class="eruda-field-path">${path}</div>
              <div class="eruda-field-desc">${fieldInfo.desc}</div>
            `
            
            overlay.appendChild(modal)
            
            overlay.addEventListener('click', (e) => {
              if (e.target === overlay || e.target.classList.contains('eruda-close-btn')) {
                overlay.remove()
              }
            })
            
            el.appendChild(overlay)
          }
          e.stopPropagation()
        }

        if (target.classList.contains('eruda-goto-btn')) {
          const path = target.getAttribute('data-path')
          const pathParts = path.split('.')
          let currentObj = window
          
          // 遍历路径获取当前值
          for (const part of pathParts) {
            if (currentObj && typeof currentObj === 'object') {
              currentObj = currentObj[part]
            } else {
              currentObj = undefined
              break
            }
          }

          // 创建编辑弹窗
          const existingModal = el.querySelector('.eruda-modal-overlay')
          if (existingModal) {
            existingModal.remove()
          }

          const overlay = document.createElement('div')
          overlay.className = 'eruda-modal-overlay'

          const modal = document.createElement('div')
          modal.className = 'eruda-detail-modal'
          modal.innerHTML = `
            <div class="eruda-close-btn">×</div>
            <div class="eruda-field-name">编辑 ${path}</div>
            <div style="margin: 10px 0;">
              <input type="text" class="eruda-edit-input" value="${currentObj}" style="width: 100%; padding: 5px;">
            </div>
            <div style="text-align: right;">
              <button class="eruda-save-btn" style="padding: 5px 10px; background: #2196f3; color: white; border: none; border-radius: 4px; cursor: pointer;">保存</button>
            </div>
          `

          overlay.appendChild(modal)

          // 绑定保存按钮事件
          const saveBtn = modal.querySelector('.eruda-save-btn')
          const input = modal.querySelector('.eruda-edit-input')
          
          saveBtn.addEventListener('click', () => {
            const newValue = input.value
            let obj = window
            
            // 遍历路径直到倒数第二个部分
            for (let i = 0; i < pathParts.length - 1; i++) {
              obj = obj[pathParts[i]]
            }
            
            // 设置新值
            const lastPart = pathParts[pathParts.length - 1]
            try {
              // 尝试解析值（如果是数字或布尔值）
              let parsedValue = newValue
              if (newValue === 'true') parsedValue = true
              else if (newValue === 'false') parsedValue = false
              else if (!isNaN(newValue)) parsedValue = Number(newValue)
              
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
            if (e.target === overlay || e.target.classList.contains('eruda-close-btn')) {
              overlay.remove()
            }
          })

          el.appendChild(overlay)
          input.focus()
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
