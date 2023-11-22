import React, {useState} from "react";

export default function LoginForm(props) {

  const [userId, setUserId] = useState("");
  const [pwd, setPwd] = useState("");

  const {onUserInput} = props;

  const handleFormSubmit = (event) => {
    console.log(event.target.value);
    onUserInput(userId,pwd);
  }
  
  return (
    <>
      <form className="login" onSubmit={handleFormSubmit} >
       
          <label type="text">Id</label>
          <input className="loginInput" type="text" id="userId" value={userId} onChange={e => setUserId(e.target.value)} placeholder="User id" />
          <label type="text">Pwd</label>
          <input className="loginInput" type="password" id="pwd" value={pwd} onChange={e => setPwd(e.target.value)} placeholder="Password"  />
          <div>&nbsp;</div>
          <div className="sidebarButtonsBar">
            <div />
            <button className="inputButton" type="cancel" value="Cancelt">cancel</button>
            <button className="inputButton" type="submit" value="Submit">submit</button>
          </div>
        </form>
    </>
  );
}