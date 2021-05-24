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
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },

    cellOuterContainer: {
        shadowRadius: 5,
        shadowOffset: { width: 3, height: 3 },
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        elevation: 5,
        backgroundColor: Constant.appBlackColor,
        width: wp('90%'),
        height: hp('12%'),
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 8,
        marginBottom: 8,
        marginLeft: wp('8%'),
        overflow: 'visible',
    },

    cellContainer: {
        flex: 1,
        alignItems:'center',
        justifyContent: 'center'
    },

    cellIconContainer: {
        borderRadius: 5,
        backgroundColor: '#FFF',
        width: hp('8%'),
        height: hp('8%'),
        marginLeft: wp('4%'),
        alignSelf: 'flex-start',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 99,
        overflow: 'visible',
    },

    categoriesImage: {
        height: hp('4%'),
        width: hp('4%'),
        alignSelf: 'center',
        tintColor: '#fff'
    },

    cellContentContainer: {
        flex: 0.65,
        marginLeft: hp('8%'),
        flexDirection: 'row'
    },

    contentContainerLeft: {
        width: '90%',
        alignContent: 'center',
        justifyContent: 'center'
    },

    contentContainerRight: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },

    categoriesTagTitle: {
        fontSize: 18,
        color: Constant.whiteColor,
        fontWeight: '500'
    },

    categoriesTagsubTitle: {
        fontSize: 12,
        color: Constant.primaryGray,
        lineHeight: 16
    },

    moreImage: {
        height: 20,
        width: 20,
        tintColor: Constant.primaryGray
    },

    bannerContainer: {
        // position: 'absolute', 
        left: 0, 
        bottom: 0 
    }
})