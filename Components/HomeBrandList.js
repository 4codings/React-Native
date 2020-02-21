import React, { Component } from 'react'
import { TouchableOpacity, Spinner } from '@shoutem/ui'
import { StyleSheet, ScrollView, View, Image, Text, Dimensions } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { ApplicationStyles, Colors } from '../Themes'
import _ from 'lodash'

let width = Dimensions.get('screen').width
let brandCardWidth = width - 50
const query = gql`{
  allBrands {
    id
    slug
    logo
    header
    name
    featured
  }
}
`

const FeaturedBrandCard = (props) => (
  <View style={{margin: 20, flex: 1, alignContent: 'center', borderRadius: 6, justifyContent: 'center', width: brandCardWidth, height: brandCardWidth, borderColor: Colors.jungleGreen, borderWidth: 1}}>
    <TouchableOpacity onPress={() => props.onBrandSelected(props.brand)}>
      <Image
        style={styles.brandImage}
        resizeMode='contain'
        source={{uri: props.brand.logo || 'https://www.placehold.it/400x400'}}
      />
    </TouchableOpacity>
  </View>
)

class HomeBrandList extends Component {
  render () {
    const { data, onBrandSelected, brands, showsAllBrands } = this.props
    if (data.networkStatus === 1) {
      return <Spinner />
    }
    if (data.error) {
      return <Text>Error! {data.error.message}</Text>
    }
    let allBrands = null
    if (showsAllBrands) {
      let brandList = brands || data.allBrands
      allBrands = _.concat([], _.filter(brandList, {featured: true}), _.filter(_.shuffle(_.uniqBy(brandList), 'id'), {featured: false}))
    } else {
      allBrands = _.uniqBy(brands, 'id')
    }
    return (
      <View style={styles.container}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {allBrands.map(brand => {
            return (<FeaturedBrandCard brand={brand} onBrandSelected={onBrandSelected} key={brand.id} />)
          })}
        </ScrollView>
      </View>)
  }
}

HomeBrandList.propTypes = {
  onBrandSelected: PropTypes.func.isRequired
}

export default graphql(query)(HomeBrandList)

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  brandCard: {
    margin: 20
  },
  brandContainer: {
    padding: 5
  },
  brandImage: {
    resizeMode: 'contain',
    marginLeft: 25,
    width: brandCardWidth - 50,
    height: brandCardWidth - 50
  }
})
