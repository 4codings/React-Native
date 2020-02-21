import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginTop: 40
  },
  sectionHeader: {
    fontFamily: Fonts.type.light,
    fontSize: 21,
    lineHeight: 21,
    letterSpacing: -0.7,
    color: Colors.charcoalGray,
    flex: 1,
    marginLeft: 25
  },
  seeAll: {
    fontFamily: Fonts.type.base,
    letterSpacing: 0.5,
    fontSize: 10,
    color: Colors.blueyGrey,
    flex: 1,
    textAlign: 'right',
    marginRight: 25,
    alignItems: 'baseline'
  }
})
