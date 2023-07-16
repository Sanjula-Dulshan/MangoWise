import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Alert
} from 'react-native';
import Header from '../../components/Header';
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { Feather, Ionicons } from '@expo/vector-icons';


export default function PreviousRecordsScreen() {

    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    //Get data from backend
    // useEffect(() => {
    //   fetch(''
    //     .then((response) => response.json())
    //     .then((json) => {
    //       setFertilizer(json);
    //     })
    //     .catch((error) => console.error(error))
    //     .finally(() => setLoading(false)));
    // }, []);

    const handleSearch = () => {
        if (searchQuery === '') {
            Alert.alert('Please enter a valid record ID');
        } else {
            navigation.navigate('CheckFertilizerScreen');
        }
      };

    return (
        <View style={{ backgroundColor: '#fdfafa', height: '90%' }}>
            <View style={styles.topic}>
                <TouchableOpacity onPress={() => navigation.navigate('CheckFertilizerScreen')}>
                    <View style={styles.backButton}>
                        <Feather name="arrow-left" size={40} color="#000000" />
                    </View>
                </TouchableOpacity>
                <Header />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <Text style={{ fontSize: 22, fontFamily: 'Roboto', fontWeight: 'bold', paddingTop: 2, textAlign: 'center', paddingRight: 13, marginLeft: 10 }}>Previous Nutrition Records</Text>

                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search by Record ID"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <TouchableOpacity style={styles.searchIconContainer} onPress={() => handleSearch()}>
                        <Ionicons name="search" size={24} color="#000" />
                    </TouchableOpacity>
                </View>

                <View style={styles.inputmultiline}>
                    <View style={{ flexDirection: 'column', marginTop: 5 }}>
                        <Text style={{ fontSize: 13, marginTop: 0, fontWeight: 'bold', marginLeft: 0 }}>Record ID : 001 </Text>
                        <View style={{ flexDirection: 'row', marginTop: 3 }}>
                            <Text style={{ fontSize: 12, marginTop: 0, marginLeft: 0 }}>Date : 23/04/2023</Text>
                            <Text style={{ fontSize: 12, marginTop: 0, marginLeft: 50 }}>Time : 2.30p.m</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('MoniterFertilizationScreen')}>
                            <Text style={{ fontSize: 14, marginTop: 0, fontWeight: 'bold', marginTop: 15, color: '#fdc50b', fontStyle: 'italic', textDecorationLine: 'underline'  }}>View</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3fdee',
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0.5,
            height: 1,
        },
        shadowOpacity: 0.4,
        shadowRadius: 1.21,
        elevation: 2,
    },
    inputmultiline: {
        marginBottom: 15,
        marginTop: 30,
        width: '90%',
        marginLeft: 10,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 8,
        shadowOffset: {
            width: 0.5,
            height: 1,
        },
        shadowOpacity: 0.4,
        shadowRadius: 1.21,
        elevation: 2
    },
    topic: {
        flexDirection: 'row',
        paddingTop: 20,
        backgroundColor: '#fdfafa',
    },
    error: {
        color: 'red',
        marginTop: 5,
        fontSize: 8
    },
    backButton: {
        width: 30,
        height: 35,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: -10,
        marginLeft: 15,
        marginRight: 60
    },
    
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop:12,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 45,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    marginRight: 10,
    marginTop:10,
    shadowOffset: {
      width: 0.5,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.21,
    elevation: 2,
  },
  searchIconContainer: {
    padding: 10,
    backgroundColor: 'white',
    marginTop:10,
    borderRadius: 8,
    shadowOffset: {
      width: 0.5,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.21,
    elevation: 2,
  }
});