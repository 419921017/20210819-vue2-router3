import History from './base';

function ensureHash() {
  if (!window.location.hash) {
    window.location.hash = '/';
  }
}

function getHash() {
  return window.location.hash.slice(1);
}

export default class Hash extends History {
  constructor(router) {
    super(router);
    // 是否有hash, 没有hash跳转到/
    ensureHash();
  }
  getCurrentLocation() {
    return getHash();
  }
  setUpListener() {
    window.addEventListener('hashchange', () => {
      this.transitionTo(getHash());
    });
  }
  pushState(location) {
    window.location.hash = location;
  }
}
