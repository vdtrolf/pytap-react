import React from "react";
import clsx from "clsx";
import sun from "./images/foreground-sun.png";
import rain from "./images/foreground-rain.png";
import cold from "./images/foreground-cold.png";
import snow from "./images/foreground-snow.png";
import ended from "./images/endgame.png"

import * as constants from "./Constants.jsx";

export default function WeatherArea(props) {

  const {weather, runningState} = props;
  const classes = clsx("WeatherArea", weather);

  const weathers = [{num: 0, img: rain},{num: 1, img: sun},{num: 2, img: cold} ,{num: 3, img: snow}];
  const found = runningState === constants.ENDED?ended:weathers.find(wea => wea.num === weather)

  if (found) {  
    return <div className={classes} style={{opacity:runningState===constants.NOT_STARTED?'0':'100'}} ><img src={found.img} width="576px" height="570px" alt=""/></div>
  }
}
