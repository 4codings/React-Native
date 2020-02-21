import React from 'react'
// import PropTypes from 'prop-types';
import { ScrollView, View, Text, Image } from 'react-native'
import { DrawerItems, SafeAreaView } from 'react-navigation'
import styles from './Styles/DrawerStyle'
import { Colors, Fonts, Images } from '../Themes'
import { Avatar } from 'react-native-elements'
import { connect } from 'react-redux'

const DrawerContentComponent = (props) => (
  <View style={{flex: 1}}>
    <ScrollView style={styles.drawerChild}>
      {props.user ? <View style={{height: 100, alignItems: 'center', marginTop: 30}}>
        <Avatar
          large
          rounded
          title={`${(props.user.firstName && props.user.firstName.length > 0 ? props.user.firstName[0] : '')}${props.user.lastName && props.user.lastName.length > 0 ? props.user.lastName[0] : ''}`}
          activeOpacity={0.7}
        />
        <Text style={{marginTop: 10, fontFamily: Fonts.type.base, fontSize: 14, color: Colors.charcoalGray}}>{props.user.firstName} {props.user.lastName}</Text>
      </View> : null}
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <DrawerItems
          {...props}
          itemStyle={{alignItems: 'center', alignContent: 'center', justifyContent: 'center'}}
          labelStyle={{textAlign: 'center', fontFamily: Fonts.type.extraLight, color: Colors.charcoalGray, fontWeight: '300', fontSize: 26, letterSpacing: 0.7}}
          />
      </SafeAreaView>
    </ScrollView>
    <View style={{position: 'absolute', alignItems: 'center', justifyContent: 'center', bottom: 30, width: '100%', height: 70}}>
      <Image source={Images.logo} resizeMode='contain' style={{maxWidth: 70}} />
    </View>
  </View>

)

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => ({
})

const DrawerRedux = connect(mapStateToProps, mapDispatchToProps)(DrawerContentComponent)
export default DrawerRedux
