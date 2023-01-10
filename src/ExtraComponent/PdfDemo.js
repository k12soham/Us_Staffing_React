import {React, Component} from "react";
import { useState } from "react";
import exportFromJSON from "export-from-json";

// const data = [{ foo: 'foo' }, { bar: 'bar' }]  
// const data = [{closureid:'74'},{clo_date:'2023-01-03'},{requirement:'20'},{submission:'2'},{first:'2'},{second:'2'},{closure:'2'}]
       
// const data = [{"closureid":74,"clo_date":"2023-01-03","requirement":20,"submission":2,"first":2,"second":2,"closure":2}
// ,{"closureid":75,"clo_date":"2023-01-03","requirement":13,"submission":64,"first":22,"second":1,"closure":1}
// ,{"closureid":76,"clo_date":"2023-01-06","requirement":22,"submission":23,"first":23,"second":22,"closure":20}
// ,{"closureid":77,"clo_date":"2023-01-06","requirement":50,"submission":50,"first":25,"second":25,"closure":25}]

const data =  [{"closureid":74,"clo_date":"2023-01-03","requirement":20,"submission":2,"first":2,"second":2,"closure":2,"employee":{"empid":2,"emp_name":"Anjuli GK","username":"anjulikajawadekar@gmail.com","password":"Anjuli@12","role":"TM","resetPasswordToken":76466}},{"closureid":75,"clo_date":"2023-01-03","requirement":13,"submission":64,"first":22,"second":1,"closure":1,"employee":{"empid":2,"emp_name":"Anjuli GK","username":"anjulikajawadekar@gmail.com","password":"Anjuli@12","role":"TM","resetPasswordToken":76466}},{"closureid":76,"clo_date":"2023-01-06","requirement":22,"submission":23,"first":23,"second":22,"closure":20,"employee":{"empid":2,"emp_name":"Anjuli GK","username":"anjulikajawadekar@gmail.com","password":"Anjuli@12","role":"TM","resetPasswordToken":76466}},{"closureid":77,"clo_date":"2023-01-06","requirement":50,"submission":50,"first":25,"second":25,"closure":25,"employee":{"empid":2,"emp_name":"Anjuli GK","username":"anjulikajawadekar@gmail.com","password":"Anjuli@12","role":"TM","resetPasswordToken":76466}}]

const fileName = 'download1'  
const exportType = 'xls'  

console.log("data  : "+ data);
  
class PdfDemo extends Component {  
  
  ExportToExcel = () => {  
    exportFromJSON({ data, fileName, exportType })  
  }  
  
  render() {  
    return (  
      <div className="App">  
        <header className="App-header" style={{textAlign : 'center'}}>  
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" className="App-logo" alt="logo" width="200" /><br/>  
          <button type="button" onClick={this.ExportToExcel}>Export To Excel</button>  
        </header>  
      </div>  
    );  
  }  
}  
  
export default PdfDemo; 




// const PdfDemo = () => {
//   const [data, setData] = useState(_data);
//   const [user,setUser] = useState(null);
//   const clickHandler = (key) => {
//     setUser(data[key]);
//   }

//   return (
//     <div>
//       <table>
//         <thead>
//           <tr>
//             <th>Sr</th>
//             <th>Name</th>
//           </tr>
//         </thead>
//         <tbody>
//         {data.map((item, i) => {
//           return (
//               <tr key={i} onClick={() => clickHandler(i)}>
//                 <td>{i}</td>
//                 <td>{item.name}</td>
//               </tr>   
//           );
//         })}
//         </tbody>
//       </table>
//       {data.map(value => console.log(value))}
//           {user ? (<PDFDownloadLink document={<MyDoc  data={user} />} fileName="somename.pdf">
//         {({ blob, url, loading, error }) => (loading ? 'Loading document...' :<a href={url}>Url Link here</a>)}
//           </PDFDownloadLink>) : null}
//     </div>
// )
//   }

//   export default PdfDemo;