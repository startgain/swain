// 默认配置
window.LOCAL_CONFIG = {
  API_HOME: 'baseUrl', // 条件单服务地址
  COMP_ID: '1036',
  BROKER_IDENTIFY: '', // 当前券商标识
  AES: false, // 是否启用aes加密
  /* AESPARAMSLISTRES、AESPARAMSLISTREQ、AESINTERFACE与接口getNeedOperateInterfaces、getNeedEncryptFields配置内容相同 */
  /* getNeedOperateInterfaces、getNeedEncryptFields当前需要先登录，因此前端配置暂时无法删除 */
  AESPARAMSLISTRES: [
    'hs_openid',
    'fund_account',
    'stock_account',
    'ext',
    'op_station',
    'client_name',
    'client_id',
    'id_no',
    'id_address',
    'mobile',
    'content'
  ], // 返回参数加密字段
  AESPARAMSLISTREQ: [
    'hs_openid',
    'fund_account',
    'stock_account',
    'ext',
    'op_station',
    'client_name',
    'client_id',
    'id_no',
    'id_address',
    'mobile'
  ], // 请求参数加密字段
  AESINTERFACE: ['login', 'loginHsiar', 'queryStockAccountList'], // 加密接口
  CHECK_ELIGIBILITY: true, // 是否开启适当性校验
  IS_OPEN_ELIGIBILITY_TOAST: false, // 是否开启适当性校验过程中的toast提示
  BROWSER_MODE: false, // 是否开启浏览器交互模式
  TOP_STATUS_PX: 20, // 默认状态栏高度
  CODE_REG: {
    shKzz: '^11', // 上海可转债
    szKzz: '^12', // 深圳可转债
  }, // 代码段正则
  STARTTIME: '2020-02-21', //智能国债逆回购统计明细的最小起始时间
  KBMC_CHECK_FLAG: true, // 是否开启开板卖出校验
  WGJTINTRO_DOCTION: '', //网格交易说明页(长城测试)
  SECRET_CONFIG_STRING: '', // 接口防攻击固定字符串-默认：secret
  QUESTIONLIMIT: 5, //测评查询限制个数
  KNOWLEDGE_SWITCH: false, // 是否开启知识测评校验
  DATE_TRADE_DSMM: 30, // 定时买卖交易日数量
  FUND_ACCOUNT_TYPE: '2', // 交易请求类型 2：普通柜台，3：两融柜台
  HIDE_HOME_WGJY: false, // 超级网格首页入口隐藏 
  IS_OPEN_ADVANCE_SETUP: true, // 是否开启高级设置
  IS_OPEN_SMART_ORDER: false, // 智能下单默认开启/关闭
  IS_OPEN_STRATEGY_BLACKLIST: true, // 是否开启策略黑白名单
  IS_ONLY_SHOW_PERMISSIBLE_STRATEGY: false, //是否仅展示被许可的策略,该开关依赖IS_OPEN_STRATEGY_BLACKLIST配置项，该配置项打开后才进行本配置项逻辑  true 进行用户黑名单策略过滤 ,false 不进行用户黑名单策略过滤； 默认false，不进行用户黑名单策略过滤
  IS_OPEN_STOCK_BLACKLIST: false, // 是否开启证券黑白名单
  IS_OPEN_MEMBER_LEVEL_CHECK: false, // 是否开启会员管理校验
  HAS_CONFIRM_WAY: ['1', '3'], // 触发类型配置列表: 1-自动下单；2-提醒；3-手动下单；
  EXPIRED_DATE: [4, 19, 59, 364], // 截止日期快捷选项配置
  IS_OPEN_ZDFX: false, // 是否展示账单分析入口
  IS_OPEN_YJFK: false, // 是否展示意见反馈入口
  BALANCE_DIFF_SIZE: 1000, // 按金额委托步长
  SHZQ_TRANSLATE_HAND: false, // 上海债券是否需要转换为手（金仕达柜台需要转换）
  HISTORY_MAX_DATE: 364, // 历史记录查询中，可选最长的时间年限(单位：天)
  PENDING_TIMEOUT_SECONDS: 10, // pending页停留的时长配置（单位：秒）
  IS_SHOW_CONFIRM_WARN: false, // 是否展示确认框下方风险警示、退市整理文案提示
  IS_INSTITUTION_RESTRICTED: true, // 是否限制机构户、产品户进行埋单
  WTLX: {
    SJWT: true, //市价委托
    ZDY: true //自定义
  },
  DEADLINE: {
    DEFAULT: '15:00:00', // 其它策略截止时间
    DEFAULT_SUFFIX: ' 15:00', // 其它策略时间后缀(带空格)
    GZNHG: '15:30:00', // 国债逆回购截止时间
    GZNHG_SUFFIX: ' 15:30', // 国债逆回购时间后缀(带空格)
    ZNGZNHG: '15:25:00', // 智能国债逆回购截止时间
    ZNGZNHG_SUFFIX: ' 15:25', // 智能国债逆回购时间后缀(带空格)
    ZNDX_START: '09:30', // 智能打新开始时间
    ZNDX_END: '14:57', // 智能打新截止时间
    ZNDX_DEFAULT: '10:00', // 智能打新默认选择时间
    TIME_STRATEGY_END: '14:56', // 时间类策略：定时买卖、ETF定投触发时间可选到的结束时间
    BUY_SELL_TWO_WAY_END: '14:57' // 先买后卖、先卖后卖截止时间
  },
  RANGE: {
    STEP_SIZE: 0.01, // 涉及到涨跌幅度的步长配置
    ZYTJ_LOW_PRICE: 0.5, // 止盈条件下限(包含)
    ZYTJ_HIGH_PRICE: 999.99, // 止盈条件上限(包含)
    ZSTJ_LOW_PRICE: 0.5, // 止损条件下限(包含)
    ZSTJ_HIGH_PRICE: 99.99, // 止损条件上限(包含)
    KBHL_LOW_PRICE: 0.5, // 开板回落幅度下限(包含)
    KBHL_HIGH_PRICE: 99.99, // 开板回落幅度上限(包含)
    FTMR_LJFT_LOW: 0.5, //反弹买入累计反弹幅度下限(包含)
    FTMR_LJFT_HIGH: 999.99, //反弹买入累计反弹幅度上限(包含)
    HLMC_LJHL_LOW: 0.5, //回落卖出累计回落幅度下限(包含)
    HLMC_LJHL_HIGH: 99.99, //回落卖出累计回落幅度上限(包含)
    JZJ_UP_HIGH: 999.99, // 网格交易较基准价涨幅上限(包含)
    JZJ_UP_LOW: 0.5, // 网格交易较基准价涨幅下限(包含)
    JZJ_DOWN_HIGH: 99.99, // 网格交易较基准价跌幅上限(包含)
    JZJ_DOWN_LOW: 0.5, // 网格交易较基准价跌幅下限(包含)
    RZDF_ZFBFB_LOW: 0.5, // 日涨跌幅涨幅百分比下限(包含)
    RZDF_ZFBFB_HIGH: 999.99, // 日涨跌幅涨幅百分比上限(包含)
    RZDF_DFBFB_LOW: 0.5, // 日涨跌幅跌幅百分比下限(包含)
    RZDF_DFBFB_HIGH: 99.99, // 日涨跌幅跌幅百分比上限(包含)
    LDMM_ZFBFB_LOW: 0.5, // 联动买卖涨幅百分比下限(包含)
    LDMM_ZFBFB_HIGH: 999.99, // 联动买卖涨幅百分比上限(包含)
    LDMM_DFBFB_LOW: 0.5, // 联动买卖跌幅百分比下限(包含)
    LDMM_DFBFB_HIGH: 99.99, // 联动买卖跌幅百分比上限(包含)
    FPMR_DFBFB_LOW: 0.01, // 分批买入跌幅百分比下限(包含)
    FPMR_DFBFB_HIGH: 99.99, // 分批买入跌幅百分比上限(包含)
    FPMC_ZFBFB_LOW: 0.01, // 分批卖出涨幅百分比下限(包含)
    FPMC_ZFBFB_HIGH: 999.99, // 分批卖出涨幅百分比上限(包含)
    PRICE_DIFF_LOW: 0,      // 价格类输入控件下限(不包含)   普通价格类控件以及按价差的价格类控件 1. 不支持负数（否则清空时会有边界问题 如‘’转换为0等问题）2. 步进器在小于0时会设置为最小步进值（应该是配置下限+最小步进值）故该配置暂不支持修改
    PRICE_DIFF_HIGH: 10000, // 价格类输入控件上限(不包含)   普通价格类控件以及按价差的价格类控件
    ZYZS_HLMC_LOW: 0.01,// 止盈止损的回落卖出幅度下限(包含)
    ZYZS_HLMC_HIGH: 99.99,// 止盈止损的回落卖出幅度上限(包含)
    CJWG_LIMIT_PRICE: 2, //超级网格箱体上限和下限阈值比例
    SEARCH_LIMIT: 10, // 股票搜索键盘精灵分页查询最大条数
  },
  QUOTA: {
    AMOUNT: '1000', // 金额
    QUANTITY: {
      A: '1000000', // 沪深A股
      FUND: '1000000', // 沪深基金
      KZZ: '1000000', // 沪深可转债
      STB: '100000', // 科创板限价委托
      EPM: '300000', // 创业板限价委托
      STB_SJ: '50000', // 科创版市价委托
      EPM_SJ: '150000', // 创业板市价委托
      BJAG: '1000000', // 北京A股
    },
  },
  // 获取长名称代码种类
  LONG_NAME: ['4356', '4360', '4361', '4363', '4609', '4611', '4612', '4615', '4616', '4617', '4619', '4621', '4623', '29184'],
  CODE_FRAGMENT: {
    shjj: ['4356', '4360', '4361'], // 上海基金
    shReits: ['4363'], // 上海reits基金
    shKzz: ['4355'], // 上海可转债
    kcb: ['4358'], // 科创版
    shag: ['4353'], // 上海A股
    szjj: ['4612', '4616', '4617'], // 深证基金
    szReits: ['4615'], // 深证reits基金
    szKzz: ['4611'], // 深圳可转债
    szag: ['4609', '4614'], // 深证A股
    cyb: ['4621'], // 创业板
    bjag: [], // 北京证券交易所
  },
  SDX: {
    NAME1: '恒生条件单功能协议书', // 条件单服务协议名称
    NAME2: '恒生条件单风险揭示书', // 产品风险揭示书名称
    NAME3: '适当性匹配意见及投资者确认书', // 适当性匹配确认
    NAME4: '产品或服务风险警示及投资者确认书', // 不适当警示确认
    LOCALGNXY: true, // 是否展示本地条件单功能协议书，而不是外链
    LOCALFXJS: true, // 是否展示本地产品风险揭示书，而不是外链
    LOCALSDXQR: true, // 是否展示本地适当性匹配确认结果，而不是外链
    LOCALBSDJS: true, // 是否展示本地不适当性警示确认结果，而不是外链
    LOCALESIGN: true, // 是否展示本地电子签名协议，而不是外链
    NAME1_TITLE: '条件单功能协议书', // 条件单服务协议标题
    NAME2_TITLE: '产品风险揭示书', // 产品风险揭示书标题
    NAME3_TITLE: '适当性评估结果提示', // 适当性匹配确认标题
    NAME4_TITLE: '产品或服务不适当提示', // 不适当警示确认标题
    NAME5_TITLE: '智能预约打新功能风险揭示书', // 智能预约打新功能风险揭示书标题
    NAME6_TITLE: '', // 智能预约打新跑马灯协议title
    NAME7_TITLE: '电子签名约定书', // 电子签名约定书标题
    CSA: '', // 条件单功能协议书外链
    RDB: '', // 产品风险揭示书外链
    ZRB: '', // 智能打新风险揭示书外链接
    ESIGN: '', // 电子签名协议外链
    ACCT_EXCH_TYPE: 'Z01', // 账户交易类型
    PRODTA_NO: '', // 产品TA编号
    PROD_CODE: '', // 产品代码
    SIGN_STATUS: '0', // 签约状态
    // 普通
    ELIG_AGREE1: '1', // 适当性确认书协议类型
    ELIG_AGREE2: '2', // 不适当性警示书协议类型
    RISK_TYPE: '51', // 产品风险揭示书协议类型
    CONDITIONAL_TYPE: '52', // 条件单功能协议书协议类型
    ZNDX_RISK_TYPE: 'conditionSheetzndx', // 智能打新风险揭示书协议类型
    // 两融
    // ELIG_AGREE1: '117', // 适当性确认书协议类型
    // ELIG_AGREE2: '118', // 不适当性警示书协议类型
    // RISK_TYPE: '115', // 产品风险揭示书协议类型
    // CONDITIONAL_TYPE: '116', // 条件单功能协议书协议类型
    TIMECOUNT: 5, // 协议按钮倒计时秒单位
    DATEFORMAT: 'yyyy年MM月dd日', // 适当性协议日期格式
    KHRISKLEVEL: '2505', // 客户风险等级字典项
    PRODUCTNAME: '“条件单”功能', // 产品名称
    ORGANNAME: '证券股份有限公司', // 机构主体
    REGFORMAT: '<(?:.|\\s)*?>', // 协议内容去除html标签
    ELIG_AGREE_PREFIX: '', //默认标准配置页面，否则自定义配置页面`EligAgree1${window.LOCAL_CONFIG.SDX.ELIG_AGREE_PREFIX}.html`
    AGREE_MODEL_NO1: '2020072400000001', // 协议模板编号产品风险揭示书【川财、山西】
    AGREE_MODEL_NO2: '2019112000000008', // 协议模板编号产品风险揭示书【华安】
    AGREE_MODEL_NO:{},  //条件单功能协议模板编号，{}不同策略使用不同协议模板，""不同策略使用相同协议模板【川财】
    EN_ELIG_BUSI_KIND: '9998', // 允许适当性业务种类 【山西】
    ELIG_RISK_TIP: '您的风险等级为@ClientRiskName@，不满足产品服务风险等级要求，暂不支持开通该功能。' //用户风险等级不匹配产品等级提示话术【山西】
  },
  // 个性化相关，非通用
  SPEC: {
    KCBURL: '', //科创板
    KZZURL: '', //可转债
    EPMURL: '', //创业板
    FXJSURL: '', //风险警示板
    TSBURL: '', //退市整理板
    KZZTSBURL: '', //可转债退市整理板
    REITSURL: '', // reits基金权限
    ZCZURL: '', //注册制
    BJAGURL: '', // 北京A股
    // aes密钥、生成协议、留痕地址
    CCIL_API: '',
    // 协议打开地址
    CCXY_API: '',
    // 跳转风险测评界面
    CCCP_FXCP: '',
    // 优品风险测评地址
    CCCP_FXCP_UP:'',
  },
  ERROR: {
    // 错误文本
    F: '交易密码错误',
    S: '[current_price]',
    T: '用户登录信息过期或者失效',
    T2: '重新登录',
    T3: '用户信息不存在',
    T4: '登录过期或在其他终端发生登录',
    E: '没有电子签名权限',
    N: '[queryStockAccount] 没有发现数据',
    FF: 'receive from upstream server timeout!',
    FF2: 'upstream disconnected',
    FF3: 'Forbid consumer access service',
    FF4: 'Failed to invoke the method',
    FS: '资产账号表记录不存在',
    FT: 'queryHoldStocksList',
    FT2: '表记录不存在',
    FT3: '电子协议模板',
    FT4: '会话不存在',
    FE: '非法流程',
    FN: '客户密码错误或账号密码不匹配',
    M: '因网络环境异常或行情初始化未完成导致无法获取到监控标的行情，请确保网络环境良好，在行情非初始化时间段内进行设置。',
    SF: '渠道号异常',
    ST: '委托价格超出涨跌幅限制',
    SE: ['getStrategyCornerMark'],
    F144843: '客户适当性偏好表记录不存在',
  },
  ENTRUSTSTATUS: {
    // 委托状态
    0: '未报',
    1: '待报',
    2: '已报',
    3: '已报待撤',
    4: '部成待撤',
    5: '部撤',
    6: '已撤',
    7: '部成',
    8: '已成',
    9: '废单',
    10: '撤单未成',
    11: '申请资金授权中',
    W: '待确认',
    V: '已确认',
    E: '已否决',
  },
  GZNHGPZ: [
    // 国债逆回购品种列表
    { stockName: '上海1天期', stockCode: '204001', exchangeType: '1', marketType: '4355' },
    { stockName: '上海2天期', stockCode: '204002', exchangeType: '1', marketType: '4355' },
    { stockName: '上海3天期', stockCode: '204003', exchangeType: '1', marketType: '4355' },
    { stockName: '上海4天期', stockCode: '204004', exchangeType: '1', marketType: '4355' },
    { stockName: '上海7天期', stockCode: '204007', exchangeType: '1', marketType: '4355' },
    { stockName: '上海14天期', stockCode: '204014', exchangeType: '1', marketType: '4355' },
    { stockName: '上海28天期', stockCode: '204028', exchangeType: '1', marketType: '4355' },
    { stockName: '上海91天期', stockCode: '204091', exchangeType: '1', marketType: '4355' },
    { stockName: '上海182天期', stockCode: '204182', exchangeType: '1', marketType: '4355' },
    { stockName: '深圳1天期', stockCode: '131810', exchangeType: '2', marketType: '4611' },
    { stockName: '深圳2天期', stockCode: '131811', exchangeType: '2', marketType: '4611' },
    { stockName: '深圳3天期', stockCode: '131800', exchangeType: '2', marketType: '4611' },
    { stockName: '深圳4天期', stockCode: '131809', exchangeType: '2', marketType: '4611' },
    { stockName: '深圳7天期', stockCode: '131801', exchangeType: '2', marketType: '4611' },
    { stockName: '深圳14天期', stockCode: '131802', exchangeType: '2', marketType: '4611' },
    { stockName: '深圳28天期', stockCode: '131803', exchangeType: '2', marketType: '4611' },
    { stockName: '深圳91天期', stockCode: '131805', exchangeType: '2', marketType: '4611' },
    { stockName: '深圳182天期', stockCode: '131806', exchangeType: '2', marketType: '4611' },
  ],
  HSINDEX: [
    // 联动品种额外包含的代码段
    '1A0001', // 000001
    '2A01', // 399001
    '2C01', // 399106
    '1A0002', // 000002
    '1A0003', // 000003
    '2A02', // 399002
    '2A03', // 399003
    '2C02', // 399107
    '2C03', // 399108
    '899050', // 北证50
  ],
  DEVELOPED_STRATEGY_CONFIG: [
    '7',
    '8',
    '9',
    '10',
    '12',
    '13',
    '14',
    '15',
    '16',
    '21',
    '22',
    '23',
    '34',
    '35',
    '36',
    '38',
    '39',
    '42',
    '43',
    '44',
    '45',
    '41',
    '46',
    '47',
    '48'
  ], // 券商对应的已开发完成的策略，用于订单查询
  IS_OPEN_VCONSOLE: false,
  REGIST: {
    IS_OPEN_REGIST_SH: true, // 是否开启沪市注册制
    IS_OPEN_REGIST_SZ: true, // 是否开启深市注册制
    IS_OPEN_REGIST_CHECK_SH: false, // 是否开启沪市注册制权限校验
    IS_OPEN_REGIST_CHECK_SZ: false, // 是否开启深市注册制权限校验
  },
  ZNDX_FXTS_INFO: [
    // 智能打新风险提示弹窗内容
    '新股预约后可能由于申购当天申购额度变化、资金不足等原因导致申购失败，请知悉。同时请关注市场波动下的投资风险',
  ],
  ZNDX_XYQS_INFO: [ // 智能打新协议签署弹窗内容
    '您尚未签署智能打新风险揭示书，需签署后方可继续使用。'
  ],
  IS_OPEN_KZZ_TSZL_SH: false, // 沪市可转债退市整理开关
  IS_OPEN_KZZ_TSZL_SZ: false, // 深市可转债退市整理开关
  FEEDBACK_PIC_SIZE: 2, //意见反馈单张图片大小
  HOME_RIGHT_TOP_URL: '', // home页right icon跳转地址
  ZNDX_CONFIRM_WARN: '',// 智能打新二次弹窗精简风险提示文案
  ZNDX_NOTICE_BAR_TEXT: '',// 跑马灯文案
  OPEN_ZNDX_SUBMIT_CHECK: false, // 是否开启智能打新提交校验
  ZNGZNHG_COMMISSION_HINT: '智能国债逆回购下单收益小于佣金时，将不触发委托，请知悉。佣金为0.0035%（十万分之3.5）', //智能国债逆回购佣金提示文案
  PDF_CMAPS_URL: 'https://unpkg.com/pdfjs-dist@3.9.179/cmaps/', // 字体文件地址  主要支持字体为汉字仿宋STSongStd-Light、数字字母Times New Roman、 STSongStd-Light
  THIRD_CODE_MSG: '该条件单目前不支持该标的，请选择其他监控标的', // 三方标的不支持提醒
  QUOTE_REFRESH_TIME: 3000, //行情刷新时间，默认3000毫秒，配置开关须在setting里开启
  SENSORSDATA: {
    OPEN: false,//是否开启埋点,
    URL: '',//埋点地址
    BRIDGE: false,//是否打通App
    LOG: false,//埋点日志
    MAX_STRING_LENGTH: 500,// 埋点上报的字符串属性值最多 500 长度，多余的会被截取
  }, //神策埋点

  BANNER_PARAMS: {
    HEADER: {
      ids: '',
      channel: ''
    },
    OPERATE: {
      ids: '',
      channel: ''
    }
  }, // banner位的入参，即使ids配多值，例如：'1,2,3',程序也采用第一个id。HEADER是头部banner，OPERATE是运营位banner
  OPEN_CHECK_MARKET_ENTRUST: false, // 是否开启创建页提交时市价委托权限校验功能
  MARKETID: {}, // 交易市场 长城超级网格跳转个股综合屏使用
  IS_SUPPORT_VIP: false,// 是否支持VIP客户使用条件单
  OPEN_CANCEL_REPEAT_REQUEST: false, // 是否开启取消重复请求功能
  CANCEL_REPEAT_REQUEST_CACHE_SAVE_TIME: 2000, // 取消重复请求缓存保存时间  从发起请求起计算 单位ms
  EXCLUDE_INTERFACE: ['querySubscribeProds'], // 取消接口重复请求排除的接口  用来处理一些不适用取消接口重复请求的接口
  USE_LOGIN: false, // 是否使用login接口登录
  XG_DETAIL: 'https://haxgxz.test.upchina.com/xgxz', //新股打新跳转详情页地址 【华安】
  FSTORE_URL: '', // fstore地址
  APP_DOWNLOAD_URL: '', // app下载地址
  IS_OPEN_PAY_CHECK: false, // 是否开启付费策略校验功能
  IS_OPEN_SMS_SET: false, // 是否支持短信  支持则跳转/homeset 否则跳转/set
  IS_TOKEN_REFRESH: false,  //消息通知页关闭是否刷新token,默认false
  SM2_PUBLIC_KEY: '', // 登录接口非对称加密公钥，无值代表不加密
};

// 字段说明配置
window.CONFIG_DETAILS = {
  API_HOME: {
    desc: '条件单服务的基础URL地址，用于API请求',
    example: 'baseUrl'
  },
  COMP_ID: {
    desc: '公司/券商的唯一标识ID',
    example: '1036'
  },
  BROKER_IDENTIFY: {
    desc: '当前券商标识符',
    example: ''
  },
  AES: {
    desc: '是否启用AES加密传输',
    example: false
  },
  AESPARAMSLISTRES: {
    desc: '需要进行AES解密的返回参数字段列表',
    example: ['hs_openid', 'fund_account', 'stock_account', 'ext', 'op_station', 'client_name', 'client_id', 'id_no', 'id_address', 'mobile', 'content']
  },
  DEADLINE: {
    DEFAULT: {
      desc: '其它策略的默认截止时间',
      example: '15:00:00'
    },
    DEFAULT_SUFFIX: {
      desc: '其它策略时间后缀(带空格)',
      example: ' 15:00'
    },
    GZNHG: {
      desc: '国债逆回购截止时间',
      example: '15:30:00'
    },
    GZNHG_SUFFIX: {
      desc: '国债逆回购时间后缀(带空格)',
      example: ' 15:30'
    },
    ZNGZNHG: {
      desc: '智能国债逆回购截止时间',
      example: '15:25:00'
    },
    ZNGZNHG_SUFFIX: {
      desc: '智能国债逆回购时间后缀(带空格)', 
      example: ' 15:25'
    },
    ZNDX_START: {
      desc: '智能打新开始时间',
      example: '09:30'
    },
    ZNDX_END: {
      desc: '智能打新截止时间',
      example: '14:57'
    },
    ZNDX_DEFAULT: {
      desc: '智能打新默认选择时间',
      example: '10:00'
    },
    TIME_STRATEGY_END: {
      desc: '时间类策略(定时买卖、ETF定投)触发时间结束时间',
      example: '14:56'
    },
    BUY_SELL_TWO_WAY_END: {
      desc: '先买后卖、先卖后买策略截止时间',
      example: '14:57'
    }
  },
  RANGE: {
    STEP_SIZE: {
      desc: '涨跌幅度的最小步长',
      example: 0.01
    },
    ZYTJ_LOW_PRICE: {
      desc: '止盈条件下限(包含)',
      example: 0.5
    },
    ZYTJ_HIGH_PRICE: {
      desc: '止盈条件上限(包含)',
      example: 999.99
    },
    ZSTJ_LOW_PRICE: {
      desc: '止损条件下限(包含)',
      example: 0.5
    },
    ZSTJ_HIGH_PRICE: {
      desc: '止损条件上限(包含)',
      example: 99.99
    },
    SEARCH_LIMIT: {
      desc: '股票搜索键盘精灵分页查询最大条数',
      example: 10
    }
  },
  QUOTA: {
    AMOUNT: {
      desc: '委托金额限制',
      example: '1000'
    },
    QUANTITY: {
      A: {
        desc: '沪深A股数量限制',
        example: '1000000'
      },
      FUND: {
        desc: '沪深基金数量限制',
        example: '1000000'
      },
      KZZ: {
        desc: '沪深可转债数量限制',
        example: '1000000'
      },
      STB: {
        desc: '科创板限价委托数量限制',
        example: '100000'
      },
      EPM: {
        desc: '创业板限价委托数量限制',
        example: '300000'
      },
      STB_SJ: {
        desc: '科创板市价委托数量限制',
        example: '50000'
      },
      EPM_SJ: {
        desc: '创业板市价委托数量限制',
        example: '150000'
      },
      BJAG: {
        desc: '北京A股数量限制',
        example: '1000000'
      }
    }
  },
  ENTRUSTSTATUS: {
    0: {
      desc: '委托状态:未报',
      example: '未报'
    },
    1: {
      desc: '委托状态:待报',
      example: '待报'  
    },
    2: {
      desc: '委托状态:已报',
      example: '已报'
    },
    3: {
      desc: '委托状态:已报待撤',
      example: '已报待撤'
    },
    4: {
      desc: '委托状态:部成待撤',
      example: '部成待撤'
    },
    5: {
      desc: '委托状态:部撤',
      example: '部撤'
    },
    6: {
      desc: '委托状态:已撤',
      example: '已撤'
    },
    7: {
      desc: '委托状态:部成',
      example: '部成'
    },
    8: {
      desc: '委托状态:已成',
      example: '已成'
    },
    9: {
      desc: '委托状态:废单',
      example: '废单'
    },
    10: {
      desc: '委托状态:撤单未成',
      example: '撤单未成'
    },
    11: {
      desc: '委托状态:申请资金授权中',
      example: '申请资金授权中'
    },
    W: {
      desc: '委托状态:待确认',
      example: '待确认'
    },
    V: {
      desc: '委托状态:已确认',
      example: '已确认'
    },
    E: {
      desc: '委托状态:已否决',
      example: '已否决'
    }
  }
}

window.PERSONALIZE_SETTING = {
  'mainThemeColor': '#FA4747',
  'strategyTextMapConfig': {
    '8': {
      'name': '定价买入'
    }
  },
  'strategyFilterConfig': {},
  'defaultFilterConfig': {
    'maxDate': 364,
    'startDate': '2024-11-16T10:06:01.306Z',
    'endDate': '2024-12-15T10:06:01.306Z'
  },
  'historyCellColorConfig': {
    'title': '#666',
    'value': '#333',
    'typeColor': '#FA4747'
  },
  'historyCellFieldConfig': {
    'jkz': [
      'tjdh',
      'cftj',
      'wtjg',
      'wtsl',
      'wtje',
      'wtlx',
      'wtfx',
      'jzrq',
      'cjsj',
      'xdsj',
      'xdje',
      'sgrq',
      'sgsj',
      'sgjg',
      'sgsl'
    ],
    'ycf': [
      'tjdh',
      'sjcf',
      'cfsj',
      'wtsj',
      'wtfx',
      'sjwtjg',
      'wtsl',
      'wtje',
      'wtzt',
      'sbyy',
      'sgjg',
      'xdje',
      'xdsj'
    ],
    'yjs': [
      'tjdh',
      'cftj',
      'wtjg',
      'wtsl',
      'wtje',
      'wtlx',
      'wtfx',
      'jzrq',
      'cjsj',
      'xdsj',
      'xdje',
      'sgrq',
      'sgsj',
      'sgjg',
      'sgsl',
      'jssj',
      'jsyy'
    ]
  },
  'confirmTipColorConfig': {
    'title': '#323233',
    'value': '#666'
  },
  'confirmTipFieldConfig': {
    'zndx': [
      'dxsj',
      'sgsl',
      'yypz'
    ],
    'gdmr': [
      'zqmc',
      'zqdm',
      'tjlx',
      'gdzh',
      'cftj',
      'wtjg',
      'wtsl',
      'wtje',
      'wtfs',
      'gjsz',
      'jzrq'
    ],
    'djmc': [
      'zqmc',
      'zqdm',
      'tjlx',
      'gdzh',
      'cftj',
      'wtjg',
      'wtsl',
      'wtje',
      'wtfs',
      'gjsz',
      'jzrq'
    ],
    'zyzs': [
      'zqmc',
      'zqdm',
      'tjlx',
      'gdzh',
      'cftj',
      'wtjg',
      'wtsl',
      'wtje',
      'wtfs',
      'gjsz',
      'jzrq'
    ],
    'rzdf': [
      'zqmc',
      'zqdm',
      'tjlx',
      'gdzh',
      'cftj',
      'wtjg',
      'wtsl',
      'wtje',
      'wtfs',
      'gjsz',
      'wtfx',
      'jzrq'
    ],
    'etfdt': [
      'zqmc',
      'zqdm',
      'tjlx',
      'gdzh',
      'cftj',
      'wtjg',
      'wtsl',
      'wtje',
      'wtfs',
      'jzrq'
    ],
    'ftmr': [
      'zqmc',
      'zqdm',
      'tjlx',
      'gdzh',
      'cftj',
      'wtjg',
      'wtsl',
      'wtje',
      'wtfs',
      'gjsz',
      'jzrq'
    ],
    'hlmc': [
      'zqmc',
      'zqdm',
      'tjlx',
      'gdzh',
      'cftj',
      'wtjg',
      'wtsl',
      'wtje',
      'wtfs',
      'gjsz',
      'jzrq'
    ],
    'kbmc': [
      'zqmc',
      'zqdm',
      'tjlx',
      'gdzh',
      'cftj',
      'wtjg',
      'wtsl',
      'wtje',
      'wtfs',
      'gjsz',
      'jzrq'
    ],
    'jxtp': [
      'zqmc',
      'zqdm',
      'tjlx',
      'gdzh',
      'cftj',
      'wtjg',
      'wtsl',
      'wtje',
      'wtfs',
      'gjsz',
      'wtfx',
      'jzrq'
    ],
    'bzwj': [
      'zqmc',
      'zqdm',
      'tjlx',
      'gdzh',
      'cftj',
      'jzrq',
      'mrjg',
      'mcjg',
      'mbwt',
      'wtje',
      'wtfs',
      'bswt',
      'wtlx'
    ],
    'gznhg': [
      'zqmc',
      'zqdm',
      'tjlx',
      'gdzh',
      'cftj',
      'wtjg',
      'wtsl',
      'wtje',
      'wtfs',
      'jzrq'
    ],
    'dsmm': [
      'zqmc',
      'zqdm',
      'tjlx',
      'gdzh',
      'cftj',
      'wtjg',
      'wtsl',
      'wtje',
      'wtfs',
      'wtfx'
    ],
    'ldmm': [
      'zqmc',
      'zqdm',
      'tjlx',
      'gdzh',
      'cftj',
      'wtjg',
      'wtsl',
      'wtje',
      'wtfs',
      'gjsz',
      'wtfx',
      'jzrq'
    ],
    'fpmr': [
      'zqmc',
      'zqdm',
      'tjlx',
      'gdzh',
      'cftj',
      'wtjg',
      'wtsl',
      'wtje',
      'wtfs',
      'gjsz',
      'jzrq'
    ],
    'fpmc': [
      'zqmc',
      'zqdm',
      'tjlx',
      'gdzh',
      'cftj',
      'wtjg',
      'wtsl',
      'wtje',
      'wtfs',
      'gjsz',
      'jzrq'
    ],
    'zngznhg': [
      'zqmc',
      'zqdm',
      'tjlx',
      'gdzh',
      'cftj',
      'wtjg',
      'wtsl',
      'wtje',
      'wtfs',
      'xdpz',
      'xdsj',
      'xdll',
      'xdje',
      'jzrq'
    ],
    'yswt': [
      'zqmc',
      'zqdm',
      'tjlx',
      'gdzh',
      'cftj',
      'wtfx',
      'wtjg',
      'wtsl'
    ],
    'ztmm': [
      'zqmc',
      'zqdm',
      'tjlx',
      'gdzh',
      'cftj',
      'wtjg',
      'wtsl',
      'wtje',
      'gjsz',
      'wtfx',
      'jzrq'
    ]
  },
  'mainXieyiif': false,
  'subMission': false,
  'isPricelimit': false,
  'mainNavhistory': false,
  'xieyiif': true,
  'isShowNavBar': true,
  'navBarRightText': '',
  'triggerConditionText': '',
  'marketPlan': false,
  'wtMultiple': true,
  'wtlxGxh': true,
  'countProportion': false,
  'bzStrategy': false,
  'isShowAppNotice': false,
  'showDescription': '',
  'selectSeven': true,
  'isShowTrigger': true,
  'showCopyButton': true,
  'advancedSetupSetting': [
    '1',
    '2',
    '3',
    '4',
    '5'
  ],
  'hasEntrustTypeConfig': [
    '1',
    '2'
  ],
  'isShowTriggerType': false,
  'isOpenReitsCheckProf': false,
  'isBackToPage': false,
  'showGdmr': false,
  'isShowIntroduction': false,
  'showWtNotice': true,
  'hasSuspendAndRestore': true,
  'isSupportHistorySearch': false,
  'introImgUrlList': {},
  'showBackSellSwitch': false,
  'supportPriceDiff': false,
  'isSupportReitsWarnTip': false,
  'showWtjgDes': true,
  'detailsConfig': {
    '7': [
      'wtfx'
    ],
    '9': [
      'wtfx'
    ],
    '22': [
      'wtfx'
    ],
    '35': [
      'jzj'
    ],
    '38': [
      'wtfx'
    ]
  },
  'isShowUpWtfxDetails': true,
  'isShowDsmmCreateTime': true,
  'showSjwtWtjgDes': true,
  'limitQuery': [
    22
  ],
  'showHomeRight': false,
  'isOpenGoStockDetail': false,
  'bzwjTriggerFailedDesDiff': false,
  'isOpenTriggerPriceFixed': true,
  'isShowAnalyseHot': true,
  'zndxActivatePermissions': false,
  'localZndxFxjs': true,
  'isShowZndxSx': false,
  'zndxNoticeBarTopIsShow': false,
  'zndxNoticeBarBottomIsShow': false,
  'openZndxSubmitCheck': false,
  'knowMore': true,
  'kbmcRiskWarning': [
    '1、盘中临停期间创建开板卖出条件单，将以临停前最新价作为触发基准价，如遇复盘后直接下跌，可能导致委托价格过高，从而无法成交。',
    '2、根据证券交易规则，上市前5日无涨跌幅限制品种，无涨跌停限制，不支持开板卖出条件单创建。'
  ],
  'dsmmWritePrompt': false,
  'zndxJumpIntroductionIsShow': false,
  'isShowEnableBalanceInBuyDirection': false,
  'isRefreshQuotation': false,
  'isOpenNativeFeedBack': false
}