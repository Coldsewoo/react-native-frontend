import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

export default class FormTextInput extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.TextInputContainer}>
        <View style={styles.labelTextContainer}>
          <Text style={styles.labelText}>{this.props.labelText}</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput
            placeholder={this.props.placeholder}
            onChangeText={this.props.onChangeText}
            onSubmitEditing={this.props.onSubmitEditing}
            keyboardType={this.props.keyboardType ? this.props.keyboardType : 'default'}
            style={styles.textInputInnerText}
          />
          <Text style={{ fontSize: 15 }}>{this.props.appendText}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  TextInputContainer: {
    flexDirection: 'row',
    height: 40,
  },
  textInput: {
    borderBottomColor: 'rgba(155,155,155,0.2)',
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10,
    paddingTop: 3,
    paddingRight: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelTextContainer: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  labelText: {
    color: 'black',
    fontSize: 17,
    fontWeight: '600',
  },
  textInputInnerText: {
    fontSize: 16,
  },
})
