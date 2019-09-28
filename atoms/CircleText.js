import React, { Component } from 'react'
import { View, Text } from 'react-native'

/**
 *  @param {Object} Props:
 *    size: Circle size
 *    color: Circle color
 *    textSize: Text size
 *    text: Text
 *    textColor: Text Color
 */

export default class CircleText extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View
        style={{
          width: this.props.size,
          height: this.props.size,
          borderRadius: this.props.size / 2,
          backgroundColor: this.props.color,
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: this.props.textColor,
          borderWidth: 1,
          paddingBottom: this.props.size / 10,
          paddingTop: this.props.paddingTop,
        }}
      >
        <Text style={{ color: this.props.textColor, fontSize: this.props.textSize, fontWeight: '600' }}>
          {this.props.text}
        </Text>
      </View>
    )
  }
}
