import React from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/LabelsStyle'

export const SectionHeader = ({title, hideSeeAll, containerStyle, onPress}) => (
  <View style={[styles.container, containerStyle || {}]}>
    <Text style={styles.sectionHeader}>{title}</Text>
    {!hideSeeAll ? <TouchableOpacity onPress={onPress}>
      <Text style={styles.seeAll}>SEE ALL</Text>
    </TouchableOpacity> : null}
  </View>
)
