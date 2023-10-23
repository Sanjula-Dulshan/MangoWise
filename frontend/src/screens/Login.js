import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../../firebase'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigation()

    useEffect(() => {
        const isLogged = auth.onAuthStateChanged(user => {
            if (user) {
                alert("Logged in successfully");
                //Navigate to home screen
                navigate.navigate("Home");

            }
        })
        return isLogged
    }, [])


    const register = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const newUser = userCredentials.user;
            })
            .catch(e => alert(e.message))
    }

    const login = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const loggedUser = userCredentials.user;
            })
            .catch(e => alert(e.message))
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container} behavior="padding" >
                <View style={styles.header}>
                    <Text style={styles.headerText}>Welcome</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Enter email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Enter password"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={styles.input}
                        secureTextEntry
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={login}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={register}
                        style={[styles.button, styles.buttonOutline]}
                    >

                        <Text style={styles.buttonOutlineText}>Register</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 10,
        borderBottomColor: '#ddd',
        width: '100%',
        marginBottom: 20,
    },
    headerText: {
        color: 'black',
        fontSize: 24,
        padding: 26,
        marginTop: 30,
        fontWeight: 'bold',
        fontFamily: 'sans-serif'
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: 'green',
        width: '100%',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
        marginTop: 6,
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '800',
        fontSize: 18,
    },
})