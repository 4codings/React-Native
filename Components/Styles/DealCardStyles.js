import { StyleSheet, Dimensions } from 'react-native'
// import FastImage from 'react-native-fast-image'
import { Fonts, Colors } from '../../Themes'
let dimentions = Dimensions.get('screen')
let itemWidth = (dimentions.width / 2) - 25
export default StyleSheet.create({
  container: {
    flex: 1,
    width: itemWidth,
    paddingTop: 5
  },
  priceContainer: {
    justifyContent: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 12
  },
  priceText: {
    fontFamily: Fonts.type.semiBold,
    fontSize: 16,
    color: Colors.charcoalGray
  },
  discountText: {
    fontFamily: Fonts.type.semiBold,
    fontSize: 12,
    color: Colors.pinkishGrey,
    marginLeft: 8
  },
  image: {
    width: itemWidth,
    height: itemWidth,
    backgroundColor: Colors.charcoalGray,
    borderRadius: 6
  },
  heart: {
    position: 'absolute',
    right: 0,
    top: -5
  },
  title: {
    fontFamily: Fonts.type.base,
    fontSize: 14,
    lineHeight: 16,
    color: Colors.flatBlue,
    marginTop: 6
  },
  footer: {
    marginTop: 14,
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  footerText: {
    flex: 1,
    fontSize: 11,
    fontFamily: Fonts.type.base,
    letterSpacing: -0.4,
    color: Colors.blueyGrey
  }
})
