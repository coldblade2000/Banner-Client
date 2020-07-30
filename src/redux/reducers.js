import { combineReducers} from "redux";
import * as types from "./types"
import Course from "../model/Course";



const courseReducer = (state = [], action)=>{
    let doesExist = false;
    let newCourseArray = [...state];
    switch (action.type) {
        case types.ADDED_COURSE:
            for (let i = 0; i < newCourseArray.length; i++) {
                const course = newCourseArray[i]
                if (course.hasSameIdentifier(action.payload)) {
                    doesExist = true
                    console.log(`Course with identifier of ${action.payload} already exists`)
                    break;
                }
            }
            if (!doesExist) newCourseArray.push(new Course(action.payload))
            return newCourseArray
        case types.REMOVED_COURSE:
            return state.filter(course => {
                return !course.hasSameIdentifier(action.payload)
            })
        case types.ADDED_SECTION:
            for (let i = 0; i < newCourseArray.length; i++) {
                const course = newCourseArray[i]
                if(course.getIdentifier() === action.payload.identifier){
                    doesExist = true
                    course.CRNs.push(action.payload.CRN)
                    newCourseArray[i] = course
                    break;
                }
            }
            if (!doesExist) return state
            return newCourseArray
        case types.REMOVED_SECTION:
            for (let i = 0; i < newCourseArray.length; i++) {
                const course = newCourseArray[i]
                if(course.CRNs.includes(action.payload)){
                    doesExist = true
                    course.CRNs = course.CRNs.filter((crn)=>crn !== action.payload)
                    newCourseArray[i] = course
                    break;
                }
            }
            if (!doesExist) return state
            return newCourseArray
        default:
            return state
    }
}

const sectionReducer = (state=[], action)=>{
    let doesExist;
    let newSectionArray = [...state]

    switch (action.type) {
        case types.ADDED_SECTION:
            doesExist = false;
            //If the section exists already, it is updated
            for (let i = 0; i < newSectionArray.length; i++) {
                const section = newSectionArray[i]
                if(section.CRN === action.payload.CRN){
                    doesExist = true
                    console.log(`Section with CRN of ${action.payload.CRN} already exists`)
                    newSectionArray[i] = action.payload
                }
            }
            if (!doesExist) { //If the section doesnt exist...
                newSectionArray.push(action.payload) //It is added to sections state
            }
            return newSectionArray
        case types.REMOVED_SECTION:
            newSectionArray =  state.filter(section=>{
                return !section.CRN === action.payload
            })
            return newSectionArray
        case types.REMOVED_COURSE:
            return state.filter(section=>section.identifier===action.payload.identifier)
        case types.UPDATE_SECTION:
            for (let i = 0; i < newSectionArray.length; i++) {
                const section = newSectionArray[i]
                if(section.CRN === action.payload.CRN){
                    doesExist = true
                    console.log(`Section with CRN of ${action.payload.CRN} already exists, updated`)
                    newSectionArray[i] = action.payload
                }
            }
            return newSectionArray
        default:
            return state
    }
}

/*const updateReducer = (state = INITIAL_STATE, action)=>{
    switch (action.type) {
        case types.UPDATE_SECTION:
            let newSectionArray = [...state.sections]
            //If the section exists already, it is updated
            for (let i = 0; i < newSectionArray.length; i++) {
                const section = newSectionArray[i]
                if(section.CRN === action.payload.CRN){
                    newSectionArray[i] = action.payload
                }
            }

            return {
                ...state,
                sections: newSectionArray
            }
        default:
            return state
    }
}*/

const selectCourseReducer = (state= null, action)=>{
    switch (action.type) {
        case types.ADDED_SECTION:
            return state
        case types.REMOVED_COURSE:
            return null
        case types.ADDED_COURSE:
            return action.payload
        case types.SELECTED_COURSE:
            return action.payload
        case types.UPDATE_SECTION:
            return state
    }
    return state
}

export default combineReducers({
    courses: courseReducer,
    sections: sectionReducer,
    selectedCourse: selectCourseReducer,

})