import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

import * as constants from '../../utils/AppConstants'
import { AppTexts, AppColors, AppDimens } from '../../utils/DesignConstants'
import AppUtils from '../../utils/AppUtils';
import NetInfo from '@react-native-community/netinfo'
import ActivityIndicator from '../../utils/ActivityIndicatorRed'

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { sendRequestAction } from "../../actions/ApiActions";

class TabOneScreen extends AppUtils {

  constructor(props) {
    super(props);
  }

  render() {

    const { loading } = this.props;
    // Access the postId and otherParam via Destructuring assignment
    // const { otpToken } = this.props.route.params;

    return (
      <View style={{ flex: 1, alignItems: AppTexts.centerText, backgroundColor: AppColors.PRIMARY_COLOR }}>

         {/* <TouchableOpacity
          style={{
            alignSelf: AppTexts.centerText, width: '80%', height: AppDimens.sixty, marginTop: AppDimens.forty,
            backgroundColor: AppColors.SECONDARY_COLOR, borderRadius: AppDimens.fifteen
          }}
          onPress={() => {
           
            this.props.navigation.navigate('Details', {
              param: 'Pass whatever you want here',
            });

          }}>

          <Text
            style={{
              color: AppColors.COLOR_WHITE, fontFamily: AppTexts.font_UbuntuCondensed,
              alignSelf: AppTexts.centerText, textAlignVertical: AppTexts.centerText, height: AppDimens.sixty
            }}
          >{constants.STR_CONTINUE}</Text>

        </TouchableOpacity> */}

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

export default connect(mapStateToProps, mapDispatchToProps)(TabOneScreen);
