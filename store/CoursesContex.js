import { act, createContext, useReducer } from "react";

const COURSES = [
    {
      id: '1',
      description: 'C Programlama',
      amount: 69,
      date: new Date('2024-07-05'),
    },
    {
      id: '2',
      description: 'C# Programlama',
      amount: 69,
      date: new Date('2024-07-05'),
    },
    {
      id: '3',
      description: 'Angular',
      amount: 69,
      date: new Date('2024-07-05'),
    },
    {
      id: '4',
      description: 'Bootstrap 5',
      amount: 69,
      date: new Date('2022-10-10'),
    },
    {
      id: '5',
      description: 'React Js',
      amount: 69,
      date: new Date('2023-05-20'),
    },
    {
      id: '6',
      description: 'React Native',
      amount: 69,
      date: new Date('2023-07-30'),
    },
    {
      id: '7',
      description: 'Javascript',
      amount: 69,
      date: new Date('2023-06-12'),
    },
    {
      id: '8',
      description: 'Komple Web',
      amount: 69,
      date: new Date('2021-10-22'),
    },
    {
      id: '9',
      description: 'Frontend',
      amount: 69,
      date: new Date('2022-11-25'),
    },
  ];

  
export const CoursesContext =  createContext({
    courses:[],
    addCourse:({description, amount, date})=>{},
    deleteCourse:(id)=>{},
    setCourse: (courses) => {},
    updateCourse:(id,{description, amount, date})=>{},
});

function coursesReducer(state, action){
    switch (action.type)
    {
        case 'ADD':
            // const id = new Date().toString() + Math.random().toString()
            // return [{...action.payload,id:id},...state];
            return [action.payload, ...state];

        case 'DELETE':
            return state.filter((course)=>course.id !== action.payload);
        case 'SET' :
              const reversedData = action.payload.reverse();
              return reversedData;
        case 'UPDATE':
           const updatableCourseIndex = state.findIndex(
            (course) => course.id === action.payload.id
            );
            const updatableCourse = state[updatableCourseIndex]
            const updatedItem = {...updatableCourse,...action.payload.data}
            const updatedCourses = [...state];
            updatedCourses[updatableCourseIndex] = updatedItem;
            return updatedCourses;
        default:
            return state;
    }
}

function CoursesContextProvider( {children} ){

    const [coursesState, dispatch] = useReducer(coursesReducer, [])
    
    function addCourse(courseData){
        dispatch({type:'ADD', payload:courseData});
    }

    function setCourse(courses){
        dispatch({type:'SET', payload: courses});
    }

    function deleteCourse(id){
      dispatch({type:'DELETE', payload:id});
  }
    

    function updateCourse(id,courseData){
        dispatch({type:'UPDATE', payload:{id:id,data:courseData}});
    }

    const value ={
        courses:coursesState,
        addCourse:addCourse,
        deleteCourse:deleteCourse,
        setCourse:setCourse,
        updateCourse:updateCourse
    }
    return (
        <CoursesContext.Provider value={value} >
            {children}
        </CoursesContext.Provider>
    )
}

export default CoursesContextProvider;