import { React, useState, useEffect, useRef } from "react";
import base_url from "../api/bootapi";
import Header from "./Header";
import EmpTeamSidebar from "./EmpTeamSidebar";
import { Table } from "reactstrap";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import history from './ResponseVal';
// import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import exportFromJSON from "export-from-json";
import PdfDemo1 from "../ExtraComponent/PdfDemo1";
import ExportToExcel from "../ExtraComponent/PdfDemo1";
import GeneratePDF from "./GeneratePDF";

import { downloadExcel } from "react-export-table-to-excel";
import Excel1 from "./Excel1";

const AdminDash1 = () => {

    let empID = localStorage.getItem('empID');

    let empMail = localStorage.getItem('empMail');
    console.log("empMail: " + empMail);
    console.log("hello");

    const [closureList, setClosureList] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [empIDD, setEmpIDD] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [category, setCategory] = useState();
    const [isShown, setIsShown] = useState(false);
    const [isShownError, setIsShownError] = useState(false);
    const [dt1, setDt1] = useState(new Date());

    const [inEditMode, setInEditMode,] = useState({
        status: true,
        rowKey: null
    });

    const [req, setReq] = useState(null);
    const [sub, setSub] = useState(null);
    const [first, setFirst] = useState(null);
    const [second, setSecond] = useState(null);
    const [closure, setClosure] = useState(null);

    useEffect(() => {
        axios.get(`${base_url}/CurMonthAll`).then(json => setClosureList(json.data))
        axios.get(`${base_url}/getEmpList_TM`).then(json => setEmployee(json.data))
    }, []);
    console.log(closureList)

    console.log(closureList);
    // -------------------------------Get Records by empid and category---------------------------------------------

    const handleChange = (e) => {
        const t2 = e.newEmpID;
        setEmpIDD(t2);
        const t3 = e.newCate;
        let d1 = e.newdt1;
        let d2 = e.newdt2;

        let f1 = format(d1, 'yyyy-MM-dd');
        let f2 = format(d2, 'yyyy-MM-dd');

        if (category == "Customize" && t2 != "all") {
            if (f2 >= f1) {
                setIsShownError(false)
                postGetDataBetDates(t2, f1, f2);
            }
            else {
                setIsShownError(false)
                alert("Enter valid date");
            }
        }
        else if ((category == "Customize") && t2 == "all") {
            setIsShownError(false);
            setIsShown(true);
            postGetDataBetDates2(f1, f2);
        }
        else if ((category != "Customize") && (category != undefined) && t2 != "all") {
            setIsShownError(false)
            postGetDataByCateOfEmp(t2, t3)
        }
        else if (t3 == undefined) {
            setIsShownError(false)
            if (t2 == "all") {
                axios.get(`${base_url}/CurMonthAll`).then(json => setClosureList(json.data))
                console.log("OK")
            } else {
                postGetDataByEmpID(t2);
            }
        }
        else if ((t2 == "all" && category == undefined)) {
            setIsShownError(false)
            axios.get(`${base_url}/CurMonthAll`).then(json => setClosureList(json.data))
        }
        else if (t2 == "all" && category == "allcat") {
            setIsShownError(false)
            console.log("empid : " + t2 + " cate : " + t3);
            postGetDataByCate(t3);
        }
        else if (t2 == "all" && category != undefined) {
            setIsShownError(false)
            console.log("empid : " + t2 + " cate : " + t3);
            postGetDataByCate(t3);
        }
        else {
            setIsShownError(false)
            // postGetDataByEmpCate(t2, t3);
            postGetDataByCateOfEmp(t2, t3);
        }
    };

    const postGetDataByEmpCate = (t2, t3) => {
        axios.get(`${base_url}/get_cls_by_Quarterly?empid=${t2}&category=${t3}`).then(json => setClosureList(json.data))
        // localhost:8082/get_cls_by_Quarterly?empid=3&category=Quarterly
    }

    const postGetDataByEmpID = (t2) => {
        // axios.get(`${base_url}/getRecordsOfCurMonth?empid=${t2}`).then(json => setClosureList(json.data));

        axios.get(`${base_url}/getRecordsOfCurMonth?empid=${t2}`)
            .then(
                json => setClosureList(json.data),
            )
            .catch(error => {
                setIsShownError(true);
                setClosureList([]);
            })
    }
    // -------------------------------Get Records by empid and category---------------------------------------------

    // ---------------------------Code to handle Categories {Customize, Yearly... etc}-----------------------

    const handleCate = (evt) => {

        console.log(closureList);
        let cate = evt.newCate;
        let eID = empIDD;
        setCategory(cate)

        let date1 = format(startDate, "yyyy-MM-dd");
        let date2 = format(endDate, "yyyy-MM-dd");

        if (cate == 'Customize' && eID == null) {
            setIsShownError(false)
            setIsShown(true);
            postGetDataBetDates2(date1, date2);
        }
        else if (cate == 'Customize' && eID != null && eID != "all") {
            setIsShownError(false)
            setIsShown(true);
            // alert("startDate: " + date1 + " endDate: " + date2 + " eID: " + eID);
            postGetDataBetDates(eID, date1, date2);
        }
        else if (eID != null && eID != "all") {
            setIsShownError(false)
            postGetDataByCateOfEmp(eID, cate);
            setIsShown(false);
        }
        else if (cate == 'Customize' && eID == "all") {
            setIsShownError(false)
            setIsShown(true);
            postGetDataBetDates2(date1, date2);
        }
        else {
            setIsShownError(false);
            postGetDataByCate(cate);
            console.log("data : " + closureList);
            setIsShown(false);
        }
    };

    const postGetDataByCateOfEmp = (d1, d2) => {
        // axios.get(`${base_url}/get_cls_by_Quarterly?empid=${d1}&category=${d2}`).then(json => setClosureList(json.data))
        // localhost:8082/get_cls_by_Quarterly?empid=3&category=Quarterly

        axios.get(`${base_url}/get_cls_by_Quarterly?empid=${d1}&category=${d2}`)
            .then(
                json => setClosureList(json.data),
            )
            .catch(error => {
                setIsShownError(true);
                setClosureList([]);
            })
    }

    const postGetDataByCate = (cate) => {
        // axios.get(`${base_url}/getRecordByCate?category=${cate}`).then(json => setClosureList(json.data))
        // localhost:8082/get_cls_by_Quarterly?empid=3&category=Quarterly
        axios.get(`${base_url}/getRecordByCate?category=${cate}`)
            .then(
                json => setClosureList(json.data),
                console.log("data : " + closureList),
            )
            .catch(error => {
                setIsShownError(true);
                setClosureList([]);
            })
    }
    // ---------------------------------------------End Get data by category-------------------------------------------

    // --------------------------------------------Get data between dates----------------------------------------------
    const handleDateChange1 = (date) => {
        setIsShownError(false);
        const d1 = date.date1;
        let d2 = endDate;
        let f1 = format(d1, 'yyyy-MM-dd');
        let f2 = format(d2, 'yyyy-MM-dd');

        if (d2 >= d1) {
            setStartDate(d1);
            if (empIDD != null && empIDD != "all") {
                postGetDataBetDates(empIDD, f1, f2);
            }
            else {
                postGetDataBetDates2(f1, f2);
            }
        } else {
            alert("Enter valid date.");
        }
        console.log(" d1:" + d1 + " d2:" + d2);
    }

    const handleDateChange2 = (date) => {
        setIsShownError(false);
        const d2 = date.date2;
        let f1 = format(startDate, 'yyyy-MM-dd');
        let f2 = format(d2, 'yyyy-MM-dd');

        if (f2 >= f1) {
            setEndDate(d2);
            if (empIDD != null && empIDD != "all") {
                postGetDataBetDates(empIDD, f1, f2);
            } else {
                postGetDataBetDates2(f1, f2);
            }
        } else {
            alert("Enter valid date.");
        }
    }

    const datechange = (e) => {
        let a = e.d;
        let z = format(a, "yyyy-MM-dd");
        setDt1(z);
    }

    const postGetDataBetDates = (f, f1, f2) => {
        // alert("this method is called f: "+ f+ " f1 ; "+f1+ " f2 :"+f2);
        // axios.get(`${base_url}/get_cls_byDate?empid=${f}&date1=${f1}&date2=${f2}`).then(json => setClosureList(json.data))
        axios.get(`${base_url}/get_cls_byDate?empid=${f}&date1=${f1}&date2=${f2}`)
            .then(
                json => setClosureList(json.data),
            )
            .catch(error => {
                setIsShownError(true);
                setClosureList([]);
            })
    }

    const postGetDataBetDates2 = (f1, f2) => {

        // axios.get(`${base_url}/get_cls_byDate2?date1=${f1}&date2=${f2}`).then(json => setClosureList(json.data))
        axios.get(`${base_url}/get_cls_byDate2?date1=${f1}&date2=${f2}`)
            .then(
                json => setClosureList(json.data),
            )
            .catch(error => {
                setIsShownError(true);
                setClosureList([]);
            })
    }
    // --------------------------------------------End data between dates----------------------------------------------
    // ---------------------------Code to handle Categories {Customize, Yearly... etc}-----------------------
    function Box() {
        return (
            <div className="d-inline-flex w-50" >
                <span style={{ width: "270px" }}> Start Date:</span>
                <DatePicker dateFormat="dd-MMM-yyyy" maxDate={new Date()} style={{ width: '100' }} className="btn btn-sm btn-primary" selected={startDate} onChange={(date) => handleDateChange1({ date1: date })} />

                <span style={{ width: "270px" }}> End Date:</span>
                <DatePicker dateFormat="dd-MMM-yyyy" maxDate={new Date()} selected={endDate} className="btn btn-sm btn-primary" onChange={(date) => handleDateChange2({ date2: date })} />

            </div>
        );
    }
    // ---------------------------End Code to handle Categories {Customize, Yearly... etc}-----------------------

    // ---------------------------Handle Download Opt------------------------------------------------------------
    const handleDownload = (evt) => {

        let d_cate = evt.DownloadOpt;
        console.log(d_cate);

        if (d_cate == "ExportToCSV") {
            //ExportToExcel(closureList);
            Excel1(closureList)
        } else {
            GeneratePDF(closureList);
        }
    }

   
    // ---------------------------End Handle Download Opt------------------------------------------------------------
    // ---------------------------Empty Data Error Msg-----------------------------------------------------------
    function EmptyDataErrorMsg() {
        // console.log("Empty list");
        return (
            <div className="d-inline-flex w-50" >
                <h5> No data Found</h5>
            </div>
        );
    }
    // ----------------------------------------------------------------------------------------------------------
    const onEdit = ({ clsid, currentreq, currentsub, currentfirst, currentsecond, currentclosure, currentdate }) => {
        setInEditMode({
            status: true,
            rowKey: clsid,
        })
        setReq(currentreq);
        setSub(currentsub);
        setFirst(currentfirst);
        setSecond(currentsecond);
        setClosure(currentclosure);
        setDt1(currentdate);
        console.log("currentdate" + currentdate);
    }

    const updateInventory = ({ clsid, newReq, newSub, newFirst, newSecond, newClosure, newDate }) => {

        if ((newSub < 0) || (newFirst < 0) || (newSecond < 0) || (newClosure < 0)) {
            alert("Please enter positive numbers")
        }
        else if (newReq < 1) {
            alert("Atleast one requirement is needed")
        }
        else if (newSub < newFirst) {
            alert("Please enter valid number for first interview")
        }
        else if (newFirst < newSecond) {
            alert("Please enter valid number for second interview")
        }
        else if (newSecond < newClosure) {
            alert("Please enter valid number for closure")
        }
        else {
            axios.put(`${base_url}/update_record_admin?clsid=${clsid}&req=${newReq}&sub=${newSub}&first=${newFirst}&second=${newSecond}&closure=${newClosure}&date=${newDate}`, {
            })
                .then(response => {
                    onCancel();

                    toast.success("Record updated successfully!", {
                        position: "top-right",
                        autoClose: 1000,
                        style: { position: "absolute", top: "5px", width: "300px" }
                    });

                    //------------------------------------------------------------------------------------------------
                    let cate = category;
                    let eID = empIDD;
                    // alert("cate : "+ cate+" eID: "+eID);

                    let date1 = format(startDate, "yyyy-MM-dd");
                    let date2 = format(endDate, "yyyy-MM-dd");

                    if (cate == undefined && eID != null) {
                        if (eID == "all") {
                            axios.get(`${base_url}/CurMonthAll`).then(json => setClosureList(json.data))

                        } else {
                            postGetDataByEmpID(eID);//get_cls_id
                        }
                    }
                    else if (cate == 'Customize' && eID == null) {
                        setIsShown(true);
                        // alert("startDate: " + date1 + " endDate: " + date2);
                        postGetDataBetDates2(date1, date2);
                    }
                    else if (cate == 'Customize' && eID != null && eID != "all") {
                        setIsShown(true);
                        // alert("startDate: " + date1 + " endDate: " + date2 + " eID: " + eID);
                        postGetDataBetDates(eID, date1, date2);
                    }
                    else if (eID != null && eID != "all") {
                        postGetDataByCateOfEmp(eID, cate);
                        setIsShown(false);
                    }
                    else if (cate == 'Customize' && eID == "all") {
                        setIsShown(true);
                    }
                    else if (cate == undefined && eID == null) {
                        // setIsShown(true);
                        fetchInventory();
                    }
                    else {
                        postGetDataByCate(cate);
                        setIsShown(false);
                    }
                    // fetchInventory();
                },
                    (error) => {
                        alert("Enter valid number for all requirements");
                    }
                )
        }
    }

    const onSave = ({ clsid, newReq, newSub, newFirst, newSecond, newClosure, newDate }) => {

        // console.log("clsid,"+clsid+" newReq,"+newReq+ "newSub,"+newSub+" newFirst,"+newFirst+" newSecond,"+newSecond+" newClosure,"+newClosure+" y "+y);
        updateInventory({ clsid, newReq, newSub, newFirst, newSecond, newClosure, newDate });
    }

    const fetchInventory = () => {
        axios.get(`${base_url}/CurMonthAll`).then(json => setClosureList(json.data))

    }

    const onCancel = () => {
        setInEditMode({
            status: false,
            rowKey: null
        })
    }

    //Delete Book on the web page
    const deleteBook = (id) => {
        axios.delete(`${base_url}/delete_clsByID?closureid=${id}`).then(
            (response) => {

                toast.success("Record Deleted", {
                    position: "top-right",
                    autoClose: 1000,
                    style: { position: "absolute", top: "5px", width: "300px" }
                });

                //------------------------------------------------------------------------------------------------
                let cate = category;
                let eID = empIDD;
                // alert("cate : "+ cate+" eID: "+eID);

                let date1 = format(startDate, "yyyy-MM-dd");
                let date2 = format(endDate, "yyyy-MM-dd");

                if (cate == undefined && eID != null) {
                    if (eID == "all") {
                        axios.get(`${base_url}/CurMonthAll`).then(json => setClosureList(json.data))
                        console.log("OK")
                    } else {
                        postGetDataByEmpID(eID);
                    }
                }
                else if (cate == 'Customize' && eID == null) {
                    setIsShown(true);
                    postGetDataBetDates2(date1, date2);
                }
                else if (cate == 'Customize' && eID != null && eID != "all") {
                    setIsShown(true);
                    // alert("startDate: " + date1 + " endDate: " + date2 + " eID: " + eID);
                    postGetDataBetDates(eID, date1, date2);
                }
                else if (eID != null && eID != "all") {
                    postGetDataByCateOfEmp(eID, cate);
                    setIsShown(false);
                }
                else if (cate == 'Customize' && eID == "all") {
                    setIsShown(true);
                }
                else if (cate == undefined) {
                    fetchInventory();
                }
                else {
                    postGetDataByCate(cate);
                    setIsShown(false);
                }
            },
            (error) => {
                alert("Operation Failed Here");
            }
        )
    }

    // -------------------------------------Render table---------------------------------------------------------
    const renderTable = () => {

        return closureList.map(cls => {

            var dd = new Date(cls.clo_date);
            // console.log("Employees closure list  ash : ", JSON.stringify(closureList.length));

            return (

                <tr key={cls.closureid}>
                    <td></td>
                    <td>
                        {
                            inEditMode.status && inEditMode.rowKey === cls.closureid ? (
                                <input required value={req}
                                    onChange={(event) => setReq(event.target.value)}
                                    style={{ width: "50px" }}
                                    minLength={1}
                                    maxLength={3}
                                />
                            ) : (
                                cls.requirement
                            )
                        }
                    </td>
                    <td>
                        {
                            inEditMode.status && inEditMode.rowKey === cls.closureid ? (
                                <input required value={sub}
                                    onChange={(event) => setSub(event.target.value)}
                                    style={{ width: "50px" }}
                                    minLength={1}
                                    maxLength={3}
                                />
                            ) : (
                                cls.submission
                            )
                        }
                    </td>
                    <td>
                        {
                            inEditMode.status && inEditMode.rowKey === cls.closureid ? (
                                <input required value={first}
                                    onChange={(event) => setFirst(event.target.value)}
                                    style={{ width: "50px" }}
                                    minLength={1}
                                    maxLength={3}
                                />
                            ) : (
                                cls.first
                            )
                        }
                    </td>
                    <td>
                        {
                            inEditMode.status && inEditMode.rowKey === cls.closureid ? (
                                <input required value={second}
                                    onChange={(event) => setSecond(event.target.value)}
                                    style={{ width: "50px" }}
                                    minLength={1}
                                    maxLength={3}
                                />
                            ) : (
                                cls.second
                            )
                        }

                    </td>
                    <td>
                        {
                            inEditMode.status && inEditMode.rowKey === cls.closureid ? (
                                <input required value={closure}
                                    onChange={(event) => setClosure(event.target.value)}
                                    style={{ width: "50px" }}
                                    minLength={1}
                                    maxLength={3}
                                />
                            ) : (
                                cls.closure
                            )
                        }

                    </td>
                    {/* <td>{cls.clo_date}</td> */}
                    <td>
                        {
                            inEditMode.status && inEditMode.rowKey === cls.closureid ? (

                                <DatePicker maxDate={new Date()} value={dt1}
                                    className="datepicker"
                                    openToDate={dd}
                                    // onChange={(event) => setDt1(event)}
                                    onSelect={(date) => { datechange({ d: date }) }}
                                />
                            ) : (
                                cls.clo_date
                            )
                        }

                    </td>

                    <td style={{ width: '60px' }}>{cls.employee.emp_name}</td>

                    <td>
                        {
                            inEditMode.status && inEditMode.rowKey === cls.closureid ? (
                                <>
                                    <button
                                        className={"btn btn-outline-success"}

                                        onClick={() => {
                                            onSave(
                                                {
                                                    clsid: cls.closureid, newReq: req, newSub: sub,
                                                    newFirst: first, newSecond: second, newClosure: closure, newDate: dt1
                                                })
                                        }
                                        }
                                    >
                                        <i class="fa fa-save"></i>
                                    </button>

                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <button
                                        className={"btn btn-outline-warning"}
                                        onClick={() => onCancel()}
                                    >
                                        <i class="fa fa-close"></i>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        className="btn btn-outline-success"

                                        onClick={() => onEdit({
                                            clsid: cls.closureid, currentreq: cls.requirement, currentsub: cls.submission,
                                            currentfirst: cls.first, currentsecond: cls.second, currentclosure: cls.closure,
                                            currentdate: format(dd, "yyyy-MM-dd")
                                        })}
                                    >
                                        <i class="fa fa-edit"></i>
                                    </button>

                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <button className="btn btn-outline-danger"
                                        onClick={() => { if (window.confirm('Are you sure to delete this requirement?')) deleteBook(cls.closureid) }}>{/*Delete*/}<i class="fa fa-trash"></i></button>

                                </>
                            )
                        }
                    </td>
                </tr>
            )
        })
    }
    // -------------------------------------End Render table-----------------------------------------------------

    const isAuthenticated = localStorage.getItem('empID');

    return isAuthenticated ? (
        <div className="container-fluid">
            <div className="row">

                <div className="col-12 h-100 master_backgroung_heder">
                    <Header />
                </div>
                <div className="col-2 master_backgroung_side">
                    <EmpTeamSidebar />
                </div>
                <div className="col-10 scroll-bar">
                    <div className="row" style={{ marginBottom: '10px', marginTop: '10px' }}>

                        <div className="col-2" style={{ marginRight: '0px' }}>

                            <select name="category1" onChange={(evt) => handleCate({ newCate: evt.target.value })} className="btn btn-success btn-sm dropdown-toggle" style={{ width: '150px' }}>
                                {
                                    <>
                                        <option hidden value="">Select Category</option>
                                        <option value="allcat">All Category</option>
                                        <option value="Last_Month">Last-month</option>
                                        <option value="Quarterly">Quarterly</option>
                                        <option value="Half-yearly">Half-yearly</option>
                                        <option value="Yearly">Yearly</option>
                                        <option value="Customize">Customize</option>

                                    </>
                                }
                            </select>

                        </div>
                        <div className="col-2">
                            <select name="category" onChange={(evt) => handleChange({ newEmpID: evt.target.value, newCate: category, newdt1: startDate, newdt2: endDate })} className="btn btn-success btn-sm dropdown-toggle" style={{ width: '150px' }}>
                                <option hidden value="">Select Employee</option>
                                <option value="all">All Employee</option>
                                {
                                    employee.map((emp) => (
                                        // console.log("issue list : " + JSON.stringify(emp));
                                        <option value={emp.empid}>{emp.emp_name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="col-2"></div>
                        {isShown && <Box />}
                        <div className="col-4"></div>
                     
                        {/* <div className="col-2">
                            <select name="category" onChange={(evt) => handleDownload({ DownloadOpt: evt.target.value })} className="btn btn-secondary btn-sm dropdown-toggle" style={{ width: '123px' }}>
                                <option hidden value=""><button>Download <i className="fa fa-download"></i></button></option>
                                <option value="ExportToPDF">Export to pdf</option>
                                <option value="ExportToCSV">Export to csv</option>
                            </select>
                        </div> */}


                    </div>

                    <Table bordered className="css-serial">
                        {/* //Your Table in post changed to table to make it work */}
                        <thead>
                            <tr>
                                <th>Sr No.</th>
                                <th>Requirement</th>
                                <th>Submission</th>
                                <th>1st interview</th>
                                <th>2nd interview</th>
                                <th>Closure</th>
                                <th>Date</th>
                                <th>Employee Name</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {renderTable()}

                        </tbody>
                        {/* <button
              className="btn btn-primary"
              onClick={() => GeneratePDF(closureList)}
            >
              Generate report
            </button> */}
                    </Table>

                    <div className="row">
                        <div className="col-10">
                            {isShownError && <EmptyDataErrorMsg />}
                        </div>
                        <div className="col-2">

                              {/* <button onClick={handleDownloadExcel}>download excel</button> */}

                            <select name="category" onChange={(evt) => handleDownload({ DownloadOpt: evt.target.value })} className="btn btn-warning btn-sm dropdown-toggle" style={{ width: '135px' }}>
                                <option hidden value=""><button>Download <i className="fa fa-download"></i></button></option>
                                <option value="ExportToPDF">Export to pdf</option>
                                <option value="ExportToCSV">Export to csv</option>
                            </select>
                        </div>
                    </div>

                </div>
            </div>
            {/* <NotificationContainer /> */}
        </div>
    ) : (
        history.push("/"),
        window.location.reload()
    );
}

export default AdminDash1;

