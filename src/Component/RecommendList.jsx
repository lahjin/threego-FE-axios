import {React, useEffect, useState} from "react";
import Header from "./Header";
import Bottom from "./Bottom";
import '../css/RecommendList.css'
import {Link} from "react-router-dom";
import axios from "axios";
import {apiUrl} from "../url";

function Categories(props) {

    const [click, setClick] = useState(false);

    const [clickStyle, setClickStyle] = useState(
        {
            backgroundColor: 'black',
            color: 'white'
        }
    )

    const [categoryList, setCategoryList] = useState();
    const [loading, setLoading] = useState(true);
    const [checkCategory, setCheckCategory] = useState(0);

    const getCategoryList = async () => {
        await axios({
            method: 'get',
            url: apiUrl + '/category',
            header: {
                "Content-Type": "application/json",
            },
            responseType: 'json'
        }).then((response) => {
            setCategoryList(response.data);
            setLoading(false);
        }).catch((error) => {
        })
    }

    useEffect(() => {
        getCategoryList();
    },[]);


    return(
        <>
        <Header/>

        <h1 className="NowLocation">추천여행지</h1>
            <div className="Category-Box">
                <div className="Small-Box">
                    <div className="SmallBtn" style={click==="전체" ? clickStyle : null} onClick={(e)=>{props.check(0)}}>
                        <span>전체</span>
                    </div>

                    {loading === true ? null :
                        categoryList.map((data) =>(
                            <div key={data.id} id={data.id} className="SmallBtn" onClick={(e)=>{props.check(e.target.id)}}>
                                <span id={data.id} onClick={(e)=>{props.check(e.target.id)}}>{data.name}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

function RecommendList() {

    const [travelInfo, setTravelInfo] = useState([
        {
            // 배경이미지도 추가할 예정 
            recommendId: 1,
            Categorie: '카페',
            recommendTitle: '영진전문대학',
            recommendSmallTitle: '영진전문대학교은 대한민국 대구광역시 북구와 경상북도 칠곡군에 있는 전문대학이다.',
            recommendImage: '/img/Yeongjin.jpg'
        },
        {
            recommendId: 2,
            Categorie: '맛집',
            recommendTitle: '스파크랜드',
            recommendSmallTitle: '스파크랜드는 쇼핑몰이자 놀이테마파크로서 중구의 새로운 랜드마크로 떠오르고 있다.',
            recommendImage: '/img/Daegu.jpg'
        },
        {
            recommendId: 3,
            Categorie: '액티비티',
            recommendTitle: '이월드',
            recommendSmallTitle: '이월드는 1987년 10월 타워건립 및 종합테마파크 조성공사 재 착공을 시작으로 1993년 종합 테마파크 마스트플랜을 확정한 후 1995년 3월 개장한 폭포, 분수, 조명, 꽃으로 장식된 유럽식 도시공원으로 남녀노소 누구나 즐길 수 있는 놀이기구, 전시. 예술공간, 깔끔한 식당가 등이 마련되어 있다. ',
            recommendImage: '/img/Eworld.jpg',
        
        },
        {
            recommendId: 4,
            Categorie: '숙소',
            recommendTitle: '대구 메리어트 호텔',
            recommendSmallTitle: '혁신 리더들에게 대구 메리어트 호텔은 완벽한 비즈니스와 활력을 불어넣는 경험을 제공하는 대구 최초의 메리어트 인터내셔널 5성급 호텔 입니다.',
            recommendImage: '/img/Hotel.jpg'
        },
    ]);

    const [tourList, setTourList] = useState([]);
    const [loading, setLoading] = useState(true);

    const getTour = async () =>{
        await axios({
            method: 'get',
            url: apiUrl + '/tour/list',
            header: {
                "Content-Type": "application/json",
            },
            responseType: 'json'
        }).then((response) => {
            setTourList(response.data);
            setLoading(false);
        }).catch((error) => {
        })
    }

    const getTourCategory = async (id) =>{
        setLoading(true);
        await axios({
            method: 'get',
            url: apiUrl + '/tour/category/' + id,
            header: {
                "Content-Type": "application/json",
            },
            responseType: 'json'
        }).then((response) => {
            setTourList(response.data);
            setLoading(false);
        }).catch((error) => {
        })
    }

    useEffect(()=>{
        getTour();
    },[])

    const [check, setCheck] = useState(0);

    useEffect(() =>{
        if(check === 0)
            getTour();
        else
            getTourCategory(check);
    }, [check])

    return(
    <>
        <div className="RecommendBox">   
            <Categories check={(check) =>{setCheck(check)}}/>
            <div className="TravelBox">
                {loading ===true ? '데이터를 불러오는 중입니다.' : tourList.map((t) => {
                        return (
                            <div className="TravelCard" key={t.id}>

                                <div className="ImageBox" >
                                    <img src="/img/Daegu.jpg" alt="추천 여행지 이미지" className="recommandImg" />
                                </div>
                                <div className="TextBox">
                                    <h3>{t.name}</h3>
                                    <span>{t.description}</span>
                                    <span></span>
                                </div>
                                
                                <div className="ButtonBox">
                                    <button><Link to={`/RecommendListInfo/${t.id}`}>여행시작</Link></button>
                                    <button>리뷰보기</button>
                                </div>
                            </div>
                        )
                })}
            </div>
            <Bottom/>
        </div>
    </>
    );
}

export default RecommendList;