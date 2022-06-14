import React, {useState, useRef, useEffect} from "react";
import Header from "./Header";
import Bottom from "./Bottom";
import '../css/RecommendListInfo.scss'
import { GoLocation } from "react-icons/go";
import {useParams} from "react-router-dom";
import axios from "axios";
import {apiUrl} from "../url";
import Tracking from "./Tracking";
import {getLocation} from "../location";
import {getCookie} from "../cookie";

function TourForm({TravelInfo,index,start, lat, lng}) {

    const url = "https://map.kakao.com/link/to/" + TravelInfo.name + "," + TravelInfo.latitude + "," + TravelInfo.longitude;

    const speechGuide = () => {
        if(!window.speechSynthesis) {
            alert("음성 재생을 지원하지 않는 브라우저입니다. 크롬, 파이어폭스 등의 최신 브라우저를 이용하세요");
            return;
        }
        var lang = 'ko-KR';
        var utterThis = new SpeechSynthesisUtterance(TravelInfo.guide);

        utterThis.lang = lang;
        utterThis.pitch = 1;
        utterThis.rate = 1;

        window.speechSynthesis.speak(utterThis);

    }

    const [distance, setDistance] = useState();

    const locationCalc = () => {
        setDistance(getDistanceFromLatLonInKm(lat, lng, TravelInfo.latitude, TravelInfo.longitude));
    }

    function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1);
        var a =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2)
        ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c; // Distance in km
        return d;
    }

    function deg2rad(deg) {
        return deg * (Math.PI/180)
    }

    const clickGuide = () =>{
        console.log(distance);
        if(distance > 0.05){
            alert("50미터 내외에서만 가이드 음성을 들을수 있습니다. 현재 위치를 갱신해주세요.");
        }else if(isNaN(distance)){
            alert("현재 위치를 불러오는 중입니다. 잠시 후에 다시 시도 해주세요.");
        }
        else{
            speechGuide();
        }
    }

    useEffect(()=>{
        locationCalc();
    },[])

    useEffect(()=>{
        locationCalc();
    },[lat, lng])

    return (
        <div className="tourForm">
            <div className="TopTextArea">
                <h1 className="NumberText">{index}.</h1>
                <h2>{TravelInfo.name}</h2>
            </div>
            <p className="LocationInfo"><GoLocation/> {TravelInfo.address}</p>
            <a className="tourStart" href={url} style={start ===true ? {display: 'inline-block'} : {display: 'none'}}>안내시작</a>
            <button className="tourGuide" style={start ===true ? {display: 'inline-block'} : {display: 'none'}} onClick={clickGuide}>가이드 음성</button>
            <div className="ImageForm" >
                <img src='/img/Daegu.jpg' alt="사진" style={start ===true ? {display: 'none'} : null}/>
            </div>
            
           
            <p className="GuideInfoText">{TravelInfo.description}</p>
        </div>
    )
}

function RecommendListInfo() {

    const param = useParams();

    const [tourName, setTourName] = useState();
    const [tourNameLoading, setNameLoading] = useState(true);

    const getTourName = async (id) => {
        await axios({
            method: 'get',
            url: apiUrl + '/tour/' + id,
            header: {
                "Content-Type": "application/json",
            },
            responseType: 'json'
        }).then((response) => {
            setTourName(response.data.name);
            setNameLoading(false);
        }).catch((error) => {
        })
    }

    const [tourPlacesInfo, setTourPlacesInfo] = useState([]);
    const [tourLoading, setTourLoading] = useState(true);

    const getTourInfo = async (id) => {
        await axios({
            method: 'get',
            url: apiUrl + '/tourPlaces/' + id,
            header: {
                "Content-Type": "application/json",
            },
            responseType: 'json'
        }).then((response) => {
            setTourPlacesInfo(response.data);
            setTourLoading(false);
        }).catch((error) => {
        })
    }

    useEffect(()=>{
        getTourName(param.id);
        getTourInfo(param.id);
    },[])


    const [placeInfo, setPlaceInfo] = useState([]);
    const [placeLoading, setPlaceLoading] = useState(true);

    const getPlace = async (index) =>{
        await axios({
            method: 'post',
            url: apiUrl + '/place',
            header: {
                "Content-Type": "application/json",
            },
            responseType: 'json',
            data: {
                "index": index
            }
        }).then((response) => {
            setPlaceInfo(response.data);
            setPlaceLoading(false);
        }).catch((error) => {
        })
    }

    useEffect(()=>{
        let placeList = [];
        tourPlacesInfo.map((k)=>{
            placeList.push(k.place_id);
        });
        getPlace(placeList);
    },[tourLoading])

    const [start, setStart] = useState(false);

    const startTour = () =>{
        if(getCookie("loginToken") == null){
            alert("로그인 후 사용 가능한 서비스 입니다.");
            return;
        }
        setStart(true);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    const [currentLat, setCurrentLat] = useState();
    const [currentLng, setCurrentLng] = useState();

    const getCurrentLocation = (lat, lng) =>{
        setCurrentLat(lat);
        setCurrentLng(lng);
    }
    return (
        <div className="RecommendListInfoBigBox">
            <Header/>
            
            <div className="TitleImageBox">
                <img src="/img/Daegu.jpg" alt="지역에 대한 이미지" />
            </div>

            <h1 className="TourName">{tourNameLoading === true ? null : tourName}</h1>

            {start === true ? <Tracking getCurrentLocation={getCurrentLocation}/> : null}

            <div className="RecommendListInfoContentBox">    
                {tourLoading === true && placeLoading === true ? '데이터를 불러오는 중 입니다.' : placeInfo.map((p, index) => <TourForm key={p.place_id} TravelInfo={p} index={index+1} start={start} lat={currentLat} lng={currentLng}/>)}
            </div>
            
            <div className="BtnBox">
                <button className="GoTravelBtn" onClick={()=>{startTour()}} style={start ===true ? {display: 'none'} : {display: 'block'}}>여행시작!</button>
            </div>
            <Bottom/>
        </div>
    )
}

export default RecommendListInfo