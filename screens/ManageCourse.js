import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useLayoutEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { CoursesContext } from '../store/CoursesContex';
import CourseForm from '../components/CourseForm';

export default function ManageCourse({route, navigation}) {

  
  const coursesContext = useContext(CoursesContext)
  const courseId = route.params?.courseId

  let isEditing = false;

  if (courseId) {
    isEditing = true;
  }

  useLayoutEffect(()=>{
    navigation.setOptions({
      title:isEditing?'Update Course' : 'Add Course'
    });
  },[navigation,isEditing]);

  function deleteCourse(){
    coursesContext.deleteCourse(courseId);
    navigation.goBack();
  }
  function cancelHandler(){
    navigation.goBack();
  }

  function addOrUpdateHandler(){
    if (isEditing) {
      coursesContext.updateCourse(courseId,{
        description:'Updated Course',
        amount: 169,
        date: new Date(),
      });
    }
    else {
      coursesContext.addCourse({
        description:'Added Course',
        amount: 169,
        date: new Date(),
      });
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container} >
      <CourseForm />
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
                {isEditing ? 'Update' : 'Add'}
              </Text>
            </View>
          </Pressable>
        </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <FontAwesome 
          name="trash-o" 
          size={36} 
          color="black" 
          onPress={deleteCourse} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 25,
  },
  deleteContainer:{
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: 'blue',
    paddingTop: 10,
    marginTop: 16,
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
});
