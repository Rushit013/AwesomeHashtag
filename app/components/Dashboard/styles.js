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

    backgroundSquare: {
        height: wp('80%'),
        width: wp('80%'),
        borderRadius: wp('15%'),
        position: 'absolute',
        left: -wp('10%'),
        top: -hp('15%'),
        transform: [{ rotate: '45deg'}]
    },

    TitleText: {
        fontSize: 22,
        color: Constant.whiteColor,
        fontWeight: 'bold',
        marginBottom: 15
    },

    subTitleText: {
        width: '75%',
        color: Constant.whiteColor,
        lineHeight: 20
    },

    flatlistContainer: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },

    cellContainer: {
        height: hp('22%'),
        width: wp('40%'),
        backgroundColor: 'rgba(30,45,58, 0.8)',
        margin: 10,
        borderRadius: 18,
        alignContent: 'center',
        justifyContent: 'center'
    },

    cellGradientCircle: {
        height: hp('8%'),
        width: hp('8%'),
        borderRadius: hp('4%'),
        alignSelf: 'center',
        justifyContent: 'center'
    },

    cellGradientImage: {
        height: 20,
        width: 20,
        tintColor: Constant.whiteColor,
        alignSelf: 'center'
    },

    cellTitle: {
        textAlign: 'center',
        fontSize: 16,
    }, 

    bannerContainer: {
        left: 0,
        bottom: 0
    }

    
})