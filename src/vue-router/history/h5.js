import History from './base';

export default class HTML5History extends History {
  constructor(router) {
    super(router);
  }
  getCurrentLocation() {
    return window.location.href;
  }
  setUpListener() {
    window.addEventListener('popstate', () => {
      this.transitionTo(this.getCurrentLocation());
    });
  }
}
