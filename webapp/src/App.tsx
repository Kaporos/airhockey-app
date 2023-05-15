import {useEffect, useState} from 'react'
import './App.css'
import EnablePrompt from "./Pages/Enable";
import ChoosePage from "./Pages/Choose";
import ScorePage from "./Pages/Score";

function App() {
    const [bluetoothEnabled, setBluetoothEnabled] = useState(false);
    const [connectedDeviceID, setConnectedDeviceID] = useState<string>("");

    //Check if user bluetooth is enabled
    useEffect(() => {
        window.bluetoothClassicSerial.isEnabled((t) => {
            console.log("Bluetooth is enabled.")
            setBluetoothEnabled(window.cordova.platformId != "browser")
            //Manually setting disabled bluetooth on browsers (testing purposes). Will be true for any other devices
        }, () => {
            console.log("Bluetooth is disabled.")
            setBluetoothEnabled(false)
        })

        if (window.cordova.platformId == "browser") {
            //This function act like a fake bluetooth device
            //By using receive() method, we can emulate received data from a bluetooth device.
            //69 is to mark end of the message. See Score.tsx for more details
            window.receive = (d) => {window.from = d+"\n"}
            window.bluetoothClassicSerial.register((data) => {
                if (data && data.input) {
                    //Printing data we sent to the fake bluetooth device using bluetoothClassicSerial.write
                    console.log("Arduino should received : ", data.input)
                    data.input = ""
                }
                if (window.from != undefined) {
                    //Sending fake data from bluetooth fake device to bluetoothClassicSerial.read
                    data.output = window.from
                    // @ts-ignore because this line is ugly. But it works.
                    window.from = undefined
                }
            })
        }

    }, [])

    if (!bluetoothEnabled){
        return <EnablePrompt setBluetooth={setBluetoothEnabled}/>
    }

    if (connectedDeviceID == "") {
        return <ChoosePage setConnectedDeviceID={setConnectedDeviceID}  />
    }

    return <ScorePage deviceId={connectedDeviceID}/>
}

export default App
