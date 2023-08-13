import { create } from 'zustand';
import { createRef } from 'react';

let Bboundary = 0.3;
let Bsize = 6;
let Psize = Bsize + Bboundary;

const useStore =  create( (set, get) => ({
        gameStarted: 0,    
        START_GAME: (data) => {
            set( ( state ) => ({
                gameStarted: data
            }));
            console.log(get().mazeSchematic);
        },   
        
        WON: 0,
        setWON: (data) => {
            set( ( state ) => ({
                WON:data
            }));
        },
        mazeSchematic:[],
        setMazeSchematic: (data) => {
            set( ( state ) => ({
                mazeSchematic:data
            }));
            console.log(get().mazeSchematic);
            console.log(data);
          },

        cameraPosition:[Psize,Psize,-Psize,-Psize,1,[ 6.66666666667  , 7.14285714286 , 6.66666666667 ]],
        
        boundary: Bboundary,
        wallWidth:0.1,
        wallHeight: 1.4,
        characterSize: 0.2,
        baseSize:[Bsize,Bsize], 
        playareaSize:[Psize ,Psize , 0.3], 

        character: createRef(),
      
        meshData: [],
        setMeshData: ( data ) => {
            set( (state ) => ({
                meshData: data
            }));
            console.log( data );
        }
    })
);

export default useStore;