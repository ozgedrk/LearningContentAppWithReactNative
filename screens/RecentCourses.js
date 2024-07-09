import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Courses from '../components/Courses';
import { CoursesContext } from '../store/CoursesContex';
import { getLastWeek } from '../helper/date';
import { getCourses } from '../helper/Http';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorText from '../components/ErrorText';


export default function RecentCourses() {

  const coursesContext = useContext(CoursesContext);
  
  const [fetchCourses, setFetchCourses] = useState([]);

  const [isFetching, setIsFetching] = useState(true)

  const [error, setError] = useState()

  useEffect(()=>{
    async function takeCourses(){
      setError(null);
      setIsFetching(true);
      try {
        const courses = await getCourses();
        coursesContext.setCourse(courses);
      } catch (error) {
        setError('Couldnt Find Any Course!!')
      }
      // setFetchCourses(courses);
      setIsFetching(false);
    }
    takeCourses();
  },[]);

  if(error && !isFetching){
    return <ErrorText message={error} />
  }

  if (isFetching) {
    return <LoadingSpinner />
  }

  const recentCourses = coursesContext.courses.filter((course)=>{
    const today = new Date();
    const dateLastWeek = getLastWeek(today,7);

    return course.date >= dateLastWeek && course.date <= today;
  });

  return <Courses courses={recentCourses} coursesPeriod="Last One Week" nullText="Ur Not Attended To Any Course Recentlty" />;

}

const styles = StyleSheet.create({});
