import { Dimensions, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Constant from '../Constant/Constant';

export default StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: Constant.appBlackColor
    },

    MainContainer: {
        flex: 1,
        backgroundColor: Constant.appBlackColor,
        alignContent: 'center',
        justifyContent: 'center'
    },

    flatlistContainer: {
        flex: 1,
        width: '100%',
        alignContent: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },

    cellOuterContainer: {
        shadowRadius: 5,
        shadowOffset: { width: 3, height: 3 },
        // borderTopLeftRadius: 5,
        // borderBottomLeftRadius: 5,
        elevation: 5,
        margin: 8,
        backgroundColor: Constant.appBlackColor,
        width: wp('92%'),
        height: hp('7%'),
        marginLeft: wp('3.5%'),
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 8,
        marginBottom: 8,
        overflow: 'visible',
    },

    cellContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: -5
    },

    cellIconContainer: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: hp('3%'),
        borderBottomLeftRadius: hp('3%'),
        width: hp('15%'),
        height: hp('5%'),
        right: -wp('4.5%'),
        position: 'absolute',
        alignSelf: 'center',
        justifyContent: 'center',
        zIndex: 999,
        overflow: 'visible',
    },

    cellContentContainer: {
        flex: 1,
        // marginLeft: hp('8%'),
        flexDirection: 'row'
    },

    contentContainerLeft: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    },

    contentContainerRight: {
        width: '15%',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },

    categoriesTagTitle: {
        fontSize: 14,
        color: Constant.whiteColor,
        fontWeight: '500'
    },

    categoriesTagsubTitle: {
        fontSize: 12,
        color: Constant.primaryGray,
        lineHeight: 16
    },

    rbSheetContainer: {
        // flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: Constant.appBlackColor,
        padding: 30,
    },

    rbSheetActiveButton: {
        height: 50,
        // width: 100,
        width: wp('85%'),
        backgroundColor: Constant.appBlackColor,
        shadowRadius: 5,
        shadowOffset: { width: 2, height: 2 },
        // elevation: 5,
        borderRadius: 25,
        alignContent: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        overflow: 'hidden'
    },

    centerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    tagText: {
        color: Constant.whiteColor,
        textAlign: 'center',
        padding: 10,
        paddingLeft: 14,
        paddingRight: 14
    },

    bannerContainer: {
        // position: 'absolute', 
        left: 0, 
        bottom: 0 
    }

})