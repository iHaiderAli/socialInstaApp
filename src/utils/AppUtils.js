import { Alert } from "react-native";
import { APP_NAME } from "../utils/AppConstants";
import SharedPrefUtils from "./SharedPrefUtils";

export default class AppUtils extends SharedPrefUtils {

  constructor(props) {
    super(props);
    this.state = {
      convertedString: "",
    };
  }

  showAlertMsg = (message) => {
    Alert.alert(APP_NAME, message);
  };

  showAlertMsgWithTitle = (title, message) => {
    this.setState({ convertedString: message });
    let tagRemovedString = this.state.convertedString.replace(/<[^>]*>/g, "");

    Alert.alert(
      title,
      tagRemovedString,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ],
      { cancelable: false },
    );
  };

}
