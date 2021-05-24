import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Feather';
import Constant from '../Constant/Constant';

export default class StickyHeader extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={styles.headerContainer}>
                {this.props.backshow
                    &&
                    <TouchableOpacity style={{ alignSelf: 'center', justifyContent: 'center', zIndex: 99, left: 15 }}
                        onPress={() => this.props.props.navigation.goBack()}>
                        <Icon name="chevron-left" size={30} color={Constant.primaryGray} />
                    </TouchableOpacity>
                }

                <Text style={styles.headerTitle}>{this.props.headerTitle}</Text>
                {this.props.moreshow
                    &&
                    <TouchableOpacity style={{ alignSelf: 'center', justifyContent: 'center', zIndex: 99, right: 15 }}
                        onPress={() => this.props.onMorePress()}>
                        <Image style={styles.moreImage} resizeMode="contain" source={require('../../assets/more.png')} />
                    </TouchableOpacity>
                }
            </View>
        )
    }
}

StickyHeader.defaultProps = { backshow: true, moreshow: false };