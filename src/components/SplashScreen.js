import React from 'react';
import { View, ImageBackground, Image, StyleSheet, SafeAreaView } from 'react-native';
import { AppColors, AppTexts, AppDimens, AppIcons } from '../utils/DesignConstants';
import * as constants from '../utils/AppConstants'
import AppUtils from '../utils/AppUtils'

export default class SplashScreen extends AppUtils {

    goToNextScreen = (launchScreen) => {
        this.props.navigation.navigate(launchScreen, {
            param: 'Pass whatever you want here',
          });
    }

    componentDidMount() {

        const context = this;

        let interval = setInterval(function () {

            clearInterval(interval);

            let launchScreen = constants.LOGIN_SCREEN
            context.getSharedPrefValue(constants.SP_IS_LOGGED_IN)
                .then((value) => {
                    if (value != null && value != undefined) {
                        if (value == constants.SP_IS_LOGGED_IN) {
                            launchScreen = constants.HOME_SCREEN
                            context.goToNextScreen(launchScreen)
                        } else {
                            context.goToNextScreen(launchScreen)
                        }
                    } else {
                        context.goToNextScreen(launchScreen)
                    }
                })

        }, 2000);
    }

    render() {

        console.disableYellowBox = true;

        return (

            <SafeAreaView style={styles.container}>

                <ImageBackground
                    source={AppIcons.ICON_SPLASH}
                    style={styles.container}>

                    {/* <View style={styles.imageContainer}>
                        <Image
                            source={AppIcons.LOGO_ICON}
                            style={styles.logoStyle}
                        />
                    </View> */}

                </ImageBackground>

            </SafeAreaView>

        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: AppDimens.one,
        backgroundColor: AppColors.PRIMARY_COLOR,
    },
    imageContainer: {
        flexGrow: 1,
        alignSelf: 'center',
        justifyContent: AppTexts.centerText,
        alignItems: AppTexts.centerText
    },
    logoStyle: {
        width: AppDimens.oneEighty,
        height: AppDimens.oneEighty,
        resizeMode: AppTexts.resizeContain
    }

});
