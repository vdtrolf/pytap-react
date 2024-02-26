import React, {useState,useEffect} from "react";
import cell_0_A from "./images/tile-sea.png";
import cell_0_B from "./images/tile-sea.png";
import cell_1_A from "./images/tile-ice-1-A.png";
import cell_1_B from "./images/tile-ice-1-B.png";
import cell_2_A from "./images/tile-ice-2-A.png";
import cell_2_B from "./images/tile-ice-2-B.png";
import cell_3_A from "./images/tile-ice-3-A.png";
import cell_3_B from "./images/tile-ice-3-B.png";
import cell_4_A from "./images/tile-ice-4-A.png";
import cell_4_B from "./images/tile-ice-4-B.png";
import cell_5_A from "./images/tile-ice-5-A.png";
import cell_5_B from "./images/tile-ice-5-B.png";
import cell_6_A from "./images/tile-ice-6-A.png";
import cell_6_B from "./images/tile-ice-6-B.png";
import cell_7_A from "./images/tile-ice-7-A.png";
import cell_7_B from "./images/tile-ice-7-B.png";
import cell_8_A from "./images/tile-ice-8-A.png";
import cell_8_B from "./images/tile-ice-8-B.png";
import cell_9_A from "./images/tile-ice-9-A.png";
import cell_9_B from "./images/tile-ice-9-B.png";
import cell_10_A from "./images/tile-ice-10-A.png";
import cell_10_B from "./images/tile-ice-10-B.png";
import cell_11_A from "./images/tile-ice-11-A.png";
import cell_11_B from "./images/tile-ice-11-B.png";
import cell_12_A from "./images/tile-ice-12-A.png";
import cell_12_B from "./images/tile-ice-12-B.png";
import cell_13_A from "./images/tile-ice-13-A.png";
import cell_13_B from "./images/tile-ice-13-B.png";
import cell_14_A from "./images/tile-ice-14-A.png";
import cell_14_B from "./images/tile-ice-14-B.png";
import cell_15_A from "./images/tile-ice-15-A.png";
import cell_15_B from "./images/tile-ice-15-B.png";
import earth from "./images/tile-ice-1-A.png";
import empty from "./images/tile-sea.png";


export default function Tile(props) {

  const [cell,setCell] = useState({});  
  const {cellType, cellNum, cellAngle, cellVpos, cellHpos, onTileClick, tileSize} = props;

  useEffect(() => {

    // let pixels = tileSize 

    const cells = [cell_15_A,cell_15_B,
      cell_14_A,cell_14_B,
      cell_13_A,cell_13_B,
      cell_12_A,cell_12_B,
      cell_11_A,cell_11_B,
      cell_10_A,cell_10_B,
      cell_9_A,cell_9_B,
      cell_8_A,cell_8_B,
      cell_7_A,cell_7_B,
      cell_6_A,cell_6_B,
      cell_5_A,cell_5_B,
      cell_4_A,cell_4_B,
      cell_3_A,cell_3_B,
      cell_2_A,cell_2_B,
      cell_1_A,cell_1_B,
      cell_0_A,cell_0_B];


        var cellImg = empty;
        if (cellType  > 0 && cellType < 14 ) {
            cellImg = cells[cellAngle==="a"?cellType*2:cellType*2 +1];
        } else if (cellType > 13 ) {
            cellImg = earth;
        }
        
        setCell({vpos:cellVpos,hpos:cellHpos,img:cellImg});
   },[cellType,cellNum,cellHpos,cellVpos,cellAngle])              

   const handleClick = () => {
      onTileClick(cell.vpos,cell.hpos);
   }
 
  if (cell.img) {
    return <div><img src={cell.img} style={{width: tileSize + 'px', height: tileSize + 'px', transition:'0.5s'}} onClick={handleClick} alt={cell.vpos + "-" + cell.hpos} /></div>
  } 
}