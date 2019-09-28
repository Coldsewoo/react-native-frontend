import React from 'react'
import { Component } from 'react'
import { Text, View, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

export default class HomeKCComponent extends Component {
  constructor(props) {
    super(props)
  }

  _formattedDate = () => {
    const date = this.props.item.date.toString()
    const year = date.substring(2, 4)
    const month = date.substring(4, 6)
    const day = date.substring(6, 8)
    return `${year}.${month}.${day}`
  }

  render() {
    return (
      <TouchableOpacity style={{ ...styles.container, width: this.props.width }}>
        <View style={styles.upperContainer}>
          <Text style={styles.textFormat}>{this._formattedDate()} </Text>
          <Text style={styles.textFormat}>{this.props.item.district1} </Text>
          <Text style={styles.textFormat}>{this.props.item.district2} </Text>
          <Text style={styles.textFormat}>{this.props.item.buildingType} </Text>
          <Text style={styles.textFormat}>{this.props.item.trasactionType} </Text>
          <Text style={styles.saved}> {this.props.item.saved}만원</Text>
          <AntDesign name="arrowdown" style={{ ...styles.saved, fontSize: 17 }} />
        </View>
        <View>
          <View style={{ paddingHorizontal: 5, marginBottom: 8, flexDirection: 'row' }}>
            <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: '500', flex: 1 }}>
              {this.props.item.comment}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 55,
    justifyContent: 'space-between',
    paddingVertical: 3,
    marginVertical: 4,
  },
  upperContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  textFormat: {
    fontWeight: '400',
    fontSize: 15,
  },
  saved: {
    color: 'blue',
    fontWeight: '700',
    fontSize: 14,
  },
})
