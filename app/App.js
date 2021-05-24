import React from 'react'
import { View, LogBox, StatusBar } from 'react-native'
import { BaseNavigator } from './navigation/BaseNavigator'
import Constant from './components/Constant/Constant';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        LogBox.ignoreAllLogs();
    }

    componentDidMount() {
        StatusBar.setBarStyle('light-content', true)
        StatusBar.setBackgroundColor(Constant.appBlackColor)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <BaseNavigator />
            </View>
        )
    }
}