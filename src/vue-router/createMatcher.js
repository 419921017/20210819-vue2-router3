import { createRouteMap } from './createRouteMap';

export function createMatcher(routes) {
  // console.log('routes', routes);

  let { pathMap } = createRouteMap(routes);

  // console.log('pathMap', pathMap);

  function match(path) {
    return pathMap[path];
  }
  function addRoutes(routes) {
    createRouteMap(routes, pathMap);
  }

  return {
    match,
    addRoutes,
  };
}
