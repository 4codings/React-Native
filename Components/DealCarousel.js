import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import DealCard from '../Components/DealCard'
import PropTypes from 'prop-types'
const { width } = Dimensions.get('window')

class DealCarousel extends Component {
  _renderItem ({item, index}) {
    return <DealCard deal={item} onClaim={this.props.onClaim} onPress={this.props.onPress} />
  }

  render () {
    return (
      <Carousel
        onSnapToItem={(index) => {
          this.props.onDealScroll(index)
        }}
        ref={(c) => { this._carousel = c }}
        data={this.props.deals}
        renderItem={this._renderItem.bind(this)}
        sliderWidth={width}
        itemWidth={(width / 2) - 25}
      />
    )
  }
}

DealCarousel.propTypes = {
  onDealScroll: PropTypes.func.isRequired,
  deals: PropTypes.array.isRequired,
  dealSelected: PropTypes.func.isRequired,
  onClaim: PropTypes.func.isRequired,
}
export default DealCarousel
