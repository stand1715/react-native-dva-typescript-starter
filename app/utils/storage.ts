import { AsyncStorage } from 'react-native'

function clear() {
  return AsyncStorage.clear()
}

function get(key: any, defaultValue = null) {
  return AsyncStorage.getItem(key).then(
    value => (value !== null ? JSON.parse(value) : defaultValue)
  )
}

function set(key: any, value: any) {
  return AsyncStorage.setItem(key, JSON.stringify(value))
}

function remove(key: any) {
  return AsyncStorage.removeItem(key)
}

function multiGet(...keys: any) {
  return AsyncStorage.multiGet([...keys]).then(stores => {
    const data: any = {};
    stores.forEach((result, i, store) => {
      data[store[i][0]] = JSON.parse(store[i][1])
    })
    return data
  })
}

function multiRemove(...keys: any[]) {
  return AsyncStorage.multiRemove([...keys])
}

export default {
  clear,
  get,
  set,
  remove,
  multiGet,
  multiRemove,
}
