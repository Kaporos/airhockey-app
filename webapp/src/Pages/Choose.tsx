import {useEffect, useState} from "react";

interface ChooseProps {
    setConnectedDeviceID: (identifier: string) => void;
}

interface Device {
    id: string,
    name: string
}

export default function ChoosePage(props: ChooseProps) {

    const [devicesList, setDevicesList] = useState<Device[]>([]);
    useEffect(() => {

        //Fake devices for browser because we cannot access real bluetooth.
        if (window.cordova.platformId == "browser") {
            setDevicesList([
                {
                    name: "Air Hockey 2000",
                    id :"2000"
                }
            ])
            return
        }

        //Called when a new device is discovered !
        window.bluetoothClassicSerial.setDeviceDiscoveredListener((device: Device) => {
            setDevicesList(devicesList => {
                //Checking if device already discovered
                if (devicesList.filter(x => x.name == device.name).length == 0 && device.name) {
                    devicesList.push(device)
                }

                //Creating a new list object to be sure react updates.
                return [...devicesList]
            })
        })

        setInterval(() => {
            window.bluetoothClassicSerial.discoverUnpaired(() => {
                console.log("End of scan");
            }, () => {
                console.log("Couldn't scan")
            })
        }, 10000 )
        //Start the scan of devices !

    }, [])


    const connect = (deviceId: string) => {

        //Fake connect for browser
        if (window.cordova.platformId == "browser") {
            props.setConnectedDeviceID("la purée c'est cool")
            return
        }
        //Magic string for android. Don't mind. https://stackoverflow.com/questions/4632524/how-to-find-the-uuid-of-serial-port-bluetooth-device
        window.bluetoothClassicSerial.connect(deviceId, "00001101-0000-1000-8000-00805F9B34FB", () => {
            console.log("Connected !")
            props.setConnectedDeviceID(deviceId)
        }, () => {
            alert("Failed to connect. Please try again.")
        })
    }

    return <>

        <p>Cliquez sur le Air-Hockey pour vous connecter !</p>
        <div style={{
            "display": "flex",
            "flexDirection": "column",
            "width": "100%",
            "height": "100%",
            "alignItems": "center",
            "justifyContent": "center"
        }}>

            {devicesList.map(device => <>
                <button style={{border: "none", marginTop: "15px", outline: "none", padding: "10px 15px", borderRadius: 5, backgroundColor: "#25CCF7"}} onClick={() => {connect(device.id)}}>{device.name}</button>
            </>)}

            {devicesList.length > 0 ? <></> : <h3>Scanning...</h3>}

        </div>


    </>
}