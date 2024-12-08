// 添加前缀的基础函数
const addPrefix = (str) => `eruda-${str}`

// 处理单个类名
const prefixClass = (className) => {
  className = className.trim()
  return className.startsWith('eruda-') ? className : addPrefix(className)
}

// 处理HTML中的class属性
const prefixHTML = (html) => {
  return html.replace(/class="([^"]+)"/g, (match, classNames) => {
    const prefixedClasses = classNames.split(' ')
      .map(prefixClass)
      .join(' ')
    return `class="${prefixedClasses}"`
  })
}

// 处理CSS选择器
const prefixSelector = (selector) => {
  return selector.split(/\s+/).map(part => {
    if (part.startsWith('.') && !part.startsWith('.eruda-')) {
      return '.' + addPrefix(part.slice(1))
    }
    return part
  }).join(' ')
}

// 为单个类名添加前缀
const prefix = (className) => {
  if (Array.isArray(className)) {
    return className.map(prefixClass).join(' ')
  }
  return prefixClass(className)
}

// DOM查询工具函数
const $ = {
  // 查询单个元素
  one: (parent, selector) => {
    return parent.querySelector(prefixSelector(selector))
  },
  // 查询多个元素
  all: (parent, selector) => {
    return parent.querySelectorAll(prefixSelector(selector))
  }
}

module.exports = {
  prefix,
  prefixHTML,
  prefixSelector,
  $
} 