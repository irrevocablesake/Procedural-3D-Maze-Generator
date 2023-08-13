import { useEffect } from "react";
import useStore from "../store/useStore";
import GameStarted from "./GameStarted";
import { useState } from "react";

async function fetchData( setMazeSchematic, setGotSchematic){
  let width = 200;
  let height = 200;
  let cellSize = 10;
    try{
        const response = await fetch("http://192.168.0.104:5000/generate?width="+width+"&height="+height+"&cellSize="+cellSize);
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
    const setplayareaSize = useStore( ( state ) => { return state.setplayareaSize });
    const playareaSizeobj = useStore( ( state ) => { return state.playareaSize });
    const setbaseSize = useStore( ( state ) => { return state.setbaseSize });
    const baseSize = useStore( ( state ) => { return state.baseSize });

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
    },[playareaSizeobj, baseSize]);

    useEffect(() =>{
      if(gotSchematic){
        console.log("got schematic");
        console.log(mazeSchematic);
        let gridSize = mazeSchematic.columnCount;
        let boundary = 0;
        let playareaSize = [gridSize + boundary,gridSize +boundary,0.3]; //thic bottom
        setplayareaSize( playareaSize );
        setbaseSize( [gridSize, gridSize] );
        setIsFetching( 0 );
        setStartRender( 1 );
      }
      
    },[gotSchematic]);

    if( !gameStarted ){
        return ( 
            <button onClick = { START_GAME }>CLICK TO START</button>
        );
    } else if( isFetching ){
        return(
          <p>FETCHING DATA IS IN PROGRESS......</p>
        );
    }else if( startRender ){
      return(
        <GameStarted />
      );
    }
}

export default LandingPage;