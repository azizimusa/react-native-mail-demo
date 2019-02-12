import React, {Component} from 'react';
import {View, ScrollView, Alert} from 'react-native';
import {Header, Button, Image} from "react-native-elements";
import {AsyncStorage} from 'react-native';

export default class ViewPhoto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            photos: null
        }

        this.loadPhoto();

    }

    loadPhoto = async () => {
        try {

            let value = await AsyncStorage.getItem('localImg');

            if (value !== null) {
                this.setState({photos: value})
            }

        } catch (e) {

        }
    }

    render(){
        return (

            <View style={{paddingTop: 50}}>
                <Image
                    source={{ uri: "file://" + this.state.photos }}
                    style={{ width: '100%', height: 400 }}
                />
            </View>

        );
    }

};