import React, { Component } from 'react'
import { FormLabel, FormInput, Button } from 'react-native-elements'
import { Switch } from 'react-native'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import styles from './Styles/FormInputsStyle'
import { Fonts, Colors } from '../Themes'

export const TextInput = ({ label, onChange, inputProps, labelProps, labelStyle, secureTextEntry, selectionColor, textColor, width, defaultValue, fontSize, containerStyle }) => (
  <View>
    <FormLabel labelStyle={{fontFamily: Fonts.type.light, fontWeight: '300', fontStyle: 'normal', fontSize: 11, marginBottom: 5, ...labelStyle}} {...labelProps}>{label}</FormLabel>
    <FormInput defaultValue={defaultValue} containerStyle={containerStyle} inputStyle={{fontFamily: Fonts.type.base, fontSize: fontSize || Fonts.size.input, color: textColor || Colors.white, paddingBottom: 24, paddingTop: 1, width: width || 200}} onChangeText={onChange} autoCapitalize='none' secureTextEntry={secureTextEntry} selectionColor={selectionColor} {...inputProps} />
  </View>
)

export const SwitchInput = ({title, value, onChange}) => (
  <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10}}>
    <Text style={{fontFamily: Fonts.type.base, color: Colors.charcoalGray, fontSize: 16, lineHeight: 25, letterSpacing: 0}}>{title}</Text>
    <Switch tintColor={Colors.aquaGreen} value={value} onValueChange={onChange} />
  </View>
)

export const ButtonOutline = ({title, onPress}) => (
  <Button title={title} outline borderRadius={6} onPress={onPress} fontFamily={Fonts.type.semiBold} />
)

export const ButtonRounded = ({title, onPress, color}) => (
  <Button
    title={title}
    borderRadius={6}
    onPress={onPress}
    buttonStyle={{height: 60}}
    backgroundColor={color || Colors.greenishTeal}
    fontSize={Fonts.size.button}
    fontFamily={Fonts.type.semiBold} />
)
export default class FormInputs extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    return (
      <View style={styles.container}>
        <Text>FormInputs Component</Text>
      </View>
    )
  }
}
