import * as React from 'react'
import { create } from 'dva-core';
import { Provider, connect } from 'react-redux';

export { connect }

export default function (options: any) {
  const app = create(options)
  // HMR workaround
  if (!global.registered) options.models.forEach((model: any) => app.model(model))
  global.registered = true

  app.start()
  // eslint-disable-next-line no-underscore-dangle
  const store = app._store

  app.start = (container: any) => () => (<Provider store={store}>{container}</Provider>)
  app.getStore = () => store

  return app
}
