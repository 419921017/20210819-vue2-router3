import install from './install';
import { createMatcher } from './createMatcher';
import Hash from './history/hash';
import HTML5History from './history/h5';

export class VueRouter {
  constructor(options = {}) {
    const routes = options.routes;
    this.mode = options.mode || 'hash';
    // 根据路由匹配对应的组件
    this.matcher = createMatcher(routes || []);

    switch (this.mode) {
      case 'hash':
        this.history = new Hash(this);
        break;
      case 'history':
        this.history = new HTML5History(this);
        break;
    }
    this.beforeHooks = [];
  }
  match(location) {
    return this.matcher.match(location);
  }
  push(location) {
    this.history.transitionTo(location, () => {
      this.history.pushState(location);
    });
  }
  init(app) {
    const history = this.history;
    // hash     hashchagne

    // history  popstate

    const setUpListener = () => {
      history.setUpListener();
    };
    // 页面初始化后需要先进行一次跳转
    history.transitionTo(history.getCurrentLocation(), setUpListener);
    // 只有current是响应式的, _route不是响应式的, 需要重新赋值
    history.listen((route) => {
      app._route = route;
    });
  }
  beforeEach(cb) {
    this.beforeHooks.push(cb);
  }
}

VueRouter.install = install;

export default VueRouter;
