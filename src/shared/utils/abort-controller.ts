class AbortFactory {
  controllers: Record<string, AbortController> = {};
  instance = null;
  static instance: AbortFactory;

  constructor() {
    if (!!this) return AbortFactory.instance;
    AbortFactory.instance = this;
    return this;
  }

  getControllers = () => {
    return this.controllers;
  };
  genController = (name: string) => {
    if (!this.controllers) {
      this.controllers = {};
    }
    this.controllers[name] = new AbortController();
    return this.controllers[name];
  };
  abort = (name: string) => {
    if (this.controllers[name]) {
      this.controllers[name].abort();
      this.clearController(name);
    }
  };
  clearController = (name: string) => {
    if (this.controllers[name]) {
      delete this.controllers[name];
    }
  };
  abortAll = (excludeList: string[] = []) => {
    const allControllers = this.controllers || {};
    Object.keys(allControllers).forEach((i) => {
      if (excludeList.includes(i)) return;
      this.controllers[i].abort();
      this.clearController(i);
    });
  };
  clearAllControllers = () => {
    this.controllers = {};
  };
}

const ApiAbortController = new AbortFactory();

Object.freeze(ApiAbortController);

export { ApiAbortController };
