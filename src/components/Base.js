import useStore from "../store/useStore";
import { DoubleSide } from "three";

function Base(){

    const baseSize = useStore( ( state ) => { return state.baseSize } );
    const playareaSize = useStore( ( state ) => { return state.playareaSize });
    const boundary = useStore( ( state ) => { return state.boundary }); 

    console.log( playareaSize );


    return(
        <>
                //blakish base
                <mesh position = { [ (playareaSize[0] /2 )- boundary / 2, playareaSize[2] / 2 ,(playareaSize[1] / 2 )- boundary / 2]  } rotation = { [ Math.PI / 2,0,0 ] } >
                    <boxGeometry args = { [playareaSize[0] , playareaSize[1] , playareaSize[2] ] } />
                    <meshStandardMaterial color = "#800020" />
                </mesh>

                //between blaksih base and maze
                <mesh rotation = {[Math.PI / 2,0,0]} position = {[ baseSize[0] / 2, playareaSize[2] + 0.0001, baseSize[1] / 2]} >
                    <planeGeometry args = { [baseSize[0], baseSize[0] ]} />
                    <meshStandardMaterial side={DoubleSide} color = "#333333" />
                </mesh>
        </>
    );
}

export default Base;