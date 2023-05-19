import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, ScrollView,TouchableOpacity,Alert} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';

export default function CheckFertilizerScreen() {
  const navigation = useNavigation();
  const [years, setYears] = useState('');
  const [months, setMonths] = useState('');
  const [stage, setStage] = useState(null);
  const [nitrogen, setNitrogen] = useState('0');
  const [phosporus, setPhosporus] = useState(0);
  const [potassium, setPotassium] = useState(0);
  let error = 0;
  
   const stagedata = [
    { label: 'Before Flowering', value: 'Before Flowering' },
    { label: 'After Flowering', value: 'After Flowering' },
    { label: 'Before Harvest', value: 'Before Harvest' },
    { label: 'After Harvest', value: 'After Harvest' }
    
  ];
    const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

   const renderItem = item => {
      return (
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.label}</Text>
          {item.value === stage}
        </View>
      );
    };

  //Send data to backend
  const onSubmit = () => {
    error = 0;
    if (years == 0 && months == 0) {
      error = 1;
      Alert.alert(
        'Error',
        'Please enter a valid value for age of the tree',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    };
    if (stage == null) {
      error = 1;
      Alert.alert(
        'Error',
        'Please select a growth stage',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    };
    
    if (error == 0) {
      const data = {
        age: (years * 12 + months),
        stage: stage,
        nitrogen: nitrogen,
        phosporus: phosporus,
        potassium: potassium
      };
      console.log(data);
      navigation.navigate('FertilizerSuggestionScreen', { data: data });
    };
  };

  const handleMonthChange = (text) => {
    const parsedValue = parseInt(text);
    if (parsedValue < 0 || parsedValue > 11) {
      Alert.alert(
        'Error',
        'Please enter a valid value between 1 and 11',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    } else {
      setMonths(isNaN(parsedValue) ? '' : parsedValue);
    }
  };



  return (
    <ScrollView showsVerticalScrollIndicator={false}>
     <View style={styles.topic}>
     <TouchableOpacity onPress={() => navigation.navigate('MoniterFertilizationScreen')}>
      <View style={styles.backButton}>
       <Feather name="arrow-left" size={40} color="white" />
        </View>
     </TouchableOpacity>
      <Text style={{ fontSize: 26, fontWeight: 'bold', paddingTop: 30, textAlign: 'left' }}>MangoWise</Text>
       </View>
      <View style={styles.container}>
        <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft:10,marginBottom: -18,marginTop: 60,textAlign:'left'}}>Enter estimated age of the mango tree</Text>
      <View style={styles.inputContainer}>
       <FloatingLabelInput
          label="Years"
          style={styles.input}
          value={years.toString()}
            staticLabel
            hint='Age in years'
          customLabelStyles={{
          colorFocused: 'darkblue',
          fontSizeFocused: 20,
          
        }}
        labelStyles={{
          paddingHorizontal: 2,
          paddingVertical: 2,
          marginVertical: -9,
          backgroundColor: '#fdfde6',
        }}
        inputStyles={{
          color: 'black',
          paddingHorizontal: 10,
        }}
          onChangeText={(text) => {
          const parsedValue = parseInt(text);
          setYears(isNaN(parsedValue) ? '' : parsedValue);
            }}
          keyboardType="numeric"
        />
          <Text>     </Text>
          
       <FloatingLabelInput
          label="Months"
          style={styles.input}
            value={months.toString()}
            hint='Months 1 to 11'
          staticLabel
          customLabelStyles={{
          colorFocused: '#01016d',
          fontSizeFocused: 14
            }}
       labelStyles={{
          paddingHorizontal: 2,
          paddingVertical: 2,
          marginVertical: -9,
          backgroundColor: '#fdfde6',
        }}
        inputStyles={{
          color: 'black',
          paddingHorizontal: 0,
          paddingVertical:10
        }}
          onChangeText={handleMonthChange}
          keyboardType="numeric"
        />
       </View>
    
        <Text style={{
          fontSize: 16, fontWeight: 'bold', marginLeft: 10, marginBottom: -20,
          marginTop: 50,textAlign: 'left'
        }}>Select current growth stage of the tree</Text>

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={stagedata}
        maxHeight={220}
        labelField="label"
        valueField="value"
        placeholder="Select Growth Stage"
        value={stage}
        
        onChange={item => {
        setStage(item.value);
            }}
          renderItem={renderItem} />
        
        <View style={{ flexDirection: 'row', marginTop: 30 }}>
          
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 25,marginLeft:20,marginRight:16 }}> Nitrogen </Text>
       
        <TextInput style={styles.npk}
          value={nitrogen}
          onChangeText={(text) => setNitrogen(text)}
          />

        <Text style={{margin:10,marginTop:25}}> mg/kg</Text>
        </View>
        
        <View style={{ flexDirection:'row'}}> 
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft:20,marginTop: 20 }}> Phosporus </Text>
        <TextInput style={styles.npk}
          value={phosporus.toString()}
             control={control}
             onChangeText={(text) => {
             const parsedValue = parseFloat(text);
             setPhosporus(isNaN(parsedValue) ? '' : parsedValue);
            }}
            />
          <Text style={{margin:10,marginTop:25}}> mg/kg</Text>
        </View>

        <View style={{ flexDirection:'row',marginBottom:20}}> 
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft:20,marginTop: 20 }}> Potassium </Text>
          <TextInput style={styles.npk}
             value={potassium.toString()}
             control={control}
             onChangeText={(text) => {
             const parsedValue = parseFloat(text);
             setPotassium(isNaN(parsedValue) ? '' : parsedValue);
            }}
            keyboardType="numeric" />
          
          <Text style={{margin:10,marginTop:25}}> mg/kg</Text>
        </View>

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
    backgroundColor:'#fdfde6',
  },
   topic: {
    flexDirection: 'row',
    backgroundColor:'#fdc50b',
    paddingTop: 30,
    paddingBottom: 10,
  },
   error: {
    color: 'red',
     marginTop: 5,
    fontSize:8
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
  inputContainer: {
    flexDirection: 'row',
    justifyContent:'center',
    marginBottom: 10,
    marginTop: 40,
    width: '90%',
    marginLeft: 20,
  },
  npk: {   
    backgroundColor: 'white', 
    borderRadius: 8,
    padding: 10,
    marginTop: 15,
    marginLeft: 30,
    height: 40,
    width: '25%',
     shadowColor: '#000',
      shadowOffset: {
        width: 0.5,
        height: 1,
      },
      shadowOpacity: 0.4,
      shadowRadius: 1.21,

      elevation: 2,
  },
  input: {   
    backgroundColor: 'white', 
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    marginRight: 0,
    height: 60,
    width: '20%',
     shadowColor: '#000',
      shadowOffset: {
        width: 0.5,
        height: 1,
      },
      shadowOpacity: 0.4,
      shadowRadius: 1.21,

      elevation: 2,
  },
    dropdown: {
     margin: 16,
     marginTop: 40,
      height: 50,
      width: 360,
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    item: {
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textItem: {
      flex: 1,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 14,
    },
    selectedTextStyle: {
      fontSize: 14,
      borderRadius: 10,      
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
