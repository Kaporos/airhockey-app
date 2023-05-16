interface EnablePrompt {
    setBluetooth: (value: boolean) => void;
}

function EnablePrompt(props: EnablePrompt) {

    const enable = () => {
        if (window.cordova.platformId == "browser") {
            props.setBluetooth(true)
        }

        window.ble.enable(() => {
            props.setBluetooth(true)
        }, () => {})
    }

    return <>
        <div style={{display: "flex", flexDirection:"column", alignItems:"center", justifyContent: "center", height: "100%"}}>
            <h1 style={{marginBottom: "20px"}}>Bienvenue !</h1>
            <p>On dirait bien que ton bluetooth n'est pas activé, mais il est requis pour se connecter au <strong>Air Hockey 2000 !</strong></p>
            <button onClick={enable} style={{border: "none", marginTop: "15px", outline: "none", padding: "10px 15px", borderRadius: 5, backgroundColor: "#25CCF7"}}>Activer mon bluetooth</button>
        </div>
    </>
}

export  default EnablePrompt;