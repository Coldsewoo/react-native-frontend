import React, { Component } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
const screen = Dimensions.get('window')

export default class Separator extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View
        style={{
          ...styles.separator,
          height: this.props.height,
          backgroundColor: this.props.color,
          width: this.props.width,
        }}
      ></View>
    )
  }
}

const styles = StyleSheet.create({
  separator: {
    marginVertical: 2,
  },
})
