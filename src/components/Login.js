import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import InstagramLogin from 'react-native-instagram-login';

import * as constants from '../utils/AppConstants'
import { AppTexts, AppColors, AppDimens } from '../utils/DesignConstants'
import { Colors } from "react-native/Libraries/NewAppScreen";
import AppUtils from '../utils/AppUtils';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { sendRequestAction } from "../actions/ApiActions";
import {
  AUTHORIZATION_CODE, BASE_API_URL,
  BASE_GRAPH_URL,
  LONG_ACCESS_TOKEN,
  REDIRECT_URL,
  SHORT_ACCESS_TOKEN,
  USER_ID,
} from "../utils/AppConstants";

class Login extends AppUtils {

  constructor(props) {
    super(props);
    this.state = {
      token: '',
    };

  }

  get_short_access_token = (data) => {
    console.log('data1', data)

    // fetch('https://api.instagram.com/oauth/access_token', {
    //   method: 'POST',
    //   body: new URLSearchParams({
    //     'client_id': constants.APP_ID,
    //     'client_secret': constants.APP_SECRET,
    //     'grant_type': 'authorization_code',
    //     'redirect_uri': constants.REDIRECT_URL,
    //     'code': data
    //   })
    // }).then(response => {
    //     // Do stuff with the response
    //   console.log(response)
    //   });

    // this.saveValueInSharedPref(constants.USER_ID, data.user_id.toString())
    // this.saveValueInSharedPref(constants.USER_TOKEN, response.access_token)

    let param = "&client_secret="+constants.APP_SECRET+"&access_token="+data.access_token

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

    // this.props.sendRequestAction(constants.LONG_ACCESS_TOKEN+param, null, constants.METHOD_GET, null)
    //   .then((response) => {
    //     console.log('data4', response)
    //
    //     // this.props.navigation.navigate(constants.POSTS, {
    //     //   userToken: response.access_token,
    //     //   user_id: data.user_id
    //     // });
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     this.showAlertMsg(constants.REQUEST_ERROR);
    //   });

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

            // this.props.navigation.navigate(constants.POSTS, {
            //   userToken: "IGQVJXZA1BIRUtEOFU2ZAU9PY0lqeFNYZAm85VnY5dzVGbEFFbXJhM2U5cGNhY3gwdk1BYTZArd3JFUDRDWHdfZA0FMakZAyT1BaYkdpbzdVa3lVQlU0c2NpaDlaV2tSNEE1SjlDdHNtakRxOFozTGlpdjdZAUzdtTDdoZAnRXOHNR",
            //   userId: 17841449768847580,
            // });
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
    margin: 20,
    backgroundColor: AppColors.ORANGE,
    height: 30,
    width: AppDimens.hundred,
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
