const LogUtil = require('../utils/LogUtil');

class Cache {
  constructor() {
    this.store = new Map();
  }

  get(key) {
    LogUtil.info(`[Cache] [get] [START] Getting key [${key}]`);
    
    const entry = this.store.get(key);
  
    if (!entry) {
      LogUtil.info(`[Cache] [get] [END] Key not found [${key}]`);
      return null;
    }

    const { value, expiry } = entry;
    
    if (Date.now() > expiry) {
      LogUtil.info(`[Cache] [get] [END] Key expired [${key}]`);
      this.store.delete(key);
      return null;
    }

    LogUtil.info(`[Cache] [get] [END] Key found [${key}]`);
    return value;
  }

  set(key, value, time) {
    LogUtil.info(`[Cache] [set] [START] Setting key [${key}]`);
    const expiry = Date.now() + time;
    this.store.set(key, { value, expiry });
    LogUtil.info(`[Cache] [set] [END] Key set [${key}]`);
  }

  del(key) {
    LogUtil.info(`[Cache] [del] [START] Deleting key [${key}]`);
    this.store.delete(key);
    LogUtil.info(`[Cache] [del] [END] Key deleted [${key}]`);
  }
}

module.exports = Cache;