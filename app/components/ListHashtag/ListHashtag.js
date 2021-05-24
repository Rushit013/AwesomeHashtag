import React from 'react';
import { SafeAreaView, View, FlatList, TouchableOpacity, Text, Linking, Share, Image, ScrollView } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import * as SubTags from '../../utils/SubTags.json';
import { Neomorph, Shadow } from 'react-native-neomorph-shadows';
import LinearGradient from 'react-native-linear-gradient';
import Constant from '../Constant/Constant';
import StickyHeader from '../StickyHeader';
import CardView from 'react-native-cardview'
import RBSheet from "react-native-raw-bottom-sheet";
import Clipboard from '@react-native-community/clipboard';
import AsyncStorage from '@react-native-community/async-storage';
import { BannerView, InterstitialAdManager, AdSettings } from 'react-native-fbads';
import { bannerAdPlacementId, InterstitialAdPlacementId } from '../Constant/Adskeys';

export default class ListHashtag extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            HashtagHolder: [],
            screenTitle: '',
            selectedString: '',
            totalSelected: 0,
            isFromcollection: false
            // bannerAdPlacementId: bannerAdPlacementId
        }
    }

    async componentDidMount() {
        const { navigation } = this.props;
        const selectedSubtag = navigation.getParam('selectedSubtag');
        const fromScreen = navigation.getParam('fromScreen');
        if (fromScreen !== undefined) {
            this.setState({ isFromcollection: true })
        }
        let stringArray = selectedSubtag.tags.split(' ');
        this.newHashtagHolder = stringArray.map((item, index) => ({ tag: item, isSelected: false }))
        this.setState({ screenTitle: selectedSubtag.sub_cat, HashtagHolder: this.newHashtagHolder });
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    onSelectTag = (item, index) => {
        const newItems = [...this.state.HashtagHolder];
        newItems[index] = { tag: item.tag, isSelected: !this.state.HashtagHolder[index].isSelected };
        const selectedArray = newItems.filter(obj => (obj.isSelected === true)).map(obj => obj.tag)
        const selectedArrayStr = selectedArray.join(' ');
        this.setState({ HashtagHolder: newItems, selectedString: selectedArrayStr, totalSelected: selectedArray.length });
    }

    onSelectCallback = (data) => {
        const selectedArrayStr = data.join(' ');
        const newItems = [...this.newHashtagHolder];

        newItems.forEach((element, index) => {
            data.forEach(el => {
                if (el === element.tag) {
                    newItems[index] = { tag: element.tag, isSelected: true };
                }
            })
        });

        this.setState({ selectedString: selectedArrayStr, HashtagHolder: newItems })
    }

    onSelectCollectionCallback = async (data) => {
        const hashCollection = await AsyncStorage.getItem('hashCollection');
        let parsedCollection = JSON.parse(hashCollection);
        let updateHolder = data.map((item, index) => ({ tag: item, isSelected: false }))
        this.setState({ HashtagHolder: updateHolder})


        let selectEditobj = parsedCollection.filter((obj) => obj.sub_cat === this.capitalizeFirstLetter(this.state.screenTitle))
        const selectedArrayStr = data.join(' ');
        selectEditobj[0].tags = selectedArrayStr
        let newhashCollection = await parsedCollection.filter((obj) => obj.sub_cat !== this.capitalizeFirstLetter(this.state.screenTitle))
        newhashCollection.unshift(selectEditobj[0])

        await AsyncStorage.setItem('hashCollection', JSON.stringify(newhashCollection));
        const { navigation } = this.props;
        const selectedSubtagIndex = navigation.getParam('selectedSubtagIndex');
        navigation.state.params.onUpdateRecord({ tags: data, tagindex: selectedSubtagIndex})
    }

    onEditSelected = () => {
        const { navigate } = this.props.navigation;
        navigate('SelectedList', { tagList: this.state.selectedString, onSelectCallback: this.onSelectCallback })
    }

    onEditfromCollectionSelected = () => {
        const { navigate } = this.props.navigation;
        // const { navigation } = this.props;
        // const selectedSubtag = navigation.getParam('selectedSubtag');
        const mapHashtag = this.state.HashtagHolder.map((obj) => obj.tag)
        const selectedArrayStr = mapHashtag.join(' ');
        navigate('SelectedList', { tagList: selectedArrayStr, onSelectCallback: this.onSelectCollectionCallback })
    }

    onMorePress = () => {
        this.RBSheet.open();
    }

    onClearList = () => {
        this.setState({ HashtagHolder: this.newHashtagHolder, selectedString: '', totalSelected: 0 });
        this.RBSheet.close();
    }

    _showAdonCopyToinstgram = () => {
        InterstitialAdManager.showAd(InterstitialAdPlacementId)
            .then(() => this.onCopyToinstgram())
            .catch(() => this.onCopyToinstgram());
    }

    onCopyToinstgram = () => {
        if (this.state.selectedString === '') {
            const { navigation } = this.props;
            const selectedSubtag = navigation.getParam('selectedSubtag');
            Clipboard.setString(selectedSubtag.tags);
            this.RBSheet.close();
        } else {
            Clipboard.setString(this.state.selectedString);
            this.RBSheet.close();
        }
    }

    _showAdonSaveList = () => {
        InterstitialAdManager.showAd(InterstitialAdPlacementId)
            .then(() => this.onSaveList())
            .catch(() => this.onSaveList());
    }

    onSaveList = async () => {
        const savelistobj = { sub_cat: this.capitalizeFirstLetter(this.state.screenTitle), tags: this.state.selectedString };
        const checkCollection = await AsyncStorage.getItem('hashCollection');
        let parsedcheckCollection = JSON.parse(checkCollection);

        if (parsedcheckCollection === null) {
            await AsyncStorage.setItem('hashCollection', JSON.stringify([savelistobj]));
            this.RBSheet.close();
        } else {
            parsedcheckCollection.push(savelistobj);
            await AsyncStorage.setItem('hashCollection', JSON.stringify(parsedcheckCollection));
            this.RBSheet.close();
        }
    }

    rbSheetComponent = () => {
        return (
            <View style={styles.rbSheetContainer}>
                <TouchableOpacity activeOpacity={0.7} onPress={this._showAdonCopyToinstgram}>
                    <Shadow
                        style={styles.rbSheetActiveButton}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[Constant.gradient1, Constant.gradient2, Constant.gradient3]} style={styles.centerContainer}>
                            <Text style={[styles.tagText, { fontSize: 16, fontWeight: '500' }]}>Copy to Instagram</Text>
                        </LinearGradient>
                    </Shadow>
                </TouchableOpacity>

                <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.rbSheetnonActiveButton} activeOpacity={0.7} onPress={() => this.onClearList()}>
                        <Text style={styles.rbSheetnonActiveText}>Clear List</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rbSheetnonActiveButton} onPress={this._showAdonSaveList} activeOpacity={0.7}>
                        <Text style={styles.rbSheetnonActiveText}>Save List</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    renderTags = () => {
        return (
            this.state.HashtagHolder.map((item, index) => {
                return (
                    <CardView
                        cardElevation={item.isSelected ? 10 : 5}
                        cornerRadius={20}
                        key={index}
                        style={styles.tagContainer}>
                        {item.isSelected
                            ?
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[Constant.gradient1, Constant.gradient2, Constant.gradient3]} style={{ flex: 1 }}>
                                <TouchableOpacity onPress={() => this.onSelectTag(item, index)}>
                                    <Text style={styles.tagText}>{item.tag}</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                            :
                            <TouchableOpacity onPress={() => this.onSelectTag(item, index)}>
                                <Text style={styles.tagText}>{item.tag}</Text>
                            </TouchableOpacity>
                        }
                    </CardView>
                )
            })
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <View style={styles.MainContainer}>
                    <StickyHeader headerTitle={this.capitalizeFirstLetter(this.state.screenTitle)} moreshow={true} props={this.props} onMorePress={this.onMorePress} />

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

                    <ScrollView style={{ flex: 1 }}>
                        <View style={styles.topContainer}>
                            <View style={styles.topHeaderContainer}>
                                <Text style={styles.headerTitle}>Selected Hashtag</Text>
                                {!this.state.isFromcollection
                                    &&
                                    <TouchableOpacity onPress={() => this.state.totalSelected && this.onEditSelected()}>
                                        <LinearGradient start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }} colors={[Constant.gradient1, Constant.gradient2, Constant.gradient3]} style={styles.headerEditContainer}>
                                            <Icon name="ios-pencil-sharp" size={13} style={{ textAlign: 'center' }} />
                                        </LinearGradient>
                                    </TouchableOpacity>
                                }
                            </View>
                            {this.state.selectedString !== ''
                                ?
                                <Text style={[styles.selectedCount, { paddingTop: 8, paddingBottom: 8 }]}>{this.state.selectedString}</Text>
                                :
                                <Text style={[styles.selectedCount, { paddingTop: 8, paddingBottom: 8 }]}>No Hashtag selected</Text>
                            }
                        </View>

                        <View style={styles.tagstopContainer}>
                            <View style={styles.topHeaderContainer}>
                                <Text style={styles.headerTitle}>{this.capitalizeFirstLetter(this.state.screenTitle)} Hashtag</Text>
                                {this.state.isFromcollection
                                    ?
                                    <TouchableOpacity onPress={() => this.onEditfromCollectionSelected()}>
                                        <LinearGradient start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }} colors={[Constant.gradient1, Constant.gradient2, Constant.gradient3]} style={styles.headerEditContainer}>
                                            <Icon name="ios-pencil-sharp" size={13} style={{ textAlign: 'center' }} />
                                        </LinearGradient>
                                    </TouchableOpacity>
                                    :
                                    <Text style={styles.selectedCount}>{this.state.totalSelected}/{this.state.HashtagHolder.length}</Text>
                                }
                            </View>
                        </View>

                        <View style={styles.flatlistContainer}>
                            {this.state.HashtagHolder.length > 0
                                &&
                                <>
                                    {this.renderTags()}
                                </>
                            }
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}