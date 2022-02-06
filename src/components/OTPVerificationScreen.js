import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

import * as constants from '../utils/AppConstants'
import { AppTexts, AppColors, AppDimens } from '../utils/DesignConstants'
import AppUtils from '../utils/AppUtils';
import NetInfo from '@react-native-community/netinfo'
import ActivityIndicator from '../utils/ActivityIndicatorRed'

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { sendRequestAction } from "../actions/ApiActions";

class OTPVerificationScreen extends AppUtils {

  constructor(props) {
    super(props);
    this.state = { otpNumber: '' }
  }

  async verifyOTP() {

    if (this.state.otpNumber === '') {
      this.showAlertMsg(constants.STR_OTP_NO_REQUIRED);
      return
    }

    var dataToSend = { otp: this.state.otpNumber };

    NetInfo.fetch().then(state => {

      if (state.isConnected) {

        this.props.sendRequestAction(constants.VERIFY_OTP, dataToSend, constants.METHOD_POST, this.props.route.params.otpToken)
          .then((res) => {

            if (this.props.success) {
              if (this.props.response.status.code == constants.SUCCESS_CODE) {

                this.setState({ otpNumber: '' })
                this.saveValueInSharedPref(constants.SP_IS_LOGGED_IN, constants.SP_IS_LOGGED_IN)
                this.saveValueInSharedPref(constants.SP_USER_TOKEN, JSON.stringify(this.props.response.data.token))

                this.props.navigation.navigate('Home', { screen: constants.HOME_SCREEN });

              } else {
                this.showAlertMsg(this.props.response.status.message);
              }
            } else {
              this.showAlertMsg(this.props.error)
            }
          })
          .catch((error) => {
            console.error(error);
            this.showAlertMsg(constants.SOMETHING_WENT_WRONG)
          });

      } else {
        this.showAlertMsg(constants.NO_INTERNET_MSG)
      }

    });
  }

  render() {

    const { loading } = this.props;
    // Access the postId and otherParam via Destructuring assignment
    const { otpToken } = this.props.route.params;

    return (
      <View style={{ flex: 1, alignItems: AppTexts.centerText, backgroundColor: AppColors.PRIMARY_COLOR }}>

        <Text
          style={{ color: 'rgba(255,255,255,0.8)', fontSize: AppDimens.twenty, textAlign: AppTexts.centerText, marginTop: AppDimens.five }}
        >{constants.STR_LOGIN_INFO_2}</Text>

        <TextInput
          style={{
            width: '80%', height: AppDimens.sixty, color: AppColors.COLOR_WHITE,
            fontFamily: AppTexts.font_Ubuntu_Regular, borderColor: AppColors.INPUT_TEXT_BACKGROUND,
            backgroundColor: AppColors.INPUT_TEXT_BACKGROUND, alignSelf: AppTexts.centerText,
            marginTop: AppDimens.hundred, borderRadius: AppDimens.fifteen, padding: AppDimens.ten, fontSize: AppDimens.twenty
          }}
          placeholder={constants.STR_OTP}
          returnKeyType={'next'}
          autoCapitalize={"none"}
          placeholderTextColor={'rgba(255,255,255,0.3)'}
          value={this.state.otpNumber}
          keyboardType="numeric"
          onChangeText={(input) => {
            this.setState({ otpNumber: input })
          }} />

        <TouchableOpacity
          style={{
            alignSelf: AppTexts.centerText, width: '80%', height: AppDimens.sixty, marginTop: AppDimens.forty,
            backgroundColor: AppColors.SECONDARY_COLOR, borderRadius: AppDimens.fifteen
          }}
          onPress={() => {
            this.verifyOTP()
          }}>

          <Text
            style={{
              color: AppColors.COLOR_WHITE, fontFamily: AppTexts.font_UbuntuCondensed,
              alignSelf: AppTexts.centerText, textAlignVertical: AppTexts.centerText, height: AppDimens.sixty
            }}
          >{constants.STR_CONTINUE}</Text>

        </TouchableOpacity>

        {loading && <ActivityIndicator />}

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

export default connect(mapStateToProps, mapDispatchToProps)(OTPVerificationScreen);
