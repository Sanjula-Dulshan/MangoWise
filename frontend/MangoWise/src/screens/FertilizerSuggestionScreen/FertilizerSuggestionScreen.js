import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, Text, ScrollView,TouchableOpacity,Alert} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';

export default function FertilizerSuggestionScreen() {
  const navigation = useNavigation();
  const [fertilizer, setFertilizer] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [irrigation, setIrrigation] = useState('');
  

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const onSubmit = () => {
    navigation.navigate('CheckFertilizerScreen');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
     <View style={styles.topic}>
     <TouchableOpacity onPress={() => navigation.navigate('CheckFertilizerScreen')}>
      <View style={styles.backButton}>
       <Feather name="arrow-left" size={40} color="white" />
        </View>
     </TouchableOpacity>
      <Text style={{ fontSize: 26, fontWeight: 'bold', paddingTop: 30, textAlign: 'left' }}>MangoWise</Text>
      </View>
      
      <View style={styles.container}>
        <Text style={{
          fontSize: 16, fontWeight: 'bold', marginLeft: 15,
          marginTop: 50, textAlign: 'left'
        }}>Suggested Fertilizers</Text>
        
      <TextInput
       style={styles.textArea}
       onChangeText={setFertilizer}
       value={fertilizer}
       multiline={true}
       numberOfLines={4}
       placeholder="Type something..."
    />
    
      <Text style={{
        fontSize: 16, fontWeight: 'bold', marginLeft: 15,
        marginTop: 50,textAlign: 'left'
        }}>Irrigation Advices</Text>

      <TextInput
       style={styles.textArea}
       onChangeText={setIrrigation}
       value={irrigation}
       multiline={true}
       numberOfLines={4}
       placeholder="Type something..."
        />
        
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.btntext}>Generate Recommendations</Text>
        </TouchableOpacity>
      </View> 
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fdfde6',
  },
   topic: {
    flexDirection: 'row',
    backgroundColor:'#fdc50b',
    paddingTop: 30,
    paddingBottom: 10,
  },
  backButton: {
    width: 60,
    height: 40,
    justifyContent:'flex-start',
    alignItems: 'flex-start',
      marginTop: 30,
      marginLeft: 15,
    marginRight:60
  },
  textArea: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    height: 150,
    textAlignVertical: 'top',
    fontSize: 16,
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 40,
  },
   button: {
    backgroundColor: '#fdc50b',
    padding: 10,
    width: 280,
    height: 65,
    borderRadius: 20,
    marginTop: 40,
    alignSelf: 'center',
    marginBottom: 70,
  },
  btntext: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#144100',
    paddingTop: 10,
  },
  });