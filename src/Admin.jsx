import React, {useState} from "react";

export default function Admin(props) {

  const {baseURL, urls, onURLSelect, showBalloons, onSetBalloons, onLogoutButton, onCloseButton} = props;

  const [urlName,setUrlName] = useState((urls.find(anUrl => anUrl.url === baseURL.url)).name);
  const [checkBalloons, setCheckBalloons] = useState(showBalloons);

  const handleChange = (event) => {
    setUrlName(event.target.value);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
   
    const choosedUrl = urls.find(url => url.name ===urlName);
    // alert(`The name you submit is : ${choosedUrl.url} and balloons: ${checkBalloons}`)
    
    if (choosedUrl.url !== baseURL.url) {
      onURLSelect(choosedUrl);
    }
    onSetBalloons(checkBalloons);
    onCloseButton();

  }

  if (urls) {
    return (
    <>
      <form className="login" onSubmit={handleFormSubmit} >
        <label type="text">Back-end platform</label>
        <select value={urlName} onChange={handleChange}>
          {urls.map(url => <option key={url.name} value={url.name}>{url.name}</option>)}
        </select>
        <div>&nbsp;</div>
        <label type="text">Parameters</label>
        <div className="checkboxList">
          <div className="checkboxBar"><input type="checkbox" checked={checkBalloons} onChange={() => setCheckBalloons(!checkBalloons)} /><div className="checkBoxText">Show balloons</div></div>
          <div className="checkboxBar"><input type="checkbox" checked={false} /><div className="checkBoxText">Reuse Ice</div></div>
        </div>
        <div>&nbsp;</div>
        <div className="sidebarButtonsBar">
          <div />
          <button className="inputButton" type="button" onClick={() => onCloseButton()}>cancel</button>
          <button className="inputButton" type="submit" value="Submit">submit</button>
        </div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <label type="text">Session</label>
        <div className="sidebarButtonsBar">
          <div />
          <button className="inputButton" value="Logout" onClick={() => onLogoutButton()} >logout</button>
        </div>  
      </form>
       
    </>


    );
  }
}