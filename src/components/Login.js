import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import InstagramLogin from 'react-native-instagram-login';

import * as constants from '../utils/AppConstants'
import { AppTexts, AppColors, AppDimens } from '../utils/DesignConstants'
import AppUtils from '../utils/AppUtils';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { sendRequestAction } from "../actions/ApiActions";

class Login extends AppUtils {

  constructor(props) {
    super(props);
    this.state = {
      token: '',
    };

  }

  //insta login returned the user Id and short token valid for 1 hour
  get_short_access_token = (data) => {
    console.log('token&userId', data)

    let param = "&client_secret="+constants.APP_SECRET+"&access_token="+data.access_token

    //Getting the user token valid for 60 days
    fetch(constants.BASE_URL+constants.LONG_ACCESS_TOKEN+param, {
      method:  constants.METHOD_GET,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);

        this.props.navigation.navigate(constants.POSTS, {
          userToken: responseJson.access_token,
          userId: data.user_id
        });
      })
      .catch((error) => {
        console.error(error);
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

        <InstagramLogin
          ref={ref => (this.instagramLogin = ref)}
          appId= {constants.APP_ID}
          appSecret= {constants.APP_SECRET}
          redirectUrl={constants.REDIRECT_URL}
          scopes={['user_profile', 'user_media']}
          onLoginSuccess={this.get_short_access_token}
          onLoginFailure={(data) => console.log(data)}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  btn: {
    borderRadius: AppDimens.five,
    margin: 50,
    backgroundColor: AppColors.ORANGE,
    height: 50,
    width: AppDimens.twoHundred,
    justifyContent: AppTexts.centerText,
    alignItems: AppTexts.centerText,
  }
});

const mapStateToProps = (state) => {
  const { error, success, loading, response } = state.getResponseReducer;
  return {
    error,
    success,
    loading,
    response,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendRequestAction: bindActionCreators(sendRequestAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
