import React, {useState,useEffect} from "react";

import peng_m from "./images/peng-m.png";
import peng_f from "./images/peng-f.png";
import peng_y from "./images/peng-y.png";
import peng_ms from "./images/peng-ms.png";
import peng_fs from "./images/peng-fs.png";
import peng_m_old from "./images/peng-m-old.png";
import peng_f_old from "./images/peng-f-old.png";

import peng_m_ice from "./images/peng-m-ice.png";
import peng_f_ice from "./images/peng-f-ice.png";
import peng_ms_ice from "./images/peng-ms-ice.png";
import peng_fs_ice from "./images/peng-fs-ice.png";

import peng_m_fish from "./images/peng-m-fish.png";
import peng_f_fish from "./images/peng-f-fish.png";
import peng_y_fish from "./images/peng-y-fish.png";
import peng_ms_fish from "./images/peng-ms-fish.png";
import peng_fs_fish from "./images/peng-fs-fish.png";
import peng_m_old_fish from "./images/peng-m-old-fish.png";
import peng_f_old_fish from "./images/peng-f-old-fish.png";

import peng_m_ice_fish from "./images/peng-m-ice-fish.png";
import peng_f_ice_fish from "./images/peng-f-ice-fish.png";
import peng_ms_ice_fish from "./images/peng-ms-ice-fish.png";
import peng_fs_ice_fish from "./images/peng-fs-ice-fish.png";

import peng_m_demp from "./images/peng-m-demp.png";
import peng_f_demp from "./images/peng-f-demp.png";
import peng_ms_demp from "./images/peng-ms-demp.png";
import peng_fs_demp from "./images/peng-fs-demp.png";
import peng_y_demp from "./images/peng-y-demp.png";
import peng_m_old_demp from "./images/peng-m-old-demp.png";
import peng_f_old_demp from "./images/peng-f-old-demp.png";

import peng_m_demp_ice from "./images/peng-m-demp-ice.png";
import peng_f_demp_ice from "./images/peng-f-demp-ice.png";
import peng_ms_demp_ice from "./images/peng-ms-demp-ice.png";
import peng_fs_demp_ice from "./images/peng-fs-demp-ice.png";

import peng_m_demp_fish from "./images/peng-m-demp-fish.png";
import peng_f_demp_fish from "./images/peng-f-demp-fish.png";
import peng_ms_demp_fish from "./images/peng-ms-demp-fish.png";
import peng_fs_demp_fish from "./images/peng-fs-demp-fish.png";
import peng_y_demp_fish from "./images/peng-y-demp-fish.png";
import peng_m_old_demp_fish from "./images/peng-m-old-demp-fish.png";
import peng_f_old_demp_fish from "./images/peng-f-old-demp-fish.png";

import peng_m_demp_ice_fish from "./images/peng-m-demp-ice-fish.png";
import peng_f_demp_ice_fish from "./images/peng-f-demp-ice-fish.png";
import peng_ms_demp_ice_fish from "./images/peng-ms-demp-ice-fish.png";
import peng_fs_demp_ice_fish from "./images/peng-fs-demp-ice-fish.png";

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

  const [penguinComp,setPenguinComp] = useState({});  
  const {penguin, illuminatedKey, dempedPenguins, tileSize, moveSpeed} = props;

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }  

  useEffect(() => {

    const calculateImg = (penguin) => {
      let image = peng_m
      if (dempedPenguins.includes(penguin.key)) {
        if ( penguin.isOld) {
          if (penguin.hasFish) {
            image = penguin.gender ==="m"? peng_m_old_demp_fish : peng_f_old_demp_fish;   
          } else {
            image = penguin.gender ==="m"? peng_m_old_demp : peng_f_old_demp;  
          } 
        } else if (penguin.isChild) {
          if (penguin.hasFish) {
            image = peng_y_demp_fish;   
          } else {
            image = peng_y_demp;  
          } 
        } else { 
          if (penguin.hasShowel) {
            if (penguin.hasGem && penguin.hasFish) {
              image = penguin.gender ==="m"? peng_ms_demp_ice_fish : peng_fs_demp_ice_fish;    
            } else if (penguin.hasGem) {
              image = penguin.gender ==="m"? peng_ms_demp_ice : peng_fs_demp_ice;    
            } else if (penguin.hasFish) {
              image = penguin.gender ==="m"? peng_ms_demp_fish : peng_fs_demp_fish;    
            } else {
              image = penguin.gender ==="m"? peng_ms_demp : peng_fs_demp;    
            }
          } else {
            if (penguin.hasGem && penguin.hasFish) {
              image = penguin.gender ==="m"? peng_m_demp_ice_fish : peng_f_demp_ice_fish;    
            } else if (penguin.hasGem) {
              image = penguin.gender ==="m"? peng_m_demp_ice : peng_f_demp_ice;    
            } else if (penguin.hasFish) {
              image = penguin.gender ==="m"? peng_m_demp_fish : peng_f_demp_fish;    
            } else {
              image = penguin.gender ==="m"? peng_m_demp : peng_f_demp;    
            }
          }
        }
      } else {
        if (penguin.hasGem && penguin.hasFish) {
          if ( penguin.isOld) {
            image = penguin.gender ==="m"? peng_m_old_fish : peng_f_old_fish;  
          } else if (penguin.isChild)  {
            image =  peng_y_fish;
          } else {
            if (penguin.hasShowel) {
              image = penguin.gender ==="m"? peng_ms_ice_fish : peng_fs_ice_fish;  
            } else {
              image = penguin.gender ==="m"? peng_m_ice_fish : peng_f_ice_fish;    
            }
          } 
        } else if (penguin.hasGem) {
          if ( penguin.isOld) {
            image = penguin.gender ==="m"? peng_m_old : peng_f_old;  
          } else if (penguin.isChild)  {
            image =  peng_y;
          } else {
            if (penguin.hasShowel) {
              image = penguin.gender ==="m"? peng_ms_ice : peng_fs_ice;  
            } else {
              image = penguin.gender ==="m"? peng_m_ice : peng_f_ice;    
            }
          } 
        } else if (penguin.hasFish) {
          if ( penguin.isOld) {
            image = penguin.gender ==="m"? peng_m_old_fish : peng_f_old_fish;  
          } else if (penguin.isChild)  {
            image =  peng_y_fish;
          } else {
            if (penguin.hasShowel) {
              image = penguin.gender ==="m"? peng_ms_fish : peng_fs_fish;  
            } else {
              image = penguin.gender ==="m"? peng_m_fish : peng_f_fish;    
            }
          } 
        } else {
          if ( penguin.isOld) {
            image = penguin.gender ==="m"? peng_m_old : peng_f_old;  
          } else if (penguin.isChild) {
            image =  peng_y;
          } else {
            if (penguin.hasShowel) {
              image = penguin.gender ==="m"? peng_ms : peng_fs;    
            } else {
              image = penguin.gender ==="m"? peng_m : peng_f;  
            }
          }
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

    var hasballoon = false;
    
    let balloon = null;
    if (penguin.hunger > 60) {
      balloon = balloon_food;
      hasballoon = true;
    } else if (penguin.temp > 60) {
      balloon = balloon_ice;
      hasballoon = true;
    }
     
    let image = calculateImg(penguin)
    
    if (penguin.activity === constants.ACTIVITY_MOVING || penguin.activity === constants.ACTIVITY_FLEE) {
      if (penguin.activityDirection && ! dempedPenguins.includes(penguin.key)) {
        image = penguin.gender ==="m"? moving_m[penguin.activityDirection]: moving_f[penguin.activityDirection];
        if (penguin.isChild) image = moving_y[penguin.activityDirection];
      }
    } else if (penguin.activity === constants.ACTIVITY_EATING) {
      image = penguin.gender ==="m"? peng_m_eating: peng_f_eating;
      if (penguin.isChild) image = peng_y_eating;
    } else if (penguin.activity === constants.ACTIVITY_FISHING) {
      image = penguin.gender ==="m"? fishing_m[penguin.activityDirection]: fishing_f[penguin.activityDirection];
      if (penguin.isChild) image = fishing_y[penguin.activityDirection];
    } else if (penguin.activity === constants.ACTIVITY_LOVING) {
      image = peng_loving;;
    } else if (penguin.activity === constants.ACTIVITY_GETING || penguin.activity === constants.ACTIVITY_CLEANING) {
      image = penguin.gender ==="f"? diging_f[penguin.activityDirection]: diging_m[penguin.activityDirection];
    } else if (penguin.activity === constants.ACTIVITY_BUILDING) {
      image = penguin.gender ==="f"? filling_f[penguin.activityDirection]: filling_m[penguin.activityDirection];
    } else if (penguin.activity === constants.ACTIVITY_DEAD) {
      image = cross;
    }
    // var style = {width: '56px', height:'56px', backgroundColor:'', borderRadius: '0px', boxShadow: '', opacity: penguin.activityDone?'0.7':'1'}
    var style = {width: pixels, height:pixels, backgroundColor:'', borderRadius: '0px', boxShadow: ''}
    if (penguin.key === illuminatedKey) {
      if (dempedPenguins.includes(penguin.key)) {
        style = {width: pixels, height: pixels, backgroundColor:'rgba(41,134,204, 0.5)', borderRadius:'25px', boxShadow: '10px 10px 20px #2986CC'}      
      } else {
        style = {width: pixels, height: pixels, backgroundColor:'rgba(255, 195, 0, 0.5)', borderRadius:'25px', boxShadow: '0 0 20px #FFC300'}
      }
    }

    setPenguinComp({img:image,left:penguin.hpos * tileSize + shift,top:penguin.vpos * tileSize + shift,alive:penguin.alive, style:style, balloon:balloon, hasballoon:hasballoon, transition:(moveSpeed/1000) + "s"});
  
    if ((penguin.activity === constants.ACTIVITY_MOVING || penguin.activity === constants.ACTIVITY_FLEE) && ! dempedPenguins.includes(penguin.key)) {

      sleep(moveSpeed - 200).then(() => {
          dempedPenguins.push(penguin.key)
          penguin.activity = 0
          penguin.activityDirection = 0
          penguin.activityDone = false

          let image = calculateImg(penguin)
          style = {width: pixels, height:pixels, backgroundColor:'', borderRadius: '0px', boxShadow: ''}
          if (penguin.key === illuminatedKey) {
              style = {width: pixels, height: pixels, backgroundColor:'rgba(41,134,204, 0.5)', borderRadius:'25px', boxShadow: '0 0 20px #2986CC'}      
          }
          setPenguinComp({img:image,left:penguin.hpos * tileSize + shift,top:penguin.vpos * tileSize + shift,alive:penguin.alive, style:style, balloon:balloon, hasballoon:hasballoon, transition: (moveSpeed/1000) + "s"});
      });
    }
  
  },[penguin,illuminatedKey,dempedPenguins, tileSize, moveSpeed])    
  
  return ( 
    <>
      {penguinComp.hasballoon && (<div className="Penguin" style={{left: (penguinComp.left + 24) + 'px', top: (penguinComp.top - 24) + 'px', opacity:'0.8', transition:penguinComp.transition}} >
        <img src={penguinComp.balloon} style={{width: '36px', height: '36px' }} alt =""/>
      </div>)} 
      <div className="Penguin" style={{left: penguinComp.left + 'px', top: penguinComp.top + 'px', transition:penguinComp.transition}} >
        <img src={penguinComp.img} style={penguinComp.style} alt= "" /> 
      </div>
    </>
  )
  

}