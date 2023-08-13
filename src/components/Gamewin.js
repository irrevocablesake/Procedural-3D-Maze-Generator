import GameStarted from "./GameStarted"

import useStore from "../store/useStore";

function Gamewin(){
    const setWON = useStore( ( state ) => { return state.setWON });

    const landingPage = () => {
        window.location.reload();
    };

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

    return(
    <>
        <h1 className="gameWonTitle">YOU WON THE GAME</h1>
        <button className = "gameWonButton" onClick={landingPage} >GO TO MAIN PAGE</button>
    </>
    );
}

export default Gamewin;