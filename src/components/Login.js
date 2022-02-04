import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Alert } from 'react-native';

import * as constants from '../utils/AppConstants'
import { AppTexts, AppColors, AppDimens } from '../utils/DesignConstants'
import AppUtils from '../utils/AppUtils';
import NetInfo from '@react-native-community/netinfo'
import ActivityIndicator from '../utils/ActivityIndicatorRed'

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { sendRequestAction } from "../actions/ApiActions";
import PhoneInput from 'react-native-phone-number-input';

class Login extends AppUtils {

  constructor(props) {
    super(props);
    this.state = { countaryCode: '', phoneNumber: '', isSubmitting: false, error: '', success: false, loading: false, response: null, isLoading: true }
  }

  async doUserLogin() {

    if (this.state.phoneNumber === '') {
      this.showAlertMsg(constants.STR_PHONE_NO_REQUIRED);
      return
    }

    // let dataToSend = new FormData();
    // dataToSend.append('phone', this.state.phoneNumber)

    // let dataToSend = JSON.stringify({
    //   phone: this.state.phoneNumber
    // })

    let dataToSend = {
      phone: this.state.phoneNumber
    }

    // try {

    //   let fcmToken = await AsyncStorage.getItem(constants.FCM_TOKEN);
    //   if (!fcmToken) {
    //     this.showAlertMsg(constants.DEVICE_TOKEN_NOT_AVAILABLE)
    //     return
    //   }

    //   dataToSend.append(constants.FCM_TOKEN_SMALL, fcmToken);
    //   dataToSend.append(constants.DEVICE_ID, DeviceInfo.getDeviceId());

    // } catch (error) {
    //   console.error(error);
    // }

    NetInfo.fetch().then(state => {

      if (state.isConnected) {

        this.props.sendRequestAction(constants.SEND_OTP, dataToSend, constants.METHOD_POST, null)
          .then((res) => {

            if (this.props.success) {
              if (this.props.response.status == constants.SUCCESS) {

                this.setState({ phoneNumber: '' })
                this.saveValueInSharedPref(constants.SP_IS_LOGGED_IN, constants.SP_IS_LOGGED_IN)
                this.saveValueInSharedPref(constants.SP_USER_TOKEN, JSON.stringify(this.props.response.data.token))

                this.showAlertMsg(this.props.response.message);

                // this.props.navigation.navigate(constants.POSTS, {
                //   userToken: token,
                //   otherParam: 'Pass whatever you want here',
                // });

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

    const { navigation, loading } = this.props;

    return (
      <View style={{ flex: 1, alignItems: AppTexts.centerText, backgroundColor: AppColors.PRIMARY_COLOR }}>

        <Text
          style={{ color: AppColors.COLOR_WHITE, fontSize: AppDimens.twenty, fontWeight: AppTexts.boldText, alignItems: AppTexts.centerText, marginTop: AppDimens.thirty }}
        >{constants.STR_LOGIN_INFO}</Text>
        <Text
          style={{ color: 'rgba(255,255,255,0.8)', fontSize: AppDimens.twenty, textAlign: AppTexts.centerText, marginTop: AppDimens.five }}
        >{constants.STR_LOGIN_INFO_1}</Text>

        <PhoneInput
          defaultValue={''}
          defaultCode="PK"
          layout="first"
          withDarkTheme={true}
          autoFocus
          flagButtonStyle={{
            backgroundColor: AppColors.COLOR_WHITE,
          }}
          countryPickerButtonStyle={{
            backgroundColor: AppColors.INPUT_TEXT_BACKGROUND,
            borderRadius: AppDimens.fifteen
          }}
          codeTextStyle={{
            color: AppColors.COLOR_WHITE,
            fontSize: AppDimens.eighteen
          }}
          textInputStyle={{
            color: AppColors.COLOR_WHITE,
            fontSize: AppDimens.eighteen
          }}
          containerStyle={{
            width: '80%',
            height: AppDimens.sixty,
            backgroundColor: AppColors.INPUT_TEXT_BACKGROUND,
            marginTop: AppDimens.hundred,
            borderRadius: AppDimens.fifty,
          }}
          textContainerStyle={{ paddingVertical: 0, backgroundColor: AppColors.INPUT_TEXT_BACKGROUND, borderRadius: AppDimens.fifteen }}
          // onChangeText={(text) => {
          //   //Text change listener        
          //   this.setState({ phoneNumber: text })
          // }}

          onChangeFormattedText={(text) => {
            this.setState({ phoneNumber: text })
          }}
        />

        <TouchableOpacity
          style={{ alignSelf: AppTexts.centerText, width: '80%', height: AppDimens.sixty, marginTop: AppDimens.forty, backgroundColor: AppColors.SECONDARY_COLOR, borderRadius: AppDimens.fifteen }}
          onPress={() => {
            // this.doUserLogin()

            this.props.navigation.navigate(constants.POSTS, {
              userToken: 'sdfa',
              otherParam: 'Pass whatever you want here',
            });
          }}>

          <Text
            style={{
              color: AppColors.COLOR_WHITE, fontFamily: AppTexts.font_UbuntuCondensed,
              alignSelf: AppTexts.centerText, textAlignVertical: AppTexts.centerText, height: AppDimens.sixty
            }}
          >{constants.STR_LOGIN}</Text>

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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
