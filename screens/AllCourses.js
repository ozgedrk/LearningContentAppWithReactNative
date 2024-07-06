import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import Courses from '../components/Courses';
import { CoursesContext } from '../store/CoursesContex';

export default function AllCourses() {

  const coursesContext = useContext(CoursesContext)

  return <Courses courses={coursesContext.courses} coursesPeriod="All" />;
}

const styles = StyleSheet.create({});
