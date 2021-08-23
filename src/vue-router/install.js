import RouterLink from './components/RouterLink';
import RouterView from './components/RouterView';

export let Vue;

export default function install(_Vue) {
  Vue = _Vue;

  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        this._router = this.$options.router;
        this._routerRoot = this;

        this._router.init(this);

        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot;
      }
    },
  });

  // 方法
  Object.defineProperty(Vue.prototype, '$router', {
    get: function () {
      return this._routerRoot._router;
    },
  });
  // 属性
  Object.defineProperty(Vue.prototype, '$route', {
    get: function () {
      return this._routerRoot._route;
    },
  });

  Vue.component('router-link', RouterLink);
  Vue.component('router-view', RouterView);
}
