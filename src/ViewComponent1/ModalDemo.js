// ReactModal.setAppElement('#main');
import React, { useState } from 'react';
import ReactModal from 'react-modal';
// import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// const navigate = useNavigate();

const ModalDemo= ()=>{
  let empName = localStorage.getItem('empName');
  let empID = localStorage.getItem('empID');

  let navigate = useNavigate(); 

  const[showModal, setShowModal]= useState(false);

  function logout() {
      localStorage.clear();
      navigate('/');
      toast.success("Logout successfully!",
                    { position: "top-right" })
  }

 function handleOpenModal() {
 // alert("eeeeeee")
    // setState({ showModal: true });
    setShowModal(true);
  }

  function handleCloseModal() {
    // setState({ showModal: false });
    setShowModal(false);
  }

  function handleUpdateProfile(){
    // setState({ showModal: false });
    setShowModal(false);
  }

  function logout() {
    localStorage.clear();
    this.navigate('/');
    alert('logout successfully!');
    // toast.success("Logout successfully!",
    //                 { position: "top-right" })
}

// render() {
  return (

    <div>
      <button className="btn btn-primary w-20 theme-btn mx-auto" onClick={handleUpdateProfile}>Trigger Modal</button>
      <div className='row' style={{ margin: '0px' , padding: '0px', textAlign: 'center'}}>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={handleCloseModal}
          className="Modal"
          // overlayClassName="Overlay"
        >

          <p style={{ margin: '0px' , padding: '0px'}}>Modal text!</p>
          <button className="btn btn-primary w-20 theme-btn mx-auto" to="/login" onClick={handleCloseModal}>Update Profile</button>
          <button className="btn btn-primary w-20 theme-btn mx-auto" onClick={handleCloseModal}>Close</button>
       
        </ReactModal>

        {/* ---------------------------------------------------------------------------------- */}
      </div>

    </div >
  );
}
// }
export default ModalDemo;




// class ModalDemo extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       showModal: false,
//       navigate: useNavigate()
//     };

//     this.handleOpenModal = this.handleOpenModal.bind(this);
//     this.handleCloseModal = this.handleCloseModal.bind(this);
//   }

//   // routeChange=()=> {
//   //   let path = `newPath`;
//   //   let history = useHistory();
//   //   history.push(path);
//   // }

//   handleOpenModal() {
//     this.setState({ showModal: true });
//   }

//   handleCloseModal() {
//     this.setState({ showModal: false });
//   }

//   handleUpdateProfile(){
//     this.setState({ showModal: false });
//   }

//   logout() {
//     localStorage.clear();
//     this.navigate('/');
//     alert('logout successfully!');
//     // toast.success("Logout successfully!",
//     //                 { position: "top-right" })
// }

//   render() {
//     return (

//       <div>
//         <button className="btn btn-primary w-20 theme-btn mx-auto" onClick={this.handleUpdateProfile}>Trigger Modal</button>
//         <div className='row' style={{ margin: '0px' , padding: '0px', textAlign: 'center'}}>
//           <ReactModal
//             isOpen={this.state.showModal}
//             contentLabel="onRequestClose Example"
//             onRequestClose={this.handleCloseModal}
//             className="Modal"
//             // overlayClassName="Overlay"
//           >

//             <p style={{ margin: '0px' , padding: '0px'}}>Modal text!</p>
//             <button className="btn btn-primary w-20 theme-btn mx-auto" to="/login" onClick={this.handleCloseModal}>Update Profile</button>
//             <button className="btn btn-primary w-20 theme-btn mx-auto" onClick={this.handleCloseModal}>Close</button>
         
//           </ReactModal>

//           {/* ---------------------------------------------------------------------------------- */}
//         </div>

//       </div >
//     );
//   }
//}

























// import React, { useState } from 'react';
// import {
//   MDBBtn,
//   MDBModal,
//   MDBModalDialog,
//   MDBModalContent,
//   MDBModalHeader,
//   MDBModalTitle,
//   MDBModalBody,
//   MDBModalFooter,
// } from 'mdb-react-ui-kit';

// export default function ModalDemo() {
//   const [topRightModal, setTopRightModal] = useState(false);

//   const toggleShow = () => setTopRightModal(!topRightModal);

//   return (
//     // <>

//     <div className='row'>
//       <div className='col-8'></div>
//       <div className='col-4'>
//       <MDBBtn onClick={toggleShow}>Top right</MDBBtn>

// <MDBModal
//   animationDirection='right'
//   show={topRightModal}
//   tabIndex='-1'
//   setShow={setTopRightModal}
// >
//   <MDBModalDialog position='top-right' side>
//     <MDBModalContent>
//       <MDBModalHeader className='bg-info text-white'>
//         <MDBModalTitle>Product in the cart</MDBModalTitle>
//         <MDBBtn
//           color='none'
//           className='btn-close btn-close-white'
//           onClick={toggleShow}
//         ></MDBBtn>
//       </MDBModalHeader>
//       <MDBModalBody>
//         <div className='row'>
//           <div className='col-3 text-center'>
//             <i className='fas fa-shopping-cart fa-4x text-info'></i>
//           </div>

//           <div className='col-9'>
//             <p>Do you need more time to make a purchase decision?</p>
//             <p>No pressure, your product will be waiting for you in the cart.</p>
//           </div>
//         </div>
//       </MDBModalBody>
//       <MDBModalFooter>
//         <MDBBtn color='info'>Update Profile</MDBBtn>
//         <MDBBtn outline color='info' onClick={toggleShow}>
//           Close
//         </MDBBtn>
//       </MDBModalFooter>
//     </MDBModalContent>
//   </MDBModalDialog>
// </MDBModal>
//       </div>
//     </div>      
//     // </>
//   );
// }



// import React, { useState } from 'react';
// import {
//   MDBBtn,
//   MDBModal,
//   MDBModalDialog,
//   MDBModalContent,
//   MDBModalHeader,
//   MDBModalTitle,
//   MDBModalBody,
//   MDBModalFooter,
//   MDBIcon,
// } from 'mdb-react-ui-kit';

// export default function ModalDemo() {

//   let empName = localStorage.getItem('empName');
//   let empID = localStorage.getItem('empID');
//   let empMail = localStorage.getItem('empMail');
//   console.log("empMail: "+ empMail);

//   const [topRightModal, setTopRightModal] = useState(false);
//   const toggleShow = () => setTopRightModal(!topRightModal);

//   return (
//     <>
//       <MDBBtn rounded color='primary' onClick={toggleShow}>My Profile</MDBBtn>

//       <MDBModal tabIndex='-1' show={topRightModal} setShow={setTopRightModal}>
//         <MDBModalDialog size='100px' >
//         {/* <MDBModalDialog position='bottom-left' side> */}
//           <MDBModalContent>
//             <MDBModalHeader>
//               <MDBModalTitle>Modal title</MDBModalTitle>
//               <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
//             </MDBModalHeader>
//             <MDBModalBody>
//             <p style={{margin: '15px', textAlign:'center'}}><b>{empName}</b></p>
//             <p style={{margin: '15px', textAlign:'center'}}>{empMail}</p>
              
//               <p>
//                 Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
//                 egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
//               </p>
//             </MDBModalBody>
//             <MDBModalFooter>
//               <MDBBtn color='secondary' onClick={toggleShow}>
//                 Close
//               </MDBBtn>
//               <MDBBtn>Save changes</MDBBtn>
//             </MDBModalFooter>
//           </MDBModalContent>
//         </MDBModalDialog>
//       </MDBModal>
//     </>
//   );
// }
