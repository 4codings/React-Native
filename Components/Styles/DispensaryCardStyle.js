import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    width: 130,
    paddingTop: 5
  },
  heart: {
    position: 'absolute',
    right: 0,
    top: -5
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 6,
    backgroundColor: Colors.charcoalGray
  },
  title: {
    fontFamily: Fonts.type.base,
    lineHeight: 16,
    fontSize: 14,
    letterSpacing: -0.5,
    color: Colors.charcoalGrey,
    marginTop: 10,
    marginBottom: 4
  },
  footerText: {
    fontFamily: Fonts.type.base,
    fontSize: 11,
    color: Colors.blueyGrey
  }
})
