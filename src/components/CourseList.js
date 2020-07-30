import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import {connect} from 'react-redux'
import {removedCourse, updateSection} from "../redux/actions";
import {findCourseOne} from '../requester'

const CourseList = (props)=>{


    return(
        <div className="list" style={{backgroundColor:"#eeeeee"}}>
            <List>
                {props.courses.map((course)=>
                    <ListItem
                        key={course.getIdentifier()}
                    button
                    selected={props.selectedCourse===course.identifier}
                    onClick={()=>onListItemClick(course)}>
                        <ListItemText
                            primary={course.getIdentifier()}
                            // secondary={? 'Secondary text' : null}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete">
                                <DeleteIcon onClick={()=>props.removedCourse(course.getIdentifier())}/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>,
                )}
            </List>
        </div>
    )
}

const onListItemClick= (course, updateSection)=>{
    findCourseOne(course).then((sections)=>{
        sections.forEach(updateSection)
    })
}

const mapStateToProps = (state)=>{
    return {
        courses: state.courses,
        selectedCourse: state.selectedCourse
    }
}

export default connect(mapStateToProps, {removedCourse})(CourseList)