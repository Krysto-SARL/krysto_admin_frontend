import { useState } from "react";
import "./Modal.css";

function Modal({ titleModal, btnTxt , children}) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <button onClick={toggleModal} className="btn btn-sm">
        {btnTxt}
      </button>

      {modal ? ( 
         <div  className="overlay">
         <div className="modal">
           <h2 className="modal-content">{titleModal}</h2>
               {children}
           <button onClick={toggleModal} className="btn btn-close">X</button>
         </div>
       </div>
      ) : (" ") }
     
    </>
  );
}

export default Modal;
