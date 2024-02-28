
import React, {useState,useEffect}  from "react";

import "./App.css";
import Startup from "./Startup.jsx"
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import Details from "./Details.jsx";
import Adminbar from "./Adminbar.jsx";
import IslandArea from "./IslandArea.jsx";
import Footer from "./Footer.jsx";
import convert from "./Fetchserver.js"

import Island from "./data/island"
import Cell from "./data/cell"
import Fish from "./data/fish"
import Gem from "./data/gem"
import Garbage from "./data/garbage"
import Penguin from "./data/penguin"

import * as constants from "./Constants.jsx";
import { COMMAND_BUILDING, COMMAND_CLEANING, COMMAND_EATING, COMMAND_FISHING, COMMAND_GETING, COMMAND_LOVING, COMMAND_MOVING, COMMAND_NONE, DIRECTION_DOWN, DIRECTION_LEFT, DIRECTION_NONE, DIRECTION_RIGHT, DIRECTION_UP } from "./utils/constants.js";

export default function App() {

  const urls= [{name:"aws",url:"https://ayv5bav97c.execute-api.us-east-1.amazonaws.com/Prod/"},
  {name:"pytap", url:"http://85.215.204.50/pytap"},
  {name:"local", url:"http://127.0.0.1:5000/"},
  {name:"typtap", url:"http://localhost:8081/typtap/"}]

  const [sidebar,setSidebar] = useState(false);
  const [adminbar,setAdminbar] = useState(false);
  const [runningState, setRunningState] = useState(constants.NOT_STARTED);
  const [admin,setAdmin] = useState(false);
  const [showBalloons,setShowBalloons] = useState(false);
  const [island,setIsland] = useState({});
  const [baseURL,setBaseURL] = useState({name:"typtap", url:"http://localhost:8081/typtap/"});
  const [illuminatedKey,setIlluminatedKey] = useState(0);
  const [selectedKey,setSelectedKey] = useState(0);
  const [boardSize,setBoardSize] = useState(9)
  const [boardDifficulty, setBoardDificulty] = useState(2)
  const [tileSize,setTileSize] = useState(64);
  const [gridClass,setGridClass] = useState('GridClass64');
  const [islandsList,setIslandsList] = useState([]);
  const [dempedPenguins,setMovedPenguins] = useState([]);
  const [renewSpeed,setRenewSpeed] = useState(2000)
  const [moveSpeed,setMoveSpeed] = useState(1500)
  
  useEffect(() => {
    document.title = 'TAP TAP Penguin (' + baseURL.name + ")";
  },[baseURL]);

  useEffect(() => {
    refreshIslandsList(baseURL.url)
    .then((updatedIslandsList) => setIslandsList(updatedIslandsList));
  },[baseURL]);
  
  useEffect(() => {
      var intervalId = 0;
      if (runningState === constants.RUNNING && island && island.id > 0 ) {
        intervalId = setInterval( () => {

          let slicedIsland = island.becomeOlder()
          
          setMovedPenguins([]);
          setRenewSpeed(2200-slicedIsland.evolutionSpeed * 200);
          setMoveSpeed(1650-slicedIsland.evolutionSpeed * 150);
            
          slicedIsland.penguins.forEach(penguin => {
            if (penguin.key === selectedKey && ! penguin.alive) setSelectedKey(0);
          });

          if ( ! slicedIsland.running) {
            setRunningState(constants.ENDED)
          } 

          if (slicedIsland.islands) {
            setIslandsList(slicedIsland.islands);
          }
          setIsland(slicedIsland)
        
        },renewSpeed)
      }  else {
        clearInterval(intervalId);
      } 
      
      return () => {
        clearInterval(intervalId);
      }

  },[runningState,island,baseURL,renewSpeed,selectedKey]);

  const handleCreateButton = (size,difficulty) => {

    console.log("received values " + size + " " + difficulty) 

    setRunningState(constants.RUNNING)   
    setBoardSize(size);
    setBoardDificulty(difficulty);
    setSelectedKey(0)
    getNewIsland(baseURL.url,size,difficulty)
    .then((newIsland ) => {

      console.dir(newIsland)



      if (newIsland.size === 6) {
        setTileSize(96);
        setGridClass('GridArea96');
      } else if (newIsland.size === 9) {
        setTileSize(64);
        setGridClass('GridArea64');
      } else {
        setTileSize(48);
        setGridClass('GridArea48');
      }  
      setIsland(newIsland)
    }); 
  }

  const handleStartButton = () => {
    setRunningState(constants.RUNNING)   
  }

  const handleOnceButton = () => {
    if (runningState !== constants.RUNNING && island && island.id > 0 ) {
      let slicedIsland = island.becomeOlder()

      setMovedPenguins([]);  
      setRenewSpeed(2200-slicedIsland.evolutionSpeed * 200);
      setMoveSpeed(1650-slicedIsland.evolutionSpeed * 150);

      slicedIsland.penguins.forEach(penguin => {
        if (penguin.key === selectedKey && ! penguin.alive) setSelectedKey(0);
      });

      if ( ! slicedIsland.running) {
        setRunningState(constants.ENDED)
      } 
      if (slicedIsland.islands) {
        setIslandsList(slicedIsland.islands);
      }
      setIsland(slicedIsland);

    } 
  }

  const handleStopButton = () => {
    if(runningState === constants.RUNNING) {
      setRunningState(constants.PAUSED)
    } else {
      setRunningState(constants.RUNNING);
    }
    // console.log("BUTTON START PRESSED");
  } 

  const handlePlusButton = () => {
    setRunningState(constants.NOT_STARTED);
  } 

  const handleCloneButton = () => {
    setSidebar( !sidebar);
    // console.log("BUTTON CLONE PRESSED");
  } 

  const handleAdminButton = () => {
    if (sidebar) {
      setSidebar(false);
    } 
    setAdminbar(!adminbar);
    // console.log("BUTTON ADMIN PRESSED");
  } 

  const handleCloseButton = () => {
    setSidebar(false);
    setAdminbar(false);
    // console.log("BUTTON CLOSE PRESSED");
  } 

  const handleLogoutButton = () => {
    setSidebar(false);
    setAdminbar(false);
    setAdmin(false);
    // console.log("LOGOUT CLOSE PRESSED");
  } 

  const handleDetailsCloseButton = () => {
    setSelectedKey(0);
    setIlluminatedKey(0);
  }

  const handleTileClick = (vpos,hpos) => {

    // console.log("TILE CLICKED AT " + vpos + "/" + hpos);

    if (selectedKey > 0) {
      const apenguin = island.penguins.find(penguin => penguin.vpos === vpos && penguin.hpos === hpos);

      if (apenguin && apenguin.key === selectedKey) {
        setSelectedKey(0);
        setIlluminatedKey(0);
      } else   {

        const selectedPenguin = island.penguins.find(penguin => penguin.key === selectedKey );

        if ( selectedPenguin && ! dempedPenguins.includes(selectedPenguin.key)) {

          const afish = island.fishes.find(fish => fish.vpos === vpos && fish.hpos === hpos);
          const targetPenguin = island.penguins.find(penguin => penguin.vpos === vpos && penguin.hpos === hpos);
          const agem = island.gems.find(gem => gem.vpos === vpos && gem.hpos === hpos);
          const agarbage = island.garbages.find(garbage => garbage.vpos === vpos && garbage.hpos === hpos);
          const acell = island.cells.find(cell => cell.vpos === vpos && cell.hpos === hpos);

          console.log("on " + vpos + "/" + hpos + ", seledcted = " + selectedPenguin.vpos + "/" + selectedPenguin.hpos )
          console.dir(island.fishes)


          if (selectedPenguin && selectedPenguin.activity === constants.ACTIVITY_NONE &&
              ((Math.abs(vpos - selectedPenguin.vpos) === 1 && hpos === selectedPenguin.hpos) || 
              (Math.abs(hpos - selectedPenguin.hpos) === 1 && vpos === selectedPenguin.vpos))) {

            let commandType = COMMAND_NONE
            let commandDirection = DIRECTION_NONE

            if (vpos < selectedPenguin.vpos) {
              commandDirection = DIRECTION_UP
            } else if (vpos > selectedPenguin.vpos) {
              commandDirection = DIRECTION_DOWN
            } else {
              if (hpos < selectedPenguin.hpos) {
                commandDirection = DIRECTION_LEFT
              } else {
                commandDirection = DIRECTION_RIGHT
              }
            }

            if (afish && ! afish.onHook) {
              commandType = COMMAND_FISHING
            } else if (agem && ! agem.isTaken && ! selectedPenguin.isChild && ! selectedPenguin.isOld) {
              commandType = COMMAND_GETING
            } else if (agarbage && ! agarbage.isTaken && selectedPenguin.hasShowel &&! selectedPenguin.isChild && ! selectedPenguin.isOld) {
              commandType = COMMAND_CLEANING
            } else if (targetPenguin && targetPenguin.canLove && selectedPenguin.canLove && ! selectedPenguin.isChild && ! targetPenguin.isChild && ! selectedPenguin.isOld && ! targetPenguin.isOld && targetPenguin.gender !== selectedPenguin.gender) {
                commandType = COMMAND_LOVING
                selectedPenguin.activityText = "Going to love"
                console.log("there is a loved once")
            } else if (acell.type > 0 && ! agem && ! targetPenguin) {
              if (commandDirection === DIRECTION_LEFT) {
                selectedPenguin.activityDirection =1;
              } else if (commandDirection === DIRECTION_RIGHT) {
                selectedPenguin.activityDirection =2;
              } else if (commandDirection === DIRECTION_UP) {
                selectedPenguin.activityDirection =3;
              } else if (commandDirection === DIRECTION_DOWN) {
                selectedPenguin.activityDirection =4;
              }
              commandType = COMMAND_MOVING
              selectedPenguin.activityText = "Going to move" 
            } else if (acell.type === 0 && selectedPenguin.hasGem && ! selectedPenguin.isChild && ! selectedPenguin.isOld) {
              commandType = COMMAND_BUILDING
              
            } 

            if (commandType !== COMMAND_NONE) {
              setIsland(island.transmitCommands(selectedPenguin,commandType,commandDirection))
              setMovedPenguins([])
            }  

          } else {
            if (targetPenguin && targetPenguin.alive) {
              setSelectedKey(targetPenguin.key);
              setIlluminatedKey(targetPenguin.key);
            }
          }
        }
      }
    } else {
      const apenguin = island.penguins.find(penguin => penguin.vpos === vpos && penguin.hpos === hpos);
      if (apenguin && apenguin.alive) {
        setSelectedKey(apenguin.key);
        setIlluminatedKey(apenguin.key);
      }
    }
  } 

  const handleEatButton = (key) => {
    console.log("EAT BUTTON PRESSED for " + key);
   
    const selectedPenguin = island.penguins.find(penguin => penguin.key === selectedKey );

    setIsland(island.transmitCommands(selectedPenguin,COMMAND_EATING,DIRECTION_NONE))
    setSelectedKey(0);
    setIlluminatedKey(0);
    setMovedPenguins([])
    
  } 

  const handlePenguinClick = (key) => {
    console.log("PENGUIN CLICK ON " + key)
    setSelectedKey(key);
    setIlluminatedKey(key);

  }

  const handlePenguinEnter = (id) => {
    setIlluminatedKey(id);
  }

  const handlePenguinLeave = () => {
    if (illuminatedKey > 0) {
      setIlluminatedKey(0);
    }
  }

  const handleIslandSelect = (id,size) => {
    setSidebar(false);
    setAdminbar(false);

    if (size === 6) {
      setTileSize(96);
      setGridClass('GridArea96');
    } else if (size === 9) {
      setTileSize(64);
      setGridClass('GridArea64');
    } else {
      setTileSize(48);
      setGridClass('GridArea48');
    }  

    setRunningState(constants.RUNNING);
    setIsland(island.becomeOlder())
    
  }

  const handleIslandDelete = (idList) => {
    idList.forEach(islandId => {
      console.log("doing delete " + islandId)
      refreshIslandsList(baseURL.url,islandId)
      .then((updatedIslandsList) => setIslandsList(updatedIslandsList));

      if (islandId === island.id) {
        setRunningState(constants.NOT_STARTED);
        setIsland({});
      }

    })
  }

  const handleURLSelect = (url) => {
    console.log("URL SELECTED " + url)
    setBaseURL(url);
    setIsland({});
    setRunningState(constants.NOT_STARTED);
    setSidebar(false);
    setAdminbar(false);
  }

  const handlUserInput = (user,pwd) => {
    setAdmin(user === "admin" && pwd==="admin")
    setSidebar(false);
    setAdminbar(false);
  }

  const handleSetBalloons = (checkBalloons) => {
    console.log("BALLOOMS " + checkBalloons);
    setShowBalloons(checkBalloons);
  }

  return (
    <div className="App">
      <Sidebar admin={admin} baseURL={baseURL} onCloseButton={handleCloseButton} onIslandSelect={handleIslandSelect} onIslandDelete={handleIslandDelete} islandId={island.id} islandsList={islandsList} sidebar={sidebar}/>
      <Adminbar showBalloons={showBalloons} admin={admin} baseURL={baseURL} onCloseButton={handleCloseButton} onLogoutButton={handleLogoutButton} onSetBalloons={handleSetBalloons} adminbar={adminbar} urls={urls} onURLSelect={handleURLSelect} onUserInput={handlUserInput}/>
      <Navbar runningState={runningState} island={island} admin={admin} onStartButton={handleStartButton} onOnceButton={handleOnceButton} onStopButton={handleStopButton} onPlusButton={handlePlusButton} onCloneButton={handleCloneButton} onAdminButton={handleAdminButton} />
      <div className="WorkArea">
        {runningState === constants.NOT_STARTED && <Startup originalSize={boardSize} originalDifficulty={boardDifficulty} onCreateButton={handleCreateButton}/>}
        {runningState !== constants.NOT_STARTED && <IslandArea showBalloons={showBalloons} runningState={runningState} island={island} onTileClick={handleTileClick} illuminatedKey={illuminatedKey} dempedPenguins={dempedPenguins} tileSize={tileSize} gridClass={gridClass} moveSpeed={moveSpeed}/>}
        {runningState !== constants.NOT_STARTED && selectedKey === 0 && (<Footer penguins={island.penguins} onPenguinEnter={handlePenguinEnter} onPenguinLeave={handlePenguinLeave} onPenguinClick={handlePenguinClick} illuminatedKey={illuminatedKey}/>)}
        {runningState !== constants.NOT_STARTED && selectedKey > 0 && (<Details penguinObj={island.penguins.find(penguin => penguin.key === selectedKey)} onDetailsCloseButton={handleDetailsCloseButton} onEatButton={handleEatButton}/> )}
        {runningState === constants.NOT_STARTED && <div className="Footer">&nbsp;</div>}
      </div>
    </div>
  );
}

const getNewIsland = async (baseURL,boardSize,boardDifficulty) => {
  const islandData = await convert(baseURL + "create?size=" + boardSize + "&difficulty=" + boardDifficulty)
  return extractIslandData(islandData);
}

const refreshIslandsList = async (baseURL,islandToDelete=0)  => {
  if (islandToDelete > 0) {
    const islandsListData = await convert(baseURL + "deleteIsland?islandId=" + islandToDelete );
    return islandsListData;
  } else {
    const islandsListData = await convert(baseURL + "islands" );
    
    return islandsListData;
  }
}

const extractIslandData = (islandData) => {


  console.log("================= ISLANDDATA =============")
  console.dir(islandData)
  console.log("================= ISLANDDATA =============")


  const cells = [];
  const penguins = [];
  const fishes = [];
  const gems = [];
  const garbages = [];
  const islands = [];

  if (islandData) {

    islandData.cells.forEach(cellsline => {
      cellsline.forEach(cell => {   
        cells.push( new Cell( cell.id,
          cell.key,
          cell.vpos,
          cell.hpos,
          cell.type,
          cell.beingBuilt,
        )); 
      });
      // cells.push(aline)
    });
 
    if (islandData.penguins) {

      islandData.penguins.forEach(penguin => {

        penguins.push(new Penguin(penguin.id,
          penguin.key,
          penguin.vpos,
          penguin.hpos,
          penguin.alive,
          penguin.age,
          penguin.deadAge,
          penguin.hunger,
          penguin.temp,
          penguin.gender,
          penguin.genderName,
          penguin.name,
          penguin.shape,
          penguin.activity,
          penguin.activityTime,
          penguin.activityTarget,
          penguin.targetVPos,
          penguin.targetHPos,
          penguin.activityVPos,
          penguin.activityHPos,
          penguin.activityDirection,
          penguin.activityText, 
          penguin.hasFish,
          penguin.hasGem,
          penguin.isChild,
          penguin.isOld,
          penguin.canLove,
          penguin.inLove,
          penguin.loveTime,
          penguin.hasShowel,
          penguin.showelCnt,
          penguin.commands))
        
      }); 
    }

    if (islandData.fishes) { 
      islandData.fishes.forEach(fish => {
        fishes.push(new Fish ( fish.id,
          fish.key,
          fish.vpos,
          fish.hpos,
          fish.alive,
          fish.onHook,
          fish.staying,
          fish.direction,
          fish.lastDirection)
        )
      });
    }

    // console.dir(fishes)

    if (islandData.gems) { 
      islandData.gems.forEach(gem => {
        gems.push( new Gem ( gem.id,
          gem.key,
          gem.vpos,
          gem.hpos,
          gem.hasShowel,
          gem.age,
          gem.isTaken))
          
      }); 
    }

    if (islandData.garbages) { 
      islandData.garbages.forEach(garbage => {
        garbages.push( new Garbage(garbage.id,
          garbage.key,
          garbage.vpos,
          garbage.hpos,
          garbage.kind,
          garbage.isTaken))
 
      }); 
    }

    if (islandData.islands) { 
      for (const thisIsland in islandData.islands) {
        let anIsland = islandData.islands[thisIsland]
        islands.push({key: anIsland.key,
                      id: anIsland.id, 
                      name: anIsland.name,
                      year: anIsland.year,
                      size: anIsland.size})
                
      }; 
    } 

    return new Island(islandData.id,
                      islandData.key,
                      islandData.size,
                      islandData.difficulty,
                      islandData.name,
                      islandData.counter,
                      islandData.weather,
                      islandData.weatherAge,
                      islandData.year,
                      islandData.points,
                      islandData.plasticControl,
                      islandData.running,
                      islandData.evolutionSpeed,
                      islandData.onGoing,
                      penguins,
                      fishes,
                      gems,
                      garbages,
                      cells,)
          

  } else {
    return {}
  }
}
