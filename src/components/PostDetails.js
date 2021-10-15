import React, {Component} from 'react';
import {Button, View, Text} from 'react-native';

class PostDetails extends Component {
  constructor() {
    super();
  }

  render() {
    // Access the postId and otherParam via Destructuring assignment
    const {postDetail} = this.props.route.params;

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>{postDetail.title}</Text>

        <Button
          title="Go to Login"
          onPress={() => {
            this.props.navigation.navigate('Login');
          }}
        />
      </View>
    );
  }
}

export default PostDetails;
