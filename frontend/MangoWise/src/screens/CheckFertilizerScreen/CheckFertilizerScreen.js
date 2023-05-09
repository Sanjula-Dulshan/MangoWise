import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { FloatingLabelInput } from 'react-native-floating-label-input';

export default function CheckFertilizerScreen() {
  const [years, setYears] = useState('');
  const [months, setMonths] = useState('');
  const [stage, setStage] = useState(null);


   const stagedata = [
    { label: 'Before Flowering', value: 'Before Flowering' },
    { label: 'After Flowering', value: 'After Flowering' },
    { label: 'Before Harvest', value: 'Before Harvest' },
    { label: 'After Harvest', value: 'After Harvest' }
    
  ];

   const renderItem = item => {
      return (
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.label}</Text>
          {item.value === stage}
        </View>
      );
    };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
     <View style={styles.topic}>
      <Text style={{ fontSize: 26, fontWeight: 'bold', paddingTop: 35, textAlign: 'left' }}>MangoWise</Text>
       </View>
        <View style={styles.container}>
        <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft:-40,marginBottom: -18,marginTop: 100,textAlign:'left'}}>Enter estimated age of the mango tree</Text>
      <View style={styles.inputContainer}>
       <FloatingLabelInput
          label="Years"
          style={styles.input}
          value={years}
          staticLabel
          customLabelStyles={{
          colorFocused: 'darkblue',
          fontSizeFocused: 16,
        }}
        labelStyles={{
          paddingHorizontal: 2,
          paddingVertical: 2,
          marginVertical: -9,
          backgroundColor: '#fff',
        }}
        inputStyles={{
          color: 'black',
          paddingHorizontal: 10,
        }}
          onChangeText={(text) => setYears(text)}
          keyboardType="numeric"
        />
          <Text>     </Text>
          
       <FloatingLabelInput
          label="Months"
          style={styles.input}
          value={months}
          staticLabel
          customLabelStyles={{
          colorFocused: 'darkblue',
          fontSizeFocused: 14,
        }}
       labelStyles={{
          paddingHorizontal: 2,
          paddingVertical: 2,
          marginVertical: -9,
          backgroundColor: '#fff',
        }}
        inputStyles={{
          color: 'black',
          paddingHorizontal: 10,
        }}
          onChangeText={(text) => setMonths(text)}
          keyboardType="numeric"
        />
       </View>
    
         <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft:-40,marginBottom: -20,marginTop: 50,textAlign:'left'}}>Select current growth stage of the tree</Text>
      <Dropdown
        style={styles.dropdown2}
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
            renderItem={renderItem}
        />
         
        </View> 
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#fff',
  },
   topic: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#fff',
    paddingTop:30
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    marginBottom: 10,
    marginTop: 40,
    width: '45%',
  },
  input: {   
    backgroundColor: 'white', 
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    marginRight: 10,
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
      width: 110,
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.4,
      shadowRadius: 1.21,
      elevation: 2,
  },
     dropdown2: {
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
  }
});
