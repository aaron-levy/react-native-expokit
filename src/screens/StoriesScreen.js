import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';
import { Button } from 'react-native-elements';

class StoreisScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        console.log('the navigation ', navigation); 
        return ({
            title: "Camera",
            headerLeft: (
                <View>
                    <Button onPress={() => navigation.pop()} title="Back" />
                </View>
            )
        })
    };

    cameraRef = null;

    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
    };

    async componentDidMount() {

        await Permissions.askAsync(Permissions.AUDIO_RECORDING)
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });

    }





    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <SafeAreaView style={{ flex: 1 }}>
                    <Camera style={{ flex: 1 }} ref={(ref) => this.cameraRef = ref} type={this.state.type}>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                justifyContent: 'flex-end',
                                alignContent: 'center',
                                width: '100%'
                            }}>
                            {this.renderRecord()}
                            {this.renderFlip()}
                        </View>
                    </Camera>
                </SafeAreaView>
            );
        }
    }

    onRecord = () => {
        this.cameraRef.recordAsync({ maxDuration: 10 })
    }


    renderRecord() {

        return (
           <TouchableOpacity
                style={{
                    
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                }}
                onPress={this.onRecord}>
                <Text
                    style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                    {' '}Record{' '}
                </Text>
            </TouchableOpacity>
        )
    }


    renderFlip() {
        return (
            <TouchableOpacity
                style={{
                    flex: 0.1,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                }}
                onPress={() => {
                    this.setState({
                        type: this.state.type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back,
                    });
                }}>
                <Text
                    style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                    {' '}Flip{' '}
                </Text>
            </TouchableOpacity>
        )
    }
}

export default StoreisScreen;
