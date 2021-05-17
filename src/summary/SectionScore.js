import React, {forwardRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Paper from "@material-ui/core/Paper";

import MaterialTable from "material-table";
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ChevronRight from '@material-ui/icons/ChevronRight';

const tableIcons = {
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
};

const ExpandContent = ({ lines, ...otherProps}) => {

  var lineData = [];

  for (let lineObj of lines) {
    let lineRow = {}
    lineRow.words = lineObj.line.join(" ");

    for (let command in lineObj.score) {
      lineRow[command] = lineObj.score[command];
    }

    lineData.push(lineRow);
  }
  return (
    <MaterialTable
      icons={tableIcons}
      options={{
        search: false,
        toolbar: false,
        paging: false,
      }}
      columns={[
        { title: 'Script', field: 'words', width: '40%' },
        { title: 'Previous Line', field: 'previous line', width: '20%' },
        { title: 'Line', field: 'line', width: '20%' },
        { title: 'Next Line', field: 'next line', width: '20%' },
      ]}
      data={lineData}
    />
  );
}

export default function SectionScore(props) {

  // process the script
  var sectionData = [];

  for (let sectionObj of props.script) {
    let sectionRow = {};

    sectionRow.name = sectionObj.section;

    for (let command in sectionObj.score) {
      sectionRow[command] = sectionObj.score[command];
    }

    sectionRow.lines = sectionObj.lines;

    sectionData.push(sectionRow);
  }

  return (
    <Paper 
      style={{margin: "2vh", height: "70vh", width: "60vw", overflow: "auto"}}
      elevation={4}
    >
      <MaterialTable
        icons={tableIcons}
        title="By Section"
        options={{
          search: false,
          paging: false,
          toolbar: false,
        }}
        columns={[
          { title: 'Section Name', field: 'name' },
          { title: 'Previous Section', field: 'previous section'},
          { title: 'Restart Section', field: 'restart section'},
          { title: 'Next Section', field: 'next section'},
        ]}
        data={sectionData}
        detailPanel={rowData => {
          let {lines} = rowData;
          return (
            <ExpandContent lines={lines}/>
          )
        }}
        style={{height: "70vh", width: "60vw", overflow: 'auto'}}
      />
    </Paper>
  );
}