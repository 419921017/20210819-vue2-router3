const RouterView = {
  functional: true,
  render(h, { parent, data }) {
    let route = parent.$route;
    let depth = 0;
    while (parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      parent = parent.$parent;
    }
    console.log('route.matched', route.matched);
    let record = route.matched[depth];
    console.log('record', record);
    if (!record) {
      return h();
    }
    // 渲染匹配到的组件,
    data.routerView = true;
    // 依次将matched的结果赋予给router-view
    return h(record.component, data);
  },
};
export default RouterView;
