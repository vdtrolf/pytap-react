import React, {useState,useEffect} from "react";

import ice_1 from "./images/ice-block-1.png";
import ice_2 from "./images/ice-block-2.png";
import ice_3 from "./images/ice-block-3.png";
import ice_4 from "./images/ice-block-4.png";
import ice_5 from "./images/ice-block-5.png";
import ice_6 from "./images/ice-block-6.png"; 

import showel_1 from "./images/ice-showel-1.png";
import showel_2 from "./images/ice-showel-2.png";
import showel_3 from "./images/ice-showel-3.png";
import showel_4 from "./images/ice-showel-4.png";
import showel_5 from "./images/ice-showel-5.png";
import showel_6 from "./images/ice-showel-6.png"; 


export default function Gem(props) {

    const [gem,setGem] = useState({});  
    const {gemObj,tileSize} = props;

    useEffect(() => {

        let pixels = tileSize  + 'px'
        const ice_img = [ice_6,ice_5,ice_4,ice_3,ice_2,ice_1,ice_1,ice_1]
        const showel_img = [showel_6,showel_5,showel_4,showel_3,showel_2,showel_1,showel_1,showel_1]
        let imgAge = Math.floor(gemObj.age / 2) 
        let image = gemObj.hasShowel ? showel_img[imgAge] :ice_img[imgAge];
 
        const style = {width: pixels, height: pixels, backgroundColor:'', borderRadius: '0px', boxShadow: ''}
        setGem({img:image,left:gemObj.hpos * tileSize,top:gemObj.vpos * tileSize, style:style});

    },[gemObj,tileSize])    
  
    return ( 
        <>
        <div className="Gem" style={{left: gem.left + 'px', top: gem.top + 'px', transition:'1s'}} >
            <img src={gem.img} style={gem.style} alt= "" /> 
        </div>
        </>
    )

}