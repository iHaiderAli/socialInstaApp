import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { AppColors, AppTexts } from '../utils/DesignConstants';

class ActivityIndicatorRed extends Component {

   state = { animating: true }

   closeActivityIndicator = () => setTimeout(() => this.setState({
      animating: false
   }), 60000)

   render() {
      const animating = this.state.animating
      return (
         <View style={styles.activityIndicator} >
            <ActivityIndicator
               animating={animating}
               color={AppColors.COLOR_WHITE}
               size={AppTexts.large}
            />
         </View>
      )
   }
}
export default ActivityIndicatorRed

const styles = StyleSheet.create({

   activityIndicator: {
      position: AppTexts.absolute,
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: AppTexts.centerText,
      justifyContent: AppTexts.centerText
   }
})