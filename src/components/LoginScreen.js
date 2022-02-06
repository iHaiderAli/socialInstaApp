import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, BackHandler, Alert } from 'react-native';

import * as constants from '../utils/AppConstants'
import { AppTexts, AppColors, AppDimens } from '../utils/DesignConstants'
import AppUtils from '../utils/AppUtils';
import NetInfo from '@react-native-community/netinfo'
import ActivityIndicator from '../utils/ActivityIndicatorRed'

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { sendRequestAction } from "../actions/ApiActions";
import PhoneInput from 'react-native-phone-number-input';

class LoginScreen extends AppUtils {

  constructor(props) {
    super(props);
    this.state = { phoneNumber: '' }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
  }
  
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
  }

  backPressed = () => {
    Alert.alert(
      'Exit App',
      'Do you want to exit?',
      [
        {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => BackHandler.exitApp()},
      ],
      { cancelable: false });
      return true;
  }

  async doUserLogin() {

    if (this.state.phoneNumber === '') {
      this.showAlertMsg(constants.STR_PHONE_NO_REQUIRED);
      return
    }

    var dataToSend = { phone: this.state.phoneNumber };

    NetInfo.fetch().then(state => {

      if (state.isConnected) {

        this.props.sendRequestAction(constants.SEND_OTP, dataToSend, constants.METHOD_POST, null)
          .then((res) => {

            if (this.props.success) {
              if (this.props.response.status.code == constants.SUCCESS_CODE) {
                
                this.props.navigation.navigate(constants.VERIFICATION_SCREEN, {
                  otpToken: this.props.response.data.token
                });

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

    return (
      <View style={{ flex: 1, alignItems: AppTexts.centerText, backgroundColor: AppColors.PRIMARY_COLOR }}>

        <Text
          style={{ color: AppColors.COLOR_WHITE, fontSize: AppDimens.twenty, fontWeight: AppTexts.boldText, alignItems: AppTexts.centerText, marginTop: AppDimens.fifty }}
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
          style={{
            alignSelf: AppTexts.centerText, width: '80%', height: AppDimens.sixty, marginTop: AppDimens.forty,
            backgroundColor: AppColors.SECONDARY_COLOR, borderRadius: AppDimens.fifteen
          }}
          onPress={() => {
            this.doUserLogin()

            // this.props.navigation.navigate(constants.VERIFICATION_SCREEN, {
            //   param: 'Pass whatever you want here',
            // });
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
