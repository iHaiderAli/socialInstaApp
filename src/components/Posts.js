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
import { GET_PROFILE_IMAGE } from "../utils/AppConstants";

class Posts extends AppUtils {

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      isRefreshing: false,
      loadMore: false,
      posts: [],
      paging: null,
      messageDetails: null,
      profile_pic_url : null
    };
  }

  componentDidMount() {
    NetInfo.fetch().then(state => {

      if (state.isConnected) {
        this.getProfilePicture();
        this.getPostsList(1, constants.BASE_URL + this.props.route.params.userId + constants.GET_ALL_POSTS + this.props.route.params.userToken + "&limit=" + 10);
      } else {
        this.showAlertMsg(constants.NO_INTERNET_MSG);
      }

    });
  }

  getPostsList(page, nextPage) {

    this.props.sendRequestAction(nextPage, null, constants.METHOD_GET, null)
      .then((res) => {
        console.log(res);

        if (page === 1) {
          this.setState({
            posts: this.props.response.data,
            paging: this.props.response.paging,
            page: page,
            isRefreshing: false,
            loadMore: false,
          });
        } else {
          let listData = this.state.posts;
          let posts = listData.concat(this.props.response.data);
          this.setState({
            posts: posts,
            paging: this.props.response.paging,
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

  getProfilePicture() {

    const { userId, userToken } = this.props.route.params;

    this.props.sendRequestAction(constants.BASE_URL + constants.API_VERSION + userId + "?fields=id,username&access_token=" + userToken, null, constants.METHOD_GET, null)
      .then((res) => {

        console.log(this.props.response.username);

        this.props.sendRequestAction(constants.BASE_URL_INSTA + this.props.response.username + constants.GET_PROFILE_IMAGE, null, constants.METHOD_GET, null)
          .then((res) => {
            let graphql = this.props.response.graphql;
            let user = graphql.user;
            let profile_pic_url = user.profile_pic_url;
            this.setState({
              profile_pic_url : profile_pic_url
            })
          })
          .catch((error) => {
            console.error(error);
            this.showAlertMsg(constants.REQUEST_ERROR);
          });

      })
      .catch((error) => {
        console.error(error);
        this.showAlertMsg(constants.REQUEST_ERROR);
      });
  }

  handleLoadMore = () => {

    if (!this.props.loading && this.state.paging !== null) {

      let pages = this.state.paging;

      if (pages.next !== undefined) {
        this.setState({ loadMore: true });
        let page = this.state.page + 1;
        this.getPostsList(page, pages.next);
      }

    }
  };

  onRefresh() {
    this.setState({ isRefreshing: true });
    this.getProfilePicture();
    this.getPostsList(1, constants.BASE_URL + this.props.route.params.userId + constants.GET_ALL_POSTS + this.props.route.params.userToken + "&limit=" + 10);
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

      style={{ flexWrap: AppTexts.NO_WRAP, flex: AppDimens.one, margin: 5 }}>

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
                <View>

                  <View style = {{ height: 50, flexDirection: 'row', alignItems: 'center'}}>

                    <Image style={styles.avatar} source={{uri: this.state.profile_pic_url}}/>

                    <Text style={styles.subjectText}>
                     {item.username}
                    </Text>

                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate(constants.POSTS_DETAIL, {
                        postDetail: item
                      })
                    }}>
                    <Image
                      source={{ uri: item.media_url }}
                      style={styles.cardImage}
                    />
                  </TouchableOpacity>

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

      {loading && <ActivityIndicator />}

    </View>;
  }

}

const styles = StyleSheet.create({

  avatar: {
    width: 30,
    height: 30,
    borderRadius: 1000,
  },

  subjectText: { marginStart: 10, fontSize: AppDimens.thirteen },

  cardImage: {
    width: "100%",
    height: 300,
    marginTop: 10
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

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
