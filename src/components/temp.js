import useStore from '../store/useStore'
import { useFrame } from "@react-three/fiber";
import { useEffect } from "react";

function Character(){

     const character = useStore( (state) => { return state.character });
     const follow_character = useStore( (state) => { return state.follow_character });
    const baseSize = useStore( ( state ) => { return state.baseSize });
    const mazeSchematic = useStore( ( state ) => { return state.mazeSchematic });
    console.log( mazeSchematic );
    const gridSize = mazeSchematic.columnCount;
    const characterSize = useStore( ( state ) => { return state.characterSize });
    const meshData = useStore( (state) => { return state.meshData});  

   
    
    let forward = 0;
    let right = 0;
    let down = 0;
    let left = 0;
     let index = gridSize - 1;
     let area = [];

    const makeAreaInvisible = (areaList, index) => {
        console.log( areaList );
        let tempCurrentRow = mazeSchematic.data[index].row;
        let tempCurrentCol = mazeSchematic.data[index].col;
        areaList.forEach( element => {
            if( element >= 0 && element <= (gridSize * gridSize) - 1){
                
                let tempElementRow = mazeSchematic.data[element].row;
                let tempElementCol = mazeSchematic.data[element].col;
                
                if( ( Math.abs( tempCurrentRow - tempElementRow ) == 1 ) && ( Math.abs( tempCurrentCol - tempElementCol ) == 0 )){
                    meshData[element][0].material[0].opacity = 0.2;
                }
                if( ( Math.abs( tempCurrentRow - tempElementRow ) == 0 ) && ( Math.abs( tempCurrentCol - tempElementCol ) == 1 )){
                    meshData[element][0].material[0].opacity = 0.2;
                }
                if( ( Math.abs( tempCurrentRow - tempElementRow ) == 1 ) && ( Math.abs( tempCurrentCol - tempElementCol ) == 1 )){
                    meshData[element][0].material[0].opacity = 0.2;
                }
                if( ( Math.abs( tempCurrentRow - tempElementRow ) == 0 ) && ( Math.abs( tempCurrentCol - tempElementCol ) == 0 )){
                    meshData[element][0].material[0].opacity = 0.2;
                }
                
                
            }
        });
        area = [];
    }

    const characterMovement = (event) =>{
        
        // console.log( meshData );
        var name = event.key;
        var code = event.code;

        let characterPosition = character.current.position;
       
        index = Math.floor( characterPosition.x / ( baseSize[0] / gridSize )) + gridSize * (Math.floor( characterPosition.z / ( baseSize[0] / gridSize )));

    

        let cell = mazeSchematic.data[index];

        // let firstT = 1;// index - 1 left
        // let secondT = 1;//index + 1 right
        // let thirdT = 1;//index - columnCount top
        // let fourthT = 1;//index + columnCount bottom

        // let fifthtT = 1;// index - columnCount - 1
        // let sixthT  = 1; // index + columnCount -1
        // let seventhT  = 1; // index + columncounter + 1
        // let  eightT = 1; // index - columnCount + 1

        // let firstT =  (( index - 1 ) >= 0 ) ? meshData[index - 1] : null;
        // let secondT = (( index + 1 ) <= (gridSize - 1) ) ? meshData[index + 1] : null;
        // let thirdT = (( index - mazeSchematic.columnCount ) >= 0 ) ? meshData[index - mazeSchematic.columnCount] : null;
        // let fourthT = (( index + mazeSchematic.columnCount ) <= (gridSize - 1) ) ? meshData[index + mazeSchematic.columnCount] : null;

        // let fifthtT =(( index - mazeSchematic.columnCount - 1 ) >= 0 ) ? meshData[index - mazeSchematic.columnCount] : null;
        // let sixthT  = (( index + mazeSchematic.columnCount - 1 ) <= (gridSize - 1) ) ? meshData[index + mazeSchematic.columnCount] : null;
        // let seventhT  = (( index + mazeSchematic.columnCount + 1) <= (gridSize - 1) ) ? meshData[index + mazeSchematic.columnCount] : null;
        // let  eightT = (( index - mazeSchematic.columnCount ) >= 0 + 1) ? meshData[index - mazeSchematic.columnCount] : null;

        

        // console.log( firstT);

        //0   1    2    3    4
        //5   6    7    8    9
        //10  11   12   13   14
        //15  16   17   18   19
        //20  21   22   23   24
        

        if( code === "ArrowUp" && !cell.walls[3]){
            forward = 1;
            // area.push( index - 1 );
            // area.push( index + 1 );
            // area.push( index - mazeSchematic.columnCount - 1 );
            // area.push( index + mazeSchematic.columnCount - 1);
            // area.push( index - mazeSchematic.columnCount - 2 );
            // area.push( index + mazeSchematic.columnCount - 2 );
            // area.push( index + mazeSchematic.columnCount );
            // area.push( index - mazeSchematic.columnCount );

            // makeAreaInvisible( area, index );
        }
        if( code === "ArrowRight" && !cell.walls[0]){
            right = 1;
        }
        if( code === "ArrowDown" && !cell.walls[1]){
            
            down = 1;
        }
        if( code === "ArrowLeft" && !cell.walls[2]){
            left = 1;
        }
};

    useFrame(()=>{
        if( forward ){
            document.removeEventListener('keydown',characterMovement);
            // console.log("character is moving forward!!");
            follow_character.current.position.x = character.current.position.x - ( baseSize[0] / gridSize );
          
            character.current.position.x = character.current.position.x - ( baseSize[0] / gridSize );
            
            
            forward = 0;
            document.addEventListener('keydown',characterMovement);
            if( (index - 1)=== (gridSize * gridSize) - gridSize ){
               
                console.log("WON WON WON WON");
            }
        }
        if( right ){
            document.removeEventListener('keydown',characterMovement);
            
            // console.log("character is moving right!!");
            follow_character.current.position.z = character.current.position.z - ( baseSize[0] / gridSize );

            character.current.position.z = character.current.position.z - ( baseSize[0] / gridSize );
           

            right = 0;
            document.addEventListener('keydown',characterMovement);
            if( (index - gridSize)=== (gridSize * gridSize) - gridSize ){
              
                console.log("WON WON WON WON");
     
            }
           
        }
        if( down ){
            document.removeEventListener('keydown',characterMovement);
            
            // console.log("character is moving down!!");
            follow_character.current.position.x = character.current.position.x + ( baseSize[0] / gridSize );
 
            character.current.position.x = character.current.position.x + ( baseSize[0] / gridSize );
           
            down = 0;
            document.addEventListener('keydown',characterMovement);
            if( (index + 1) === (gridSize * gridSize) - gridSize ){
              
                console.log("WON WON WON WON");
       
            }
        }
        if( left ){
            document.removeEventListener('keydown',characterMovement);
            
            // console.log("character is moving left!!");
            follow_character.current.position.z = character.current.position.z + ( baseSize[0] / gridSize );
            character.current.position.z = character.current.position.z + ( baseSize[0] / gridSize );
            
            left = 0;
            document.addEventListener('keydown',characterMovement);
            if( ( index + gridSize)=== (gridSize * gridSize) - gridSize ){
                
                console.log("WON WON WON WON");
               
            }
        }
    });

    useEffect(()=>{
        if( meshData.length!=0 && mazeSchematic.length!=0)
        {
            document.addEventListener('keydown',characterMovement);
            area.push(gridSize - 1); //current
            area.push(gridSize - 2); //front
            area.push(2*gridSize - 1);//left
            area.push(2*gridSize - 2);//front + left

            makeAreaInvisible( area, gridSize - 1 );
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
                    <meshStandardMaterial color = "hotpink" />
                </mesh>

                <mesh ref = { follow_character } position = {[ baseSize[0] - (( baseSize[0] / gridSize ) / 2) ,2,(( baseSize[0] / gridSize ) / 2 )]}>
                    <sphereGeometry  args={[characterSize, 16, 16]} />
                    <meshStandardMaterial color = "hotpink" />
                </mesh>
            </>
        );
    
    
}

export default Character;