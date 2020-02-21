import React, { Component } from 'react'
import { GridRow, ListView } from '@shoutem/ui'
import { ScrollView, View, Dimensions } from 'react-native'
import DealCard from './DealCard'
import PropTypes from 'prop-types'
import { take } from 'lodash'
const { width } = Dimensions.get('screen')

class DealList extends Component {
  renderRow (rowData, sectionId, index) {
    let extra = {width: (width / 2) - 20}
    if ((index + 1) % 2 === 0) {
      extra.marginRight = 10
    } else {
      extra.marginLeft = 10
    }
    const cellViews = rowData.map((deal, id) => {
      return (
        <View key={id} style={extra}>
          <DealCard disableLike alwaysOn={this.props.alwaysOn} deal={deal} onClaim={this.props.onClaim} onPress={this.props.dealSelected} />
        </View>
      )
    })
    return (
      <GridRow columns={2}>
        {cellViews}
      </GridRow>
    )
  }

  render () {
    const { horizontal, deals, maxDeals, renderHeader, autoHideHeader, onLoadMore, loading, onRefresh, disableLike } = this.props
    let dealList = take(deals, (maxDeals || 12))

    const groupedDeals = GridRow.groupByRows(dealList, 2, () => {
      return 1
    })
    if (!horizontal) {
      return (
        <ListView
          refresh={onRefresh}
          loading={loading}
          onLoadMore={onLoadMore}
          autoHideHeader={autoHideHeader}
          renderHeader={renderHeader}
          style={{listContent: {backgroundColor: 'white', paddingBottom: 50}}}
          data={groupedDeals}
          renderRow={this.renderRow.bind(this)} />
      )
    } else {
      return (
        <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{paddingLeft: 15, marginTop: 10}}>
          {dealList.map((deal, idx) => (
            <View key={idx} style={{margin: 10, marginRight: 10}}>
              <DealCard disableLike={disableLike} alwaysOn={this.props.alwaysOn} onClaim={this.props.onClaim} deal={deal} onPress={this.props.dealSelected} />
            </View>
          ))}
        </ScrollView>
      )
    }
  }
}
DealList.propTypes = {
  disableLike: PropTypes.bool,
  deals: PropTypes.array.isRequired,
  dealSelected: PropTypes.func.isRequired,
  onClaim: PropTypes.func.isRequired,
  horizontal: PropTypes.bool,
  alwaysOn: PropTypes.bool
}

export default DealList
