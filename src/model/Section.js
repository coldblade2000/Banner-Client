import he from 'he'
export default class Section{
    constructor(rawCourse) {
        this.identifier = rawCourse['subject']+rawCourse['courseNumber']
        this.courseName = he.decode(rawCourse['courseTitle'])
        this.CRN = parseInt(rawCourse['courseReferenceNumber'])
        this.maximumEnrollment = rawCourse['maximumEnrollment']
        this.seatsAvailable = rawCourse['seatsAvailable']
    }
}