import React from 'react';
import { SafeAreaView, View, Image, Text, TouchableOpacity, Dimensions, Linking, ScrollView } from 'react-native';
import styles from './styles';
import StickyHeader from '../StickyHeader';
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { BannerView, InterstitialAdManager, AdSettings } from 'react-native-fbads';
import { bannerAdPlacementId, InterstitialAdPlacementId } from '../Constant/Adskeys';

export default class AboutSceen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            is_landscape: '',
            is_adShow: false,
            bannerAdPlacementId: bannerAdPlacementId
        }
    }

    getOrientation = () => {
        if (Dimensions.get('window').width < Dimensions.get('window').height) {
            this.setState({ is_landscape: false });
        } else {
            this.setState({ is_landscape: true });
        }
    }

    componentDidMount() {
        this.getOrientation();
        lor(this);

        Dimensions.addEventListener('change', () => {
            this.getOrientation();
        });
    }

    componentWillUnmount() {
        rol();
    }

    render() {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <View style={styles.MainContainer}>
                    <StickyHeader headerTitle={'About'} props={this.props} />

                    <ScrollView style={styles.ScrollContainer}>

                        <View style={styles.logoContainer}>
                            <Image
                                source={require('../../assets/hash_illustrator.png')}
                                style={styles.logoImage}
                                resizeMode="contain"
                            />
                        </View>

                        <View style={styles.descriptionContainer}>
                            <Text style={styles.detailsTitleQue}>What are hashtags?</Text>
                            <Text style={styles.detailsTitle}>
                                Hashtags are a set of keywords preceded by the hash symbol that are used primarily to describe the content of a post and relate it to other posts with similar content. When a hashtag is used in a post, that post will be related to others that have the same hashtag.
                            </Text>

                            <Text style={styles.detailsTitleQue}>Want more likes and followers? Want to tag your pictures fast and effectively?</Text>
                            <Text style={styles.detailsTitle}>
                                Then try the our App to tag your pictures on Instagram & Twitter!{'\n'}
                                Quickly copy and paste the best hashtags for Instagram and Twitter!
                            </Text>

                            <Text style={styles.detailsTitleQue}>Features: </Text>
                            <Text style={[styles.detailsTitle, { marginVertical: 0 }]}>
                                <Text style={styles.detailssubTitle}>
                                    - Categories: {'\n'}
                                </Text>
                                There are multiple categories to choose your desired hashtags from. You can find most popular hashtags for your related posts.{'\n'}
                                <Text style={styles.detailssubTitle}>
                                    - Hashtags collection: {'\n'}
                                </Text>
                                You can select and save your personalized hashtags. and afetr saving you can also edit your collection.{'\n'}
                                <Text style={styles.detailssubTitle}>
                                    - Other Features: {"\n"}
                                </Text>
                                Select multiple hashtags, copy hashtags and share the hashtags with your friends on social networks.
                            </Text>

                        </View>
                    </ScrollView>
                    <View style={[styles.bannerContainer, { position: this.state.is_adShow ? 'relative' : 'absolute' }]}>
                        <BannerView
                            placementId={this.state.bannerAdPlacementId}
                            type="standard"
                            onPress={() => console.log('click')}
                            onLoad={() => this.setState({ is_adShow: true })}
                            onError={(err) => console.log('error', err)}
                        />
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}