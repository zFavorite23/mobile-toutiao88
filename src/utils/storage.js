
// 封装一个用于操作本地存储的工具模块

// 存入token
export const setItem = (name, value) => {
  return window.localStorage.setItem(name, JSON.stringify(value))
}

// 获取token值
export const getItem = name => {
  return JSON.parse(window.localStorage.getItem(name))
}

// 删除token
export const removeItem = name => {
  return window.localStorage.removeItem(name)
}
