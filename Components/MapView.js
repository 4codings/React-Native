import React, { Component } from 'react'
import { Dimensions, StyleSheet, View, Text } from 'react-native'
import RMapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps'
import PropTypes from 'prop-types'
import { Images, Colors, Fonts } from '../Themes'
import DealCarousel from '../Components/DealCarousel'

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class MapView extends Component {
  getCoordsForItem (item) {
    let itemType = this.props.itemType
    if (itemType === 'deal') {
      if (item.dispensaries.length > 0) {
        let c = item.dispensaries[0].coordinates
        return {
          latitude: c.lat,
          longitude: c.lng
        }
      }
    }

    if (itemType === 'dispensary') {
      if (item && item.coordinates) {
        return {
          latitude: item.coordinates.lat,
          longitude: item.coordinates.lng
        }
      } else {
        return {
          latitude: 0,
          longitude: 0
        }
      }
    }

    return {
      latitude: 0,
      longitude: 0
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.region) {
      if (nextProps.region.lat === this.props.region.lat && nextProps.region.lng === this.props.region.lng) {
        return false
      }
    }
    return true
  }

  onDealScroll (index) {
    let item = this.props.items[index]
    let coords = this.getCoordsForItem(item)
    this.mapView.animateToCoordinate(coords)
  }

  showCallout (index) {
    this[`marker${index}`].showCallout()
  }

  render () {
    const { itemType, hidesCarousel } = this.props
    if (this.marker0) {
      setTimeout(() => {
        this.marker0.showCallout()
        // this.props.clearCalloutMarker()
      }, 0)
    }

    return (
      <View style={styles.container}>
        <RMapView
          ref={(mapView) => { this.mapView = mapView }}
          style={{width: this.props.width || '100%', height: this.props.height || '70%'}}
          showsUserLocation
          scrollEnabled
          pitchEnabled
          // provider={PROVIDER_GOOGLE}
          // style={styles.map}
          region={{
            latitude: (this.props.region ? this.props.region.lat : 37.78825),
            longitude: (this.props.region ? this.props.region.lng : -122.4324),
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LATITUDE_DELTA * ((this.props.height || height) / (this.props.width || width))
          }}
          customMapStyle={mapStyle}>
          {this.props.items.map((item, idx) => {
            let coords = this.getCoordsForItem(item)
            if (itemType === 'deal' && item.dispensaries.length > 0) {
              let dispensary = item.dispensaries[0]
              return (
                <Marker
                  key={idx}
                  ref={ref => {
                    this[`marker${idx}`] = ref
                  }}
                  image={Images.mapPin}
                  coordinate={coords}>
                  <Callout tooltip onPress={() => this.props.onCalloutPress(dispensary, item)}>
                    <View style={styles.callout}>
                      <Text style={styles.calloutTitle}>{item.name}</Text>
                      <Text style={styles.calloutDesc}>{dispensary.name}</Text>
                      <Text style={[styles.calloutDesc, {fontWeight: '300'}]}>{dispensary.address}, {dispensary.city}, {dispensary.state}, {dispensary.zip}</Text>
                    </View>
                  </Callout>
                </Marker>
              )
            } else {
              return (
                <Marker
                  key={idx}
                  ref={ref => {
                    this[`marker${idx}`] = ref
                  }}
                  image={Images.mapPin}
                  coordinate={coords}>
                  <Callout tooltip onPress={() => this.props.onCalloutPress(item)}>
                    <View style={styles.callout}>
                      <Text style={styles.calloutTitle}>{item.name}</Text>
                      <Text style={styles.calloutDesc}>{item.address}, {item.city}, {item.state}, {item.zip}</Text>
                    </View>
                  </Callout>
                </Marker>
              )
            }
          })}
        </RMapView>
        {itemType === 'deal' && !hidesCarousel ? <View style={styles.itemContainer} pointerEvents='box-none'>
          <DealCarousel deals={this.props.items} onPress={this.props.onDealPress} onClaim={this.props.onDealClaim} onDealScroll={this.onDealScroll.bind(this)} />
        </View> : null}
      </View>
    )
  }
}

MapView.propTypes = {
  itemType: PropTypes.oneOf(['deal', 'dispensary']).isRequired,
  items: PropTypes.array.isRequired,
  region: PropTypes.object,
  onCalloutPress: PropTypes.func
}

const styles = StyleSheet.create({
  calloutTitle: {
    fontFamily: Fonts.type.bold,
    color: Colors.aquaGreen,
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: -0.2,
    marginBottom: 5
  },
  calloutDesc: {
    fontFamily: Fonts.type.base,
    color: Colors.charcoalGrey,
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: -0.2
  },
  callout: {
    width: 210,
    padding: 20,
    flex: 1,
    minHeight: 50,
    backgroundColor: 'white',
    marginBottom: 10,
    shadowColor: Colors.charcoalGrey,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2.5 },
    shadowRadius: 10,
    borderRadius: 6
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  itemContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    // paddingHorizontal: (ITEM_SPACING / 2) + ITEM_PREVIEW,
    position: 'absolute',
    paddingTop: height - 300 - 64
  }
})

const mapStyle = [
  {
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#f5f5f5'
      }
    ]
  },
  {
    'elementType': 'labels.icon',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  },
  {
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#616161'
      }
    ]
  },
  {
    'elementType': 'labels.text.stroke',
    'stylers': [
      {
        'color': '#f5f5f5'
      }
    ]
  },
  {
    'featureType': 'administrative.land_parcel',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#bdbdbd'
      }
    ]
  },
  {
    'featureType': 'poi',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#eeeeee'
      }
    ]
  },
  {
    'featureType': 'poi',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#757575'
      }
    ]
  },
  {
    'featureType': 'poi.park',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#e5e5e5'
      }
    ]
  },
  {
    'featureType': 'poi.park',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#9e9e9e'
      }
    ]
  },
  {
    'featureType': 'road',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#ffffff'
      }
    ]
  },
  {
    'featureType': 'road.arterial',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#757575'
      }
    ]
  },
  {
    'featureType': 'road.highway',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#dadada'
      }
    ]
  },
  {
    'featureType': 'road.highway',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#616161'
      }
    ]
  },
  {
    'featureType': 'road.local',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#9e9e9e'
      }
    ]
  },
  {
    'featureType': 'transit.line',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#e5e5e5'
      }
    ]
  },
  {
    'featureType': 'transit.station',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#eeeeee'
      }
    ]
  },
  {
    'featureType': 'water',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#c9c9c9'
      }
    ]
  },
  {
    'featureType': 'water',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#9e9e9e'
      }
    ]
  }
]

export default MapView
