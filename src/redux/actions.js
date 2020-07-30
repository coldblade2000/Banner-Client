import * as types from "./types"

export const addedCourse = (identifier)=>{
    return{
        type:types.ADDED_COURSE,
        payload:identifier
    }
}
export const removedCourse = (identifier)=>{
    return{
        type:types.REMOVED_COURSE,
        payload:identifier
    }
}

export const addedSection = (section)=>{

    return{
        type:types.ADDED_SECTION,
        payload:section
    }
}

export const removedSection = (CRN)=>{
    return{
        type:types.REMOVED_SECTION,
        payload:CRN
    }
}
export const updateSection = (section)=>{
    return{
        type:types.UPDATE_SECTION,
        payload:section
    }
}
