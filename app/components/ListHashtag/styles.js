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

    topContainer: {
        // flexGrow: 0.1,
        width: '100%',
        paddingLeft: 25,
        paddingRight: 25
    },

    topHeaderContainer: {
        // flex: 1,
        height: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },

    headerTitle: {
        flex: 1,
        color: Constant.whiteColor,
        fontSize: 16
    },

    headerEditContainer: {
        height: 20,
        width: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    tagstopContainer: {
        height: 30,
        paddingLeft: 25,
        paddingRight: 25
    },

    selectedCount: {
        color: Constant.primaryGray,
        fontSize: 14,
        lineHeight: 20
    },

    flatlistContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 20,
        justifyContent: 'center'
    },

    tagContainer: {
        // flex: 1,
        height: 40,
        borderRadius: 20,
        marginLeft: 8,
        marginRight: 8,
        marginTop: 6,
        marginBottom: 6,
        backgroundColor: Constant.appBlackColor2,
        alignContent: 'center',
        justifyContent: 'center',
    },

    tagText: {
        color: Constant.whiteColor,
        textAlign: 'center',
        padding: 10,
        paddingLeft: 14,
        paddingRight: 14
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
        // elevation: 1,
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

    rbSheetActiveButtonText: {
        color: Constant.whiteColor,
        textAlign: 'center',
    },

    rbSheetnonActiveButton: {
        height: 50,
        width: '46%',
        borderRadius: 25,
        borderWidth: 1.5,
        marginTop: 25,
        borderColor: Constant.primaryGray,
        alignItems: 'center',
        justifyContent: 'center'
    },

    rbSheetnonActiveText: {
        textAlign: 'center',
        color: Constant.primaryGray,
        fontSize: 16,
    }
})