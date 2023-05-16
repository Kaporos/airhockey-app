import {useEffect, useState} from 'react'
import './App.css'
import EnablePrompt from "./Pages/Enable";
import ChoosePage from "./Pages/Choose";
import ScorePage from "./Pages/Score";

function App() {
    const [bluetoothEnabled, setBluetoothEnabled] = useState(false);
    const [locationEnabled, setLocationEnabled] = useState(false);
    const [connectedDeviceID, setConnectedDeviceID] = useState<string>("");

    //Check if user bluetooth is enabled
    useEffect(() => {
        window.ble.isEnabled(() => {
            console.log("Bluetooth is enabled.")
            setBluetoothEnabled(window.cordova.platformId != "browser")
            //Manually setting disabled bluetooth on browsers (testing purposes). Will be true for any other devices
        }, () => {
            console.log("Bluetooth is disabled.")
            setBluetoothEnabled(false)
        })
        if (window.cordova.platformId == "android") {
            window.ble.isLocationEnabled(() => {
                setLocationEnabled(true)
            }, () => {
                alert("Couldnt watch location")
            })
            window.ble.startLocationStateNotifications((state) => {
                setLocationEnabled(state)
            }, () => {
                alert("Couldnt watch location")
            })
        } else {
            setLocationEnabled(true)
        }


    }, [])

    if (!locationEnabled) {
        return <h1>Enable your location (needed to scan bluetooth devices).</h1>
    }

    if (!bluetoothEnabled && window.cordova.platformId == "android"){
        return <EnablePrompt setBluetooth={setBluetoothEnabled}/>
    } else if (!bluetoothEnabled) {
        return <h1>Bluetooth should be enabled. Enable it and restart the app.</h1>
    }

    if (connectedDeviceID == "") {
        return <ChoosePage setConnectedDeviceID={setConnectedDeviceID}  />
    }

    return <ScorePage deviceId={connectedDeviceID}/>
}

export default App
