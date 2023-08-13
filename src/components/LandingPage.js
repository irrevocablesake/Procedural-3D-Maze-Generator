import { useEffect } from "react";
import useStore from "../store/useStore";
import GameStarted from "./GameStarted";
import { useState } from "react";

async function fetchData( setMazeSchematic, setGotSchematic){
    try{
        const response = await fetch("http://192.168.0.104:5000/generate");
        if( !response.ok ){
          throw new Error( "Network response was not ok ");
        }

        const data = await response.json();

        setMazeSchematic( data );
        setGotSchematic( 1 );
    }
    catch{

    }
}

function LandingPage(){
    const gameStarted = useStore( ( state ) => { return state.gameStarted });
    const START_GAME = useStore( ( state ) => { return state.START_GAME });
    const setMazeSchematic = useStore( ( state )  => { return state.setMazeSchematic });
    const mazeSchematic = useStore( ( state )  => { return state.mazeSchematic });
     const playareaSizeobj = useStore( ( state ) => { return state.playareaSize });
    const baseSize = useStore( ( state ) => { return state.baseSize });
    const setCameraPosition = useStore( ( state ) => { return state.setCameraPosition });
    const cameraPosition = useStore( ( state ) => { return state.cameraPosition });
    const setBoundary = useStore( ( state ) => { return state.setBoundary });
    const wallWidth = useStore( ( state ) => { return state.wallWidth });
    const wallHeight = useStore( ( state ) => { return state.wallHeight });
    const setWallWidth = useStore( ( state ) => { return state.setWallWidth });
    const setWallHeight = useStore( ( state ) => { return state.setWallHeight });
    const setCharacterSize = useStore( ( state ) => { return state.setCharacterSize });
    const characterSize = useStore( ( state ) => { return state.characterSize });

    const [ isFetching, setIsFetching ] = useState( 0 );
    const [ gotSchematic, setGotSchematic ] = useState( 0 );
    const [ startRender, setStartRender ] = useState( 0 );

    useEffect(() => {
      if( gameStarted ){
        setIsFetching( 1 );
        fetchData(  setMazeSchematic, setGotSchematic );  
      }
    },[gameStarted]);

    useEffect(() => {
      console.log(playareaSizeobj);
      console.log( baseSize);
      console.log( "CAMERA UPDATED", cameraPosition );
    },[playareaSizeobj, baseSize, cameraPosition]);

    useEffect(() =>{
      if(gotSchematic){
        console.log("got schematic");
        console.log(mazeSchematic);
        let gridSize = mazeSchematic.columnCount;

       
        console.log( characterSize );
        setIsFetching( 0 );
        setStartRender( 1 );
      }
      
    },[gotSchematic]);

    const startGame = () =>{
      START_GAME(1);
    };

    if( gameStarted == 0 || gameStarted == 2){
        return ( 
          <>
            <h1 className = "gameTitle" >PROCEDURAL 3D MAZE GAME</h1>
            <h3 className = "gameTitle" >Use arrow keys</h3>
            <button onClick = { startGame } className = "startGameButton">CLICK TO START</button>
        </>
        );
    } else if( isFetching ){
        return(
          <h1 className = "fetching">FETCHING DATA IS IN PROGRESS......</h1>
        );
    }else if( startRender ){
      return(
        <GameStarted />
      );
    }
}

export default LandingPage;