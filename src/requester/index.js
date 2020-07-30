import axios from 'axios'
import getCourses from "./scraper";
import Course from '../model/Course'
import Section from "../model/Section";

export const findCoursesArray = async (courseArray) => {
    let fullSectionArray = []
    for (const course of courseArray) {
        const filteredCourse = await findCourseOne(course)
        fullSectionArray = [...fullSectionArray, filteredCourse]
    }
}

export const findCourseOne = async ({courseNumber, courseCode, CRNs}) => {
    const filteredSectionArray = []
    const rawSectionArray =
        await getCourses(courseCode, courseNumber, 100, 0)
    for (const rawSection of rawSectionArray) {
        if (CRNs.has(parseInt(rawSection['courseReferenceNumber']))) {
            filteredSectionArray.push(new Section(rawSection))
        }
    }
    return filteredSectionArray
}
export const findOneSection = async (courseIdentifier, sectionCRN)=>{
    const [courseCode, courseNumber] = Course.getIdentifierParts(courseIdentifier)
    const rawSectionArray =
        await getCourses(courseCode, courseNumber, 1, 0)
    for (const rawSection of rawSectionArray) {
        if (sectionCRN === parseInt(rawSection['courseReferenceNumber'])) {
            return new Section(rawSection)
        }
    }
}