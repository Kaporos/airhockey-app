import {useEffect, useState} from "react";

interface ScoreProps {
    deviceId: string
}

const ACTION = 0;
const GOAL = 1;
const SETUP = 2;
const TEAM = 1;

export default function ScorePage(props: ScoreProps) {

    const [score, setScore] = useState(0)

    useEffect(() =>  {
        const separator = "69"
        window.currentPlayer = -1
        const messageHandler = (data: string) => {
            //Converting data to number data
            let bytes = data.replace("\n","").split("").slice(0, -1 * separator.length).map(x => parseInt(x))
            console.log("Just received ", bytes)
            if (bytes[ACTION] == GOAL) { //There is a goal !
                if (bytes[TEAM] == window.currentPlayer) {
                    setScore(score => score + 1)
                }
            }
            if (bytes[ACTION] == SETUP) {
                if (window.currentPlayer == -1) {
                    console.log("Current player set to", bytes[TEAM])
                    window.currentPlayer = (bytes[TEAM])
                }
            }
        }
        const errorHandler = (error: any) => {}
        window.bluetoothClassicSerial.subscribe(props.deviceId, "69", messageHandler, errorHandler)
        window.bluetoothClassicSerial.write(props.deviceId, "6969\n", () => {}, () => {
            alert("Failed to connect.")
            document.location.reload()
        } )
        return () => {
            window.bluetoothClassicSerial.unsubscribe(props.deviceId, messageHandler, errorHandler)
        }
    }, [])

    return <>

            Super score page !

            Score: {score}

    </>
}