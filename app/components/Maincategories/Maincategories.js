import React from 'react';
import { SafeAreaView, View, FlatList, TouchableOpacity, Text, Linking, Share, Image, Dimensions } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as MainTags from '../../utils/MainTags.json';
import * as SubTags from '../../utils/SubTags.json';
import { Neomorph, Shadow } from 'react-native-neomorph-shadows';
import LinearGradient from 'react-native-linear-gradient';
import Constant from '../Constant/Constant';
import StickyHeader from '../StickyHeader';
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { BannerView, InterstitialAdManager, AdSettings } from 'react-native-fbads';
import { bannerAdPlacementId, InterstitialAdPlacementId } from '../Constant/Adskeys';
import FastImage from 'react-native-fast-image';

export default class Maincategories extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mainHashtagHolder: [],
            subHashtagHolder: [],
            is_landscape: false,
            is_adShow: false,
            bannerAdPlacementId: bannerAdPlacementId
        }
    }

    async componentDidMount() {
        this.setState({ mainHashtagHolder: MainTags.DashboardTags, subHashtagHolder: SubTags.Subtags });
        this.getOrientation();
        lor(this);

        Dimensions.addEventListener('change', () => {
            this.getOrientation();
        });
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

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getSubtag(id) {
        const { subHashtagHolder } = this.state;
        const firsttags = subHashtagHolder.filter(obj => (obj.main_id === id))
        return firsttags[0].tags;
    }

    onSubCat = (item) => {
        const { navigate } = this.props.navigation;
        navigate('Subcategories', { maincat: item })
    }

    renderOption = ({ item, index }) => {
        const { is_landscape } = this.state;
        return (
            <View style={styles.cellContainer}>
                <LinearGradient start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }} colors={[Constant.gradient1, Constant.gradient2, Constant.gradient3]} style={styles.cellIconContainer}>
                    <FastImage source={{ uri: item.image, priority: FastImage.priority.high }} tintColor={Constant.whiteColor} style={styles.categoriesImage} resizeMode="contain" />
                    {/* <Image style={styles.categoriesImage} resizeMode="contain" source={{ uri: item.image }} /> */}
                </LinearGradient>
                <Shadow
                    // inner 
                    // swapShadows   
                    style={styles.cellOuterContainer}
                >
                    <TouchableOpacity style={styles.cellContentContainer} onPress={() => this.onSubCat(item)}>
                        <View style={styles.contentContainerLeft}>
                            <Text style={styles.categoriesTagTitle} numberOfLines={1}>{this.capitalizeFirstLetter(item.main_cat)}</Text>
                            <Text style={styles.categoriesTagsubTitle} numberOfLines={2}>{this.getSubtag(item.id)}</Text>
                        </View>
                        {/* <View style={styles.contentContainerRight}>
                            <Image style={styles.moreImage} resizeMode="contain" source={require('../../assets/more.png')} />
                        </View> */}
                    </TouchableOpacity>
                </Shadow>
            </View>

        )
    }

    render() {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <View style={styles.MainContainer}>
                    <StickyHeader headerTitle={'Hashtag List'} props={this.props} />
                    <View style={styles.flatlistContainer}>
                        <FlatList
                            // contentContainerStyle={styles.centerContainer}
                            showsVerticalScrollIndicator={false}
                            data={this.state.mainHashtagHolder}
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