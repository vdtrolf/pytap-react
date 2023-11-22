import React, {useState,useEffect} from "react";

import peng_m from "./images/peng-m.png";
import peng_f from "./images/peng-f.png";
import peng_y from "./images/peng-y.png";
import peng_m_old from "./images/peng-m-old.png";
import peng_f_old from "./images/peng-f-old.png";

import peng_m_ice from "./images/peng-m-ice.png";
import peng_f_ice from "./images/peng-f-ice.png";
import peng_y_ice from "./images/peng-y-ice.png";
import peng_m_old_ice from "./images/peng-m-old-ice.png";
import peng_f_old_ice from "./images/peng-f-old-ice.png";

import peng_m_fish from "./images/peng-m-fish.png";
import peng_f_fish from "./images/peng-f-fish.png";
import peng_y_fish from "./images/peng-y-fish.png";
import peng_m_old_fish from "./images/peng-m-old-fish.png";
import peng_f_old_fish from "./images/peng-f-old-fish.png";

import peng_m_ice_fish from "./images/peng-m-ice-fish.png";
import peng_f_ice_fish from "./images/peng-f-ice-fish.png";
import peng_y_ice_fish from "./images/peng-y-ice-fish.png";
import peng_m_old_ice_fish from "./images/peng-m-old-ice-fish.png";
import peng_f_old_ice_fish from "./images/peng-f-old-ice-fish.png";

import peng_m_demp from "./images/peng-m-demp.png";
import peng_f_demp from "./images/peng-f-demp.png";
import peng_y_demp from "./images/peng-y-demp.png";

import peng_m_demp_ice from "./images/peng-m-demp-ice.png";
import peng_f_demp_ice from "./images/peng-f-demp-ice.png";
import peng_y_demp_ice from "./images/peng-y-demp-ice.png";

import peng_m_demp_fish from "./images/peng-m-demp-fish.png";
import peng_f_demp_fish from "./images/peng-f-demp-fish.png";
import peng_y_demp_fish from "./images/peng-y-demp-fish.png";

import peng_m_demp_ice_fish from "./images/peng-m-demp-ice-fish.png";
import peng_f_demp_ice_fish from "./images/peng-f-demp-ice-fish.png";
import peng_y_demp_ice_fish from "./images/peng-y-demp-ice-fish.png";

import peng_f_eating from "./images/peng-f-eating.gif";
import peng_m_eating from "./images/peng-m-eating.gif";
import peng_y_eating from "./images/peng-y-eating.gif";
import peng_loving from "./images/peng-loving.gif";

import balloon_ice from "./images/balloon-ice.png";
import balloon_food from "./images/balloon-food.png";

import peng_f_1_fishing from "./images/peng-f-1-fishing.png";
import peng_f_2_fishing from "./images/peng-f-2-fishing.png";
import peng_f_3_fishing from "./images/peng-f-3-fishing.png";
import peng_f_4_fishing from "./images/peng-f-4-fishing.png";

import peng_m_1_fishing from "./images/peng-m-1-fishing.png";
import peng_m_2_fishing from "./images/peng-m-2-fishing.png";
import peng_m_3_fishing from "./images/peng-m-3-fishing.png";
import peng_m_4_fishing from "./images/peng-m-4-fishing.png";

import peng_y_1_fishing from "./images/peng-y-1-fishing.png";
import peng_y_2_fishing from "./images/peng-y-2-fishing.png";
import peng_y_3_fishing from "./images/peng-y-3-fishing.png";
import peng_y_4_fishing from "./images/peng-y-4-fishing.png";

import peng_m_1_filling from "./images/peng-m-1-filling.gif";
import peng_m_2_filling from "./images/peng-m-2-filling.gif";
import peng_m_3_filling from "./images/peng-m-3-filling.gif";
import peng_m_4_filling from "./images/peng-m-4-filling.gif";

import peng_f_1_filling from "./images/peng-m-1-filling.gif";
import peng_f_2_filling from "./images/peng-m-2-filling.gif";
import peng_f_3_filling from "./images/peng-m-3-filling.gif";
import peng_f_4_filling from "./images/peng-m-4-filling.gif";

import peng_f_1_diging from "./images/peng-f-1-diging.gif";
import peng_f_2_diging from "./images/peng-f-2-diging.gif";
import peng_f_3_diging from "./images/peng-f-3-diging.gif";
import peng_f_4_diging from "./images/peng-f-4-diging.gif";

import peng_m_1_diging from "./images/peng-m-1-diging.gif";
import peng_m_2_diging from "./images/peng-m-2-diging.gif";
import peng_m_3_diging from "./images/peng-m-3-diging.gif";
import peng_m_4_diging from "./images/peng-m-4-diging.gif";

import peng_f_1_moving from "./images/peng-f-move-1.gif";
import peng_f_2_moving from "./images/peng-f-move-2.gif";
import peng_f_3_moving from "./images/peng-f-move-3.gif";
import peng_f_4_moving from "./images/peng-f-move-4.gif";

import peng_m_1_moving from "./images/peng-m-move-1.gif";
import peng_m_2_moving from "./images/peng-m-move-2.gif";
import peng_m_3_moving from "./images/peng-m-move-3.gif";
import peng_m_4_moving from "./images/peng-m-move-4.gif";

import peng_y_1_moving from "./images/peng-y-move-1.gif";
import peng_y_2_moving from "./images/peng-y-move-2.gif";
import peng_y_3_moving from "./images/peng-y-move-3.gif";
import peng_y_4_moving from "./images/peng-y-move-4.gif";

import * as constants from "./Constants.jsx";


import cross from "./images/cross.png";
// import wreath from "./images/wreath.png";


export default function Penguin(props) {

  const [penguin,setPenguin] = useState({});  
  const {penguinObj, illuminatedKey, movedPenguins, tileSize, moveSpeed} = props;

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }  

  useEffect(() => {

    const calculateImg = (penguinObj) => {
      let image = peng_m
      if (movedPenguins.includes(penguinObj.key)) {
        if (penguinObj.hasGem && penguinObj.hasFish) {
          image = penguinObj.gender ==="m"? peng_m_demp_ice_fish : peng_f_demp_ice_fish;    
          if (penguinObj.gender ==="y") image =  peng_y_demp_ice_fish;
        } else if (penguinObj.hasGem) {
          image = penguinObj.gender ==="m"? peng_m_demp_ice : peng_f_demp_ice;    
          if (penguinObj.gender ==="y") image =  peng_y_demp_ice;
        } else if (penguinObj.hasFish) {
          image = penguinObj.gender ==="m"? peng_m_demp_fish : peng_f_demp_fish;    
          if (penguinObj.gender ==="y") image =  peng_y_demp_fish;
        } else {
          image = penguinObj.gender ==="m"? peng_m_demp : peng_f_demp;    
          if (penguinObj.gender ==="y") image =  peng_y_demp;
        }
      } else {
        if (penguinObj.hasGem && penguinObj.hasFish) {
          if (penguinObj.age < 10) {
            image = penguinObj.gender ==="m"? peng_m_ice_fish : peng_f_ice_fish;    
          } else {
            image = penguinObj.gender ==="m"? peng_m_old_ice_fish : peng_f_old_ice_fish;    
          }
          if (penguinObj.gender ==="y") image =  peng_y_ice_fish;
        } else if (penguinObj.hasGem) {
          if (penguinObj.age < 10) {
            image = penguinObj.gender ==="m"? peng_m_ice : peng_f_ice;    
          } else {
            image = penguinObj.gender ==="m"? peng_m_old_ice : peng_f_old_ice;    
          }
          if (penguinObj.gender ==="y") image =  peng_y_ice;
        } else if (penguinObj.hasFish) {
          if (penguinObj.age < 10) {
            image = penguinObj.gender ==="m"? peng_m_fish : peng_f_fish;   
          } else { 
            image = penguinObj.gender ==="m"? peng_m_old_fish : peng_f_old_fish;    
          }
          if (penguinObj.gender ==="y") image =  peng_y_fish;
        } else {
          if (penguinObj.age < 10) {
            image = penguinObj.gender ==="m"? peng_m : peng_f;    
          } else {
            image = penguinObj.gender ==="m"? peng_m_old : peng_f_old;  
          }  
          if (penguinObj.gender ==="y") image =  peng_y;
        }
      }
      return image
    }

    let pixels = (tileSize / 16 * 12) + 'px'
    let shift = tileSize / 8
  
    const fishing_f = [peng_f_4_fishing,peng_f_1_fishing,peng_f_2_fishing,peng_f_3_fishing,peng_f_4_fishing]
    const fishing_m = [peng_m_4_fishing,peng_m_1_fishing,peng_m_2_fishing,peng_m_3_fishing,peng_m_4_fishing]
    const fishing_y = [peng_y_4_fishing,peng_y_1_fishing,peng_y_2_fishing,peng_y_3_fishing,peng_y_4_fishing]

    const diging_f = [peng_f_4_diging,peng_f_1_diging,peng_f_2_diging,peng_f_3_diging,peng_f_4_diging]
    const diging_m = [peng_m_4_diging,peng_m_1_diging,peng_m_2_diging,peng_m_3_diging,peng_m_4_diging]

    const filling_f = [peng_f_4_filling,peng_f_1_filling,peng_f_2_filling,peng_f_3_filling,peng_f_4_filling]
    const filling_m = [peng_m_4_filling,peng_m_1_filling,peng_m_2_filling,peng_m_3_filling,peng_m_4_filling]

    const moving_f = [peng_f,peng_f_1_moving,peng_f_2_moving,peng_f_3_moving,peng_f_4_moving]
    const moving_m = [peng_m,peng_m_1_moving,peng_m_2_moving,peng_m_3_moving,peng_m_4_moving]
    const moving_y = [peng_y,peng_y_1_moving,peng_y_2_moving,peng_y_3_moving,peng_y_4_moving]

    // console.log(penguinObj.key + " " + penguinObj.goal + " " + penguinObj.activityDirection + " Done: " + movedPenguins.includes(penguinObj.key))
    
    var hasballoon = false;
    
    let balloon = null;
    if (penguinObj.hunger > 60) {
      balloon = balloon_food;
      hasballoon = true;
    } else if (penguinObj.temp > 60) {
      balloon = balloon_ice;
      hasballoon = true;
    }
     
    let image = calculateImg(penguinObj)
    
    if (penguinObj.activity === constants.ACTIVITY_MOVING || penguinObj.activity === constants.ACTIVITY_FLEE) {
      if (penguinObj.activityDirection && ! movedPenguins.includes(penguinObj.key)) {
        image = penguinObj.gender ==="m"? moving_m[penguinObj.activityDirection]: moving_f[penguinObj.activityDirection];
        if (penguinObj.gender ==="y") image = moving_y[penguinObj.activityDirection];
      }
    } else if (penguinObj.activity === constants.ACTIVITY_EATING) {
      image = penguinObj.gender ==="m"? peng_m_eating: peng_f_eating;
      if (penguinObj.gender ==="y") image = peng_y_eating;
    } else if (penguinObj.activity === constants.ACTIVITY_FISHING) {
      image = penguinObj.gender ==="m"? fishing_m[penguinObj.activityDirection]: fishing_f[penguinObj.activityDirection];
      if (penguinObj.gender ==="y") image = fishing_y[penguinObj.activityDirection];
    } else if (penguinObj.activity === constants.ACTIVITY_LOVING) {
      image = peng_loving;;
    } else if (penguinObj.activity === constants.ACTIVITY_GETING || penguinObj.activity === constants.ACTIVITY_CLEANING) {
      image = penguinObj.gender ==="f"? diging_f[penguinObj.activityDirection]: diging_m[penguinObj.activityDirection];
    } else if (penguinObj.activity === constants.ACTIVITY_BUILDING) {
      image = penguinObj.gender ==="f"? filling_f[penguinObj.activityDirection]: filling_m[penguinObj.activityDirection];
    } else if (penguinObj.activity === constants.ACTIVITY_DEAD) {
      image = cross;
    }
    // var style = {width: '56px', height:'56px', backgroundColor:'', borderRadius: '0px', boxShadow: '', opacity: penguinObj.activityDone?'0.7':'1'}
    var style = {width: pixels, height:pixels, backgroundColor:'', borderRadius: '0px', boxShadow: ''}
    if (penguinObj.key === illuminatedKey) {
      if (movedPenguins.includes(penguinObj.key)) {
        style = {width: pixels, height: pixels, backgroundColor:'rgba(41,134,204, 0.5)', borderRadius:'25px', boxShadow: '10px 10px 20px #2986CC'}      
      } else {
        style = {width: pixels, height: pixels, backgroundColor:'rgba(255, 195, 0, 0.5)', borderRadius:'25px', boxShadow: '0 0 20px #FFC300'}
      }
    }

    

    setPenguin({img:image,left:penguinObj.hpos * tileSize + shift,top:penguinObj.vpos * tileSize + shift,alive:penguinObj.alive, style:style, balloon:balloon, hasballoon:hasballoon, transition:(moveSpeed/1000) + "s"});
  
    if ((penguinObj.activity === constants.ACTIVITY_MOVING || penguinObj.activity === constants.ACTIVITY_FLEE) && ! movedPenguins.includes(penguinObj.key)) {

      sleep(moveSpeed - 200).then(() => {
          movedPenguins.push(penguinObj.key)
          penguinObj.activity = 0
          penguinObj.activityDirection = 0
          penguinObj.activityDone = false

          let image = calculateImg(penguinObj)
          style = {width: pixels, height:pixels, backgroundColor:'', borderRadius: '0px', boxShadow: ''}
          if (penguinObj.key === illuminatedKey) {
              style = {width: pixels, height: pixels, backgroundColor:'rgba(41,134,204, 0.5)', borderRadius:'25px', boxShadow: '0 0 20px #2986CC'}      
          }
          setPenguin({img:image,left:penguinObj.hpos * tileSize + shift,top:penguinObj.vpos * tileSize + shift,alive:penguinObj.alive, style:style, balloon:balloon, hasballoon:hasballoon, transition: (moveSpeed/1000) + "s"});
      });
    }
  
  },[penguinObj,illuminatedKey,movedPenguins, tileSize])    
  
  return ( 
    <>
      {penguin.hasballoon && (<div className="Penguin" style={{left: (penguin.left + 24) + 'px', top: (penguin.top - 24) + 'px', opacity:'0.8', transition:penguin.transition}} >
        <img src={penguin.balloon} style={{width: '36px', height: '36px' }} alt =""/>
      </div>)} 
      <div className="Penguin" style={{left: penguin.left + 'px', top: penguin.top + 'px', transition:penguin.transition}} >
        <img src={penguin.img} style={penguin.style} alt= "" /> 
      </div>
    </>
  )
  

}