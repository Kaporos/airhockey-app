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
            platformId: "browser" | "android" | "ios" | String
        },
        currentPlayer: number,
        receive: (data: string) => void,
        from: string,

        ble: {
            isEnabled: (success: () => void, failure: () => void) => void,
            stopScan: (success: () => void, failure: () => void) => void,
            isLocationEnabled: (success: () => void, failure: () => void) => void,
            startLocationStateNotifications: (success: (state: boolean) => void, failure: () => void) => void,
            enable: (success: () => void, failure: () => void) => void,
            startScan: (services: string[], success: (device: any) => void, fail: (error: any) => void) => void,
            connect: (deviceId: string, success: () => void, fail: () => void) => void,
            read: (deviceId: string,  service_uuid: string, characteristic_uuid: string, success: (buffer: number[]) => void, fail: (error: string) => void) => void,

        }
    }

}