import React, {useState,useEffect} from "react";
import fish_staying from "./images/fish-1-still.gif";
import fish_onhook from "./images/fish_kept.gif";

import fish_1_moving from "./images/fish-1-moving.gif";
import fish_2_moving from "./images/fish-2-moving.gif";
import fish_3_moving from "./images/fish-3-moving.gif";
import fish_4_moving from "./images/fish-4-moving.gif";

const Fish = (props) => {

    const [fish,setFish] = useState({});  
    const {fishObj,tileSize,moveSpeed} = props;

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }  


    useEffect(() => {
  
        // console.log("%%%%% fish : " + fishObj.key + " direction " + fishObj.direction)

        const moving = [fish_staying,fish_1_moving,fish_2_moving,fish_3_moving,fish_4_moving]
    
        let pixels = (tileSize / 16 * 12) + 'px'
        let shift = tileSize /16

        var image = fish_staying;
        if (fishObj.onHook) {
            image = fish_onhook
        } else if (fishObj.direction >= 0) {
            image = moving[fishObj.direction];
        } else {
            image = fish_staying
        } 
 
        const style = {width: pixels, height: pixels, backgroundColor:'', borderRadius: '0px', boxShadow: ''}
        setFish({img:image,left:fishObj.hpos * tileSize + shift,top:fishObj.vpos * tileSize + shift, style:style,transition:(moveSpeed/1000) + "s"});

        if (! fishObj.onHook && fishObj.direction >= 0) {
            sleep(moveSpeed).then(() => {
                image = fish_staying
                setFish({img:image,left:fishObj.hpos * tileSize + shift,top:fishObj.vpos * tileSize + shift, style:style, transition:(moveSpeed/1000) + "s"});
            });
        }

    },[fishObj,tileSize])    
  
    return ( 
        <>
        <div className="Fish" style={{left: fish.left + 'px', top: fish.top + 'px', transition:fish.transition}} >
            <img src={fish.img} style={fish.style} alt= "" /> 
        </div>
        </>
    )

}

export default Fish;