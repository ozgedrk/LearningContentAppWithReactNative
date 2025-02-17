import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CoursesSummary from './CoursesSummary'
import CoursesList from './CoursesList'


export default function Courses( { coursesPeriod, courses, nullText }) {

  let content = <Text style={styles.alert} >{nullText}</Text> ;

  if (courses.length>0)
  {
    content = <CoursesList courses={courses} />
  }
  return (
    <View style={styles.container}>
      <CoursesSummary courses={courses} periodName={coursesPeriod} />
      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex : 1,
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  alert:{
    fontSize: 16, 
    textAlign: 'center',
    marginTop: 30,
    borderWidth: 15,
    borderColor: 'purple',
    borderRadius: 40,
    padding: 50,
    marginTop: 220,
    color: 'purple',
  },
})