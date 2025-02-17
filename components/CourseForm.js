import { StyleSheet, Text, View, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import Input from './Input';
import { getFormattedDate} from '../helper/date';

export default function CourseForm({
    cancelHandler, 
    onSubmit, 
    buttonLabel,
    defaultValues,
}) {
    const [inputs, setInputs] = useState({
        amount: {
            value:defaultValues? defaultValues.amount.toString(): '', isValid: true
        },
        date: {
            value:defaultValues? getFormattedDate(defaultValues.date) : '', isValid:true
        },
        description: {
            value:  defaultValues? defaultValues.description : '', isValid: true
        },
    });

    function addOrUpdateHandler(){
        const courseData = {
            amount: Number(inputs.amount.value),
            date:new Date(inputs.date.value),
            description:inputs.description.value
        };
        const amountIsVlaid = courseData.amount > 0;
        const dateIsValid = courseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = courseData.description.trim().length>0;

        if (!amountIsVlaid || !dateIsValid || !descriptionIsValid ) {
            setInputs((currentInputs)=>{
                return {
                    amount:{value : Number(currentInputs.amount.value), isValid:amountIsVlaid},
                    date:{value: currentInputs.date.value, isValid:dateIsValid},
                    description:{value: currentInputs.description.value, isValid:descriptionIsValid},
                }
            })
            return;
        }
        onSubmit(courseData);
    }

    console.log(inputs)
    function inputChange(inputIdentifier, enteredValue){
        setInputs((currentInput) => {
            return {
                ...currentInput,
                [inputIdentifier]: { value: enteredValue, isValid: true },
            };
        });
    }
    
  return (
    <View style={styles.form} >
        <Text style={styles.title} >Course Information</Text>
        <View style={styles.priceAndDate} >
            <Input 
                style={styles.flexAll} 
                label="Amount" 
                invalid={!inputs.amount.isValid}
                textInputConfig={{
                keyboardType: 'decimal-pad',
                onChangeText: inputChange.bind(this,'amount'),
                value: inputs.amount.value.toString(),
                }}
            />
            <Input 
                style={styles.flexAll} 
                label="Date" 
                invalid={!inputs.date.isValid}
                textInputConfig={{
                placeHolder: 'YYYY-MM-DD' ,
                maxLength: 10 ,
                onChangeText: inputChange.bind(this,'date'),
                value: inputs.date.value,
                }} 
            />
        </View>
            <Input 
                label="Title" 
                invalid={!inputs.description.isValid}
                textInputConfig={{
                multiline: true ,
                onChangeText: inputChange.bind(this,'description'),
                value: inputs.description.value,
                }} 
            />

            <View style={styles.error} >
                {!inputs.amount.isValid && (
                <Text>Please enter a valid amount!!</Text>
            )}
            {!inputs.date.isValid && (
                <Text>Please enter a valid date!!</Text>
            )}
            {!inputs.description.isValid && (
                <Text>Please enter a valid description!!</Text>
            )}
            </View>

            <View style={styles.buttons}>
                <Pressable
                onPress={cancelHandler}>
                    <View style={styles.cancel}>
                    <Text style={styles.cancelText}>
                        Cancel
                    </Text>
                    </View>
                </Pressable>
                <Pressable onPress={addOrUpdateHandler} >
                    <View style={styles.addOrDelete}>
                    <Text style={styles.addOrDeleteText}>
                        {buttonLabel}
                    </Text>
                    </View>
                </Pressable>
            </View>
    </View>
  );
  
}

const styles = StyleSheet.create({
    form:{
        marginTop: 40,
    },
    title:{
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'purple',
        marginVertical: 20,
    },
    priceAndDate:{
        flexDirection: 'row',
    },
    flexAll:{
        flex: 1,
    },
    buttons:{
        flexDirection: 'row',
        justifyContent: 'center',
      },
      cancel:{
        backgroundColor: 'red',
        minWidth: 120,
        marginRight: 10,
        padding: 8,
        alignItems:'center',
        borderRadius: 10,
      },
      cancelText:{
        color: 'white'
      },
      addOrDelete:{
        backgroundColor: 'lightblue',
        minWidth: 120,
        marginRight: 10,
        padding: 8,
        alignItems:'center',
        borderRadius: 10,
      },
      addOrDeleteText:{
        color: 'white'
      },
      error:{
        alignItems: 'center',
        marginBottom: 10,
      },
})