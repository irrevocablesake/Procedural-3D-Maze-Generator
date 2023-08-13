import * as THREE from 'three'
import {  useFrame, useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import useStore from '../store/useStore';



// We can ask user for the size of grid and we can also have a default size
// We then can send the request to the server by sending those dimensions!

// let gridSize = 7;

const wallColor = [
    // 0xff0000,
    // 0x0000ff,
    // 0x800080,
    // 0x008000,
    0xffffff, 0xffffff, 0xffffff, 0xffffff,
] 

//red, blue, purple, green  
function Maze(){
    const cameraPosition = useStore( ( state ) => { return state.cameraPosition });

    const cam = cameraPosition[5];

    const wallWidth = useStore( ( state ) => { return state.wallWidth });
    const wallHeight = useStore( ( state ) => { return state.wallHeight });

    console.log( wallWidth, wallHeight);

    

     {/* position: [cam[0],cam[1],cam[2]],
                top: cameraPosition[0] ,
                right:  cameraPosition[1] ,
                bottom: cameraPosition[2] ,
                left: cameraPosition[3] ,
                zoom:  cameraPosition[4] ,
            }} > */}

    const { camera } = useThree();
  

    const { scene } = useThree();
    const baseSize = useStore( ( state ) => { return state.baseSize });
    const playareaSize = useStore( ( state ) => { return state.playareaSize });
    const mazeSchematic = useStore( ( state ) => { return state.mazeSchematic });
    console.log( mazeSchematic );
    const gridSize = mazeSchematic.columnCount;
    const setMeshData =useStore( (state ) => { return state.setMeshData});
   
    const handleResize = () => {
        const width = window.screen.width;
        const pixelRatio = window.devicePixelRatio;

        let elemOne = document.getElementById("mobileControlUp");
        let elemTwo = document.getElementById("mobileControlRight");
        let elemThree = document.getElementById("mobileControlDown");
        let elemFour = document.getElementById("mobileControlLeft");

        if( elemOne != null ){
            elemOne.remove();
        }
        if( elemTwo != null ){
            elemTwo.remove();
        }
        if( elemThree != null ){
            elemThree.remove();
        }
        if( elemFour != null ){
            elemFour.remove();
        }

        const buttonUp = document.createElement("button");

        // Set the button's text content to the right arrow symbol (→)
        buttonUp.textContent = "\u2191"; // Unicode right arrow symbol    
        buttonUp.style.color = 'white'; // Set text color
        buttonUp.id = 'mobileControlUp';
        buttonUp.className='mobileControls';
     
         // Set position and other styles
         buttonUp.style.position = 'absolute';
         buttonUp.style.bottom = '13%';
         buttonUp.style.left = '60%';
         buttonUp.style.right = '20%';
         buttonUp.style.top = '72%';

         buttonUp.style.zIndex = '100';

         buttonUp.style.width = "50px";
         buttonUp.style.height = "50px";

        

         const buttonRight = document.createElement("button");

         // Set the button's text content to the right arrow symbol (→)
         buttonRight.textContent = "\u2192"; // Unicode right arrow symbol    
         buttonRight.style.color = 'white'; // Set text color
         buttonRight.id = 'mobileControlRight';
         buttonRight.className='mobileControls';
      
          // Set position and other styles
          buttonRight.style.position = 'absolute';
         
          buttonRight.style.zIndex = '100';
          buttonRight.style.width = "50px";
          buttonRight.style.height = "50px";

        

          const buttonDown = document.createElement("button");

          // Set the button's text content to the right arrow symbol (→)
          buttonDown.textContent = "\u2193"; // Unicode right arrow symbol    
          buttonDown.style.color = 'white'; // Set text color
          buttonDown.id = 'mobileControlDown';
          buttonDown.className='mobileControls';
       
           // Set position and other styles
           buttonDown.style.position = 'absolute';
         
           buttonDown.style.zIndex = '100';
           buttonDown.style.width = "50px";
           buttonDown.style.height = "50px";


           const buttonLeft = document.createElement("button");

          // Set the button's text content to the right arrow symbol (→)
          buttonLeft.textContent = "\u2190"; // Unicode right arrow symbol    
          buttonLeft.style.color = 'white'; // Set text color
          buttonLeft.id = 'mobileControlLeft';
          buttonLeft.className='mobileControls';
       
           // Set position and other styles
           buttonLeft.style.position = 'absolute';
         
           buttonLeft.style.zIndex = '100';
           buttonLeft.style.width = "50px";
           buttonLeft.style.height = "50px";

           
      

      

            switch (true) 
            {
                case width / pixelRatio >= 900: //mobile
              
           

                console.log('mobile');
                camera.top = cameraPosition[0] + 1;
                camera.right= cameraPosition[1] + 1;
                camera.bottom = cameraPosition[2] - 1;
                camera.left = cameraPosition[3] - 1;
     
                let buttonSize = "50px";

                buttonUp.style.width = buttonSize;
                buttonUp.style.height = buttonSize;

                buttonUp.style.bottom = '13%';
                buttonUp.style.left = '75%';
                buttonUp.style.right = '5%';
                buttonUp.style.top = '72%';

                buttonRight.style.width = buttonSize;
                buttonRight.style.height = buttonSize;

                buttonRight.style.bottom = '5%';
                buttonRight.style.left = '80%';
                buttonRight.style.right = '00%';
                buttonRight.style.top = '80%';

                buttonDown.style.width = buttonSize;
                buttonDown.style.height =buttonSize;

                buttonDown.style.bottom = '5%';
                buttonDown.style.left = '75%';
                buttonDown.style.right = '5%';
                buttonDown.style.top = '80%';

                buttonLeft.style.width = buttonSize;
                buttonLeft.style.height = buttonSize;

                buttonLeft.style.bottom = '5%';
                buttonLeft.style.left = '70%';
                buttonLeft.style.right = '10%';
                buttonLeft.style.top = '80%';
     
             camera.zoom = cameraPosition[4] + 0.1;
                break;
                case width / pixelRatio >= 600 && width / pixelRatio < 900: //mobile
              
               

                console.log('mobile');
                camera.top = cameraPosition[0] + 1.5;
                camera.right= cameraPosition[1];
                camera.bottom = cameraPosition[2] - 1.5;
                camera.left = cameraPosition[3];
     
                let buttonSize2 = "50px";

                buttonUp.style.width = buttonSize2;
                buttonUp.style.height = buttonSize2;

                buttonUp.style.bottom = '13%';
                buttonUp.style.left = '70%';
                buttonUp.style.right = '10%';
                buttonUp.style.top = '72%';

                buttonRight.style.width = buttonSize2;
                buttonRight.style.height = buttonSize2;

                buttonRight.style.bottom = '5%';
                buttonRight.style.left = '80%';
                buttonRight.style.right = '00%';
                buttonRight.style.top = '80%';

                buttonDown.style.width = buttonSize2;
                buttonDown.style.height =buttonSize2;

                buttonDown.style.bottom = '5%';
                buttonDown.style.left = '70%';
                buttonDown.style.right = '10%';
                buttonDown.style.top = '80%';

                buttonLeft.style.width = buttonSize2;
                buttonLeft.style.height = buttonSize2;

                buttonLeft.style.bottom = '5%';
                buttonLeft.style.left = '60%';
                buttonLeft.style.right = '15%';
                buttonLeft.style.top = '80%';
     
             camera.zoom = cameraPosition[4] + 0.1;
                break;
              case width / pixelRatio < 600 && width / pixelRatio >= 420: //mobile
              
           

                console.log('mobile');
                camera.top = cameraPosition[0] + 5;
                camera.right= cameraPosition[1];
                camera.bottom = cameraPosition[2] - 5;
                camera.left = cameraPosition[3];
     
                let buttonSize3 = "40px";

                buttonUp.style.width = buttonSize3;
                buttonUp.style.height = buttonSize3;

                buttonUp.style.bottom = '13%';
                buttonUp.style.left = '60%';
                buttonUp.style.right = '15%';
                buttonUp.style.top = '72%';

                buttonRight.style.width = buttonSize3;
                buttonRight.style.height = buttonSize3;

                buttonRight.style.bottom = '5%';
                buttonRight.style.left = '70%';
                buttonRight.style.right = '10%';
                buttonRight.style.top = '80%';

                buttonDown.style.width = buttonSize3;
                buttonDown.style.height =buttonSize3;

                buttonDown.style.bottom = '5%';
                buttonDown.style.left = '60%';
                buttonDown.style.right = '15%';
                buttonDown.style.top = '80%';

                buttonLeft.style.width = buttonSize3;
                buttonLeft.style.height = buttonSize3;

                buttonLeft.style.bottom = '5%';
                buttonLeft.style.left = '50%';
                buttonLeft.style.right = '25%';
                buttonLeft.style.top = '80%';
     
             camera.zoom = cameraPosition[4] + 0.1;
                break;

                case width / pixelRatio < 420 && width / pixelRatio > 0: //mobile
               
                console.log('vivo');
                camera.top = cameraPosition[0] + 10;
                camera.right= cameraPosition[1];
                camera.bottom = cameraPosition[2] - 6;
                camera.left = cameraPosition[3];
     
            
     
             camera.zoom = cameraPosition[4] + 0.1;

             let buttonSize4 = "35px";

             buttonUp.style.width = buttonSize4;
             buttonUp.style.height = buttonSize4;

             buttonUp.style.bottom = '13%';
             buttonUp.style.left = '60%';
             buttonUp.style.right = '15%';
             buttonUp.style.top = '72%';

             buttonRight.style.width = buttonSize4;
             buttonRight.style.height = buttonSize4;

             buttonRight.style.bottom = '5%';
             buttonRight.style.left = '70%';
             buttonRight.style.right = '10%';
             buttonRight.style.top = '80%';

             buttonDown.style.width = buttonSize4;
             buttonDown.style.height =buttonSize4;

             buttonDown.style.bottom = '5%';
             buttonDown.style.left = '60%';
             buttonDown.style.right = '15%';
             buttonDown.style.top = '80%';

             buttonLeft.style.width = buttonSize4;
             buttonLeft.style.height = buttonSize4;

             buttonLeft.style.bottom = '5%';
             buttonLeft.style.left = '50%';
             buttonLeft.style.right = '25%';
             buttonLeft.style.top = '80%';

            break;
                
             default:  camera.top = cameraPosition[0];
             camera.right= cameraPosition[1];
             camera.bottom = cameraPosition[2];
             camera.left = cameraPosition[3];
           
           
     
             camera.zoom = cameraPosition[4];
            }

            
           document.body.appendChild(buttonUp);
           document.body.appendChild(buttonRight);
           document.body.appendChild(buttonDown);
           document.body.appendChild(buttonLeft);

            camera.position.x = cam[0];
            camera.position.y = cam[1];
            camera.position.z = cam[2];

            camera.lookAt((5+0.3) / 2,0,(5+0.3)/ 2);
        camera.updateProjectionMatrix();
    };

    useEffect(() => {
       window.addEventListener('resize', handleResize);
       handleResize();
    },[]);

    useEffect(() =>{
        let meshData = [];
    //         Golden: #FFD700 (Gold)
    // Deep Navy Blue: #001F3F (Navy Blue)
    // Deep Maroon: #800000 (Maroon)
    // Muted Olive Green: #6B8E23 (Olive Green)
    // Deep Charcoal Gray: #333333 (Charcoal Gray)
    // Soft Dusty Rose: #D8A7B1 (Dusty Rose)
    for( let key in mazeSchematic.data)
    {
        const whiteMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity:1 }); 
        const goldenMaterial = new THREE.MeshStandardMaterial({ color: 0xFFD700 }); 
   
        let currentCell = [];
        const cell = mazeSchematic.data[key]; // { walls: [1,1,0,1], row: 0, col: 0 }

        const cellWalls = cell.walls; //[1,1,0,1]
        const cellRow = cell.row; // 0
        const cellCol = cell.col; // 0

        if( cellWalls[0] )
        {
            let geometry = new THREE.BoxGeometry( baseSize[0] / gridSize,wallHeight, wallWidth  );
            
            const materials = Array(6).fill(0); // 6 faces of a box

        
            //2 is for +y
            //0 is for +x
            //1 is for -x
            //4 is for +z
            //5 is for -z
            //3 is for -y



            // Change the material for the specific face
            materials[0] = whiteMaterial;
            materials[1] = whiteMaterial;
            materials[2] =goldenMaterial;
            materials[3] = whiteMaterial;
            materials[4] = whiteMaterial;
            materials[5] = whiteMaterial;


            let cube = new THREE.Mesh( geometry, materials );

            cube.position.y = ( playareaSize[2]) + 0.1 ; //DON'T CHANGE IT

            cube.position.x = 0 + (( baseSize[0] / gridSize ) / 2) + (( baseSize[0] / gridSize ) * cellCol ); 
            cube.position.z = 0 + (( baseSize[0] / gridSize ) * cellRow ); 


            // cube.position.x =  0 + (( baseSize[0] / gridSize ) * cellRow );
            // cube.position.z =  baseSize[0] - (( baseSize[0] / gridSize ) / 2 ) - ( cellCol * ( (( baseSize[0] / gridSize ))  ) );

            scene.add( cube );
            
           currentCell.push(cube);
    

            
        }
      
        if( cellWalls[1] )
        {
            let geometry = new THREE.BoxGeometry(  wallWidth,wallHeight, baseSize[0] / gridSize );
            
            const materials = Array(6).fill(0); // 6 faces of a box

            // Change the material for the specific face
            materials[0] = whiteMaterial;
            materials[1] = whiteMaterial;
            materials[2] = goldenMaterial;
            materials[3] = whiteMaterial;
            materials[4] = whiteMaterial;
            materials[5] = whiteMaterial;
            let cube = new THREE.Mesh( geometry, materials );

            cube.position.y = ( playareaSize[2]) + 0.1; //DON'T CHANGE IT

            cube.position.x =  0 + (( baseSize[0] / gridSize )) + (( baseSize[0] / gridSize ) * cellCol ); 
            cube.position.z =   0 + ( (baseSize[0] / gridSize ) / 2) + (( baseSize[0] / gridSize ) * cellRow );


            // cube.position.x =  0 + (( baseSize[1] / gridSize ) * cellRow ) + ( baseSize[1] / gridSize ) / 2;
            // cube.position.z = baseSize[0] - (( baseSize[0] / gridSize ) ) - ( cellCol * ( (( baseSize[0] / gridSize ))  ) );

        

            scene.add( cube );

            currentCell.push(cube);
        }
        
        if( cellWalls[2] )
        {
            let geometry = new THREE.BoxGeometry(baseSize[0] / gridSize,wallHeight, wallWidth );
            const materials = Array(6).fill(0); // 6 faces of a box

            // Change the material for the specific face
            materials[0] = whiteMaterial;
            materials[1] = whiteMaterial;
            materials[2] =goldenMaterial;
            materials[3] = whiteMaterial;
            materials[4] = whiteMaterial;
            materials[5] = whiteMaterial;
            let cube = new THREE.Mesh( geometry, materials );

            cube.position.y = ( playareaSize[2]) + 0.1 ; //DON'T CHANGE IT

            cube.position.x = 0 + (( baseSize[0] / gridSize ) / 2) + (( baseSize[0] / gridSize ) * cellCol ); 
            cube.position.z = 0 +  ( baseSize[0] / gridSize ) + (( baseSize[0] / gridSize ) * cellRow ); 


            // cube.position.x =  (baseSize[0] / gridSize) + (( baseSize[0] / gridSize ) * cellRow );
            // cube.position.z =  baseSize[0] - (( baseSize[0] / gridSize ) / 2 ) - ( cellCol * ( (( baseSize[0] / gridSize ))  ) );

            scene.add( cube );

            currentCell.push(cube);
  
         
        }
      

        if( cellWalls[3] )
        {
            let geometry = new THREE.BoxGeometry(  wallWidth,wallHeight, baseSize[0] / gridSize  );
            const materials = Array(6).fill(0); // 6 faces of a box

            // Change the material for the specific face
            materials[0] = whiteMaterial;
            materials[1] = whiteMaterial;
            materials[2] =goldenMaterial;
            materials[3] = whiteMaterial;
            materials[4] = whiteMaterial;
            materials[5] = whiteMaterial;

            let cube = new THREE.Mesh( geometry, materials );

            cube.position.y = ( playareaSize[2]) + 0.1; //DON'T CHANGE IT

            cube.position.x =  0 + (( baseSize[0] / gridSize ) * cellCol ); 
            cube.position.z =   0 + ( (baseSize[0] / gridSize ) / 2) + (( baseSize[0] / gridSize ) * cellRow );


            // cube.position.x =  0 + (( baseSize[1] / gridSize ) * cellRow ) + ( baseSize[1] / gridSize ) / 2;
            // cube.position.z = baseSize[0] - ( cellCol * ( (( baseSize[0] / gridSize ))  ) );

            scene.add( cube );

          
            currentCell.push(cube);

           
          
        }
        meshData.push(currentCell);
        
    }
    setMeshData( meshData );
   
},[])

    return(
        <>
        
        </>
    );
}

export default Maze;