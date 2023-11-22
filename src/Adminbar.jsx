import React from "react";
import Button from "./Button.jsx";
import Admin from "./Admin.jsx";
import LoginForm from "./LoginForm.jsx";

export default function Adminbar(props) {
  const {className, admin, adminbar, onCloseButton, ...attribs } = props;

   return (
    <div id="mySidebar" className="adminbar" style={{width:adminbar?'200px':'0px',height:admin?'400px':'220px',marginRight:adminbar?'200px':'0px',border:adminbar?'4px solid rgb(103, 133, 168)':'0px solid rgb(103, 133, 168)'}}>
      <div className="adminNavbar">
        <div>&nbsp;</div>
        <div>{admin?"Admin":"Login"}</div>
        <div><Button className="ButtonClose" onClickHandler={onCloseButton} >&nbsp;</Button></div>
      </div>
      <div id="adminform">
        {admin?<Admin {...attribs} onCloseButton={onCloseButton} />:<LoginForm {...attribs} onCloseButton={onCloseButton}/>}
      </div>
    </div>
  );
}