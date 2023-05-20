import {useEffect, useState} from "react";

interface Props {
    scores: number[]
}

export default function Winner(props: Props) {
    var [color, setColor] = useState("")
    useEffect(() => {
        if (props.scores[1] == 1) {
            setColor("#3498db") //Blue
        } else {
            setColor("#e74c3c") //Red
        }
    }, [props.scores])
    return <div style={{position: "absolute", top: 0, left: 0, width:"100%", height: "100%", backgroundColor: color, display: "grid", placeItems: "center", color: "white"}}>
        <p style={{fontSize: "30px"}}>And the winner is the <strong>{props.scores[1] == 0 ? "red" : "blue"}</strong> player !</p>
    </div>
}