import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/DispensaryCardStyle'
import FastImage from 'react-native-fast-image'
import { Images } from '../Themes'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { distanceBetweenToCoords } from '../Lib/Geo'
import DispensaryActions from '../Redux/DispensaryRedux'

class DispensaryCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      favorite: false
    }
  }

  componentDidMount () {
    this.setState({
      favorite: this.props.dispensary.favorite
    })
  }

  onPress () {
    const { dispensary, setCurrentDisp, onPress } = this.props
    setCurrentDisp(dispensary)
    onPress()
  }

  onFavorite () {
    const { dispensary, onFavorite } = this.props
    let eDisp = Object.assign({}, dispensary)
    eDisp.favorite = this.state.favorite
    onFavorite(eDisp)
    this.setState({
      favorite: !this.state.favorite
    })
  }

  render () {
    const { dispensary, currentLocation, imageStyle, containerStyle } = this.props
    let renderedDistance = distanceBetweenToCoords(
      dispensary.coordinates.lat,
      dispensary.coordinates.lng,
      currentLocation.latitude,
      currentLocation.longitude
    ).toFixed(1)
    if (renderedDistance < 0.0001) {
      renderedDistance = 0.0001
    }
    let favImage = Images.favoritesIcon
    let favImageExtra = {}
    if (this.props.alwaysOn || this.state.favorite) {
      favImage = Images.dealCardHeart
    } else {
      favImageExtra.top = 10
      favImageExtra.right = 10
    }
    return (
      <View style={[styles.container, containerStyle]}>
        <View>
          <TouchableOpacity onPress={this.onPress.bind(this)}>
            <FastImage
              style={[styles.image, imageStyle]}
              source={{ uri: (dispensary.images && dispensary.images.length > 0 ? dispensary.images[0] : '') }} />
          </TouchableOpacity>
          {this.props.user ? (<TouchableOpacity onPress={this.onFavorite.bind(this)} style={[styles.heart, favImageExtra]}>
            <FastImage source={favImage} />
          </TouchableOpacity>) : null}
        </View>
        <View>
          <TouchableOpacity onPress={this.onPress.bind(this)}>
            <Text style={styles.title} numberOfLines={3}>{dispensary.name || ''}</Text>
          </TouchableOpacity>
          <View style={styles.footer}>
            <Text style={styles.footerText}>{`${renderedDistance} mi.`}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentLocation: state.location.location,
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentDisp: (disp) => dispatch(DispensaryActions.setCurrentDispensary(disp))
  }
}

DispensaryCard.propTypes = {
  onPress: PropTypes.func.isRequired,
  dispensary: PropTypes.object.isRequired,
  onFavorite: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(DispensaryCard)
