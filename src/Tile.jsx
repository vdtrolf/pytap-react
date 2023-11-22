import React, {useState,useEffect} from "react";
import tile_0_A from "./images/tile-sea.png";
import tile_0_B from "./images/tile-sea.png";
import tile_1_A from "./images/tile-ice-1-A.png";
import tile_1_B from "./images/tile-ice-1-B.png";
import tile_2_A from "./images/tile-ice-2-A.png";
import tile_2_B from "./images/tile-ice-2-B.png";
import tile_3_A from "./images/tile-ice-3-A.png";
import tile_3_B from "./images/tile-ice-3-B.png";
import tile_4_A from "./images/tile-ice-4-A.png";
import tile_4_B from "./images/tile-ice-4-B.png";
import tile_5_A from "./images/tile-ice-5-A.png";
import tile_5_B from "./images/tile-ice-5-B.png";
import tile_6_A from "./images/tile-ice-6-A.png";
import tile_6_B from "./images/tile-ice-6-B.png";
import tile_7_A from "./images/tile-ice-7-A.png";
import tile_7_B from "./images/tile-ice-7-B.png";
import tile_8_A from "./images/tile-ice-8-A.png";
import tile_8_B from "./images/tile-ice-8-B.png";
import tile_9_A from "./images/tile-ice-9-A.png";
import tile_9_B from "./images/tile-ice-9-B.png";
import tile_10_A from "./images/tile-ice-10-A.png";
import tile_10_B from "./images/tile-ice-10-B.png";
import tile_11_A from "./images/tile-ice-11-A.png";
import tile_11_B from "./images/tile-ice-11-B.png";
import tile_12_A from "./images/tile-ice-12-A.png";
import tile_12_B from "./images/tile-ice-12-B.png";
import tile_13_A from "./images/tile-ice-13-A.png";
import tile_13_B from "./images/tile-ice-13-B.png";
import tile_14_A from "./images/tile-ice-14-A.png";
import tile_14_B from "./images/tile-ice-14-B.png";
import tile_15_A from "./images/tile-ice-15-A.png";
import tile_15_B from "./images/tile-ice-15-B.png";
import earth from "./images/tile-ice-1-A.png";
import empty from "./images/tile-sea.png";


export default function Tile(props) {

  const [tile,setTile] = useState({});  
  const {tileType,tileNum, tileAngle, tileVpos, tileHpos, onTileClick, tileSize} = props;

  useEffect(() => {

    // let pixels = tileSize 

    const tiles = [tile_15_A,tile_15_B,
      tile_14_A,tile_14_B,
      tile_13_A,tile_13_B,
      tile_12_A,tile_12_B,
      tile_11_A,tile_11_B,
      tile_10_A,tile_10_B,
      tile_9_A,tile_9_B,
      tile_8_A,tile_8_B,
      tile_7_A,tile_7_B,
      tile_6_A,tile_6_B,
      tile_5_A,tile_5_B,
      tile_4_A,tile_4_B,
      tile_3_A,tile_3_B,
      tile_2_A,tile_2_B,
      tile_1_A,tile_1_B,
      tile_0_A,tile_0_B];


        var tileImg = empty;
        if (tileType  > 0 && tileType < 14 ) {
            tileImg = tiles[tileAngle==="a"?tileType*2:tileType*2 +1];
        } else if (tileType > 13 ) {
            tileImg = earth;
        }
        
        setTile({vpos:tileVpos,hpos:tileHpos,img:tileImg});
   },[tileType,tileNum,tileHpos,tileVpos,tileAngle])              

   const handleClick = () => {
      onTileClick(tile.vpos,tile.hpos);
   }
 
  if (tile.img) {
    return <div><img src={tile.img} style={{width: tileSize + 'px', height: tileSize + 'px', transition:'0.5s'}} onClick={handleClick} alt={tile.vpos + "-" + tile.hpos} /></div>
  } 
}