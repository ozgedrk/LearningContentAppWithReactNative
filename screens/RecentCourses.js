import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import Courses from '../components/Courses';
import { CoursesContext } from '../store/CoursesContex';
import { getLastWeek } from '../helper/date';

export default function RecentCourses() {

  const coursesContext = useContext(CoursesContext);

  const recentCourses = coursesContext.courses.filter((course)=>{
    const today = new Date();
    const dateLastWeek = getLastWeek(today,7);

    return course.date >= dateLastWeek && course.date < today;
  })

  return <Courses courses={recentCourses} coursesPeriod="Last One Week" />;

}

const styles = StyleSheet.create({});
