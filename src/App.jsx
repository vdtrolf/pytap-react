
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

import * as constants from "./Constants.jsx";

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
  const [baseURL,setBaseURL] = useState({name:"local", url:"http://127.0.0.1:5000/"});
  const [illuminatedKey,setIlluminatedKey] = useState(0);
  const [selectedKey,setSelectedKey] = useState(0);
  const [boardSize,setBoardSize] = useState(9)
  const [boardDifficulty, setBoardDificulty] = useState(2)
  const [tileSize,setTileSize] = useState(64);
  const [gridClass,setGridClass] = useState('GridClass64');
  const [islandsList,setIslandsList] = useState([]);
  const [movedPenguins,setMovedPenguins] = useState([]);
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
              refreshIsland(baseURL.url, island.id)
              .then((updatedIsland) => {
                  setMovedPenguins([]);
                  setIsland(updatedIsland);
                  setRenewSpeed(2200-updatedIsland.evolutionSpeed * 200);
                  setMoveSpeed(1650-updatedIsland.evolutionSpeed * 150);
          
                  updatedIsland.penguins.forEach(penguin => {
                    if (penguin.key === selectedKey && ! penguin.alive) setSelectedKey(0);
                  });
          
                  if ( ! updatedIsland.running) {
                    setRunningState(constants.ENDED)
                  } 
          
                  if (updatedIsland.islands) {
                    setIslandsList(updatedIsland.islands);
                  }
              });
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
      refreshIsland(baseURL.url, island.id)
      .then((updatedIsland) => {
        setMovedPenguins([]);
        setIsland(updatedIsland);
        setRenewSpeed(2200-updatedIsland.evolutionSpeed * 200);
        setMoveSpeed(1650-updatedIsland.evolutionSpeed * 150);

        updatedIsland.penguins.forEach(penguin => {
          if (penguin.key === selectedKey && ! penguin.alive) setSelectedKey(0);
        });

        if ( ! updatedIsland.running) {
          setRunningState(constants.ENDED)
        } 

        if (updatedIsland.islands) {
          setIslandsList(updatedIsland.islands);
        }
      });
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

        if ( selectedPenguin && ! movedPenguins.includes(selectedPenguin.key)) {

          const afish = island.fishes.find(fish => fish.vpos === vpos && fish.hpos === hpos);
          const targetPenguin = island.penguins.find(penguin => penguin.vpos === vpos && penguin.hpos === hpos);
          const agem = island.gems.find(gem => gem.vpos === vpos && gem.hpos === hpos);
          const agarbage = island.garbages.find(garbage => garbage.vpos === vpos && garbage.hpos === hpos);
          const acell = island.tiles.find(tile => tile.vpos === vpos && tile.hpos === hpos);

          // console.log("on " + vpos + "/" + hpos + ", seledcted = " + selectedPenguin.vpos + "/" + selectedPenguin.hpos )

          if (selectedPenguin && selectedPenguin.activity === constants.ACTIVITY_NONE &&
              ((Math.abs(vpos - selectedPenguin.vpos) === 1 && hpos === selectedPenguin.hpos) || 
              (Math.abs(hpos - selectedPenguin.hpos) === 1 && vpos === selectedPenguin.vpos))) {

            let command1 = ""
            let command2 = ""
            let dir = "D" 

            if (vpos < selectedPenguin.vpos) {
              dir = "U"
            } else if (vpos > selectedPenguin.vpos) {
              dir = "D"
            } else {
              if (hpos < selectedPenguin.hpos) {
                dir = "L"
              } else {
                dir = "R"
              }
            }

            if (afish && ! afish.onHook) {
              command1 = "F"
              command2 = dir
              selectedPenguin.goal = constants.ACTIVITY_FISHING
              selectedPenguin.activityText = "Going to fish"
              console.log("there is a fish")
            } else if (agem && ! agem.isTaken && ! selectedPenguin.isChild && ! selectedPenguin.isOld) {
              command1 = "G"
              command2 = dir
              selectedPenguin.goal = constants.ACTIVITY_GETING
              console.log("There is a gem")
              selectedPenguin.activityText = "Going to grab some ice "
            } else if (agarbage && ! agarbage.isTaken && selectedPenguin.hasShowel &&! selectedPenguin.isChild && ! selectedPenguin.isOld) {
              command1 = "C"
              command2 = dir
              selectedPenguin.goal = constants.ACTIVITY_CLEANING
              console.log("There is a garbage")  
              selectedPenguin.activityText = "Going to clean"  
            } else if (targetPenguin && targetPenguin.canLove && selectedPenguin.canLove && ! selectedPenguin.isChild && ! targetPenguin.isChild && ! selectedPenguin.isOld && ! targetPenguin.isOld && targetPenguin.gender !== selectedPenguin.gender) {
                command1 = "K"
                command2 = dir
                selectedPenguin.goal = constants.ACTIVITY_LOVING
                selectedPenguin.activityText = "Going to love"
                console.log("there is a loved once")
            } else if (acell.type > 0 && ! agem) {
              command1 = dir.toUpperCase().substring(0,1)  
              if (command1 === "L") {
                selectedPenguin.activityDirection =1;
              } else if (command1 === "R") {
                selectedPenguin.activityDirection =2;
              } else if (command1 === "U") {
                selectedPenguin.activityDirection =3;
              } else if (command1 === "D") {
                selectedPenguin.activityDirection =4;
              }
              selectedPenguin.goal = constants.ACTIVITY_MOVING
              console.log("It's going to " + command1)
              selectedPenguin.activityText = "Going to move to " + command1
            } else if (acell.type === 0 && selectedPenguin.hasGem && ! selectedPenguin.isChild && ! selectedPenguin.isOld) {
              command1 = "B"
              command2 = dir  
              selectedPenguin.goal = constants.ACTIVITY_BUILDING
              console.log("Let's build " + dir)
              selectedPenguin.activityText = "Going to move"
            } 

            if (command1 !== "") {
              setCommand(baseURL.url,island.id,selectedKey,command1,command2)
              .then((updatedIsland) => setIsland(updatedIsland));
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
    console.log("EAT BUTToN PRESSED for " + key);
   
    const selectedPenguin = island.penguins.find(penguin => penguin.key === selectedKey );
    selectedPenguin.goal = 1
    selectedPenguin.activityText = "Going to eat "

    setCommand(baseURL.url,island.id,key,"E","")
    .then((commandData) => console.log(commandData));
    setSelectedKey(0);
    setIlluminatedKey(0);
    setIsland(island)
    
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
    refreshIsland(baseURL.url, id)
    .then((updatedIsland) => setIsland(updatedIsland));
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
        {runningState !== constants.NOT_STARTED && <IslandArea showBalloons={showBalloons} runningState={runningState} island={island} onTileClick={handleTileClick} illuminatedKey={illuminatedKey} movedPenguins={movedPenguins} tileSize={tileSize} gridClass={gridClass} moveSpeed={moveSpeed}/>}
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

const refreshIsland = async (baseURL,islandId) => {
  const islandData = await convert(baseURL + "refresh/" + islandId);
  return extractIslandData(islandData);
}

const setCommand = async (baseURL,islandId,penguinId,command1,command2) => {
   const islandData = await convert(baseURL + "command/" + islandId + "?penguinId=" + penguinId + "&command1=" + command1 + "&command2=" + command2  );
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

  console.dir(islandData)
  
  
  const tiles = [];
  const artifacts = [];
  const penguins = [];
  const fishes = [];
  const gems = [];
  const garbages = [];
  const islands = [];

  if (islandData) {

    islandData.cells.forEach(cellsline => {
      cellsline.forEach(cell => {   
        tiles.push({key: cell.id, 
                  type: cell.type, 
                  angle: cell.angle, 
                  vpos: cell.vpos, 
                  hpos: cell.hpos})
  
      }); 
    });
 
    if (islandData.penguins) {

      islandData.penguins.forEach(penguin => {
        var gender = penguin.gender==="M"?"m":"f";
        var genderName  = penguin.gender==="M"?"Male":"Female";
        var canLove = penguin.canLove;
        if (penguin.isChild ) {
          gender = "y";
          canLove = false;
        } 
        var activity = penguin.activity;

        penguins.push({key: penguin.key, 
                      alive:penguin.alive, 
                      name:penguin.name, 
                      vpos:penguin.vpos, 
                      hpos:penguin.hpos, 
                      hasGem:penguin.hasGem, 
                      hasFish:penguin.hasFish,
                      gender: gender, 
                      activity: activity, 
                      hunger:penguin.hunger, 
                      temp:penguin.temp, 
                      shape:penguin.shape, 
                      age:penguin.age, 
                      isChild : penguin.isChild,
                      isOld: penguin.isOld,
                      genderName:genderName, 
                      activityDirection:penguin.activityDirection, 
                      activityText:penguin.activityText, 
                      goal:penguin.goal,
                      vision: 2,
                      canLove:canLove,
                      inLove:penguin.inLove,
                      hasShowel:penguin.hasShowel
                    })
      }); 
    }

    if (islandData.fishes) { 
      islandData.fishes.forEach(fish => {
        fishes.push({key: fish.key, 
                    vpos:fish.vpos, 
                    hpos:fish.hpos, 
                    onHook:fish.onHook, 
                    staying:false,
                    direction:fish.direction,
                    lastDirection:fish.lastDirection})
      });
    }

    if (islandData.gems) { 
      islandData.gems.forEach(gem => {
        gems.push({key: gem.key, 
                    vpos:gem.vpos, 
                    hpos:gem.hpos, 
                    age:gem.age,
                    isTaken:gem.isTaken,
                    hasShowel:gem.hasShowel})
      }); 
    }

    if (islandData.garbages) { 
      islandData.garbages.forEach(garbage => {
        garbages.push({key: garbage.key, 
                    vpos:garbage.vpos, 
                    hpos:garbage.hpos, 
                    kind:garbage.kind + 1})
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

    return {id: islandData.id,
            name: islandData.name,
            size: islandData.size,
            points: islandData.points,
            year: islandData.year,
            weather: islandData.weather,
            plasticControl: true,
            evolutionSpeed : islandData.evolutionSpeed,
            running: islandData.onGoing,
            tiles: tiles,
            artifacts: artifacts,
            penguins: penguins,
            fishes: fishes,
            gems: gems,
            garbages: garbages,
            islands: islands
          }

  } else {
    return {}
  }
}
