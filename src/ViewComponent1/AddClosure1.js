import React from 'react';
import axios from 'axios';
import base_url from '../api/bootapi';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import history from './ResponseVal';
import Header from './Header';
import EmpSidebar from './EmpSidebar';
import { useRef } from 'react';


class AddClosure1 extends React.Component {

    componentDidMount() {
        this.refInput.focus();
    }

    constructor(props) {
        super(props);

        this.state = {
            input: {},
            errors: {},
            empID: '',
            // add1:true,
            // add2:true

         
        };
      //  console.log("Value of errors " + JSON.stringify(this.state.errors));
       // console.log("Value of input[req] " + this.state.input["req"]);
       // console.log("Value of Err length " + this.state.errors.length);

       console.log(this.state.add1);
       console.log(this.state.add2);
       
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        /*this.keyUpHandlerReq = this.keyUpHandlerReq.bind(this);
        this.keyUpHandlerSub = this.keyUpHandlerSub.bind(this);
        this.keyUpHandlerFirst = this.keyUpHandlerFirst.bind(this);
        this.keyUpHandlerSecond = this.keyUpHandlerSecond.bind(this);
        this.keyUpHandlerClosure = this.keyUpHandlerClosure.bind(this);*/

    }

   /* keyUpHandlerReq(e) {
        let req = e.target.value;
        let errors = {};
        let new_input = this.state.input

        if (req < 1) {
            errors["req"] = "Atleast 1 requirement is needed";
        } else {
            this.setState({
                input: new_input
            })
            console.log("After keyUp val are : " + JSON.stringify(this.state.input));
        }

        this.setState({
            errors: errors
        });

        console.log("error: " + JSON.stringify(this.state.errors));
        console.log("Value of Err length " + this.state.errors.length);
    }

    keyUpHandlerSub(e) {
        const objlen = this.state.errors
        let sub = e.target.value;
        console.log("sub : " + sub);
        let errors = {};
        console.log("error: " + JSON.stringify(this.state.errors));
        console.log("Value of Err length " + Object.keys(objlen).length);

        if ((Object.keys(objlen).length) == 0) {
            // alert(" null");


            let new_input = this.state.input
            console.log("After keyUp val are ##############################: " + JSON.stringify(this.state.input));

            console.log("Sub data : " + JSON.stringify(this.state.input));

            console.log("req : " + new_input["req"] + " sub: " + new_input["sub"]);

            if ((new_input["sub"]) > 999) {
                errors["sub"] = "Only 3 digit number is accepted!";
            } else {
                this.setState({
                    input: new_input
                })
                console.log("After keyUp val are : " + JSON.stringify(this.state.input));
            }

            this.setState({
                errors: errors
            });

        }
    }

    keyUpHandlerFirst(e) {

        let first = e.target.value;
        let errors = {};
        let new_input = this.state.input

        let sub = new_input["sub"];
        let first1 = new_input["first"];

        console.log("sub = "+sub+ " first1 = "+ first1);

        console.log("let error :"+ JSON.stringify(errors));

        const objlen = this.state.errors
       
        if ((new_input["first"]) < 0) {
            errors["first"] = "Negative number not allowed";
        }
        else if (sub < first1) {
            errors["first"] = "Please enter valid number for first interview-keup";
            console.log("let error in if statement :"+ JSON.stringify(errors));
        }
        else {
            this.setState({
                input: new_input
            })
            console.log("After keyUp val are : " + JSON.stringify(this.state.input));
            console.log("let error in Else :"+ JSON.stringify(errors));
        } 

        this.setState({
            errors: errors
        });
    }

    // keyUpHandlerFirst(e) {

    //     let first = e.target.value;
    //     let errors = {};
    //     let new_input = this.state.input

    //     console.log("let error :"+ JSON.stringify(errors));

    //     const objlen = this.state.errors
       
    //     if ((new_input["first"]) < 0) {
    //         errors["first"] = "Negative number not allowed";
    //     }


    //     else {

    //         console.log("first: " + (new_input["first"]) + " Sub : " + (new_input["sub"]));

    //         if ((new_input["first"]) > (new_input["sub"])) {
    //             errors["first"] = "Please enter valid number for first interview-keup";
    //             console.log("let error in if statement :"+ JSON.stringify(errors));
    //         }

    //         else {
    //             this.setState({
    //                 input: new_input
    //             })
    //             console.log("After keyUp val are : " + JSON.stringify(this.state.input));
    //             console.log("let error in Else :"+ JSON.stringify(errors));
    //         }           
    //         // }
    //     }

    //     this.setState({
    //         errors: errors
    //     });
    // }

    keyUpHandlerSecond(e) {
        console.log()
        let second = e.target.value;
        let errors = {};
        let new_input = this.state.input
        const objlen = this.state.errors
        // if ((Object.keys(objlen).length) == 0) {
        // if ((new_input["second"]) > (new_input["first"]) || (new_input["closure"]) > (new_input["second"])) {

        console.log("Second: " + (new_input["second"]) + " First : " + (new_input["first"]));

        if ((new_input["second"]) > (new_input["first"])) {
            errors["second"] = "Please enter valid number for second interview";
        }
        else if ((new_input["second"]) < 0) {
            errors["second"] = "Negative number not allowed";
        }
        else {
            this.setState({
                input: new_input
            })
            console.log("After keyUp val are : " + JSON.stringify(this.state.input));
        }
        this.setState({
            errors: errors
        });
        // }
    }

    keyUpHandlerClosure(e) {
        let closure = e.target.value;
        let errors = {};
        let new_input = this.state.input


        const objlen = this.state.errors
        // if ((Object.keys(objlen).length) == 0) {

        console.log("Closure: " + (new_input["closure"]) + " Second : " + (new_input["second"]));

        if ((new_input["closure"]) > (new_input["second"])) {
            errors["closure"] = "Please enter valid number for ";
        }
        else if ((new_input["closure"]) < 0) {
            errors["closure"] = "Negative number not allowed";
        }
        else {
            this.setState({
                input: new_input
            })
            console.log("After keyUp val are : " + JSON.stringify(this.state.input));
        }
        this.setState({
            errors: errors
        });
        // }
    }*/

    resetForm = () => {
        // alert("Clear");
        // this.setState(this.baseState)
        let inputs = {};
        inputs["req"] = undefined;
        inputs["sub"] = undefined;
        inputs["first"] = undefined;
        inputs["second"] = undefined;
        inputs["closure"] = undefined;

        this.setState({ input: inputs });

        let errors1 = {};
        errors1["req"] = "";
        errors1["sub"] = "";
        errors1["first"] = "";
        errors1["second"] = "";
        errors1["closure"] = "";
        this.setState({ errors: errors1 });
        // ref={(input) => { this.refInput = input; }}
        // this.refInput.focus();
    }

    handleChange(e) {
        let add_cls = this.state.input;
        add_cls[e.target.name] = e.target.value;

        this.setState({
            add_cls
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.validate()) {

            let add_cls = this.state.input;
            add_cls[e.target.name] = e.target.value;

            this.postdata(add_cls);
        }
        // 👇️ clear all input values in the form
        e.target.reset();
    }

    postdata = (data) => {
        let z = this.state.empID = localStorage.getItem("empID")
        let d1 = data["req"];
        let d2 = data["sub"];
        let d3 = data["first"];
        let d4 = data["second"];
        let d5 = data["closure"];

        /*   if (d2 < d3) {
               alert("Please Enter valid number for first interview")
               alert(d2)
               alert(d3)
           }
               */
        axios.post(`${base_url}/add_cls?req=${d1}&sub=${d2}&first=${d3}&second=${d4}&closure=${d5}&empid=${z}`).then(
            // addEmp?empName=Admin&Username=admin@gmail.com&Password=Admin@1234
            (response) => {
                toast.success("Requirement added successfully!",
                    { position: "top-right" }
                );
            },
            (error) => {
                console.log(error);
                console.log("Error");
                alert("Please enter valid details.")
            }
        );

        let inputs = {};
        inputs["req"] = undefined;
        inputs["sub"] = undefined;
        inputs["first"] = undefined;
        inputs["second"] = undefined;
        inputs["closure"] = undefined;

        this.setState({ input: inputs });
    }
    // }
    // --------------------------------------------Validation Code ----------------------------------------------------------

    validate() {

        let input = this.state.input;
        let errors = {};
        let isValid = true;
        let addNew1=true;
        let addNew2=true;
       // console.log(addNew1);
       // console.log(addNew2);

        console.log("Req " + input["req"]);
        console.log("Sub " + input["sub"]);
        console.log("First " + input["first"]);
        console.log("Second " + input["second"]);
        console.log("Closure " + input["closure"]);

      
        if ((!input["req"])) {
            isValid = false;
            errors["req"] = "This field is required";
        }
       
       else if (input["req"] < 1) {
            isValid = false;
            errors["req"] = "Atleast 1 requirement is needed";
        }
        else if ((typeof input["req"] !== undefined)) {
            // alert("regex valid cheked & req= "+input["req"]);

            var pattern = new RegExp(/^(?=.*[0-9]).{1,3}$/); //new RegExp(/^[A-Za-z#+.\b]+$/);
            if (!pattern.test(input["req"])) {
                isValid = false;
                errors["req"] = "Only 3 digit number is accepted!";
            }
        }
        // -----------------------------------------------------------------------------------------------------------------------
        if (!input["sub"]) {
            isValid = false;
            errors["sub"] = "This field is required";
        }
       else if (input["sub"] < 0) {
            isValid = false;
            errors["sub"] = "Enter positive number";
        }
       else if ((typeof input["sub"] !== undefined)) {
            // alert("regex valid cheked for sub"+input["sub"]);

            var pattern = new RegExp(/^(?=.*[0-9]).{1,3}$/); //new RegExp(/^[A-Za-z#+.\b]+$/);
             if (!pattern.test(input["sub"])) {
                isValid = false;
                errors["sub"] = "Only 3 digit number is accepted!";
            }
        }
        // ----------------------------------------------------------------------------------------------------------------------
        if (!input["first"]) {
            isValid = false;
            errors["first"] = "This field is required";
        }
       else if (input["first"] < 0 ) {
   
            isValid = false;
            errors["first"] = "Enter positive number";
        }
      else  if ((typeof input["first"] !== undefined)) {
            // alert("regex valid cheked for first, first= "+input["first"]);

            var pattern = new RegExp(/^(?=.*[0-9]).{1,3}$/); //new RegExp(/^[A-Za-z#+.\b]+$/);
            if (!pattern.test(input["first"])) {
                isValid = false;
                errors["first"] = "Only 3 digit number is accepted!";
            }
        }

         if ((input["first"]) > (input["sub"]))
        {
            
            isValid = false;
            errors["first"] = "Enter valid number for first interview";
        }

        // if (((input["first"]) <=9) && this.state.add1) {
        //     this.setState({add1:false})
        //  //   console.log(addNew1)
        //     input["first"]=0+ input["first"]
            
        // }

       

        // ----------------------------------------------------------------------------------------------------------------------
        if (!input["second"]) {
            isValid = false;
            errors["second"] = "This field is required";
        }
        else if (input["second"] < 0) {
            isValid = false;
            errors["second"] = "Enter positive number";
        }
        else if ((typeof input["second"] !== undefined)) {
            // alert("regex valid cheked for second "+input["second"]);

            var pattern = new RegExp(/^(?=.*[0-9]).{1,3}$/); //new RegExp(/^[A-Za-z#+.\b]+$/);
            if (!pattern.test(input["second"])) {
                isValid = false;
                errors["second"] = "Only 3 digit number is accepted!";
            }
        }

         if (input["second"] > input["first"]) {
            // alert("compare 2nd > 1st");
            isValid = false;
            errors["second"] = "Enter valid number for second interview";
        }

        
        // if (((input["second"]) <=9 )&& this.state.add2) {
        //   //  addNew2 = false;
        //   this.setState({add2:false})
        //     input["second"]= 0+ input["second"]
           
        // }

        

        // ----------------------------------------------------------------------------------------------------------------------
        if (!input["closure"]) {
            isValid = false;
            errors["closure"] = "This field is required";
        }

        else if (input["closure"] < 0) {
            isValid = false;
            errors["closure"] = "Enter positive number";
        }
        else if ((typeof input["closure"] !== "undefined")) {
            // alert("regex valid cheked for cls "+input["closure"]);

            var pattern = new RegExp(/^(?=.*[0-9]).{1,3}$/); //new RegExp(/^[A-Za-z#+.\b]+$/);
            if (!pattern.test(input["closure"])) {
                isValid = false;
                errors["closure"] = "Only 3 digit number is accepted!";
            }
        }
         if ((input["closure"]) > (input["second"])) {
            // alert("compare cls >2nd");
            isValid = false;
            errors["closure"] = "Enter valid number for closure";
        }
        // ---------------------------------------------------------------------------------------------------------------------
      


                ////////////////////////////
    
      /*  if ((input["req"]) > new RegExp('\d') && (input["req"]) <=9 ) {
            input["req"]=0+ input["req"]
         
           
        }

        if ((input["sub"]) <=9) {
            input["sub"]=0+ input["sub"]
     
        }

        if ((input["first"]) <=9) {
            input["first"]=0+ input["first"]
          
        }

        if ((input["second"]) <=9) {
            input["second"]=0+ input["second"]
          
        }

        if ((input["closure"]) <=9) {
            input["closure"]=0+ input["closure"]
          
        }
*/


        this.setState({
            errors: errors
        });

        return isValid;
    }
    // -------------------------------------------- End Validation Code ----------------------------------------------------------

    render() {
        const isAuthenticated = localStorage.getItem('empID');
        let empID = localStorage.getItem('empID');

        return isAuthenticated ? (
            <div className="container-fluid">
                <div className="row">

                    <div className="col-12 h-100 master_backgroung_heder">
                        <Header />
                    </div>
                    <div className="col-2 master_backgroung_side">
                        <EmpSidebar />
                    </div>

                    <div className="col-10 master_backgroung_work scroll-bar">

                        <div className="row">
                            <div className="col-6" style={{ padding: '0px', marginLeft: '30px' }}>{/* width: '203px', */}

                                <br />
                                {/* <Form></Form> */}
                                <form onSubmit={this.handleSubmit}>{/* 
                                    <input
                                        ref={(input) => { input && input.focus() }}
                                        defaultValue="It will focus"
                                    /> */}


                                    <div class="form-group">
                                        <label for="req"><b>Requirements worked on:</b></label>
                                        <input

                                            ref={(input) => { this.refInput = input; }}
                                            type="number"
                                            name="req"
                                            value={this.state.input.req}
                                            onChange={this.handleChange}
                                            onKeyUp={this.keyUpHandlerReq}

                                            class="form-control"
                                            placeholder="Requirements"
                                            id="req" />

                                        <div className="text-danger">{this.state.errors.req}</div>
                                    </div>

                                    <div class="form-group">
                                        <label for="sub"><b>Submissions:</b></label>
                                        <input
                                            minLength={1}
                                            maxLength={3}
                                            type="number"
                                            name="sub"
                                            value={this.state.input.sub}

                                            onChange={this.handleChange}
                                            onKeyUp={this.keyUpHandlerSub}
                                            placeholder="Submissions"

                                            class="form-control" />

                                        <div className="text-danger">{this.state.errors.sub}</div>
                                    </div>

                                    <div class="form-group">
                                        <label for="first"><b>First Interview:</b></label>
                                        <input
                                            minLength={1}
                                            maxLength={3}
                                            type="number"
                                            name="first"
                                            value={this.state.input.first}
                                            onChange={this.handleChange}
                                            onKeyUp={this.keyUpHandlerFirst}
                                            placeholder="First Interview"

                                            class="form-control" />

                                        <div className="text-danger">{this.state.errors.first}</div>
                                    </div>
                                    <div class="form-group">
                                        <label for="second"><b>Second Interview:</b></label>
                                        <input
                                            minLength={1}
                                            maxLength={3}
                                            type="number"
                                            name="second"
                                            value={this.state.input.second}
                                            onChange={this.handleChange}
                                            onKeyUp={this.keyUpHandlerSecond}
                                            placeholder="Second Interview"

                                            class="form-control" />

                                        <div className="text-danger">{this.state.errors.second}</div>
                                    </div>
                                    <div class="form-group">
                                        <label for="closure"><b>Closure:</b></label>
                                        <input
                                            minLength={1}
                                            maxLength={3}
                                            type="number"
                                            name="closure"
                                            value={this.state.input.closure}
                                            onChange={this.handleChange}
                                            onKeyUp={this.keyUpHandlerClosure}
                                            placeholder="Closure"

                                            class="form-control" />

                                        <div className="text-danger">{this.state.errors.closure}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className='row'>
                                            <div className='col-2'></div>
                                            <div className='col-4'>
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary w-100 theme-btn mx-auto"
                                                >
                                                    Add
                                                </button>
                                            </div>
                                            <div className='col-4'>
                                                <button
                                                    type="reset"
                                                    className="btn btn-warning w-100 theme-btn mx-auto"
                                                    onClick={this.resetForm}
                                                >
                                                    Reset
                                                </button>

                                            </div>
                                            <div className='col-2'></div>
                                        </div>

                                    </div>
                                </form>

                            </div>
                            <div className="col-3"></div>
                        </div>
                    </div>
                </div >
            </div >
        ) : (
            history.push("/"),
            window.location.reload()
        );
    }
}

export default AddClosure1;