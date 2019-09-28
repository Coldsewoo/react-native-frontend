import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import ModalLayout from '../components/ModalLayout'
import BuyForm from '../components/BuyForm'
import SellForm from '../components/SellForm'

export default class UserForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formState: '매수',
    }
  }

  render() {
    return (
      <ModalLayout visible={this.props.visible} onPress={this.props.onPress} title="견적요청">
        <View style={styles.formContainer}>
          <View style={styles.formSelectorContainer}>
            <TouchableOpacity
              style={{
                ...styles.formSelector,
                backgroundColor: this.state.formState === '매수' ? 'rgb(25,148,255)' : 'white',
              }}
              onPress={() => this.setState({ formState: '매수' })}
            >
              <Text
                style={{
                  ...styles.formSelectorText,
                  color: this.state.formState === '매수' ? 'white' : 'rgb(25,148,255)',
                }}
              >
                매수
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.formSelector,
                backgroundColor: this.state.formState === '매도' ? 'rgb(220,20,60)' : 'white',
              }}
              onPress={() => this.setState({ formState: '매도' })}
            >
              <Text
                style={{
                  ...styles.formSelectorText,
                  color: this.state.formState === '매도' ? 'white' : 'rgb(220,20,60)',
                }}
              >
                매도
              </Text>
            </TouchableOpacity>
          </View>
          {this.state.formState === '매수' ? <BuyForm /> : <SellForm />}
        </View>
      </ModalLayout>
    )
  }
}

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 15,
  },
  formSelectorContainer: {
    flexDirection: 'row',
    height: 40,
    borderRadius: 10,
  },
  formSelector: {
    borderColor: 'rgba(150,150,150,0.5)',
    flex: 1,
    borderWidth: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formSelectorText: {
    fontSize: 27,
    fontWeight: '600',
  },
})
