import React, { PureComponent } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { AppColors, AppDimens, AppTexts, AppIcons } from "../utils/DesignConstants";

class NoDataFound extends PureComponent {

  render() {
    return (
      <View style={{
        height: "90%",
        justifyContent: AppTexts.centerText,
        alignItems: AppTexts.centerText,
      }}>
        <Image source={AppIcons.ALERT_ICON} style={styles.alertStyle} />

        <Text style={styles.normalTextStyle}>
          No Records Found
        </Text>
      </View>
    );
  }
}

export default NoDataFound;

const styles = StyleSheet.create({

  normalTextStyle: {
    color: AppColors.COLOR_BLACK,
    fontSize: AppDimens.eighteen,
    marginBottom: AppDimens.ten,
    marginTop: AppDimens.ten,
    fontFamily: AppTexts.fontFamily,
  },
  alertStyle: {
    height: 90,
    width: 90,
  },
});
