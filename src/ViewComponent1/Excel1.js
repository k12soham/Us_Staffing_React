import { React, Component } from "react";
import { useState } from "react";
import exportFromJSON from "export-from-json";
import { format } from "date-fns";
import { downloadExcel } from "react-export-table-to-excel";
import { read, utils, writeFile } from 'xlsx';

const Excel1 = (excelData) => {  

  let empname= localStorage.getItem("empName");
  let cate=localStorage.getItem("cate");
  let startdate=localStorage.getItem("startdate");
  let enddate=localStorage.getItem("enddate");
  console.log(cate)

  const data = [];
  let ticketData1 = [];
let index=1;
  // for each ticket pass all its data into an array
  excelData.forEach(exc => {
  
    ticketData1 = [
      index++,
      exc.requirement,
      exc.submission,
      exc.first,
      exc.second,
      exc.closure,
      exc.clo_date,
      exc.employee.emp_name,      

  ];
  data.push(ticketData1)
});




   
 
   
    // const headings = [[
    //     "Sr No.", "Requirement", "Submission", "First", "Second", "Closure", "Date", "Employee Name" 
    // ]];


    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);


    
    
    //onst wb1 = XLSX.utils.book_new();

    // STEP 2: Create data rows and styles
    let row = [
      { v: "Courier: 24", t: "s", s: { font: { name: "Courier", sz: 24 } } },
      { v: "bold & color", t: "s", s: { font: { bold: true, color: { rgb: "FF0000" } } } },
      { v: "fill: color", t: "s", s: { fill: { fgColor: { rgb: "E9E9E9" } } } },
      { v: "line\nbreak", t: "s", s: { alignment: { wrapText: true } } },
    ];
    
    // STEP 3: Create worksheet with rows; Add worksheet to workbook

    



    // ws.write('B5', 'Sr No.', bold)
    // ws.write('C5', 'Cost', bold)


  // utils.sheet_add_aoa(ws, [
  //  [ "Sr No.", "Requirement", "Submission", "First", "Second", "Closure", "Date", "Employee Name"   ]                        // <-- Write 1 to cell B3
  //     ,                                // <-- Do nothing in row 4
  //     [/*B5*/, /*C5*/, /*D5*/, "abc"]  // <-- Write "abc" to cell E5
  //   ], { origin: "B3" });



//   const merge = [
//     { s: { r: 1, c: 0 }, e: { r: 1, c: 6 }, s: { r: 2, c: 0 }, e: { r: 2, c: 6 } }
// ];
// ws["!merges"] = merge;

if(cate=='undefined')
{
  utils.aoa_to_sheet(ws, [
    [],
    [, , ,empname+"'s current month closures report"],
    [],
    [ "Sr No.", "Requirement", "Submission", "First", "Second", "Closure", "Date", "Employee Name"   ]  ,
     ], { origin: "B2" });
}

else if(cate=='allcat')
{
  utils.sheet_add_aoa(ws, [
    [],
    [, , ,empname+"'s all closures report"],
    [],
    [ "Sr No.", "Requirement", "Submission", "First", "Second", "Closure", "Date", "Employee Name"   ]  ,
     ], { origin: "B2" });
}

else if(cate=='customize')
{
  utils.sheet_add_aoa(ws, [
    [],
    [, , ,empname+"'s closures report"],
    [],
    [ "Sr No.", "Requirement", "Submission", "First", "Second", "Closure", "Date", "Employee Name"   ]  ,
     ], { origin: "B2" });
}
else{
  utils.sheet_add_aoa(ws, [
    [],
    [, , ,empname+"'s " +cate+" closures report"],
    [],
    [ "Sr No.", "Requirement", "Submission", "First", "Second", "Closure", "Date", "Employee Name"   ]  ,
     ], { origin: "B2" });
}
    
       
    utils.sheet_add_json(ws, data, { origin: 'B6', skipHeader: true });
    utils.book_append_sheet(wb, ws, 'Report');
    writeFile(wb, 'Closure report.xlsx');




}
export default Excel1; 