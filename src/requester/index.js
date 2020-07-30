import axios from 'axios'
import getCourses, {sendResetForm} from "./scraper";
import Course from '../model/Course'
import Section from "../model/Section";

export const findCoursesArray = async (courseArray) => {
    let fullSectionArray = []
    for (const course of courseArray) {
        const response = await findCourseOne(course)
        const filteredCourse = response.data.data
        fullSectionArray = [...fullSectionArray, filteredCourse]
    }
}

export const findCourseOne = async ({courseNumber, courseCode, CRNs}) => {
    const filteredSectionArray = []
    await sendResetForm()
    const response =
        await getCourses(courseCode, courseNumber, 100, 0)
    const rawSectionArray = response.data.data
    for (const rawSection of rawSectionArray) {
        if (CRNs.includes(parseInt(rawSection['courseReferenceNumber']))) {
            filteredSectionArray.push(new Section(rawSection))
        }
    }
    return filteredSectionArray
}
export const findOneSection = async (courseIdentifier, sectionCRN)=>{
    const [courseCode, courseNumber] = Course.getIdentifierParts(courseIdentifier)
    await sendResetForm()
    const response =
        await getCourses(courseCode, courseNumber, 50, 0)
    const rawSectionArray = response.data.data
    console.log(rawSectionArray)
    for (const rawSection of rawSectionArray) {
        if (sectionCRN === parseInt(rawSection['courseReferenceNumber'])) {
            return new Section(rawSection)
        }
    }
}