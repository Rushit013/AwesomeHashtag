import { Dimensions, StyleSheet } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Constant from '../Constant/Constant';

export default StyleSheet.create({
    headerContainer: {
        height: hp('8%'),
        width: '100%',
        // backgroundColor: '#FFF',
        flexDirection: 'row'
    },

    headerTitle: {
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        textAlign: 'left',
        marginLeft: 30,
        color: Constant.primaryGray
    },

    moreImage: {
        height: 20,
        width: 20,
        tintColor: Constant.primaryGray
    }
})