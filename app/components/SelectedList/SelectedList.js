import React from 'react';
import { SafeAreaView, View, FlatList, TouchableOpacity, Text, Linking, Share, Image, Dimensions } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import * as SubTags from '../../utils/SubTags.json';
import { Neomorph, Shadow } from 'react-native-neomorph-shadows';
import LinearGradient from 'react-native-linear-gradient';
import Constant from '../Constant/Constant';
import StickyHeader from '../StickyHeader';
import RBSheet from "react-native-raw-bottom-sheet";
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { BannerView, InterstitialAdManager, AdSettings } from 'react-native-fbads';
import { bannerAdPlacementId, InterstitialAdPlacementId } from '../Constant/Adskeys';

export default class SelectedList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedHashtagHolder: [],
            screenTitle: '',
            is_landscape: false,
            is_adShow: false,
            bannerAdPlacementId: bannerAdPlacementId
        }
    }

    async componentDidMount() {
        const { navigation } = this.props;
        const tagList = navigation.getParam('tagList');
        let stringArray = tagList.split(' ');
        this.setState({ selectedHashtagHolder: stringArray });
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

    onDelete = (item, index) => {
        const newselectedHashtag = [...this.state.selectedHashtagHolder];
        newselectedHashtag.splice(index, 1);
        this.setState({ selectedHashtagHolder: newselectedHashtag })
    }

    _showAdonSaveList = () => {
        InterstitialAdManager.showAd(InterstitialAdPlacementId)
            .then(() => this.onSaveList())
            .catch(() => this.onSaveList());
    }

    onSaveList = () => {
        const { navigation } = this.props;
        navigation.goBack();

        navigation.state.params.onSelectCallback(this.state.selectedHashtagHolder)
    }

    renderOption = ({ item, index }) => {
        const { is_landscape } = this.state;

        return (
            <Shadow
                style={styles.cellOuterContainer}
            >
                <View style={styles.cellContentContainer}>
                    <View style={styles.contentContainerRight}>
                        <Icon name="ios-checkmark-circle-outline" size={22} color={'#808080'} />
                    </View>
                    <View style={styles.contentContainerLeft}>
                        <Text style={styles.categoriesTagTitle} numberOfLines={1}>{item}</Text>
                    </View>
                </View>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[Constant.gradient1, Constant.gradient2, Constant.gradient3]} style={styles.cellIconContainer}>
                    <TouchableOpacity style={styles.contentContainerLeft} onPress={() => this.onDelete(item, index)}>
                        <Text style={[styles.categoriesTagTitle, { textAlign: 'center', fontWeight: '600' }]} numberOfLines={1}>Delete</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </Shadow>
        )
    }

    rbSheetComponent = () => {
        return (
            <View style={styles.rbSheetContainer}>
                <TouchableOpacity activeOpacity={0.7} onPress={this._showAdonSaveList}>
                    <Shadow
                        style={styles.rbSheetActiveButton}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[Constant.gradient1, Constant.gradient2, Constant.gradient3]} style={styles.centerContainer}>
                            <Text style={[styles.tagText, { fontSize: 16, fontWeight: '500' }]}>Save</Text>
                        </LinearGradient>
                    </Shadow>
                </TouchableOpacity>
            </View>
        )
    }

    onMorePress = () => {
        this.RBSheet.open();
    }

    render() {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <View style={styles.MainContainer}>
                    <StickyHeader headerTitle={'Selected hashtag'} moreshow={true} props={this.props} onMorePress={this.onMorePress} />

                    <RBSheet
                        ref={ref => {
                            this.RBSheet = ref;
                        }}
                        openDuration={250}
                        customStyles={{
                            container: {
                                height: 'auto',
                                width: '100%',
                                backgroundColor: Constant.appBlackColor,
                                justifyContent: "center",
                                alignItems: "center"
                            }
                        }}
                    >
                        {this.rbSheetComponent()}
                    </RBSheet>

                    <View style={styles.flatlistContainer}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={this.state.selectedHashtagHolder}
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