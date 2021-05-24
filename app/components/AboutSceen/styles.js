import { StyleSheet } from 'react-native'
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

    ScrollContainer: {
        flex: 1,
        backgroundColor: Constant.appBlackColor,
        alignContent: 'center',
    },

    logoContainer: {
        flex: 0.5,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoImage: {
        height: hp('50%'),
        width: hp('50%'),
        alignContent: 'center',
        justifyContent: 'center',
    },
    titleText: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: '300',
        marginVertical: 8
    },
    descriptionContainer: {
        flex: 0.5,
        alignContent: 'center',
        justifyContent: 'center',
        padding: 15
    },
    detailsTitleQue: {
        textAlign: 'justify',
        fontFamily: 'Poppins-Regular',
        color: Constant.whiteColor,
        fontWeight: '700',
        fontSize: 16,
        marginVertical: 10,
        lineHeight: 22
    },
    detailsTitle: {
        textAlign: 'justify',
        fontFamily: 'Poppins-Regular',
        color: Constant.whiteColor,
        fontSize: 14,
        marginVertical: 5,
    },
    detailssubTitle: {
        textAlign: 'justify',
        fontFamily: 'Poppins-Regular',
        color: Constant.whiteColor,
        fontSize: 14,
        lineHeight: 30,
        fontWeight: '700'
    },
    buttonContainer: {
        height: 45,
        width: '80%',
        borderRadius: 30,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#dbdcdc'
    },
    versionText: {
        color: '#808080',
        textAlign: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        bottom: 10,
        position: 'absolute'
    },
    bannerContainer: {
        // position: 'absolute', 
        left: 0, 
        bottom: 0 
    }
})