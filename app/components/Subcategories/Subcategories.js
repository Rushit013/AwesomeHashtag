import React from 'react';
import { SafeAreaView, View, FlatList, TouchableOpacity, Text, Linking, Share, Image, Dimensions } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
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

export default class Subcategories extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            subHashtagHolder: [],
            screenTitle: '',
            is_landscape: false,
            is_adShow: false,
            bannerAdPlacementId: bannerAdPlacementId
        }
    }

    async componentDidMount() {
        const { navigation } = this.props;
        const maincat = navigation.getParam('maincat');
        const subHashtag = SubTags.Subtags;
        const selectedCategories = subHashtag.filter(obj => (obj.main_id === maincat.id))
        this.setState({ subHashtagHolder: selectedCategories, screenTitle: maincat.main_cat });
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

    onListTags = (item) => {
        const { navigate } = this.props.navigation;
        navigate('ListHashtag', { selectedSubtag: item })
    }

    renderOption = ({ item, index }) => {
        const { is_landscape } = this.state;

        return (
            <TouchableOpacity style={styles.cellContainer} activeOpacity={0.7} onPress={() => this.onListTags(item)} >
                <Shadow
                    style={styles.cellOuterContainer}
                >
                    <LinearGradient start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }} colors={[Constant.gradient1, Constant.gradient2, Constant.gradient3]} style={styles.cellIconContainer}>
                        <Icon name="hashtag" size={20} color={Constant.whiteColor} style={{ textAlign: 'center' }} />
                    </LinearGradient>
                    <View style={styles.cellContentContainer}>
                        <View style={styles.contentContainerLeft}>
                            <Text style={styles.categoriesTagTitle} numberOfLines={1}>{this.capitalizeFirstLetter(item.sub_cat)}</Text>
                            <Text style={styles.categoriesTagsubTitle} numberOfLines={1}>{item.tags}</Text>
                        </View>
                        <View style={styles.contentContainerRight}>
                            <Icon name="chevron-right" size={20} color={Constant.primaryGray} />
                        </View>
                    </View>
                </Shadow>
            </TouchableOpacity>

        )
    }

    render() {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <View style={styles.MainContainer}>
                <StickyHeader headerTitle={this.capitalizeFirstLetter(this.state.screenTitle)} props={this.props} />

                    <View style={styles.flatlistContainer}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={this.state.subHashtagHolder}
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