import React, {Component} from 'react';
import {
  Button,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';

import * as constants from '../utils/AppConstants';
import {AppTexts, AppColors, AppDimens} from '../utils/DesignConstants';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

class Posts extends Component {
  constructor() {
    super();
    this.state = {isLoading: false, isRefreshing: false, messages: DATA};
  }

  componentDidMount() {
    //   NetInfo.fetch().then(state => {
    //     if (state.isConnected) {
    //         this.getMessagesList(1)
    //     } else {
    //         this.showAlertMsg(Constants.NO_INTERNET_MSG)
    //     }
    // });
  }

  handleLoadMore = () => {
    if (!this.state.isLoading) {
      let page = this.state.page + 1;
      // this.getMessagesList(page);
    }
  };

  onRefresh() {
    this.setState({isRefreshing: true}); // true isRefreshing flag for enable pull to refresh indicator
    // this.getMessagesList(1)
  }

  getMessagesList(page) {
    // getData(Constants.GET_ALL_MESSAGES + this.state.userInfo.homeID + "&userID=" + this.state.userInfo.userID + "&msgType=received&updated_at=10&page=" + page + "&folderID=0&search=&").then(response => {
    //     // console.log(" GetAllMessages: ", JSON.stringify(response.data))
    //     if (page == 1) {
    //         messages = response.data.messages
    //         this.setState({ messages: response.data.messages, isLoading: false, page: page })
    //     }
    //     else {
    //         let listData = this.state.messages;
    //         let messages = listData.concat(response.data.messages) //concate list with response
    //         this.setState({ messages: messages, isLoading: false, page: page })
    //     }
    // })
  }

  render() {
    // Access the postId and otherParam via Destructuring assignment
    const {userToken} = this.props.route.params;

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>User Token is: {userToken}</Text>

        {this.state.isLoading ? (
          <View
            style={{
              flex: AppDimens.one,
              alignItems: AppTexts.centerText,
              justifyContent: AppTexts.centerText,
            }}>
            <ActivityIndicator style={{alignSelf: AppTexts.centerText}} />
          </View>
        ) : (
          <FlatList
            data={this.state.messages}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh.bind(this)}
              />
            }
            renderItem={({item}) => (
              <View style={{flex: 1}}>
                {
                  <View
                    style={{
                      flexDirection: AppTexts.row,
                      borderBottomColor: AppColors.COLOR_GREY,
                      borderBottomWidth: 0.8,
                      paddingLeft: 7,
                    }}>
                    <View style={{flexDirection: AppTexts.row}}>
                      {this.state.messages == null ||
                      this.state.messages.length == 0 ? (
                        <View>
                          <Text
                            style={{
                              fontWeight: AppTexts.boldText,
                              marginLeft: 5,
                              marginTop: 7,
                              textAlignVertical: AppTexts.centerText,
                              height: 40,
                            }}>
                            {constants.DATA_NOT_AVAILABLE}
                          </Text>
                        </View>
                      ) : (
                        <TouchableOpacity
                          style={{
                            padding: 7,
                            backgroundColor: AppColors.COLOR_NOTIF_BG,
                            margin: 5,
                            borderRadius: 7,
                          }}
                          onPress={() => {
                            this.props.navigation.navigate(
                              constants.POSTS_DETAIL,
                              {
                                postDetail: item,
                              },
                            );
                          }}>
                          <Text>{item.title}</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                }
              </View>
            )}
            keyExtractor={item => item.id}
            onEndReachedThreshold={0.3}
            onEndReached={this.handleLoadMore.bind(this)}
          />
        )}
      </View>
    );
  }
}

export default Posts;
