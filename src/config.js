// 默认配置
window.LOCAL_CONFIG = {
  // 基础配置
  apiUrl: 'https://api.example.com/v1',
  debug: true,
  env: 'development',
  version: '1.0.0',
    
  // API配置
  api: {
    baseUrl: 'https://api.example.com',
    timeout: 5000,
    retryCount: 3,
    maxConcurrent: 5,
    whiteList: [
      '/login',
      '/register',
      '/public/api',
      '/docs'
    ],
    blackList: [
      '/admin/*',
      '/internal/*',
      '/system/*'
    ],
    mockList: [
      '/test/api1',
      '/test/api2',
      '/mock/*'
    ]
  },
    
  // 功能开关
  features: {
    darkMode: true,
    notification: false,
    autoUpdate: true,
    offlineMode: false
  },
    
  // 安全配置
  security: {
    encryption: 'ssl',
    tokenExpiry: 24,
    passwordPolicy: 'strong',
    maxLoginAttempts: 5,
    allowedOrigins: [
      'http://localhost:8080',
      'https://example.com',
      'https://api.example.com'
    ],
    allowedMethods: [
      'GET',
      'POST',
      'PUT',
      'DELETE',
      'PATCH'
    ]
  },
    
  // 日志配置
  log: {
    enabled: true,
    maxSize: 1024,
    levels: [
      'error',
      'warn',
      'info',
      'debug',
      'trace'
    ]
  },
    
  // 缓存配置
  cache: {
    enabled: true,
    maxAge: 3600,
    excludes: [
      // '/api/realtime/*',
      // '/api/stream/*',
      // '/api/websocket/*'
    ]
  },
  name: 'config',
  // 插件配置
  plugins: [
    {
      name: 'plugin1',
      enabled: true,
      version: '1.0.0',
      options: {
        feature1: true,
        feature2: false
      }
    },
    {
      name: 'plugin2',
      enabled: false,
      version: '2.1.0',
      options: {
        debug: true,
        mode: 'development'
      }
    },
    {
      name: 'plugin3',
      enabled: true,
      version: '0.9.0',
      options: {
        timeout: 3000,
        retry: 2
      }
    }
  ]
}

// 字段说明配置
window.CONFIG_DETAILS = {
  // 基础配置说明
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

  // API配置说明
  'LOCAL_CONFIG.api.baseUrl': {
    name: 'API服务器地址',
    desc: 'API服务器的基础URL，用于所有API请求'
  },
  'LOCAL_CONFIG.api.timeout': {
    name: '请求超时时间',
    desc: 'API请求的超时时间，单位为毫秒'
  },
  'LOCAL_CONFIG.api.retryCount': {
    name: '重试次数',
    desc: 'API请求失败时的自动重试次数'
  },
  'LOCAL_CONFIG.api.maxConcurrent': {
    name: '最大并发数',
    desc: '同时允许的最大API请求数量'
  },
  'LOCAL_CONFIG.api.whiteList': {
    name: 'API白名单',
    desc: '不需要token验证的API路径列表，支持通配符*',
    type: 'array'
  },
  'LOCAL_CONFIG.api.blackList': {
    name: 'API��名单',
    desc: '禁止访问的API路径列表，支持通配符*',
    type: 'array'
  },
  'LOCAL_CONFIG.api.mockList': {
    name: 'Mock列表',
    desc: '需要使用Mock数据的API列表，支持通配符*',
    type: 'array'
  },

  // 功能开关说明
  'LOCAL_CONFIG.features.darkMode': {
    name: '深色模式',
    desc: '是否启用深色主题模式'
  },
  'LOCAL_CONFIG.features.notification': {
    name: '通知提醒',
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

  // 安全配置说明
  'LOCAL_CONFIG.security.encryption': {
    name: '加密方式',
    desc: '数据传输加密方式，如：ssl/tls'
  },
  'LOCAL_CONFIG.security.tokenExpiry': {
    name: 'Token过期时间',
    desc: '访问令牌的过期时间，单位为小时'
  },
  'LOCAL_CONFIG.security.passwordPolicy': {
    name: '密码策略',
    desc: '密码强度要求：weak/medium/strong'
  },
  'LOCAL_CONFIG.security.maxLoginAttempts': {
    name: '最大登录尝试',
    desc: '允许的最大登录失败次数'
  },
  'LOCAL_CONFIG.security.allowedOrigins': {
    name: '允许的源',
    desc: '允许跨域请求的源地址列表',
    type: 'array'
  },
  'LOCAL_CONFIG.security.allowedMethods': {
    name: '允许的方法',
    desc: '允许的HTTP请求方法列表',
    type: 'array'
  },

  // 日志配置说明
  'LOCAL_CONFIG.log.enabled': {
    name: '启用日志',
    desc: '是否启用日志记录功能'
  },
  'LOCAL_CONFIG.log.maxSize': {
    name: '最大大小',
    desc: '单个日志文件的最大大小，单位为KB'
  },
  'LOCAL_CONFIG.log.levels': {
    name: '日志级别',
    desc: '需要记录的日志级别列表',
    type: 'array'
  },

  // 缓存配置说明
  'LOCAL_CONFIG.cache.enabled': {
    name: '启用缓存',
    desc: '是否启用数据缓存功能'
  },
  'LOCAL_CONFIG.cache.maxAge': {
    name: '最大年龄',
    desc: '缓存数据的最大保存时间，单位为秒'
  },
  'LOCAL_CONFIG.cache.excludes': {
    name: '排除列表',
    desc: '不需要缓存的API路径列表，支持通配符*',
    type: 'array'
  },

  // 插件配置说明
  'LOCAL_CONFIG.plugins': {
    name: '插件列表',
    desc: '已安装的插件配置列表，包含插件的详细设置',
    type: 'array'
  }
} 