import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {connect} from 'react-redux'

const TableSections = ({sections})=>{

    

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Identifier</TableCell>
                        <TableCell align="right">CRN</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Cupos</TableCell>
                        {/*<TableCell align="right">Profesor</TableCell>*/}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sections.map((section) => (
                        <TableRow key={section.CRN}>
                            <TableCell component="th" scope="row">{section.identifier}</TableCell>
                            <TableCell align="right">{section.CRN}</TableCell>
                            <TableCell align="right">{section.courseName}</TableCell>
                            {/*<TableCell align="right">{section.profesor}</TableCell>*/}
                            <TableCell align="right">{`${section.seatsAvailable}/ ${section.maximumEnrollment}`}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

TableSections.defaultProps = {
    sections:[
        {
            identifier:"ISIS1104",
            courseName: "Matematica Estructural",
            CRN:12345,
            maximumEnrollment: 22,
            seatsAvailable: 14
        }
    ]
}

const mapStateToProps = (state)=>{
    return {sections: state.sections}
}

export default connect(mapStateToProps)(TableSections)