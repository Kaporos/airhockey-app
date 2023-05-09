import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

document.addEventListener("deviceready", () => {
    //@ts-ignore
    console.log(window.cordova)
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    )

})


declare global {
    interface Window {
        cordova: {
            platformId: "browser" | String
        },
        currentPlayer: number,
        receive: (data: string) => void,
        from: string,
        bluetoothClassicSerial: {
            connect: (deviceId: string, interfaceArray: string, successCallback: (t: any) => void, failedCallback: (error: any) => void) => void,
            register: (data: (data: any) => void) => void,
            disconnect: (successCallback: (t: any) => void, failedCallback: (error: any) => void) => void,
            discoverUnpaired: (successCallback: (t: any) => void, failedCallback: (error: any) => void) => void,
            enable: (successCallback: (t: any) => void, failedCallback: (error: any) => void) => void,
            isEnabled: (successCallback: (t: any) => void, failedCallback: (error: any) => void) => void,
            setDeviceDiscoveredListener: (newDevice: (t: {id: string, name: string}) => void) => void,
            subscribe: (deviceId: string, separator: string, success: (data: string) => void, failure: (error: any) => void) => void,
            unsubscribe: (deviceId: string, success: (data: string) => void, failure: (error: any) => void) => void,
            write: (deviceId: string, data: string, success: (data: string) => void, failure: (error: any) => void) => void
        }
    }
}