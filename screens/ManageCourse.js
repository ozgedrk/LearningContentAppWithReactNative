import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useLayoutEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { CoursesContext } from '../store/CoursesContex';
import CourseForm from '../components/CourseForm';
import { deleteCourseHttp, storeCourse, updateCourse } from '../helper/Http';
import LoadingSpinner from '../components/LoadingSpinner';



export default function ManageCourse({route, navigation}) {

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [error, setError] = useState()

  const coursesContext = useContext(CoursesContext)
  const courseId = route.params?.courseId

  let isEditing = false;

  const selectedCourse = coursesContext.courses.find((course)=>course.id === courseId);

  if (courseId) {
    isEditing = true;
  }

  useLayoutEffect(()=>{
    navigation.setOptions({
      title:isEditing?'Update Course' : 'Add Course'
    });
  },[navigation,isEditing]);

  async function deleteCourse(){
    setIsSubmitting(true);
    setError(null);

    try {
      coursesContext.deleteCourse(courseId);
      await deleteCourseHttp(courseId)
      navigation.goBack();
    } catch (error) {
      setError('Couldnt Delete The Course!!');
      setIsSubmitting(false);
    }
  }

  if(error && !isSubmitting){
    return <ErrorText message={error} />
  }


  function cancelHandler(){
    navigation.goBack();
  }

  async function addOrUpdateHandler(courseData){

    setIsSubmitting(true);
    setError(null);
    try {
      if (isEditing) {
        coursesContext.updateCourse(courseId,courseData);
        await updateCourse(courseId,courseData);
      }
      else {
      const id =  await storeCourse(courseData);
        coursesContext.addCourse({...courseData, id:id});
      }
      navigation.goBack();
    } catch (error) {
      setError('Theres a Problem with Adding Or Updating!!');
      setIsSubmitting(false);
    }
 
  }
 
  if (isSubmitting) {
    return <LoadingSpinner />
  }


  return (
    <View style={styles.container} >
      <CourseForm 
      buttonLabel= {isEditing ? 'Update' : 'Add'}
      onSubmit={addOrUpdateHandler}
      cancelHandler={cancelHandler}
      defaultValues={selectedCourse}
      />

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
 
});
