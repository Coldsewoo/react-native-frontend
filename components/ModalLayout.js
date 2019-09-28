import React from 'react'
import { Component } from 'react'
import { StyleSheet, Text, View, Dimensions, Modal, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

const screen = Dimensions.get('window')

export default class ModalLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Modal style={styles.container} visible={this.props.visible} onRequestClose={this.props.onPress}>
        <View style={{ flex: 1 }}>
          <View style={styles.topBar}>
            <TouchableOpacity onPress={this.props.onPress}>
              <AntDesign name="left" style={{ fontSize: 26 }} />
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center', paddingVertical: 3 }}>
              <Text style={{ fontSize: 20, fontWeight: '400', marginRight: 13 }}>{this.props.title}</Text>
            </View>
          </View>
          <View style={styles.childrenContainer}>{this.props.children}</View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  topBar: {
    position: 'absolute',
    flexDirection: 'row',
    height: 60,
    top: 0,
    alignItems: 'flex-end',
    width: screen.width,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomColor: 'rgba(155,155,155,0.3)',
    borderBottomWidth: 1,
  },
  childrenContainer: {
    marginTop: 60,
    paddingVertical: 15,
    flex: 1,
  },
})
