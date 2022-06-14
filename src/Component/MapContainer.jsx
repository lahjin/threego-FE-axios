import React, { useEffect } from 'react';

const {kakao} = window;

const MapContainer = ({lat, lng}) => {

    useEffect(() =>{
        const container = document.getElementById('myMap');

        const options = {
            center: new kakao.maps.LatLng(lat, lng),
            level: 3
        }
        const map = new kakao.maps.Map(container, options);

        // 마커가 표시될 위치입니다
        const markerPosition  = new kakao.maps.LatLng(lat, lng);

        // 마커를 생성합니다
        const marker = new kakao.maps.Marker({
            position: markerPosition
        });

// 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
    })
    return (
        <div id='myMap' style={{
            margin: '0 auto',
            marginTop: '5px',
            marginBottom: '5px',
            width: '300px',
            height: '300px'
        }}>
        </div>
    );
}

export default MapContainer;