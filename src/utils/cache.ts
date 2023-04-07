class Cache {
  get(key: string) {
    let value = window.localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }
  set(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
  delete(key: string) {
    window.localStorage.removeItem(key);
  }
  clear() {
    window.localStorage.clear()
  }
}

export default new Cache()
