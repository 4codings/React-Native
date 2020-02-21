import { StyleSheet, Dimensions } from 'react-native'
import { Fonts, Colors } from '../../Themes'
let dimentions = Dimensions.get('screen')
let itemWidth = (dimentions.width / 2) - 25
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  content: {
    marginLeft: 25,
    marginRight: 25
  },
  articleTitle: {
    fontFamily: Fonts.type.light,
    fontSize: 29,
    lineHeight: 34,
    letterSpacing: -0.5,
    color: Colors.charcoalGray,
    marginTop: 210,
    marginBottom: 15
  },
  articleMeta: {
    fontFamily: Fonts.type.base,
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: -0.5,
    color: Colors.blueyGrey,
    marginBottom: 15
  },
  p: {
    fontFamily: Fonts.type.light,
    fontSize: 14,
    lineHeight: 18,
    color: Colors.charcoalGray
  },
  img: {
    marginLeft: -25,
    backgroundColor: Colors.charcoalGray,
    height: 10
  },
  div: {
    fontFamily: Fonts.type.light,
    fontSize: 14,
    lineHeight: 18,
    color: Colors.charcoalGray
  },
  a: {
    color: Colors.aquaGreen,
    fontFamily: Fonts.type.semiBold
  },
  br: {
    height: 0
  }

})
