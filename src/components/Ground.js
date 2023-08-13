import { DoubleSide } from "three";
import useStore from "../store/useStore";

function Ground(){
    const baseSize = useStore( ( state ) => { return state.baseSize });

    return(
        <>
            //hot pink large full screen plane
            <mesh rotation = {[Math.PI / 2,0,0]} position = {[ baseSize[0] / 2, -0.0001, baseSize[0] / 2]} >
                <planeGeometry args = {[ 50,50,50 ]} />
                <meshStandardMaterial side={DoubleSide} color = "#b19085" />
            </mesh>
        </>
    );
}

export default Ground;