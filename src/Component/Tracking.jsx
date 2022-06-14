import React, {useEffect, useState} from "react";
import MapContainer from "./MapContainer";
import {setLocation} from "../location";



function Tracking({getCurrentLocation}){
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [status, setStatus] = useState('현재 위치를 불러오는 중이에요.');

    const options = {
        enableHighAccuracy: false,
        timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
        maximumAge: 1000 * 3600 * 24,
    };

    const getLocation = () => {
        if (!navigator.geolocation) {
            setStatus('현재 사용하는 브라우저가 GPS를 지원하지 않아요.');
        } else {
            setStatus(null);
            navigator.geolocation.getCurrentPosition((position) => {
                setStatus(null);
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);
                getCurrentLocation(position.coords.latitude, position.coords.longitude);
            }, (error) => {
                setStatus('현재 위치를 탐색할 수 없어요.');
                console.log(error)
            });
        }
    }

    const getTrackingLocation = () => {
        if(!navigator.geolocation){
            setStatus('현재 사용하는 브라우저가 GPS를 지원하지 않아요.');
        }else {
            setStatus('현재 위치를 추적하고 있어요.');
            const watchId = navigator.geolocation.watchPosition((position) => {
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);
            }, (error) =>{
                setStatus('현재 위치를 탐색할 수 없어요.');
                setLat(37.547889);
                setLng(126.997128);
            },[options]);

        }
    }

    useEffect(() =>{
        getLocation();
    },[]);

    return (
        <div>
            <h3 style={{textAlign: 'center'}}>현재위치</h3>
            <h5>{status}</h5>
            <MapContainer lat={lat} lng={lng}/>
            <button style={{width: '75px', height: '20px', color: 'white', background: 'black', margin: '0 auto', display: 'block', borderRadius: '5px'}} onClick={getLocation}>갱신하기</button>
        </div>
    );
}

export default Tracking