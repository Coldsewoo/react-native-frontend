import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native'
import PickerView from '../atoms/PickerVIewAndroid'
import Chip from '../atoms/Chip'
import {
  district1Options,
  district2Options,
  depositToOptions,
  depositFromOptions,
  buildingOptions,
  transactionOptions,
} from '../store/DealOptions'

const screen = Dimensions.get('window')

export default class BuyForm extends Component {
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
        {
          name: 'depositFrom',
          value: { label: '0만원', value: 0 },
        },
        {
          name: 'depositTo',
          value: { label: '무제한', value: 50000000 },
        },
      ],
      activatedChips: [],
    }
  }

  componentDidMount() {
    const pickers = this.state.pickers.slice()
    for (const i in pickers) {
      pickers[i].show = false
    }
    this.setState({ pickers, activatedChips: [] })
  }

  /**
   *  @param {string} type name of the picker to show
   */
  _renderPicker = type => {
    const pickerStatus = this.state.pickers.filter(picker => picker.name === type)[0]
    const district1Value = this.state.pickers.filter(picker => picker.name === 'district1')[0].value.value
    const depositFromValue = this.state.pickers.filter(picker => picker.name === 'depositFrom')[0].value.value
    const depositToOptionsFilterd = depositToOptions.filter(e => e.value >= depositFromValue)
    let data
    switch (type) {
      case 'depositFrom':
        data = depositFromOptions
        break
      case 'depositTo':
        data = depositToOptionsFilterd
        break
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

  _renderChips = options => {
    return options.map((option, idx) => {
      const activated = this.state.activatedChips.indexOf(option) !== -1
      return (
        <Chip
          key={idx}
          name={option}
          onChipTouched={option => this._onChipTouched(option)}
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

  _onChipTouched = option => {
    if (this.state.activatedChips.indexOf(option) === -1) {
      this._onChipSelected(option)
    } else {
      this._onChipUnSelected(option)
    }
  }

  _onChipSelected = option => {
    const activated = this.state.activatedChips.slice()
    activated.push(option)
    this.setState({ activatedChips: activated })
  }

  _onChipUnSelected = option => {
    const activated = this.state.activatedChips.slice()
    const idx = activated.indexOf(option)
    activated.splice(idx, 1)
    this.setState({ activatedChips: activated })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.pickerContainer}>
          <View style={{ marginBottom: 5 }}>
            <Text style={{ fontSize: 16, fontWeight: '700' }}>지역 설정</Text>
          </View>
          <View style={{ ...styles.picker, justifyContent: 'space-between' }}>
            <View style={styles.pickerWithLabel}>
              <Text style={{ fontSize: 16, fontWeight: '600' }}>구 </Text>
              {this._renderPicker.bind(this)('district1')}
            </View>
            <View style={styles.pickerWithLabel}>
              <Text style={{ fontSize: 16, fontWeight: '600' }}>동 </Text>
              {this._renderPicker.bind(this)('district2')}
            </View>
          </View>
        </View>
        <View style={styles.pickerContainer}>
          <View style={{ marginBottom: 5 }}>
            <Text style={{ fontSize: 16, fontWeight: '700' }}>예산</Text>
          </View>

          <View style={styles.pickerWithLabel}>
            <View>{this._renderPicker.bind(this)('depositFrom')}</View>
            <View
              style={{
                flex: 1,
                alignContent: 'center',
                borderColor: 'black',
                borderWidth: 1,
                marginHorizontal: 5,
              }}
            ></View>
            <View>{this._renderPicker.bind(this)('depositTo')}</View>
          </View>
        </View>
        <View style={styles.chipContainer}>
          <View style={{ ...styles.chipItemContainer }}>
            <View style={styles.chipItemText}>
              <Text style={styles.checkTitle}>구조</Text>
            </View>
            <View style={styles.chipsContainer}>{this._renderChips(buildingOptions)}</View>
          </View>
          <View style={{ ...styles.chipItemContainer }}>
            <View style={styles.chipItemText}>
              <Text style={styles.checkTitle}>거래형태</Text>
            </View>
            <View style={styles.chipsContainer}>{this._renderChips(transactionOptions)}</View>
          </View>
        </View>
        <View style={styles.sendFrom}>
          <TouchableOpacity style={styles.sendFormButton}>
            <Text style={styles.sendFormButtonText}>견적요청 보내기</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  picker: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickerContainer: {
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(155,155,155,0.2)',
    marginBottom: 10,
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
  sendFrom: {
    marginTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendFormButton: {
    backgroundColor: 'rgb(25,148,255)',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: screen.width - 100,
  },
  sendFormButtonText: {
    fontSize: 25,
    color: 'white',
    fontWeight: '600',
  },
})
