import * as React from 'react';
import { Component } from 'react';
import { StyleSheet, View, Image, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { Button, Touchable } from '../components';

import { createAction, NavigationActions } from '../utils';

class Login extends Component {
  static navigationOptions = {
    title: 'Login',
  };

  onLogin = () => {
    (this.props as any).dispatch(createAction('app/login')());
  }

  onClose = () => {
    (this.props as any).dispatch(NavigationActions.back());
  }

  render() {
    const { fetching } = this.props as any;
    return (
      <View style={styles.container}>
        {fetching ? (
          <ActivityIndicator />
        ) : (
            <Button text="Login la on9" onPress={this.onLogin} />
          )}
        {!fetching && (
          <Touchable style={styles.close} onPress={this.onClose}>
            <Image
              style={styles.icon}
              source={require('../images/close.png')}
            />
          </Touchable>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  close: {
    position: 'absolute',
    right: 10,
    top: 30,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: 'gray',
  },
});

export default connect(({ app }: any) => ({ ...app }))(Login);


