import PropTypes from 'prop-types'
import React from 'react'
import { Dimensions, SafeAreaView, StatusBar, Platform, ScrollView, Text, View, Share } from 'react-native'
import * as _ from 'lodash'
import moment from 'moment'
import FastImage from 'react-native-fast-image'
import ContainerBase from '../Containers/ContainerBase'
import he from 'he'
import HTMLView from 'react-native-htmlview'
import styles from '../Components/Styles/ArticleDetailStyles'
// import { connectStyle } from '@shoutem/theme'
import {
  Caption,
  ImageGallery,
  Image,
  Lightbox,
  Row,
  Subtitle
} from '@shoutem/ui'
import { Navbar } from '../Components/Navbars'

const maxWidth = Dimensions.get('window').width

// import { NextArticle } from 'shoutem.news'

// import { getLeadImageUrl } from '../services'
const AuthorBlock = (props) => (
  <Row visible={props.visible}>
    <Image
      styleName='small rounded-corners placeholder top'
      source={{ uri: props.imageUrl || undefined }}
    />
    <View styleName='vertical md-gutter-left'>
      <View styleName='horizontal space-between'>
        <Subtitle>{`${props.name}`}</Subtitle>
        <Caption>{props.details}</Caption>
      </View>
    </View>
  </Row>
)
class ArticleDetailsScreen extends ContainerBase {
  constructor (props) {
    super(props)
    this.state = {
      showBox: false
    }
  }
  static propTypes = {
    article: PropTypes.object.isRequired,
    nextArticle: PropTypes.object,
    openArticle: PropTypes.func,
    showInlineGallery: PropTypes.bool,
    openNextArticle: PropTypes.func
  }

  componentDidMount () {
    this.timeoutHandle = setTimeout(() => {
      // Add your logic for the transition
      if (this.state.showBox === false) {
        this.setState({showBox: true})
      }
    }, 1000)
  }

  renderUpNext () {
    const { nextArticle, openArticle } = this.props
    if (nextArticle && openArticle) {
      return (
        <View />
      )
    }

    return null
  }

  renderInlineGallery () {
    const { article, showInlineGallery } = this.props
    if (!showInlineGallery) {
      return null
    }
    const images = _.map(article.wp.attachments.href, 'url')
    return (
      <ImageGallery sources={images} height={300} width={Dimensions.get('window').width} />
    )
  }

  renderElement (node) {
    if (node.tag === 'img') {
      if (node.attributes.src) {
        let originalWidth = parseInt(node.attributes.width)
        let originalHeight = parseInt(node.attributes.height)
        let newHeight = (originalHeight / originalWidth) * maxWidth

        let resized = {
          width: maxWidth,
          height: newHeight
        }
        return (
          <View style={{
            flexDirection: 'row',
            marginLeft: -20,
            marginRight: -20,
            marginBottom: 20
          }}>
            <Lightbox style={{ width: maxWidth }}>
              <Image
                style={{ height: resized.height, width: resized.width, flex: 1 }}
                resizeMode='contain'
                source={{ uri: node.attributes.src }}
              />
            </Lightbox>
          </View>
        )
      }
    }
  }

  navigateBack () {
    this.props.navigateBack()
  }

  shareArticle = () => {
    const { article } = this.props
    Share.share({
      title: article.title.rendered,
      message: `Check out this article ${article.title.rendered}`,
      url: article.guid.rendered
    })
  }

  render () {
    const { article } = this.props
    const articleImageUrl = article._embedded['wp:featuredmedia'][0].source_url // 'http://placeholder.pics/svg/300'// getLeadImageUrl(article)
    const momentDate = moment(article.modified)
    let author = {}
    if (article._embedded.author.length > 0) {
      author = article._embedded.author[0]
    }
    const dateInfo = momentDate.isAfter(0) ? (
      <Caption styleName='md-gutter-left'>
        {momentDate.fromNow()}
      </Caption>
    ) : null

    return (
      <SafeAreaView style={{flex: 1}}>
        {Platform.OS === 'ios' ? <StatusBar barStyle='dark-content' /> : null}
        <ScrollView style={styles.container}>
          <Navbar title=''
            noMargin
            leftButtons={[
              {
                icon: 'arrowLeftCircle',
                onPress: this.props.navigateBack
              }
            ]}
            rightButtons={[
              {
                icon: 'shareIcon',
                onPress: this.shareArticle
              }
            ]}
            />
          <FastImage style={{width: '100%', height: 250, position: 'absolute'}} source={articleImageUrl ? { uri: articleImageUrl } : undefined} />
          <View style={styles.content}>
            <Text style={styles.articleTitle}>{he.decode(article.title.rendered)}</Text>
            <Text style={styles.articleMeta}>{`Posted on ${moment(article.data).format('MMMM DD, YYYY')} by ${author.name}`}</Text>
            <HTMLView
              addLineBreaks={false}
              style={[styles.htmlView]}
              value={article.content}
              stylesheet={styles}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}
export default ArticleDetailsScreen
// export default connectStyle(ext('ArticleDetailsScreen'))(ArticleDetailsScreen)
