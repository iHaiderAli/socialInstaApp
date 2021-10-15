import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import InstagramLogin from 'react-native-instagram-login';

import * as constants from '../utils/AppConstants'
import { AppTexts, AppColors, AppDimens } from '../utils/DesignConstants'
import { Colors } from "react-native/Libraries/NewAppScreen";

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      token: '',
    };
  }

  setIgToken = (data) => {
    console.log('data', data)
    this.setState({ token: data.access_token })

    this.props.navigation.navigate(constants.POSTS, {
      userToken: token,
      otherParam: 'Pass whatever you want here',
    });

  }

  render() {

    return (
      <View style={{ flex: 1, justifyContent: AppTexts.centerText, alignItems: AppTexts.centerText }}>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            this.instagramLogin.show();
          }}>
          <Text style={{ color: AppColors.COLOR_WHITE, textAlign: AppTexts.centerText }}>Login now</Text>
        </TouchableOpacity>

        <Button
          title="Go to Login"
          onPress={() => {
            this.props.navigation.navigate(constants.POSTS, {
              userToken: 'asdf',
              otherParam: 'Pass whatever you want here',
            });
          }}
        />

        <Text style={{ margin: 20, color: Colors.black }}>Token: {this.state.token}</Text>
        {this.state.failure && (
          <View>
            <Text style={{ margin: AppDimens.ten }}>
              failure: {JSON.stringify(this.state.failure)}
            </Text>
          </View>
        )}
        <InstagramLogin
          ref={ref => (this.instagramLogin = ref)}
          appId= {constants.APP_ID}
          appSecret= {constants.APP_SECRET}
          redirectUrl={constants.REDIRECT_URL}
          scopes={['user_profile', 'user_media']}
          onLoginSuccess={this.setIgToken}
          onLoginFailure={(data) => console.log(data)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: AppDimens.five,
    margin: 20,
    backgroundColor: AppColors.ORANGE,
    height: 30,
    width: AppDimens.hundred,
    justifyContent: AppTexts.centerText,
    alignItems: AppTexts.centerText,
  }
});

export default Login;
