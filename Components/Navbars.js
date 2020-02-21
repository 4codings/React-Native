import React from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Image, Animated, Platform } from 'react-native'
import styles from './Styles/NavbarsStyle'
import PropTypes from 'prop-types'
import { Images, Colors } from '../Themes'
import { getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper'
import Icon from 'react-native-vector-icons/Feather'

export const Navbar = ({title, leftButtons, rightButtons, noMargin}) => {
  if (!leftButtons) {
    leftButtons = []
  }

  if (!rightButtons) {
    rightButtons = []
  }

  let paddingTop = 0
  if (Platform.OS === 'ios') {
    if (isIphoneX()) {
      paddingTop = 0
    }
  }

  let viewHeight = 50
  if (Platform.OS === 'ios') {
    if (isIphoneX()) {
      viewHeight = getStatusBarHeight()
    }
  }

  return (
    <Animated.View pointerEvents='box-none' style={{height: viewHeight, width: '100%', marginTop: 0, paddingTop: paddingTop, flexDirection: 'row', justifyContent: 'space-between', zIndex: 1000, borderBottomColor: (noMargin ? null : Colors.lightBlueGrey), borderBottomWidth: (noMargin ? null : 0.3)}}>
      <View pointerEvents='box-none' style={[styles.buttonContainer, styles.leftButtonContainer]}>
        {leftButtons.map((button, idx) => (
          <TouchableOpacity key={idx} onPress={button.onPress} style={{flexDirection: 'column', alignItems: 'center'}}>
            <View style={[styles.iconView]}>
              <Image source={Images[button.icon]} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View pointerEvents='none' style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.navTitle}>{title}</Text>
      </View>
      <View pointerEvents='box-none' style={[styles.buttonContainer, styles.rightButtonContainer, {alignContent: 'flex-end'}]}>
        {rightButtons.map((button, idx) => (
          <TouchableOpacity key={idx} onPress={button.onPress}>
            <View style={[styles.iconView]}>
              <Image source={Images[button.icon]} resizeMode='center' style={{width: 20, height: 20}} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </Animated.View>
  )
}

export const IconNavbar = ({title, leftButtons, rightButtons, noMargin}) => {
  if (!leftButtons) {
    leftButtons = []
  }

  if (!rightButtons) {
    rightButtons = []
  }

  let paddingTop = (isIphoneX() ? 0 : 20)
  if (Platform.OS === 'ios') {
    if (isIphoneX()) {
      paddingTop = 0
    }
  }

  let viewHeight = 40
  if (Platform.OS === 'ios') {
    if (isIphoneX()) {
      viewHeight = getStatusBarHeight()
    }
  }

  return (
    <Animated.View pointerEvents='box-none' style={{height: viewHeight, width: '100%', marginTop: 0, paddingTop: paddingTop, flexDirection: 'row', justifyContent: 'space-between', zIndex: 1000, borderBottomColor: (noMargin ? null : Colors.lightBlueGrey), borderBottomWidth: (noMargin ? null : 0.3)}}>
      <View pointerEvents='box-none' style={[styles.buttonContainer, styles.leftButtonContainer]}>
        {leftButtons.map((button, idx) => (
          <TouchableOpacity key={idx} onPress={button.onPress} style={{flexDirection: 'column', alignItems: 'center'}}>
            <View style={[styles.iconView]}>
              <Icon name={button.icon} size={20} color={Colors.charcoal} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View pointerEvents='none' style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.navTitle}>{title}</Text>
      </View>
      <View pointerEvents='box-none' style={[styles.buttonContainer, styles.rightButtonContainer, {alignContent: 'flex-end'}]}>
        {rightButtons.map((button, idx) => (
          <TouchableOpacity key={idx} onPress={button.onPress}>
            <View style={[styles.iconView]}>
              <Icon name={button.icon} size={20} color={Colors.charcoal} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </Animated.View>
  )
}

Navbar.propTypes = {
  title: PropTypes.string,
  leftButtons: PropTypes.array,
  rightButtons: PropTypes.array
}
