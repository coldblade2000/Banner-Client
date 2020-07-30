import he from 'he'
export default class Course{
    constructor(identifier) {
        this.courseCode = identifier.substring(0,4) //ISIS
        this.courseNumber = identifier.substring(4,8) //1404
        /*this.courseCode = rawCourse['subject'] //ISIS
        this.courseNumber = rawCourse['courseNumber'] //1404*/
        //this.courseName = he.decode(rawCourse['courseTitle'])
        this.CRNs = []
    }
    getIdentifier(){
        return this.courseCode+this.courseNumber
    }
    static getIdentifierParts(identifier){
        return [identifier.substring(0,4), identifier.substring(4,8)]
    }
    hasSameIdentifier(identifier){
        return this.getIdentifier()===identifier
    }
}