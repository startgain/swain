;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory)
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory()
  } else {
    root.erudaDetail = factory()
  }
})(this, function () {
  return function (eruda) {
    var Tool = eruda.Tool,
      util = eruda.util

    var Detail = Tool.extend({
      name: 'detail',
      
      init: function ($el, container) {
        this.callSuper(Tool, 'init', arguments)
        
        this._eruda = eruda
        this._container = container
        this._$el = $el
        
        this._style = util.evalCss([
          '.eruda-dev-tools .eruda-tools .eruda-detail {padding: 10px; font-family: monospace; overflow-y: auto; height: 100%;}',
          '.eruda-dev-tools .eruda-tools .eruda-detail .eruda-field-detail {padding: 10px; border-bottom: 1px solid #eee;}',
          '.eruda-dev-tools .eruda-tools .eruda-detail .eruda-field-name {font-weight: bold; color: #2196f3; margin-bottom: 5px;}',
          '.eruda-dev-tools .eruda-tools .eruda-detail .eruda-field-path {color: #666; font-size: 12px; margin-bottom: 5px;}',
          '.eruda-dev-tools .eruda-tools .eruda-detail .eruda-field-desc {color: #333; line-height: 1.4;}',
          '.eruda-dev-tools .eruda-tools .eruda-detail .eruda-field-detail.eruda-selected {background: rgba(33, 150, 243, 0.1); border-left: 3px solid #2196f3; margin-left: -3px;}'
        ].join(''))

        // 字段说明数据
        this._fieldDetails = {
          'LOCAL_CONFIG.apiUrl': {
            name: 'API基础地址',
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
            desc: 'API服务器的基础URL地址，用于所有API请求'
          },
          'LOCAL_CONFIG.api.timeout': {
            name: '请求超时时间',
            desc: 'API请求的超时时间，单位为毫秒'
          },
          'LOCAL_CONFIG.api.retryCount': {
            name: '重试次数',
            desc: 'API请求失败后的重试次数'
          },
          'LOCAL_CONFIG.api.maxConcurrent': {
            name: '最大并发数',
            desc: '同时允许的最大API请求数量'
          },
          'LOCAL_CONFIG.features.darkMode': {
            name: '深色模式',
            desc: '是否启用深色模式主题'
          },
          'LOCAL_CONFIG.features.notification': {
            name: '通知功能',
            desc: '是否启用系统通知功能'
          },
          'LOCAL_CONFIG.features.autoUpdate': {
            name: '自动更新',
            desc: '是否启用自动更新功能'
          },
          'LOCAL_CONFIG.features.offlineMode': {
            name: '离线模式',
            desc: '是否启用离线工作模式'
          },
          'LOCAL_CONFIG.security.encryption': {
            name: '加密设置',
            desc: '数据传输加密方式的配置，可选值：none/ssl/tls'
          },
          'LOCAL_CONFIG.security.tokenExpiry': {
            name: '令牌过期时间',
            desc: '认证令牌的有效期限，单位为小时'
          },
          'LOCAL_CONFIG.security.passwordPolicy': {
            name: '密码策略',
            desc: '密码强度要求：weak/medium/strong'
          },
          'LOCAL_CONFIG.security.maxLoginAttempts': {
            name: '最大登录尝试',
            desc: '允许的最大登录失败次数'
          },
          'LOCAL_CONFIG.performance.caching': {
            name: '缓存策略',
            desc: '是否启用客户端缓存'
          },
          'LOCAL_CONFIG.performance.compression': {
            name: '压缩选项',
            desc: '数据传输压缩方式：none/gzip/br'
          },
          'LOCAL_CONFIG.performance.lazyLoading': {
            name: '延迟加载',
            desc: '是否启用资源延迟加载'
          },
          'LOCAL_CONFIG.performance.preload': {
            name: '预加载',
            desc: '是否启用资源预加载'
          },
          'LOCAL_CONFIG.ui.theme': {
            name: '界面主题',
            desc: '用户界面主题：light/dark/auto'
          },
          'LOCAL_CONFIG.ui.language': {
            name: '界面语言',
            desc: '用户界面显示语言，如：zh-CN/en-US'
          },
          'LOCAL_CONFIG.ui.fontSize': {
            name: '字体大小',
            desc: '界面字体大小，单位为像素'
          },
          'LOCAL_CONFIG.ui.animation': {
            name: '动画效果',
            desc: '是否启用界面动画效���'
          }
        }

        this._renderDetail()
      },

      _renderDetail: function () {
        console.log('Rendering details, available fields:', Object.keys(this._fieldDetails));
        let html = '<div class="eruda-detail">'
        
        for (const [path, info] of Object.entries(this._fieldDetails)) {
          console.log('Rendering field:', path, info);
          html += `
            <div class="eruda-field-detail" id="detail-${path}">
              <div class="eruda-field-name">${info.name}</div>
              <div class="eruda-field-path">${path}</div>
              <div class="eruda-field-desc">${info.desc}</div>
            </div>
          `
        }
        
        html += '</div>'
        console.log('Final HTML:', html);
        this._$el.html(html)
      },

      show: function () {
        this.callSuper(Tool, 'show', arguments)
      },

      hide: function () {
        this.callSuper(Tool, 'hide', arguments)
      },

      destroy: function () {
        this.callSuper(Tool, 'destroy', arguments)
        util.evalCss.remove(this._style)
      },

      _highlightField: function(path) {
        const $container = this._$el;
        const $fields = $container.find('.eruda-field-detail');
        
        // 移除所有高亮
        $fields.removeClass('eruda-selected');
        
        // 找到目标元素并高亮
        const $target = $container.find(`#detail-${path}`);
        if ($target.length) {
          $target.addClass('eruda-selected');
          
          // 添加小延时确保 DOM 已经更新
          setTimeout(() => {
            // 计算滚动位置
            const containerHeight = $container.height();
            const targetOffset = $target.position().top;
            const targetHeight = $target.height();
            
            // 滚动到目标元素居中的位置
            $container.scrollTop(
              targetOffset - (containerHeight / 2) + (targetHeight / 2)
            );
          }, 50);
        }
      }
    })

    return new Detail()
  }
}) 