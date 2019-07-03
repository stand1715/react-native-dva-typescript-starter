import { PureComponent } from 'react';
import * as React from 'react';
import { BackHandler, Animated, Easing } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  NavigationActions,
} from 'react-navigation';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';

import Loading from './containers/Loading';
import Login from './containers/Login';
import Home from './containers/Home';
import Account from './containers/Account';
import Detail from './containers/Detail';

const HomeNavigator = createBottomTabNavigator({
  Home: { screen: Home },
  Account: { screen: Account },
});

HomeNavigator.navigationOptions = ({ navigation }: any) => {
  const { routeName } = navigation.state.routes[navigation.state.index];

  return {
    headerTitle: routeName,
  };
};

const MainNavigator = createStackNavigator(
  {
    HomeNavigator: { screen: HomeNavigator },
    Detail: { screen: Detail },
  },
  {
    headerMode: 'float',
  },
);

const AppNavigator = createStackNavigator(
  {
    Main: { screen: MainNavigator },
    Login: { screen: Login },
  },
  {
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false,
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: (sceneProps) => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateY }] };
      },
    }),
  },
);

export const routerReducer = createNavigationReducer(AppNavigator);

export const routerMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => (state as any).router,
);

const App = reduxifyNavigator(AppNavigator, 'root');

const getActiveRouteName = (navigationState: any): any => {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
};


class Router extends PureComponent {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backHandle);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandle);
  }

  backHandle = () => {
    const currentScreen = getActiveRouteName((this.props as any).router);
    if (currentScreen === 'Login') {
      return true;
    }
    if (currentScreen !== 'Home') {
      (this.props as any).dispatch(NavigationActions.back());
      return true;
    }
    return false;
  }

  render() {
    const { app, dispatch, router } = this.props as any;
    if (app.loading) return <Loading />;

    return <App dispatch={dispatch} state={router} />;
  }
}

export default connect(({ app, router }: any) => ({ app, router }))(Router);
