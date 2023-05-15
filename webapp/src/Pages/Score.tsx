import {useEffect, useState} from "react";
import Winner from "./Winner";

interface ScoreProps {
    deviceId: string
}

export default function ScorePage(props: ScoreProps) {

    const [scores, setScores] = useState([0,0])

    useEffect(() =>  {
        const separator = ";"
        window.currentPlayer = -1
        const messageHandler = (data: string) => {
            console.log(data)
            //Converting data to number data
            let new_scores = data.replace("\n","").split(separator).map(x => parseInt(x))
            setScores(new_scores)
        }
        const errorHandler = (error: any) => {}
        window.bluetoothClassicSerial.subscribe(props.deviceId, "\n", messageHandler, errorHandler)

        if (window.cordova.platformId != "browser") {
            window.screen.orientation.lock("landscape")
        }

        return () => {
            window.bluetoothClassicSerial.unsubscribe(props.deviceId, messageHandler, errorHandler)
        }
    }, [])


    if (scores[0] == 5 || scores[1] == 5) {
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