import React, {Component} from 'react';
import {View, ScrollView, Alert} from 'react-native';
import {Header, Button, Image} from "react-native-elements";
import {AsyncStorage} from 'react-native';
import Mailer from 'react-native-mail';
import Permissions from 'react-native-permissions';

export default class Home extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.checkPermissions();
    }

    render() {
        return (
            <View>

                <Header
                    leftComponent={{ text: 'Photo', style: { color: '#fff'}, onPress: () => this.props.navigation.navigate("ViewPhoto") }}
                    centerComponent={{ text: 'RNMailDemo', style: { fontSize: 21, fontWeight: 'bold', color: '#fff' } }}
                />

                <View style={{padding: 20}}>
                    <Button
                        buttonStyle={{marginTop: 20}}
                        title="Take Photo"
                        onPress={() => this.props.navigation.navigate('Camera')}
                    />

                    <Button
                        buttonStyle={{marginTop: 20}}
                        title="Send Email"
                        onPress={() => this.retrieveData()}
                    />
                </View>

            </View>
        );
    }

    sendMail() {

        Mailer.mail({
            subject: 'RNMailDemo',
            recipients: ['adudu@demo.com'], //aduantrafik@jpj.gov.my
            // ccRecipients: ['supportCC@example.com'],
            // bccRecipients: ['supportBCC@example.com'],
            body: '<b>RNMailDemo Body</b>',
            isHTML: true,
            attachment: {
                path: this.state.photos,  // The absolute path of the file from which to read data.
                type: 'jpeg',   // Mime Type: jpg, png, doc, ppt, html, pdf, csv
                name: 'offender',   // Optional: Custom filename for attachment
            }
        }, (error, event) => {
            Alert.alert(
                error,
                event,
                [
                    {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
                    {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
                ],
                { cancelable: true }
            )
        });

    }

    retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('localImg');
            if (value !== null) {
                // We have data!!
                console.log(value);
                this.setState({photos: value})
                this.sendMail();

            } else {
                Alert.alert('Please include a photo');
            }
        } catch (error) {
            Alert.alert(error);
            // Error retrieving data
        }
    };

    checkPermissions() {
        Permissions.checkMultiple(['storage']).then(response => {
            // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'

            this.setState({ storagePermission: response.storage })
            this.setState({cameraPermission: response.camera })

            if (response.storage === 'undetermined') {
                this.promptStorage();
            }

        });
    }

    promptStorage() {
        Alert.alert(
            'Can we access your picture directory?',
            'We need access so you can send an attachment',
            [
                {
                    text: 'No way',
                    onPress: () => console.log('Permission denied'),
                    style: 'cancel',
                },
                this.state.storagePermission === 'undetermined'
                    ? { text: 'OK', onPress: this.requestStoragePermission }
                    : { text: 'Open Settings', onPress: Permissions.openSettings },
            ],
        )
    }

    requestStoragePermission = () => {
        Permissions.request('storage').then(response => {
            // Returns once the user has chosen to 'allow' or to 'not allow' access
            // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
            this.setState({ storagePermission: response })
            this.checkPermissions();
        })
    }

    static navigationOptions = {
        drawerLockMode: 'locked-closed',
        header: null
    }

}