import React from "react";
import {
  View,
  FlatList,
  RefreshControl,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet, Text,
} from "react-native";

import NetInfo from "@react-native-community/netinfo";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { sendRequestAction } from "../actions/ApiActions";
import NoDataFound from "../utils/NoDataFound";

import * as constants from "../utils/AppConstants";
import { AppTexts, AppColors, AppDimens } from "../utils/DesignConstants";
import AppUtils from "../utils/AppUtils";

class Posts extends AppUtils {

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      isRefreshing: false,
      loadMore: false,
      posts: [],
      messageDetails: null,
    };
  }

  componentDidMount() {
    NetInfo.fetch().then(state => {

      if (state.isConnected) {
        this.getPostsList(1);
      } else {
        this.showAlertMsg(constants.NO_INTERNET_MSG);
      }

    });
  }

  getPostsList(page) {

    const { userId, userToken } = this.props.route.params;

    this.props.sendRequestAction(userId + constants.GET_ALL_POSTS + userToken + "&limit=" + 10, null, constants.METHOD_GET, null)
      .then((res) => {
        console.log(res);

        if (page === 1) {
          this.setState({
            posts: this.props.response.data,
            page: page,
            isRefreshing: false,
            loadMore: false,
          });
        } else {
          let listData = this.state.posts;
          let posts = listData.concat(this.props.response.data);
          this.setState({
            posts: posts,
            page: page,
            isRefreshing: false,
            loadMore: false,
          });
        }

      })
      .catch((error) => {
        console.error(error);
        this.showAlertMsg(constants.REQUEST_ERROR);
      });
  }

  handleLoadMore = () => {
    if (!this.props.loading && !this.state.isRefreshing
      && this.state.response.paging !== null && this.state.response.paging.cursors !== null
      && this.state.response.paging.cursors.before !== this.state.response.paging.cursors.after) {
      this.setState({ loadMore: true });
      let page = this.state.page + 1;
      this.getPostsList(page);
    } if (!this.props.loading && !this.state.isRefreshing
      && this.state.response.paging !== null && this.state.response.paging.cursors !== null
      && this.state.response.paging.cursors.before !== this.state.response.paging.cursors.after) {
      this.setState({ loadMore: true });
      let page = this.state.page + 1;
      this.getPostsList(page);
    }
  };

  onRefresh() {
    this.setState({ isRefreshing: true });
    this.getPostsList(1);
  }

  renderFooter = () => {
    if (!this.state.loadMore) return null;
    return (
      <ActivityIndicator
        style={{ color: AppColors.PRIMARY_COLOR }}
      />
    );
  };

  render() {

    const { loading } = this.props;

    return <View
      style={{ flexWrap: AppTexts.NO_WRAP, flex: AppDimens.one }}>

      {this.state.posts && this.state.posts.length ?
        <FlatList
          data={this.state.posts}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
          renderItem={
            ({ item, index }) => {
              return (
                <View style={styles.card}>

                  <Image
                    source={{ uri: item.media_url }}
                    style={styles.cardImage}
                  />
                  <View style={styles.cardHeader}>
                    <Text category='s1' style={styles.cardTitle}>
                      {item.id}
                    </Text>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate(constants.POSTS_DETAIL)}>
                      <Image
                        source={{ uri: item.getProfileIcon }}
                        style={styles.cardAvatar}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.cardContent}>
                    <Text category='p2'>{item.media_type}</Text>
                  </View>
                </View>
              );
            }
          }
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.4}
          ListFooterComponent={this.renderFooter.bind(this)}
          onEndReached={this.handleLoadMore.bind(this)}
        >
        </FlatList>
        : !loading && <NoDataFound />
      }

      {loading && this.state.page === 1 && !this.state.loadMore && !this.state.isRefreshing && <ActivityIndicator />}

    </View>;
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
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: AppColors.COLOR_GREY,
    marginBottom: 25,
  },
  cardImage: {
    width: "100%",
    height: 300,
  },
  cardHeader: {
    padding: 10,
    flexDirection: AppTexts.row,
    alignItems: AppTexts.centerText,
    justifyContent: AppTexts.spaceBetween,
  },
  cardTitle: {
    color: AppColors.COLOR_GREY,
  },
  cardAvatar: {
    marginRight: 16,
  },
  cardContent: {
    padding: 10,
    borderWidth: 0.25,
    borderColor: AppColors.COLOR_GREY,
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
