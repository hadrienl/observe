export class State {
  _props = {};
  _observers = [];

  addKey(key) {
    if (this._props[key]) {
      return;
    }
    this._props[key] = {};
    Object.defineProperty(this, key, {
      set(v) {
        this._props[key].prev = this._props[key].current;
        this._props[key].current = v;
        this._observers.map(o => {
          if (o.key === key) {
            o.fn(this._props[key].current, this._props[key].prev);
          }
        });
      },
      get() {
        return this._props[key].current;
      }
    });
  }

  observe(key, fn) {
    this.addKey(key);
    const index = this._observers.push({
      key, fn
    });
    if (this._props[key].current !== undefined) {
      fn(this._props[key].current);
    }
    return () => {
      this._observers.splice([index - 1]);
    };
  }
}

