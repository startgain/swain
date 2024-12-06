// 引入依赖
import eruda from 'eruda';
import erudaSwain from './eruda-swain';
import erudaDetail from './eruda-detail';

// 初始化 eruda
eruda.init();

// 注册插件
eruda.add(erudaSwain);
eruda.add(erudaDetail); 