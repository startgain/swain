;(function (root, factory) {
  // UMD 模块定义，支持 AMD、CommonJS 和全局变量
  if (typeof define === 'function' && define.amd) {
    define([], factory)
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory()
  } else {
    root.erudaSwain = factory()
  }
})(this, function () {
  // 返回 eruda 插件的工厂函数
  return function (eruda) {
    var Tool = eruda.Tool,
      util = eruda.util

    // 继承 eruda.Tool 创建自定义工具
    var Swain = Tool.extend({
      name: 'swain', // 插件名称
      
      // 初始化函数
      init: function ($el, container) {
        this.callSuper(Tool, 'init', arguments) // 调用父类初始化
        
        // 保存 eruda 实例和容器引用
        this._eruda = eruda;
        this._container = container;
        
        // 注入CSS样式
        this._style = util.evalCss([
          // 定义插件的样式
          '.eruda-dev-tools .eruda-tools .eruda-swain {padding: 10px; font-family: monospace; overflow-y: auto; height: 100%;}',
          '.eruda-json-tree {background: #fff; color: #263238;}',
          '.eruda-item {padding: 2px 0 2px 20px; position: relative;}',
          '.eruda-key {color: #881391;}', // JSON key的颜色
          '.eruda-value {color: #1a1aa6;}', // 普通值的颜色
          '.eruda-value.eruda-string {color: #c41a16;}', // 字符串值的颜色
          '.eruda-value.eruda-boolean {color: #0d22aa;}', // 布尔值的颜色
          '.eruda-value.eruda-number {color: #1c00cf;}', // 数字的颜色
          '.eruda-expand-btn {position: absolute; left: 0; cursor: pointer; padding: 0 4px;}',
          '.eruda-collapsed > .eruda-items {display: none;}', // 折叠状态的样式
          '.eruda-items {padding-left: 10px;}',
          '.eruda-goto-btn {margin-left: 5px; color: #2196f3; cursor: pointer; font-size: 12px;}',
          '.eruda-dev-tools .eruda-tools .eruda-swain .eruda-detail-btn {margin-left: 5px; color: #9c27b0; cursor: pointer; font-size: 12px;}'
        ].join('.eruda-dev-tools .eruda-tools .eruda-swain '))
        
        // 获取配置并渲染
        const config = window.LOCAL_CONFIG || {};
        this._renderJson($el, config);
        this._bindEvent($el[0]);
      },

      // 渲染JSON树结构
      _renderJson: function($el) {
        const config = window.LOCAL_CONFIG || {};
        let html = '<div class="eruda-json-tree">';
        
        // 渲染具体的值
        const renderValue = (value, path) => {
          let valueHtml = '';
          // 根据值的类型使用不同的样式
          if (value === null) {
            valueHtml = '<span class="eruda-value">null</span>';
          } else if (typeof value === 'string') {
            valueHtml = `<span class="eruda-value eruda-string">"${value}"</span>`;
          } else if (typeof value === 'boolean') {
            valueHtml = `<span class="eruda-value eruda-boolean">${value}</span>`;
          } else if (typeof value === 'number') {
            valueHtml = `<span class="eruda-value eruda-number">${value}</span>`;
          } else {
            valueHtml = `<span class="eruda-value">${value}</span>`;
          }
          
          // 添加跳转和详情按钮
          if (typeof value !== 'object' || value === null) {
            valueHtml += `<span class="eruda-goto-btn" data-path="${path}">跳转设置</span>`;
            valueHtml += `<span class="eruda-detail-btn" data-path="${path}">查看说明</span>`;
          }
          return valueHtml;
        };

        // 递归渲染JSON项
        const renderItem = (key, value, path = '', isLast = true) => {
          const currentPath = path ? `${path}.${key}` : key;
          
          if (typeof value === 'object' && value !== null) {
            // ��理对象和数组
            const isArray = Array.isArray(value);
            const items = Object.entries(value);
            return `
              <div class="eruda-item">
                <span class="eruda-expand-btn">▼</span>
                <span class="eruda-key">${key}</span>: ${isArray ? '[' : '{'}
                <div class="eruda-items">
                  ${items.map(([k, v], index) => renderItem(k, v, currentPath, index === items.length - 1)).join('')}
                </div>
                ${isArray ? ']' : '}'} ${isLast ? '' : ','}
              </div>
            `;
          } else {
            // 处理基本类型值
            return `
              <div class="eruda-item">
                <span class="eruda-key">${key}</span>: ${renderValue(value, currentPath)}${isLast ? '' : ','}
              </div>
            `;
          }
        };

        html += renderItem('LOCAL_CONFIG', config);
        html += '</div>';
        $el.html(html);
      },

      // 绑定事件处理
      _bindEvent: function(el) {
        const self = this;
        
        el.addEventListener('click', (e) => {
          const target = e.target;
          // 处理展开/折叠按钮点击
          if (target.classList.contains('eruda-expand-btn')) {
            const item = target.closest('.eruda-item');
            if (item.classList.contains('eruda-collapsed')) {
              item.classList.remove('eruda-collapsed');
              target.textContent = '▼';
            } else {
              item.classList.add('eruda-collapsed');
              target.textContent = '▶';
            }
            e.stopPropagation();
          }
          
          // 处理跳转按钮点击
          if (target.classList.contains('eruda-goto-btn')) {
            const path = target.getAttribute('data-path');
            if (self._eruda && self._eruda.get) {
              const settings = self._eruda.get('settings');
              if (settings) {
                // 切换到设置面板
                self._container.showTool('settings');
                console.log('跳转到设置:', path, settings);
              } else {
                console.warn('Settings tool not found');
              }
            } else {
              console.warn('Eruda instance not properly initialized');
            }
            e.stopPropagation();
          }
          
          // 处理详情按钮点击
          if (target.classList.contains('eruda-detail-btn')) {
            const path = target.getAttribute('data-path');
            // 切换到详情面板
            if (self._container) {
              self._container.showTool('detail');
              // 获取 detail 插件实例并调用高亮方法
              const detailTool = self._eruda.get('detail');
              if (detailTool && detailTool._highlightField) {
                // 等待面板切换完成后再滚动
                setTimeout(() => {
                  detailTool._highlightField(path);
                }, 100);
              }
            }
            e.stopPropagation();
          }
        });
      },

      // 显示插件
      show: function () {
        this.callSuper(Tool, 'show', arguments)
      },
      
      // 隐藏插件
      hide: function () {
        this.callSuper(Tool, 'hide', arguments)
      },
      
      // 销毁插件，清理资源
      destroy: function () {
        this.callSuper(Tool, 'destroy', arguments)
        util.evalCss.remove(this._style)
      }
    })

    // 返回插件实例
    return new Swain()
  }
})
