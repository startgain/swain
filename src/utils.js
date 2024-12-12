// 基础工具函数
const prefix = (className) => {
  if (Array.isArray(className)) {
    return className.map(name => name.trim().startsWith('eruda-') ? name : `eruda-${name}`).join(' ')
  }
  // 处理空格分隔的多个类名
  if (typeof className === 'string' && className.includes(' ')) {
    return className.split(' ')
      .map(name => name.trim().startsWith('eruda-') ? name.trim() : `eruda-${name.trim()}`)
      .join(' ')
  }
  return className.trim().startsWith('eruda-') ? className : `eruda-${className}`
}

const prefixSelector = (selector) => {
  return selector.split(/\s+/).map(part => {
    if (part.startsWith('.') && !part.startsWith('.eruda-')) {
      return '.eruda-' + part.slice(1)
    }
    return part
  }).join(' ')
}

const prefixHTML = (html) => {
  return html.replace(/class="([^"]+)"/g, (match, classNames) => {
    const prefixedClasses = classNames.split(' ')
      .map(name => name.trim().startsWith('eruda-') ? name : `eruda-${name}`)
      .join(' ')
    return `class="${prefixedClasses}"`
  })
}

// DOM操作和HTML处理工具
const $ = {
  // 查询单个元素
  one: (parent, selector) => {
    return parent.querySelector(prefixSelector(selector))
  },
  // 查询多个元素
  all: (parent, selector) => {
    return parent.querySelectorAll(prefixSelector(selector))
  },
  // 创建元素
  create: (tagName, className = '', innerHTML = '') => {
    const el = document.createElement(tagName)
    if (className) el.className = prefix(className)
    if (innerHTML) el.innerHTML = innerHTML
    return el
  },
  // 添加类名
  addClass: (el, className) => {
    el.classList.add(prefix(className))
  },
  // 移除类名
  removeClass: (el, className) => {
    el.classList.remove(prefix(className))
  },
  // 判断是否包含类名
  hasClass: (el, className) => {
    return el.classList.contains(prefix(className))
  },
  // 添加前缀
  prefix,
  // 处理HTML中的class前缀
  prefixHTML,
  // 处理选择器前缀
  prefixSelector,
  // HTML转义
  escape: (str) => {
    if (str === null || str === undefined) return '';
    str = String(str);
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  },
  // 获取对象的值
  getValueByPath: (obj, path) => {
    if (path === 'LOCAL_CONFIG') {
      return obj
    }
    if (path.startsWith('LOCAL_CONFIG.')) {
      path = path.slice('LOCAL_CONFIG.'.length)
    }
    const parts = path.split('.')
    let current = obj
    for (const part of parts) {
      if (current && typeof current === 'object') {
        current = current[part]
      } else {
        return undefined
      }
    }
    return current
  },
  // 设置对象的值
  setValueByPath: (obj, path, value) => {
    if (path === 'LOCAL_CONFIG') {
      return
    }
    if (path.startsWith('LOCAL_CONFIG.')) {
      path = path.slice('LOCAL_CONFIG.'.length)
    }
    const parts = path.split('.')
    let current = obj
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i]
      if (!(part in current)) {
        current[part] = {}
      }
      current = current[part]
    }
    current[parts[parts.length - 1]] = value
  },
  // 获取值的类型
  getType: (value) => {
    if (value === null) return 'null'
    if (Array.isArray(value)) return 'array'
    return typeof value
  },
  // 转换值到指定类型
  convertValue: (value, type) => {
    let num
    switch(type) {
    case 'string':
      return String(value)
    case 'number':
      num = Number(value)
      return isNaN(num) ? 0 : num
    case 'boolean':
      return Boolean(value)
    case 'array':
      return Array.isArray(value) ? value : []
    case 'object':
      return typeof value === 'object' ? value : {}
    default:
      return value
    }
  }
}

module.exports = $ 