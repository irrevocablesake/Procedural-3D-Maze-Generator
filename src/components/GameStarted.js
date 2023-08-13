import { Canvas, useThree } from '@react-three/fiber'
import Base from './Base';
import { OrbitControls, Sparkles, Text } from '@react-three/drei'
import Maze from './Maze'
import Character from './Character'
import Ground from './Ground';
import useStore from '../store/useStore';
import Gamewin from './Gamewin'


import * as THREE from 'three'
import LandingPage from './LandingPage';




function GameStarted(){

   const cameraPosition = useStore( ( state ) => { return state.cameraPosition });
   const playareaSize = useStore( ( state ) => { return state.playareaSize });
   const WON = useStore( ( state ) => { return state.WON });
   const START_GAME = useStore( ( state ) => { return state.START_GAME });
  
    const cam = cameraPosition[5];

    console.log( cameraPosition );
 
 if( WON == 0){

 
    return(
        <Canvas orthographic 
            // {
            //     position: [0,2,0],
            //     top: 0 ,
            //     right: 10 ,
            //     bottom: -10,
            //     left: 0 ,
            //     zoom:  40 
            // }}
             >
            
            {/* position: [cam[0],cam[1],cam[2]],
                top: cameraPosition[0] ,
                right:  cameraPosition[1] ,
                bottom: cameraPosition[2] ,
                left: cameraPosition[3] ,
                zoom:  cameraPosition[4] ,
            }} > */}

            <primitive object = { new THREE.AxesHelper(10)} />
            {/* <OrbitControls /> */}
           {/* <ambientLight intensity = { 1 } position = { [ 0,3,0 ] } /> */}
           {/* <directionalLight intensity = { 1 } /> */}
           {/* <pointLight color = "white" intensity = { 4 } position = { [ 1.7,1,1.7 ] } />
           <pointLight color = "white" intensity = { 4 } position = { [ 2.7,1,2.7 ] } />
           <pointLight color = "white" intensity = { 4 } position = { [ 3.7,1,3.7 ] } />
           <pointLight color = "white" intensity = { 4 } position = { [ 4.7,1,4.7 ] } /> */}
           {/* <rectAreaLight scale = {[ 1,1,1 ]} color = "white" intensity = {0} position={[ 2,4,2 ]} rotation={[-Math.PI / 2,0,0]}/> */}
           <rectAreaLight height={7} width={7} scale = {[ 1,1,1 ]} color = "blue" intensity = {1} position={[ 3.5,4,3.5 ]} rotation={[-Math.PI / 2,0,0]}/>
           <rectAreaLight height={7} width={7} scale = {[ 1,1,1 ]} color = "pink" intensity = {1} position={[ 3.5,4,3.5 ]} rotation={[-Math.PI / 2,0,0]}/>
           <rectAreaLight height={5} width={5} scale = {[ 1,1,1 ]} color = "red" intensity = {2} position={[ 2.5,4,2.5 ]} rotation={[-Math.PI / 2,0,0]}/>
           <Sparkles count={250} size={3} position={[3, 3, 3]} color = "#a2d870" speed={0.9} scale = {[8,3,8]} />
                <Ground />
                <Base />
                <Character />
                <Maze />
                <Text
                position = {[playareaSize[0] + 0.5,0.7,0]}
        scale={[0.3, 1, 1]}
        color="black" // default
        anchorX="center" // default
        anchorY="middle" // default
        
      >
        START
      </Text>

      <Text
                position = {[-0.5,0.7,playareaSize[0]]}
        scale={[0.3,1, 1]}
        // rotation={[0,0,Math.PI]}
        color="black" // default
        anchorX="center" // default
        anchorY="middle" // default
        
      >
        GOAL
      </Text>
         
        </Canvas>
    );
  }
  else if( WON == 1 ){
    return( <Gamewin />);
  }
  else if( WON == 2){
    START_GAME(0);
    return (<LandingPage />);
  }
       
}

export default GameStarted;