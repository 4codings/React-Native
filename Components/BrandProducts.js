import React, { Component } from 'react'
import { ListView, GridRow, Card, Image, View, Subtitle, Caption, Html } from '@shoutem/ui'
import PropTypes from 'prop-types'
class BrandProduct extends Component {
  renderRow (rowData, sectionId, index) {
    const cellViews = rowData.map((product, id) => {
      return (
        <Card key={id} styleName='flexible'>
          <Image
            styleName='medium-wide'
            source={{ uri: product.image || 'https://www.placehold.it/300x400' }}
          />
          <View styleName='content'>
            <Subtitle numberOfLines={3}>{product.name}</Subtitle>
            <View styleName='horizontal'>
              <Caption styleName='collapsible' numberOfLines={5}>{product.desc.replace(/<\/?[^>]+(>|$)/g, '')}</Caption>
            </View>
          </View>
        </Card>
      )
    })

    return (
      <GridRow columns={2}>
        {cellViews}
      </GridRow>
    )
  }
  render () {
    const groupedData = GridRow.groupByRows(this.props.products, 2, () => {
      return 1
    })
    return (

      <ListView
        data={groupedData}
        renderRow={this.renderRow}
      />
    )
  }
}

BrandProduct.propTypes = {
  products: PropTypes.array.isRequired
}

export default BrandProduct
