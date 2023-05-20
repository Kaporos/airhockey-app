import {useEffect, useState} from "react";
import Winner from "./Winner";

interface ScoreProps {
    deviceId: string
}

const SERVICE_UUID = "a71120b3-6254-44bd-a27f-42a66f1732ba"
const CHARACTERISTIC_UUID = "32fe11c3-1807-4d05-81b3-4a301bdc3928"

export default function ScorePage(props: ScoreProps) {

    const [scores, setScores] = useState([0,0])

    useEffect(() =>  {

        setInterval(() => {
            window.ble.read(props.deviceId, SERVICE_UUID, CHARACTERISTIC_UUID, (buffer) => {
                var data = new Uint8Array(buffer);
                setScores([data[0], data[1]])
            }, (error) => {
                console.log("Failed", error);
            } )
        }, 500) //Reading score every half second


        if (window.cordova.platformId != "browser") {
            window.screen.orientation.lock("landscape")
        }


    }, [])


    if (scores[0] == 254) {
        return <Winner scores={scores}/>
    }

    return <div style={{position: "absolute", top: 0, right: 0, width: "100vw", height:"100vh", display: "flex"}}>
        <div style={{width: "50%", height: "100%", backgroundColor: "#e74c3c", display:"grid", placeItems: "center", color:"white"}}>
            <p style={{fontSize: "100px"}}>{scores[0]}</p>
        </div>
        <div style={{width: "50%", height: "100%", backgroundColor: "#3498db",display:"grid", placeItems: "center", color:"white"}}>
            <p style={{fontSize: "100px"}}>{scores[1]}</p>
        </div>


    </div>
}