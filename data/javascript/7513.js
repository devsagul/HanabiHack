import React, {Component, PropTypes} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  Alert,
  Platform,
  Dimensions,
  Image,
  WebView,
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import * as detailsActions from '../reducers/details/actions';
import {connect} from 'react-redux';
import LoadingView from '../components/LoadingView';

import * as config from '../config';
const colors = {
  red0: '#992820',
  red1: '#682825',
  yellow: '#F2DCAB',
  black: '#333333',
  white: '#ffffff',
  gray: '#C7C7C7',
  pink: '#FD4482'
}


const posterWidth = Dimensions.get('window').width;
const PARALLAX_HEADER_HEIGHT = 300;
const STICKY_HEADER_HEIGHT = 70;
Number.prototype.formatMoney = function(c, d, t){
  var n = this,
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
  return '$' + s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};


class MoreInfoScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  static propTypes = {
    movieId: PropTypes.number
  }

  componentDidMount() {
    this.props.dispatch(detailsActions.fetchMovieDetailsAction(this.props.movieId || 271110))
  }

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id == 'cancel') { // this is the same id field from the static navigatorButtons definition
        this.props.navigator.dismissModal();
      }
    }
  }

  render() {
    if (this.props.details.isLoading == true || this.props.details.details === undefined) {
      return (
        <View>
          <LoadingView />
        </View>
      );
    }
    let details = this.props.details.details;
    let youtubeTrailers = (details.videos.results || [])
      .filter(vid => vid.site === 'YouTube' && vid.type === 'Trailer')
      .map(vid =>  `https://www.youtube.com/embed/${vid.key}?rel=0&autoplay=0&showinfo=0&controls=0`);

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.black
        }}
      >
      <ParallaxScrollView
        backgroundColor="#333333"
        contentBackgroundColor={colors.black}
        parallaxHeaderHeight={200}
        renderBackground={() => (
          <View key="background">
            <Image source={{
              uri: `${config.TMDB_POSTER_BASE}${details.backdrop_path}`,
              width: window.width,
              height: PARALLAX_HEADER_HEIGHT}}
            />
            <View style={{position: 'absolute',
              top: 0,
              width: window.width,
              backgroundColor: 'rgba(0,0,0,.4)',
              height: PARALLAX_HEADER_HEIGHT}}/>
          </View>
        )}
        renderForeground={() => (
          <View style={{ height: 300, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          </View>
        )}>
        <View>
          <View style={styles.title}>
            <Image
              source={{
                uri: `${config.TMDB_POSTER_BASE}${details.poster_path}`,
                width: 100,
                height: 120
              }}
              style={{
                position: 'absolute',
                bottom: 10,
                left: 20
              }}
            />
            <View style={{
              width: 100
            }}/>
            <View>
              <View style={{
                flexDirection: 'row',
                marginLeft: 30,
                marginTop: 20,
                marginBottom: 2
              }}>
                <Text style={styles.titleMeta}>{details.release_date.split('-')[0]}</Text>
                <Text style={styles.titleMeta}>{details.runtime} mins</Text>
              </View>
              <Text style={styles.titleText}>
                {details.title}
              </Text>
            </View>
          </View>
          <View style={{
            marginHorizontal: 20,
          }}>
            <View style={{
              flexDirection: 'row'
            }}>
              <Text style={styles.detailHeadline}>
                PRODUCER
              </Text>
              <Text style={styles.detailText}>
                {details.production_companies.map(c => c.name).join(', ')}
              </Text>
            </View>
            <View style={{
              flexDirection: 'row'
            }}>
              <Text style={styles.detailHeadline}>
                BUDGET
              </Text>
              <Text style={styles.detailText}>
                {parseInt(details.budget, 10).formatMoney(0)}
              </Text>
            </View>
            <View style={{
              flexDirection: 'row'
            }}>
              <Text style={styles.detailHeadline}>
                REVENUE
              </Text>
              <Text style={styles.detailText}>
                {parseInt(details.revenue, 10).formatMoney(0)}
              </Text>
            </View>
            <View style={{
              flexDirection: 'row'
            }}>
              <Text style={styles.detailHeadline}>
                RELEASE
              </Text>
              <Text style={[styles.detailText, { color: colors.pink }]}>
                {details.release_date}
              </Text>
            </View>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
              <View style={{
                flexDirection: 'row'
              }}>
              </View>
              <Text style={styles.detailText}>
              </Text>
            </View>
            <View style={{
              paddingVertical: 5,
              backgroundColor: '#2B2B2B',
              alignItems: 'center',

            }}>
              <Text style={[styles.titleMeta, { paddingRight: 0, marginBottom: 0 }]}>
                Average Rating
              </Text>
              <Text style={[styles.detailText, { marginLeft: 0, marginVertical: 0 }]}>{details.vote_average}</Text>
              <Text style={[styles.titleMeta, { paddingRight: 0, marginTop: 2 }]}>
                {details.vote_count}
              </Text>
            </View>
            <Text style={{
              color: colors.gray,
              marginLeft: 0,
              marginVertical: 15,
              alignSelf: 'center',
              fontSize: 15,
              fontWeight: '700'
            }}>
              {`<<${details.tagline}>>`}
            </Text>
            <Text style={{ color: colors.gray, marginLeft: 0,  alignSelf: 'center', textAlign: 'center', marginBottom: 15 }}>
              {details.overview}
            </Text>
            {youtubeTrailers.length > 0 && <Text style={[styles.detailHeadline, { alignSelf: 'center', marginBottom: 20 }]}>
              TRAILERS
            </Text>}
            {youtubeTrailers.length > 0 && <ScrollView horizontal={true}
                        pagingEnabled={true}
                        style={{ height: 200, width: posterWidth - 40, marginBottom: 30  }}
                        contentContainerStyle={[
                          { width: youtubeTrailers.length * (posterWidth - 40) }
                        ]}
            >
              {youtubeTrailers.map(trailer => (
                <WebView
                  key={trailer}
                  style={{height: 200}}
                  javaScriptEnabled={true}
                  source={{uri: trailer}}
                />
              ))}
            </ScrollView>}
            <TouchableHighlight
              underlayColor={'#EE3425'}
              style={{
              height: 40,
              backgroundColor: '#C01A00',
              padding: 10,
              marginBottom: 30,
              alignItems: 'center',
              marginHorizontal: 30
            }}>
              <Text style={{
                color: 'white',
                fontWeight: '900',
              }}>WATCH ON NETFLIX NOW</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ParallaxScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  title: {
    backgroundColor: colors.black,
    flexDirection: 'row'
  },
  titleText: {
    marginBottom: 20,
    marginLeft: 30,
    fontSize: 17,
    color: colors.white
  },
  titleMeta: {
    fontSize: 12,
    color: colors.gray,
    paddingRight: 10,
    fontWeight: '100'
  },
  detailHeadline: {
    color: colors.gray,
    fontWeight: '700',
    marginTop: 5,
  },
  detailText: {
    color: colors.white,
    marginTop: 5,
    marginLeft: 15
  }
});

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(MoreInfoScreen);
