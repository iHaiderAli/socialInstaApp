import React from "react";
import {
  View,
  FlatList,
  RefreshControl,
  Image,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
  StyleSheet, Text,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { sendRequestAction } from "../actions/ApiActions";
import NoDataFound from "../utils/NoDataFound";

import * as constants from "../utils/AppConstants";
import { AppTexts, AppColors, AppDimens, AppIcons } from "../utils/DesignConstants";
import AppUtils from "../utils/AppUtils";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

class Posts extends AppUtils {

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      isRefreshing: false,
      loadMore: false,
      messages: [],
      pagingInfo: null,
      messageDetails: null,
    };
  }

  componentDidMount() {

    this.getUserPosts();

  }

  getUserPosts() {

    NetInfo.fetch().then(state => {

      if (state.isConnected) {
        this.getMessagesList(1);
      } else {
        this.showAlertMsg(constants.NO_INTERNET_MSG);
      }

    });
  }

  handleLoadMore = () => {
    if (!this.props.loading && !this.state.isRefreshing && this.state.page < this.state.pagingInfo.totalPages) {
      this.setState({ loadMore: true });
      let page = this.state.page + 1;
      this.getMessagesList(page);
    }
  };

  onRefresh() {
    this.setState({ isRefreshing: true });
    this.getMessagesList(1);
  }

  getMessagesList(page) {

    // this.props.sendRequestAction(constants.GET_ALL_POSTS + this.state.userInfo.homeID + "&userID=" + this.state.userInfo.userID + "&page=" + page, null, constants.METHOD_GET, this.state.userInfo.token)
    this.props.sendRequestAction(constants.GET_ALL_POSTS, null, constants.METHOD_GET, "")
      .then((res) => {

        if (page === 1) {
          this.setState({
            messages: this.props.response.messages,
            page: page,
            isRefreshing: false,
            loadMore: false,
            pagingInfo: this.props.response.pagingInfo,
          });
        } else {
          let listData = this.state.messages;
          let messages = listData.concat(this.props.response.messages);
          this.setState({
            messages: messages,
            page: page,
            isRefreshing: false,
            loadMore: false,
            pagingInfo: this.props.response.pagingInfo,
          });
        }

      })
      .catch((error) => {
        console.error(error);
        this.showAlertMsg(constants.SOMETHING_WENT_WRONG);
      });
  }

  renderFooter = () => {
    if (!this.state.loadMore) return null;
    return (
      <ActivityIndicator
        style={{ color: AppColors.PRIMARY_COLOR }}
      />
    );
  };

  messageHeader = (item, status) => {
    return (
      <View style={styles.messageDetailsWithoutBorderStyle}>

        <View style={{ height: AppDimens.sixtyFive, width: "15%", justifyContent: AppTexts.centerText }}>
          <Image
            source={{ uri: item.senderImage != "" ? item.senderImage : AppIcons.DUMMY_ICON }}
            style={{
              alignContent: AppTexts.flexStart,
              resizeMode: AppTexts.resizeContain,
              width: AppDimens.forty,
              height: AppDimens.forty,
              borderRadius: AppDimens.fifty,
            }}
          />

        </View>

      </View>
    );
  };

  // getMessageDetails = (msgID, index) => {
  //   this.props.sendRequestAction(constants.GET_MESSAGE_DETAILS + this.state.userInfo.userID + "&msgID=" + msgID, null, constants.METHOD_GET, this.state.userInfo.token)
  //     .then((res) => {
  //       this.setState({ messageDetails: this.props.response, isLoading: false });
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       this.showAlertMsg(constants.SOMETHING_WENT_WRONG);
  //     });
  // };

  render() {

    const { loading } = this.props;

    return <View
      style={{ flexWrap: AppTexts.NO_WRAP, flex: AppDimens.one }}>

      {this.state.messages && this.state.messages.length ?
        <FlatList
          data={this.state.messages}
          // getItemLayout={(data, index) => (
          //     { length: 40, offset: 40 * index, index }
          // )}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
          renderItem={
            ({ item, index }) => {
              return (
                <FlatListItem item={item} index={index} />);
            }}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.4}
          ListFooterComponent={this.renderFooter.bind(this)}
          onEndReached={this.handleLoadMore.bind(this)}
        >
        </FlatList>
        : !loading && <NoDataFound />
      }

      {loading && this.state.page == 1 && !this.state.loadMore && !this.state.isRefreshing && <ActivityIndicator />}

    </View>;
  }
}

class FlatListItem extends AppUtils {

  render() {
    return (
      <View style={{
        flexDirection: AppTexts.row,
        borderBottomColor: AppColors.COLOR_GREY,
        borderBottomWidth: 0.8,
        paddingLeft: 7,
      }}>

        <View style={{ flexDirection: AppTexts.row }}>
          {
            (this.state.messages == null || this.state.messages.length == 0)
              ?
              <View>
                <Text style={{
                  fontWeight: AppTexts.boldText,
                  marginLeft: 5,
                  marginTop: 7,
                  textAlignVertical: AppTexts.centerText,
                  height: 40,
                }}>{constants.DATA_NOT_AVAILABLE}</Text>
              </View>
              :
              <TouchableOpacity
                style={{ padding: 7, backgroundColor: AppColors.COLOR_NOTIF_BG, margin: 5, borderRadius: 7 }}
                onPress={() => {
                  this.props.navigation.navigate(constants.POSTS_DETAIL, {
                    postDetail: item,
                  });
                }}
              >
                <Text>{item.title}</Text>
              </TouchableOpacity>
          }
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  dateText: {
    color: AppColors.COLOR_WHITE,
    fontSize: AppDimens.twelve,
    marginBottom: AppDimens.three,
  },
  subjectText: { alignContent: AppTexts.flexStart, width: "100%", fontSize: AppDimens.thirteen },
  messageDetailsWithoutBorderStyle: {
    height: AppDimens.seventy,
    width: "100%",
    flexDirection: AppTexts.row,
    flex: AppDimens.one,
    paddingRight: AppDimens.five,
    alignContent: AppTexts.flexStart,
  },
  timeStyle: {
    alignContent: AppTexts.centerText,
    fontSize: AppDimens.forteen,
  },
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

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
