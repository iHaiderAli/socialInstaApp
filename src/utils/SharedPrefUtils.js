
import React, { Component } from 'react';
import DefaultPreference from 'react-native-default-preference';

export default class SharedPrefUtils extends Component {
  constructor(props) {
    super(props);
  }

  saveValueInSharedPref(key, value) {
    return new Promise((resolve, reject) => {
      DefaultPreference.set(key, value).then(function () {
        resolve(value)
      });
    })

  }

  getSharedPrefValue(key) {
    return new Promise((resolve, reject) => {
      DefaultPreference.get(key).then(function (value) {
        resolve(value);
      });
    })
  }

  clearSharedPrefValue(key) {
    return new Promise((resolve, reject) => {
      DefaultPreference.clear(key).then(function () { resolve() })
    })
  }

  clearAllSharedPrefs() {
    return new Promise((resolve, reject) => {
      DefaultPreference.clearAll().then(function () {
        resolve()
      });

    })

  }

}
