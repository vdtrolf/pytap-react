import React from "react";
import WeatherArea from "./WeatherArea.jsx";
import StateArea from "./StateArea.jsx";
import Tile from "./Tile.jsx";
import Gem from "./Gem.jsx";
import Penguin from "./Penguin.jsx";
import Fish from "./Fish.jsx";
import Garbage from "./Garbage.jsx";
import neutral from "./images/TapTapBackNeutral.png";

import * as constants from "./Constants.jsx";


export default function IslandArea(props) {

  const {runningState, island, onTileClick, showBalloons, illuminatedKey, movedPenguins, tileSize, gridClass, moveSpeed } = props;
  const weather = island.weather;

  const debug = true;
  
  if (debug) {
    console.log("=== Islandarea " + tileSize  + "==========================");
    console.dir(island);
    console.log("=============================================");
  }

  if (runningState !== constants.NOT_STARTED) {
    return (
      <>
        <div>
          <div className="WaveArea" key="div1" ><img src={neutral} alt="" /></div> 
          <div className={gridClass} key="div2" style={{zIndex:'20'}} >
            {island.tiles && island.tiles.map(tile =><Tile key={tile.key} tileType={tile.type} tileAngle={tile.angle} tileVpos={tile.vpos} tileHpos={tile.hpos} onTileClick={onTileClick} tileSize={tileSize}/>)} 
          </div>
          <div className="FreeArea" key="div4" style={{zIndex:'40', pointerEvents:'none'}} >
            {island.penguins && island.penguins.map(penguin =><Penguin key={penguin.key} showBalloons={showBalloons} penguinObj={penguin}  
          illuminatedKey={illuminatedKey} movedPenguins={movedPenguins} tileSize={tileSize} moveSpeed={moveSpeed}/>)} 
          </div>
          <div className="GemArea" key="div7" style={{zIndex:'32', pointerEvents:'none'}} >
            {island.gems && island.gems.map(gem =><Gem key={gem.key} gemObj={gem} tileSize={tileSize} />)} 
          </div>
          <div className="FishArea" key="div5" style={{zIndex:'33', pointerEvents:'none'}} >
            {island.fishes && island.fishes.map(fish =><Fish key={fish.key} fishObj={fish} tileSize={tileSize} moveSpeed={moveSpeed}/>)} 
          </div>
          <div className="GarbageArea" key="div6" style={{zIndex:'45', pointerEvents:'none'}} >
            {island.garbages && island.garbages.map(garbage =><Garbage key={garbage.key} garbageObj={garbage} tileSize={tileSize} />)} 
          </div>
          
          <WeatherArea weather={weather} runningState={runningState}/>
          {(runningState===constants.ENDED) && <StateArea runningState={runningState} />}
        </div>
      </>
    )
  } else {
    return <div className="IslandArea">{props.children}</div>;
  }
}
