import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Fonts } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  drawerChild: {
    backgroundColor: Colors.white
    // backgroundColor: 'blue',
    // transform: [
    //   { perspective: 850 },
    //   { translateX: - Dimensions.get('window').width * 0.24 },
    //   { rotateY: '60deg'},
    // ],
  }
})
