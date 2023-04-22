class Cache {
  get(key: string) {
    let value = window.sessionStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }
  set(key: string, value: any) {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }
  delete(key: string) {
    window.sessionStorage.removeItem(key);
  }
  clear() {
    window.sessionStorage.clear()
  }
}

export default new Cache()
