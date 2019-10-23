import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput } from 'react-native'
import ModalLayout from '../components/ModalLayout'
import PickerView from '../atoms/PickerVIewAndroid'
import Chip from '../atoms/Chip'
import FormTextInput from '../atoms/FormTextInput'
import {
  district1Options,
  district2Options,
  buildingOptions,
  transactionOptions,
  dealOptions,
} from '../store/DealOptions'

const screen = Dimensions.get('window')

export default class DealerFilterModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pickers: [
        {
          name: 'district1',
          value: { label: '전체', value: '전체' },
        },
        {
          name: 'district2',
          value: { label: '전체', value: '전체' },
        },
      ],
      filter: {
        district1: '전체',
        district2: '전체',
        type: '전체',
        transactionOptions: [],
        buildingOptions: [],
        dealOptions: [],
        estimationOptions: 0.25,
      },
      activatedChips: [],
      focused: false,
    }
  }

  componentDidMount() {
    this.setState({ filter: this.props.filter })
  }

  _renderPicker = type => {
    const pickerStatus = this.state.pickers.filter(picker => picker.name === type)[0]
    const district1Value = this.state.pickers.filter(picker => picker.name === 'district1')[0].value.value
    let data
    switch (type) {
      case 'district1':
        data = district1Options
        break
      case 'district2':
        data = district2Options[district1Value]
        break
    }
    return (
      <PickerView
        status={pickerStatus}
        data={data}
        key={type}
        onPress={this._onPressPickerConfirm.bind(this)}
        onPressPickerConfirm={(value, label, name) => this._onPressPickerConfirm(value, label, name)}
      />
    )
  }

  _onPressPickerConfirm = (value, label, name) => {
    const pickers = this.state.pickers.map(e => e)
    for (const idx in pickers) {
      if (pickers[idx].name === name) {
        pickers[idx].value = { value, label }
      }
    }
    this.setState({ pickers })
  }

  _renderChips = (type, options) => {
    return options.map((option, idx) => {
      const activated = this.state.filter[type].indexOf(option) !== -1
      return (
        <Chip
          key={idx}
          name={option}
          onChipTouched={option => this._onChipTouched(type, option)}
          activated={activated}
          style={{
            height: 30,
            borderRadius: 15,
            textSize: 15,
            paddingHorizontal: 10,
            marginVertical: 5,
            marginRight: 8,
          }}
        />
      )
    })
  }

  _onChipTouched = (type, option) => {
    if (this.state.filter[type].indexOf(option) === -1) {
      this._onChipSelected(type, option)
    } else {
      this._onChipUnSelected(type, option)
    }
  }

  _onChipSelected = (type, option) => {
    const filter = Object.assign({}, this.state.filter)
    const activated = filter[type]
    activated.push(option)
    this.setState({ filter })
  }

  _onChipUnSelected = (type, option) => {
    const filter = Object.assign({}, this.state.filter)
    const activated = filter[type]
    const idx = activated.indexOf(option)
    activated.splice(idx, 1)
    this.setState({ filter })
  }

  _onPressConfirm = () => {
    const filter = this.state.filter
    const pickers = this.state.pickers.map(e => e)
    filter.district1 = pickers.filter(e => e.name === 'district1')[0].value.value
    filter.district2 = pickers.filter(e => e.name === 'district2')[0].value.value
    filter.type = filter.dealOptions.length === 1 ? filter.dealOptions[0] : '전체'
    filter.dealOptions = filter.dealOptions.length > 1 ? ['전체'] : filter.dealOptions
    this.props.onConfirm(filter)
  }

  _onReset = () => {
    const filter = {
      district1: '전체',
      district2: '전체',
      type: '전체',
      transactionOptions: [],
      buildingOptions: [],
      dealOptions: [],
      estimationOptions: 0.25,
    }
    this.props.onConfirm(filter)
  }

  _onChangeText = text => {
    const filter = this.state.filter
    filter.estimationOptions = Number(text)
    this.setState({ filter })
  }

  render() {
    return (
      <ModalLayout visible={this.props.visible} onPress={this.props.onPress} title="필터 적용하기">
        <View style={styles.container}>
          <View style={styles.pickerContainer}>
            <View style={{ marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 16, fontWeight: '700' }}>지역 설정</Text>
              <TouchableOpacity style={styles.resetButton} onPress={this._onReset.bind(this)}>
                <Text style={{ fontSize: 12, color: 'white', fontWeight: '500' }}>필터 초기화</Text>
              </TouchableOpacity>
            </View>
            <View style={{ ...styles.picker, justifyContent: 'space-between' }}>
              <View style={styles.pickerWithLabel}>
                <Text style={{ fontSize: 14, fontWeight: '600' }}>구 </Text>
                {this._renderPicker.bind(this)('district1')}
              </View>
            </View>
            <View style={{ ...styles.picker, justifyContent: 'space-between' }}>
              <View style={styles.pickerWithLabel}>
                <Text style={{ fontSize: 14, fontWeight: '600' }}>동 </Text>
                {this._renderPicker.bind(this)('district2')}
              </View>
            </View>
          </View>
          <View style={styles.chipContainer}>
            <View style={{ ...styles.chipItemContainer }}>
              <View style={styles.chipItemText}>
                <Text style={styles.checkTitle}>매매형태</Text>
              </View>
              <View style={styles.chipsContainer}>{this._renderChips('dealOptions', dealOptions)}</View>
            </View>
            <View style={{ ...styles.chipItemContainer }}>
              <View style={styles.chipItemText}>
                <Text style={styles.checkTitle}>구조</Text>
              </View>
              <View style={styles.chipsContainer}>{this._renderChips('buildingOptions', buildingOptions)}</View>
            </View>
            <View style={{ ...styles.chipItemContainer }}>
              <View style={styles.chipItemText}>
                <Text style={styles.checkTitle}>거래형태</Text>
              </View>
              <View style={styles.chipsContainer}>{this._renderChips('transactionOptions', transactionOptions)}</View>
            </View>
            <View style={{ ...styles.chipItemContainer }}>
              <View style={styles.chipItemText}>
                <Text style={styles.checkTitle}>견적%</Text>
              </View>
              <View
                style={{
                  ...styles.chipsContainer,
                  alignItems: 'flex-end',
                }}
              >
                <View style={{ width: 100, borderBottomColor: 'rgb(80,80,80)', borderBottomWidth: 1 }}>
                  <TextInput
                    placeholder="예) 0.35"
                    keyboardType="numeric"
                    onSubmitEditing={e => this._onChangeText(e.nativeEvent.text)}
                    style={{ fontSize: 16 }}
                    onFocus={() => this.setState({ focused: true })}
                    onBlur={() => this.setState({ focused: false })}
                  />
                </View>

                <Text style={{ fontSize: 15, color: 'rgb(155,155,155)' }}>%</Text>
              </View>
            </View>
          </View>
          {!this.state.focused ? (
            <View style={styles.sendForm}>
              <TouchableOpacity style={styles.sendFormButton} onPress={this._onPressConfirm.bind(this)}>
                <Text style={styles.sendFormButtonText}>확인</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </ModalLayout>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: screen.width - 30,
    marginHorizontal: 15,
  },
  picker: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  pickerContainer: {
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(155,155,155,0.2)',
    marginVertical: 5,
  },
  pickerWithLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chipContainer: {
    height: 70,
    marginBottom: 10,
    justifyContent: 'flex-start',
  },
  chipItemContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
    borderBottomColor: 'rgba(155,155,155,0.2)',
    borderBottomWidth: 1,
  },
  chipItemText: {
    marginRight: 10,
    justifyContent: 'flex-start',
    paddingTop: 12,
  },
  chipsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  checkTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  sendForm: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: screen.width - 30,
    height: 50,
    bottom: 30,
  },
  sendFormButton: {
    backgroundColor: 'rgb(25,148,255)',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: screen.width - 160,
  },
  sendFormButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
  },
  resetButton: {
    width: 75,
    height: 25,
    paddingHorizontal: 5,
    backgroundColor: 'rgb(15,118,205)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
})
