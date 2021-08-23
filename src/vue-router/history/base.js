function createRoute(record, location) {
  const matched = [];
  if (record) {
    while (record) {
      // 不停的去父级查找
      matched.unshift(record);
      record = record.parent;
    }
  }
  return {
    ...location,
    matched,
  };
}

export default class History {
  constructor(router) {
    this.router = router;
    this.current = createRoute(null, { path: '/' });
  }
  transitionTo(path, cb) {
    // 路由匹配到的记录
    let record = this.router.match(path);
    let route = createRoute(record, { path });

    // 1. 保证跳转路径和当前路径一直
    // 2. 匹配到的记录个数和当前匹配个数一致
    if (
      path == this.current.path &&
      route.matched.length == this.current.matched.length
    ) {
      return;
    }
    // 跳转前, 执行对应的钩子

    let queue = this.router.beforeHooks;
    function runQueue(queue, iterator, cb) {
      function step(index) {
        if (index >= queue.length) {
          return cb();
        }
        let hook = queue[index];
        iterator(hook, () => step(index + 1));
      }
      step(0);
    }

    const iterator = (hook, next) => {
      hook(route, this.current, next);
    };
    runQueue(queue, iterator, () => {
      this.updateRoute(route);
      cb && cb();
    });
  }
  listen(cb) {
    this.cb = cb;
  }
  updateRoute(route) {
    // 路径变化渲染组件, 响应式原理
    // 将current变成响应式, 只要更改current就可以渲染组件
    // this.current = createRoute(record, { path });
    this.current = route;
    // Vue.util.defineReactive() === defineReactive
    this.cb && this.cb(route);
  }
}
