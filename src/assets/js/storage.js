const storage = window.localStorage;

export default {
  set(key, val) {
    if (val === undefined) {
      return;
    }
    // 储存item 需要将 object to string
    storage.setItem(key, serialize(val));
  },

  get(key, def) {
    // 获取item 需要将 string to object
    const val = deserialize(storage.getItem(key));
    return val === undefined ? def : val;
  },

  remove(key) {
    storage.removeItem(key);
  },

  clear() {
    storage.clear();
  }
};

function serialize(val) {
  // 通过 JSON.stringify() 把 JavaScript 对象转换为字符串
  return JSON.stringify(val);
}

function deserialize(val) {
  if (typeof val !== 'string') {
    return undefined;
  }
  try {
    // 通过 JSON.parse() 把 字符串转换为JavaScript 对象
    return JSON.parse(val);
  } catch (e) {
    return val || undefined;
  }
}
