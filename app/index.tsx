import * as React from 'react';

import dva from './utils/dva';
import { routerMiddleware, routerReducer } from './router';
import appModel from './models/app';
import Router from './router';

const app = dva({
  initialState: {},
  models: [appModel],
  extraReducers: { router: routerReducer },
  onAction: [routerMiddleware],
  onError(e: any) {
    console.log('onError', e);
  },
});

const App = app.start(<Router />);

// AppRegistry.registerComponent('ShitMatch', () => App);
export default App;
