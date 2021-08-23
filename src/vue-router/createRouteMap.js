/**
 *
 *
 * 创建路由的映射表
 * @param {*} routes
 * @param {*} oldPathMap 旧的映射表, 如果存在需要将routes格式化后放到oldPathMap中
 */
export function createRouteMap(routes, oldPathMap) {
  // 如果没有传递映射表, 需要生成一个
  let pathMap = oldPathMap || {};
  // routes添加到pathMap中
  routes.forEach((route) => addRouteRecord(route, pathMap));

  return {
    pathMap,
  };
}

/**
 * 添加路由信息到映射表中
 *
 * @param {*} route
 * @param {*} pathMap
 * @param {*} parent 父记录, 父子关系
 */
function addRouteRecord(route, pathMap, parent) {
  // 将记录和路径关联
  let path = parent ? parent.path + '/' + route.path : route.path;

  let record = {
    path,
    component: route.component,
    props: route.props || {},
    parent,
  };

  pathMap[path] = record;
  // 处理children
  route.children &&
    route.children.forEach((childRoute) =>
      addRouteRecord(childRoute, pathMap, record)
    );
}
