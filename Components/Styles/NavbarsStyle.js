import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  navTitle: {
    ...Fonts.style.navigation,
    color: Colors.charcoalGray
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  rightButtonContainer: {
    justifyContent: 'flex-end',
    // alignItems: 'flex-end',
    paddingRight: 4
  },
  leftButtonContainer: {
    justifyContent: 'flex-start',
    paddingLeft: 4
  },
  iconView: {
    width: 50,
    height: 44,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  navContainer: {
    shadowColor: "rgba(69, 69, 83, 0.1)",
    shadowOffset: {
      width: 0,
      height: 2.5
    },
    shadowRadius: 5,
    shadowOpacity: 1
  }
})
