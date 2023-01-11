import { React, Component } from "react";
import { useState } from "react";
import exportFromJSON from "export-from-json";
import { format } from "date-fns";
import { downloadExcel } from "react-export-table-to-excel";
import { read, utils, writeFile } from 'xlsx';

const Excel1 = (excelData) => {  

  // define the columns we want and their titles
 // const tableColumn = ["Sr No.", "Requirement", "Submission", "First", "Second", "Closure", "Date", "Employee Name"];
  // define an empty array of rows


 console.log(excelData);
  const data = [];
  const fileName = 'download1';
  const exportType = 'csv';
  let ticketData1 = [];
let index=1;
  // for each ticket pass all its data into an array
  excelData.forEach(exc => {
    // console.log(exc);

    // const ticketData = [
    ticketData1 = [
      index++,
      exc.requirement,
      exc.submission,
      exc.first,
      exc.second,
      exc.closure,
      exc.clo_date,
      exc.employee.emp_name,      

      // called date-fns to format the date on the ticket
      // format(new Date(ticket.updated_at), "yyyy-MM-dd")
  ];
  data.push(ticketData1)
});


  /*
    // data.push({SrNo:index,Requirement: ticketData1[0], Submission: ticketData1[1],
    // first: ticketData1[2], second: ticketData1[3], closure: ticketData1[4],
    // clo_date: ticketData1[5], employeename: ticketData1[6]});

   data.push(ticketData1)*/



   
 
  
 
 // exportFromJSON({ data, fileName, exportType });


 /* downloadExcel({
    fileName: "react-export-table-to-excel -> downloadExcel method",
    sheet: "react-export-table-to-excel",
    tablePayload: {
        tableColumn,
      // accept two different data structures
      body:ticketData1,
    },*/

    const headings = [[
        "Sr No.", "Requirement", "Submission", "First", "Second", "Closure", "Date", "Employee Name"
    ]];
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, data, { origin: 'A2', skipHeader: true });
    utils.book_append_sheet(wb, ws, 'Report');
    writeFile(wb, 'Closure report.xlsx');




}
export default Excel1; 