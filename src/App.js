import React from 'react';
import logo from './logo.svg';
import './App.css';
import TableSections from "./components/TableSections";
import CourseFrame from "./components/CourseFrame";
import SectionFrame from "./components/SectionFrame";

function App() {
  return (
    <div className="App">
        <TableSections/>
        <div className="controls d-flex flex-row">
            <CourseFrame />
            <SectionFrame/>
        </div>
    </div>
  );
}

export default App;
