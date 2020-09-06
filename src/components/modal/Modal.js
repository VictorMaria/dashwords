import React from 'react';
import { MdClose } from 'react-icons/md';
import './modal.css';

export const Modal = ({ children, openModal, toggleModal }) => {
    const showHideClassName = openModal ? "modal display-block" : "modal display-none";
    return (
        <>
            { openModal ? <div className="backdrop" onClick={toggleModal}></div> : null  }
                <div className={showHideClassName}>
                <button className="close-button" onClick={toggleModal}>
                    <MdClose style={{ color: "#FAA", fontSize: 25 }} />
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </>
    );
};

// return (
//     <>
//     { openModal ? <div className="backdrop" onClick={toggleModal}></div> : null  }
//       <div className="modal-card"
//       style={{
//         transform: openModal ? 'translateY(0)' : 'translateY(-100vh)',
//         opacity : openModal ? 1 : 0
//     }}
//       >
//       <button className="close-button" onClick={toggleModal}>
//           <MdClose style={{ color: "#FAA", fontSize: 25 }} />
//       </button>
//       &nbsp;&nbsp;&nbsp;
//         <div className='modal-content'>
//           {children}
//         </div>
//       </div>
//       </>
//   );

// .modal-card {
//     position: fixed;
//     z-index: 500;
//     background-color: black;
//     color: peachpuff;
//     width: 50%;
//     border: 1px solid black;
//     padding: 16px;
//     left: 25%;
//     top: 10%;
//     box-sizing: border-box;
//     border-radius: 3%;
//     opacity: 0.80 !important;
//   }
  
//   .modal-content {
//     overflow-y: scroll;
//     height: 60%;
//   }
  
//   .close-button {
//     position: absolute;
//     top: 0;
//     right: 0;
//     border: none;
//     background: transparent;
//     padding: 1rem;
//     border-radius: 50%;
//   }
  
//   .close-button:hover {
//     cursor: pointer;
//     background-color: black;
//   }
  
//   .backdrop {
//     position: absolute;
//     width: 100%;
//     height: 100%;
//     top: 0;
//     left: 0;
//     background: black;
//     opacity: 0.5;
//   }
  
//   @media screen and (max-width: 700px) {
//     .modal-card {
//       width: 75%;
//       height: 75%;
//       left: calc(50% - 38%);
//   }
//   .modal-content {
//     overflow-y: scroll;
//     height: unset;
//   }
//     img {
//       width: 80%;
//     }
//   }