import React, {useState,useEffect} from "react";
import garbage_1 from "./images/tile-garbage-1.png";
import garbage_2 from "./images/tile-garbage-2.png";
import garbage_3 from "./images/tile-garbage-3.png";
import garbage_4 from "./images/tile-garbage-4.png";
import garbage_5 from "./images/tile-garbage-5.png";

export default function Garbage(props) {

    const [garbage,setGarbage] = useState({});  
    const {garbageVpos, garbageHpos, garbageKind,tileSize} = props;

    useEffect(() => {

        let pixels = tileSize 
    
        const garbage_img = [garbage_1,garbage_1,garbage_2,garbage_3,garbage_4,garbage_5]
        var image = garbage_img[garbageKind];
 
        const style = {width: pixels + 'px', height: pixels + 'px', backgroundColor:'', borderRadius: '0px', boxShadow: ''}

        setGarbage({img:image,left:garbageHpos * tileSize,top:garbageVpos * tileSize, style:style});

    },[garbageVpos, garbageHpos, garbageKind,tileSize])    
  
    return ( 
        <>
        <div className="Garbage" style={{left: garbage.left + 'px', top: garbage.top + 'px', transition:'1s'}} >
            <img src={garbage.img} style={garbage.style} alt= "" /> 
        </div>
        </>
    )

}