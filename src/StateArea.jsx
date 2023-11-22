import React from "react";
import paused from "./images/state-paused.png";
import ended from "./images/state-endgame.png";

import * as constants from "./Constants.jsx";


export default function StateArea(props) {

  const {runningState} = props;

  if (runningState === constants.PAUSED) {  
    return <div className="StateArea" ><img src={paused} width="576px" height="570px" alt=""/></div>
  } else {
    return <div className="StateArea" ><img src={ended} width="576px" height="570px" alt=""/></div>
  }
}
