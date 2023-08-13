import useStore from '../store/useStore'
import { useFrame } from "@react-three/fiber";
import { useEffect } from "react";

function Character(){

     const character = useStore( (state) => { return state.character });
    const baseSize = useStore( ( state ) => { return state.baseSize });
    const mazeSchematic = useStore( ( state ) => { return state.mazeSchematic });
    console.log( mazeSchematic );
    const gridSize = mazeSchematic.columnCount;
    const characterSize = useStore( ( state ) => { return state.characterSize });
    const meshData = useStore( (state) => { return state.meshData});  
    const setWON = useStore( ( state ) => { return state.setWON });

   
    let forward = 0;
    let right = 0;
    let down = 0;
    let left = 0;
     let index = gridSize - 1;
     let transparentValue = 0.4;

    const makeAreaToggle = ( index, value) => {
       let tempCurrentRow = mazeSchematic.data[index].row;
       let tempCurrentCol = mazeSchematic.data[index].col;
    
        

       let indices = [ 
        index,
            index - 1, //front
            index + 1, //back
          index - mazeSchematic.columnCount - 1, //fron + right
           index + mazeSchematic.columnCount - 1,//front + left
           index - mazeSchematic.columnCount  , // right
           index + mazeSchematic.columnCount  , //left
            index + mazeSchematic.columnCount +1 , //left + back
            index - mazeSchematic.columnCount +1 //right + back
        ];

        indices.forEach(element => {
            if( element >= 0 && element <= (gridSize * gridSize) - 1){
                let tempTargetRow = mazeSchematic.data[element].row;
                let tempTargetCol = mazeSchematic.data[element].col;

                if( ( Math.abs( tempCurrentRow - tempTargetRow ) == 1 ) && ( Math.abs( tempCurrentCol - tempTargetCol ) == 0 )){
                    if( meshData[element][0].material[0]){
                        meshData[element][0].material[0].opacity = value;
                    }
                }
                if( ( Math.abs( tempCurrentRow - tempTargetRow ) == 0 ) && ( Math.abs( tempCurrentCol - tempTargetCol ) == 1 )){
                    if( meshData[element][0].material[0]){
                        meshData[element][0].material[0].opacity = value;
                    }
                }
                if( ( Math.abs( tempCurrentRow - tempTargetRow ) == 1 ) && ( Math.abs( tempCurrentCol - tempTargetCol ) == 1 )){
                    if( meshData[element][0].material[0]){
                        meshData[element][0].material[0].opacity = value;
                    }
                }
                if( ( Math.abs( tempCurrentRow - tempTargetRow ) == 0 ) && ( Math.abs( tempCurrentCol - tempTargetCol ) == 0 )){
                    if( meshData[element][0].material[0]){
                        meshData[element][0].material[0].opacity = value;
                    }
                    
                }
            }
        });
    }

    const characterMovement = (event) =>{
        
        // console.log( meshData );
        var keyCode = event.code;
        console.log(keyCode);

        let characterPosition = character.current.position;
       
        index = Math.floor( characterPosition.x / ( baseSize[0] / gridSize )) + gridSize * (Math.floor( characterPosition.z / ( baseSize[0] / gridSize )));

       

        let cell = mazeSchematic.data[index];        

        if( keyCode === "ArrowUp" && !cell.walls[3]){
            forward = 1;
           

            
        }
        if( keyCode === "ArrowRight" && !cell.walls[0]){
            right = 1;
        }
        if( keyCode === "ArrowDown" && !cell.walls[1]){
            
            down = 1;
        }
        if( keyCode === "ArrowLeft" && !cell.walls[2]){
            left = 1;
        }
};
const mobileUp = () => {
    characterMovement({code:"ArrowUp"});
};
const mobileRight = () => {
    characterMovement({code:"ArrowRight"});
};
const mobileDown = () => {
    characterMovement({code:"ArrowDown"});
};
const mobileLeft = () => {
    characterMovement({code:"ArrowLeft"});
};





    useFrame(()=>{
        if( forward ){
            document.removeEventListener('keydown',characterMovement);
            document.getElementById("mobileControlUp").onclick = null;
            // console.log("character is moving forward!!");
            makeAreaToggle(  index, 1 );
          
            character.current.position.x = character.current.position.x - ( baseSize[0] / gridSize );
            makeAreaToggle(index - 1, transparentValue );
            
            forward = 0;
            document.addEventListener('keydown',characterMovement);
            document.getElementById("mobileControlUp").onclick = mobileUp;
            if( (index - 1)=== (gridSize * gridSize) - gridSize ){
                document.removeEventListener('keydown',characterMovement);
               setWON(1);
            }
        }
        if( right ){
            document.removeEventListener('keydown',characterMovement);
            document.getElementById("mobileControlRight").onclick = null;
            makeAreaToggle(  index, 1 );
            // console.log("character is moving right!!");
      
            character.current.position.z = character.current.position.z - ( baseSize[0] / gridSize );
            makeAreaToggle(index - gridSize, transparentValue );

            right = 0;
            document.addEventListener('keydown',characterMovement);
            document.getElementById("mobileControlRight").onclick = mobileRight;
            if( (index - gridSize)=== (gridSize * gridSize) - gridSize ){
                document.removeEventListener('keydown',characterMovement);
                setWON(1);
     
            }
           
        }
        if( down ){
            document.removeEventListener('keydown',characterMovement);
            document.getElementById("mobileControlDown").onclick = null;
            makeAreaToggle(  index, 1 );
            // console.log("character is moving down!!");
      
            character.current.position.x = character.current.position.x + ( baseSize[0] / gridSize );
            makeAreaToggle(index + 1, transparentValue );
            down = 0;
            document.addEventListener('keydown',characterMovement);
            document.getElementById("mobileControlDown").onclick = mobileDown;
            if( (index + 1) === (gridSize * gridSize) - gridSize ){
                document.removeEventListener('keydown',characterMovement);
                setWON(1);
       
            }
        }
        if( left ){
            document.removeEventListener('keydown',characterMovement);
            document.getElementById("mobileControlLeft").onclick = null;
            makeAreaToggle(  index, 1 );
            // console.log("character is moving left!!");
            character.current.position.z = character.current.position.z + ( baseSize[0] / gridSize );
            makeAreaToggle(index + gridSize,transparentValue );
            left = 0;
            document.addEventListener('keydown',characterMovement);
            document.getElementById("mobileControlLeft").onclick = mobileLeft;
            if( ( index + gridSize)=== (gridSize * gridSize) - gridSize ){
                document.removeEventListener('keydown',characterMovement);
                setWON(1);
               
            }
        }
    });

   

    useEffect(()=>{
        if( meshData.length!=0 && mazeSchematic.length!=0)
        {
            document.addEventListener('keydown',characterMovement);
            document.getElementById("mobileControlUp").onclick = mobileUp;
            document.getElementById("mobileControlRight").onclick = mobileRight;
            document.getElementById("mobileControlDown").onclick = mobileDown;
            document.getElementById("mobileControlLeft").onclick = mobileLeft;
            makeAreaToggle(  gridSize - 1, transparentValue  );
        }
        let x = Math.floor( character.current.position.x );
        let z = Math.floor( character.current.position.z );

        console.log( x,z);

        if( index === (gridSize - 1)  ){
            console.log("GAME STARTED");
        }

        

    },[meshData, mazeSchematic]);

    
    
        return(
            <>
               <mesh ref = { character } position = {[ baseSize[0] - (( baseSize[0] / gridSize ) / 2) ,0.4,(( baseSize[0] / gridSize ) / 2 )]}>
                    <sphereGeometry  args={[characterSize, 16, 16]} />
                    <meshStandardMaterial emissive="red" emissiveIntensity={10} color = "red" />
                </mesh>

            </>
        );
        
      
    
    
}
export default Character;