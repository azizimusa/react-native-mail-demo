'use strict';
import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Toast from "react-native-toast-native";
import RNFS from "react-native-fs";

export default class Camera extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style = {styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                />
                <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
                    <TouchableOpacity
                        onPress={this.takePicture.bind(this)}
                        style = {styles.capture}
                    >
                        <Text style={{fontSize: 14}}> SNAP </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    takePicture = async function() {

        if (this.camera) {
            const options = { quality: 0.3, base64: true };
            const data = await this.camera.takePictureAsync(options);

            var destPath = RNFS.PicturesDirectoryPath + '/offender.jpg';
            RNFS.moveFile(data.uri, destPath)
                .then((success) => {
                    console.log('file moved!');
                    Toast.show("Success. Press back to continue", Toast.LONG, Toast.CENTER);
                    AsyncStorage.setItem('localImg', destPath);
                })
                .catch((err) => {
                    console.log("Error: " + err.message);
                });
        }
    };


    static navigationOptions = {
        drawerLockMode: 'locked-closed',
        header: null
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    }
});