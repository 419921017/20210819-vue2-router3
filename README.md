# vue2-router3

## history和hash的区别

开发环境使用了historyFallback, 生产环境要配置服务器路由地址


vue-router
_router, 实例


根据路径匹配对应组件, 渲染出来
## install

```js
let Vue
function install(Vue) {
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        // 根组件
        this._router = this.$options.router

        // 根组件唯一的标识_routerRoot指向自己
        this._routerRoot = this
        this._router.init(this)
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot
      }
    }
    // 所有组件都通过_routerRouter._router获取路有实例
  })
}

export {
  Vue
}
```

## $router
存放方法
## $route

## router-link
全局组件, 用于路由跳转

## router-view
全局组件, 用于组件渲染
