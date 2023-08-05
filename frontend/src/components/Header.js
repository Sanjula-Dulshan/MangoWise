import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react';
import Logo from '../../assets/Logo.png';
import Premium from '../../assets/Premium.png';
import Profile from '../../assets/Profile.png';

export default function Header() {
    return (
        <View style={styles.header}>
            <View style={styles.imageContainer}>
                <Image
                    source={Premium}
                    style={styles.imagePremium}
                    resizeMode="contain"
                />
                <Image
                    source={Profile}
                    style={styles.imageProfile}
                    resizeMode="contain"
                />
            </View>
            <Image
                source={Logo}
                style={styles.imageLogo}
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        justifyContent: 'center',
        paddingRight: 5,
        paddingBottom: 10,
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    imageProfile: {
        width: 38,
        height: 32,
        margin: 5,
        marginTop: -10
    },
    imagePremium: {
        width: 100,
        height: 30,
        margin: 0,
        marginTop: -10
    },
    imageLogo: {
        width: 100,
        height: 70,
        marginTop: -20,
        justifyContent: 'flex-start',
        marginLeft: 37,
    },
});