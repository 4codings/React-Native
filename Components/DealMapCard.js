import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { ParallaxImage } from 'react-native-snap-carousel'
import styles from '../Components/Styles/SliderEntryStyles'

export default class DealMapCard extends Component {
  static propTypes = {
    deal: PropTypes.object.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object
  }

  get image () {
    const { deal: { image }, parallax, parallaxProps, even } = this.props

    return parallax ? (
      <ParallaxImage
        source={{ uri: image || 'https://www.placehold.it/300x400' }}
        containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner
        spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
        {...parallaxProps}
      />
    ) : (
      <Image
        source={{ uri: image || 'https://www.placehold.it/300x400' }}
        style={styles.image}
      />
    )
  }

  render () {
    const { deal: { name, discount, price }, even } = this.props

    const uppercaseTitle = name ? (
      <Text
        style={[styles.title, even ? styles.titleEven : {}]}
        numberOfLines={2}
      >
        { name }
      </Text>
    ) : false

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        onPress={() => { alert(`You've clicked '${name}'`) }}
        >
        <View style={styles.shadow} />
        <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
          { this.image }
          <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
        </View>
        <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
          { uppercaseTitle }
          <Text
            style={[styles.subtitle, even ? styles.subtitleEven : {}]}
            numberOfLines={2}
          >
            { discount } - {price}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}
