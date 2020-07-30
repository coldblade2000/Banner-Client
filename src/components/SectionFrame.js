import React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import {connect} from 'react-redux'
import {addedSection} from "../redux/actions";
import CourseList from "./CourseList";
import {findOneSection} from "../requester";
import SectionList from "./SectionList";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));


const SectionFrame = (props) => {
    const classes = useStyles();

    return (
        <div className="frame flex-fill m-5">
            <AppBar position="static">
                <Toolbar>
                    <Typography edge='start' variant="h6" className={classes.title}>
                        {"Sections" + ((props.selectedCourse) ? " - " + props.selectedCourse : "")}
                    </Typography>
                    <IconButton edge="end" className={classes.menuButton}
                                onClick={() => addClick(props.addedSection, props.selectedCourse)}
                                color="inherit" aria-label="menu">
                        <AddIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div className="frameContent">
                <SectionList/>
            </div>
        </div>
    )
}

const addClick = (addedSection, selectedCourse) => {
    const addedCRN = prompt("What is the CRN of the section?")
    try {
        if (addedCRN.length === 5) {
            findOneSection(selectedCourse, parseInt(addedSection))
                .then((section)=>addedSection(section))
        } else {
            throw new Error('Not a valid CRN')
        }
    } catch (e) {
        alert('Not a valid CRN')
    }

}
const mapStateToProps = (state) => {
    return {
        selectedCourse: state.selectedCourse
    }
}

export default connect(mapStateToProps, {addedSection})(SectionFrame)