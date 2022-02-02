import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Image, TextInput } from 'react-native';

import * as constants from '../utils/AppConstants'
import { AppTexts, AppColors, AppDimens } from '../utils/DesignConstants'
import AppUtils from '../utils/AppUtils';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { sendRequestAction } from "../actions/ApiActions";

class Login extends AppUtils {

  constructor(props) {
    super(props);
    this.state = { userName: '', password: '', unitPos: 0, isSubmitting: false, error: '', success: false, loading: false, response: null, isLoading: true }
  }

  render() {

    return (
      <View style={{ flex: 1, alignItems: AppTexts.centerText, backgroundColor: AppColors.PRIMARY_COLOR }}>

        <Text
          style={{ color: AppColors.COLOR_WHITE, alignItems: AppTexts.centerText, marginTop: AppDimens.thirty}}
        >{constants.STR_LOGIN_INFO}</Text>
        <Text
          style={{ color: AppColors.COLOR_WHITE, alignItems: AppTexts.centerText, marginTop: AppDimens.ten}}
        >{constants.STR_LOGIN_INFO_1}</Text>

        <TextInput
          style={{ width: '75%', height: AppDimens.fifty, color: AppColors.COLOR_GREY, fontFamily: AppTexts.font_Ubuntu_Regular, borderColor: AppColors.INPUT_TEXT_BACKGROUND, backgroundColor: AppColors.INPUT_TEXT_BACKGROUND, alignSelf: AppTexts.centerText, marginTop: AppDimens.fifteen, borderRadius: AppDimens.fifteen, padding: AppDimens.ten, fontSize: AppDimens.fifteen }}
          placeholder={constants.STR_MOBILE_NO}
          returnKeyType={'next'}
          autoCapitalize={"none"}
          placeholderTextColor={AppColors.COLOR_GREY}
          value={this.state.userName}
          onChangeText={(input) => {
            this.setState({ userName: input })
          }} />

        <TouchableOpacity
          style={{ alignSelf: AppTexts.centerText, width: AppDimens.twoHundred, height: AppDimens.fifty, marginTop: AppDimens.forty, backgroundColor: AppColors.SECONDARY_COLOR, borderRadius: AppDimens.fifteen }}
          onPress={() => {
            this.doUserLogin()
          }}>

          <Text
            style={{ color: AppColors.COLOR_WHITE, fontFamily: AppTexts.font_UbuntuCondensed, alignSelf: AppTexts.centerText, textAlignVertical: AppTexts.centerText, height: AppDimens.fifty }}
          >{constants.STR_LOGIN}</Text>

        </TouchableOpacity>

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
