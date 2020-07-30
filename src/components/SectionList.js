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
import {removedSection, updateSection} from "../redux/actions";
import {findOneSection} from '../requester'

const SectionList = (props)=>{


    return(
        <div className="list">
            <List>
                {props.sections.map((section)=>
                    <ListItem
                    button
                    onClick={()=>onListItemClick(section.identifier)}>
                        <ListItemText
                            primary={section.CRN}
                            secondary={`${section.seatsAvailable}/${section.maximumEnrollment}`}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete">
                                <DeleteIcon onClick={()=>props.removedSection(section.CRN)}/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>,
                )}
            </List>
        </div>
    )
}

const onListItemClick= (section, updateSection)=>{
    findOneSection(section.identifier,section.CRN)
        .then((newSection)=>updateSection(newSection))
}

const mapStateToProps = (state)=>{
    return {
        sections: state.sections
    }
}

export default connect(mapStateToProps, {removedSection})(SectionList)