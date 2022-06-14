import {useEffect, useState} from "react";

function Url(){
    const [serverUrl, setServerUrl] = useState();

    const setUrl = (e) =>{
        let url = document.getElementById("url").value;
        localStorage.setItem("serverUrl", url);
        setServerUrl(url);
    }

    const setResetUrl = () =>{
        localStorage.removeItem("serverUrl");
        setServerUrl(null);
    }

    useEffect(()=>{
        setServerUrl(localStorage.getItem("serverUrl"));
    },[])

    return (
        <>
        <label htmlFor="url">서버 주소</label>
        <input id="url"/>
        <button onClick={setUrl}>저장</button>
        <button onClick={setResetUrl}>초기화</button>
            <h5>현재 서버 주소 : {serverUrl == null ? "http://localhost:3527/api" : serverUrl}</h5>
        </>
    )
}

export default Url;