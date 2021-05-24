import React from 'react';
import { SafeAreaView, View, FlatList, TouchableOpacity, Text, Linking, Share, Image } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as SubTags from '../../utils/SubTags.json';
import { Neomorph, Shadow } from 'react-native-neomorph-shadows';
import LinearGradient from 'react-native-linear-gradient';
import Constant from '../Constant/Constant';
import StickyHeader from '../StickyHeader';
import AsyncStorage from '@react-native-community/async-storage';
import { BannerView, InterstitialAdManager, AdSettings } from 'react-native-fbads';
import { bannerAdPlacementId, InterstitialAdPlacementId } from '../Constant/Adskeys';

export default class CollectionList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            subHashtagHolder: [],
            screenTitle: '',
            is_adShow: false,
            bannerAdPlacementId: bannerAdPlacementId
        }
    }

    async componentDidMount() {
        const hashCollection = await AsyncStorage.getItem('hashCollection');
        let parsedCollection = JSON.parse(hashCollection);
        this.setState({ subHashtagHolder: parsedCollection, screenTitle: 'Collection' });
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    onUpdateRecord = (data) => {
        const selectedArrayStr = data.tags.join(' ');

        const subHashtag = [...this.state.subHashtagHolder];
        subHashtag[data.tagindex].tags = selectedArrayStr;

        this.setState({ subHashtagHolder: [...subHashtag] })
    }

    onListTags = (item, index) => {
        const { navigate } = this.props.navigation;
        navigate('ListHashtag', { selectedSubtag: item, selectedSubtagIndex: index, fromScreen: 'CollectionList', onUpdateRecord: this.onUpdateRecord })
    }

    renderOption = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.cellContainer} activeOpacity={0.7} onPress={() => this.onListTags(item, index)} >
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
                        {this.state.subHashtagHolder === null
                            ?
                            <View style={styles.centerContainer}>
                                <Image
                                    source={require('../../assets/no_collection.png')}
                                    style={styles.logoImage}
                                    resizeMode="contain"
                                />
                            </View>
                            :
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={this.state.subHashtagHolder}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => this.renderOption({ item, index })}
                            />
                        }
                    </View>
                    {/* <View style={[styles.bannerContainer, { position: this.state.is_adShow ? 'relative' : 'absolute' }]}> */}
                    <View style={styles.bannerContainer}>
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