import React, { Component } from 'react'
import { TouchableOpacity, View, Image, Text } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import DealActions from '../Redux/DealsRedux'
import styles from './Styles/DealCardStyles'
import { Images } from '../Themes'
import moment from 'moment'
import FastImage from 'react-native-fast-image'
// Notifications
// New User Onboarding
class DealCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      claimed: false
    }
  }
  onPress () {
    const { deal, setCurrentDeal, onPress } = this.props
    setCurrentDeal(deal)
    onPress()
  }

  onClaim () {
    const { deal, onClaim } = this.props
    let eDeal = Object.assign({}, deal)
    eDeal.claimed = this.state.claimed
    onClaim(eDeal)
    this.setState({
      claimed: !this.state.claimed
    })
  }

  componentDidMount () {
    const { deal } = this.props
    this.setState({
      claimed: deal.claimed
    })
  }

  render () {
    const { deal, disableLike } = this.props
    let renderedDistance = 0
    if (deal.distance < 0.0001) {
      renderedDistance = 0.01
    } else {
      renderedDistance = parseFloat(deal.distance).toFixed(2)
    }
    let favImage = Images.favoritesIcon
    let favImageExtra = {}
    if (this.props.alwaysOn || this.state.claimed) {
      favImage = Images.dealCardHeart
    } else {
      favImageExtra.top = 10
      favImageExtra.right = 10
    }
    return (
      <View style={[styles.container, {marginBottom: 30}]}>
        <View>
          <TouchableOpacity onPress={this.onPress.bind(this)}>
            <FastImage
              style={styles.image}
              source={{ uri: deal.image || '' }} />
          </TouchableOpacity>
          {this.props.user && !disableLike ? (
            <TouchableOpacity onPress={this.onClaim.bind(this)} style={[styles.heart, favImageExtra]}>
              <FastImage source={favImage} />
            </TouchableOpacity>) : null }
        </View>
        <View>
          {deal.discount || deal.price ? <View style={styles.priceContainer}>
            <Text style={styles.priceText}>{deal.discount ? `$ ${deal.discount}` : ''}</Text>
            <Text style={styles.discountText}>{deal.price ? `$ ${deal.price}` : ''}</Text>
          </View> : null}
          <TouchableOpacity onPress={this.onPress.bind(this)}>
            <Text style={styles.title} numberOfLines={3}>{deal.name || ''}</Text>
          </TouchableOpacity>
          <View style={styles.footer}>
            <Text style={styles.footerText}>{`${renderedDistance} mi.`}</Text>
            <Text style={styles.footerText}>{deal.expires ? moment(deal.expires).fromNow() : ''}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentDeal: (deals) => dispatch(DealActions.setCurrentDeal(deals))
  }
}

DealCard.propTypes = {
  disableLike: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  deal: PropTypes.object.isRequired,
  onClaim: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(DealCard)
