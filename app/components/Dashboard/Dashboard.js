import React from 'react';
import { SafeAreaView, View, FlatList, TouchableOpacity, Text, Linking, Share, Image, Dimensions } from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import Constant from '../Constant/Constant';
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { BannerView, InterstitialAdManager, AdSettings } from 'react-native-fbads';
import { bannerAdPlacementId, InterstitialAdPlacementId } from '../Constant/Adskeys';
import SplashScreen from 'react-native-splash-screen';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.options = [
            { id: 1, title: 'Hashtag', gradient1: '#91d1fe', gradient2: '#259ff4', img: require('../../assets/hashtag.png') },
            { id: 2, title: 'Collection', gradient1: '#ad8aff', gradient2: '#7b52ff', img: require('../../assets/visualization.png') },
            { id: 3, title: 'Rate', gradient1: '#ff97f1', gradient2: '#ff43de', img: require('../../assets/star.png') },
            { id: 4, title: 'Share', gradient1: '#ffc5a0', gradient2: '#ff8e46', img: require('../../assets/share.png') },
            { id: 5, title: 'About', gradient1: '#83aaff', gradient2: '#4b76ff', img: require('../../assets/info.png') },
            { id: 6, title: 'More', gradient1: '#7cf785', gradient2: '#17c74a', img: require('../../assets/fillmore.png') },
        ]
        this.state = {
            optionHolder: [],
            is_landscape: false,
            is_adShow: false,
            bannerAdPlacementId: bannerAdPlacementId
        }
    }

    async componentDidMount() {
        // SplashScreen.hide();
        setTimeout(() => SplashScreen.hide() , 1500);
        this.setState({ optionHolder: [...this.options] });
        this.getOrientation();
        lor(this);

        Dimensions.addEventListener('change', () => {
            this.getOrientation();
        });
        // const DeviceHash = await AdSettings.currentDeviceHash;
        // AdSettings.clearTestDevices();
        // AdSettings.addTestDevice(DeviceHash);
    }

    getOrientation = () => {
        if (Dimensions.get('window').width < Dimensions.get('window').height) {
            this.setState({ is_landscape: false });
        } else {
            this.setState({ is_landscape: true });
        }
    }

    componentWillUnmount() {
        rol();
    }

    onMoreApp = () => {
        const url = Platform.OS === 'android' ?
            'https://play.google.com/store/apps/developer?id=Manthan+Vanani&hl=en' : 'https://apps.apple.com/us/app/myapp/id1565383004'
        Linking.openURL(url)
    }

    onRateus = () => {
        const url = Platform.OS === 'android' ?
            'https://play.google.com/store/apps/details?id=com.manthanvanani.tagsforinstagram' : 'https://apps.apple.com/us/app/myapp/id1565383004'
        Linking.openURL(url)
    }

    onShare = async () => {
        try {
            const result = await Share.share({
                title: 'App link',
                message: Platform.OS === 'android' ? 'Install tags for Instagram - Free like and Follower app for Quickly copy and paste the best hashtags for your social media, AppLink : https://play.google.com/store/apps/details?id=com.manthanvanani.tagsforinstagram' : 'Install tags for Instagram - Free like and Follower app for Quickly copy and paste the best hashtags for your social media , AppLink : https://apps.apple.com/us/app/myapp/id1565383004',
                url: Platform.OS === 'android' ? 'https://play.google.com/store/apps/details?id=com.manthanvanani.tagsforinstagram' : 'https://apps.apple.com/us/app/myapp/id1565383004'
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    onSelectOption = (item, index) => {
        const { navigate } = this.props.navigation;
        if (index === 0) {
            navigate('Maincategories')
        } else if (index === 1) {
            navigate('CollectionList')
        } else if(index === 2) {
            this.onRateus()
        } else if(index === 3) {
            this.onShare()
        } else if (index === 4) {
            navigate('AboutSceen')
        } else if(index === 5) {
            this.onMoreApp()
        }
    }

    renderOption = ({ item, index }) => {
        const { is_landscape } = this.state;
        return (
            <View style={[styles.cellContainer, {
                height: is_landscape? wp('22%') : hp('22%'),
                width: is_landscape ? wp('40%') : wp('40%'),
            }]}>
                <TouchableOpacity onPress={() => this.onSelectOption(item, index)}>
                    <LinearGradient start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }} colors={[item.gradient1, item.gradient2]} style={[styles.cellGradientCircle, {
                         height: is_landscape ? wp('8%') : hp('8%'),
                         width: is_landscape ? wp('8%') : hp('8%'),
                         borderRadius: is_landscape ? wp('4%') : hp('4%'),
                    }]}>
                        <Image source={item.img} resizeMode="contain" style={styles.cellGradientImage} />
                    </LinearGradient>
                    <Text style={[styles.cellTitle, { color: item.gradient2, marginTop: is_landscape ? '10%' : '15%' }]}>{item.title}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <View style={styles.MainContainer}>
                    <LinearGradient start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }} colors={[Constant.gradient1, Constant.gradient2, Constant.gradient3]} style={styles.backgroundSquare}>
                    </LinearGradient>
                    <View style={{ padding: 20 }}>
                        <Text style={styles.TitleText}>Awesome hashtag</Text>
                        <Text style={styles.subTitleText}>Include Your Branded Hashtag in Your Social media Profile.</Text>
                    </View>
                    <View style={styles.flatlistContainer}>
                        <FlatList
                            // contentContainerStyle={styles.centerContainer}
                            showsVerticalScrollIndicator={false}
                            numColumns={2}
                            data={this.state.optionHolder}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => this.renderOption({ item, index })}
                        />
                    </View>
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