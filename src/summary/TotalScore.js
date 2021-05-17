import React, {forwardRef} from 'react';

import {COMMAND_NAMES} from "./../constants/Speech";

import Paper from "@material-ui/core/Paper";

import MaterialTable from "material-table";

export default function TotalScore(props) {

  let {score} = props;
  // process the script
  var totalData = []

  for (let command in score) {
    let commandRow = {};
    commandRow["command"] = command;
    commandRow["times"] = score[command];
    totalData.push(commandRow);
  }

  return (
    <Paper 
      style={{margin: "2vh", height: "70vh", width: "30vw", overflow: "auto"}}
      elevation={4}
    >
      <MaterialTable
        options={{
          search: false,
          paging: false,
          toolbar: false,
        }}
        columns={[
          { title: 'Command Name', field: 'command', sorting: false },
          { title: '# Times Used', field: 'times', sorting: false },
        ]}
        data={totalData}
        style={{height: "70vh", width: "30vw", overflow: 'auto'}}
      />
    </Paper>
  );
}