import React from 'react';
import { Button, View, Text } from 'react-native';
import AppUtils from "../utils/AppUtils";
import * as constants from "../utils/AppConstants";
import { AppTexts } from '../utils/DesignConstants';

class HomeScreen extends AppUtils {

  constructor() {
    super();
  }

  render() {
    // Access the postId and otherParam via Destructuring assignment
    const { postDetail } = this.props.route.params;

    return (
      <View style={{ flex: 1, alignItems: AppTexts.centerText, justifyContent: AppTexts.centerText }}>

        <Button
          title="Go to Login"
          onPress={() => {
            this.props.navigation.navigate(constants.LOGIN_SCREEN);
          }}
        />

      </View>
    );
  }
}

export default HomeScreen;
