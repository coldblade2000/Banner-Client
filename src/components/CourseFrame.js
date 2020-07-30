import React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import {connect} from 'react-redux'
import {addedCourse} from "../redux/actions";
import CourseList from "./CourseList";

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


const CourseFrame = (props) => {
    const classes = useStyles();

    return (
        <div className="frame flex-fill m-5">
            <AppBar position="static">
                <Toolbar>

                    <Typography edge='start' variant="h6" className={classes.title}>
                        Courses
                    </Typography>
                    <IconButton edge="end" className={classes.menuButton}
                                onClick={()=>addClick(props.addedCourse)}
                                color="inherit" aria-label="menu">
                        <AddIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div className="frameContent">
                <CourseList/>
            </div>
        </div>
    )
}

const addClick = (addedCourse)=>{
    const identifier = prompt("What is the identifier of the course?").toUpperCase()
    if(identifier.length===8){
        addedCourse(identifier)
    }else{
        alert('Not a valid identifier')
    }
}

export default connect(null, {addedCourse})(CourseFrame)