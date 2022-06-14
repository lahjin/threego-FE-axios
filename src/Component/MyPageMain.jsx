import {React, useEffect, useState} from "react";
import Header from './Header';
import Bottom from './Bottom';
import {Link, useHistory} from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import '../css/MyPageMain.scss'
import {getCookie} from "../cookie";
import axios from "axios";
import {apiUrl} from "../url";

function MyPageMain() {

    const userInfo = getCookie("loginToken");

    const history = useHistory();
    const [reviewCount, setReviewCount] = useState(0);
    const [tourCount, setTourCount] = useState(0);
    const [askCount, setAskCount] = useState(0);

    useEffect(() =>{
        getReviewCount();
        getAskCount();
    })

    const getReviewCount = () => {
        axios({
            method: 'get',
            url: apiUrl + '/review/user/count/' + userInfo.id,
            header: {
                "Content-Type": "application/json",
            },
            responseType: 'json'
        }).then((response) => {
            setReviewCount(response.data);
        }).catch((error) => {
        })
    }

    const getAskCount = () => {
        axios({
            method: 'get',
            url: apiUrl + '/ask/user/count/' + userInfo.id,
            header: {
                "Content-Type": "application/json",
            },
            responseType: 'json'
        }).then((response) => {
            setAskCount(response.data);
        }).catch((error) => {
        })
    }

    return (
        <div className="MyPageMainBigBox">
            {
                userInfo === undefined ? history.push("/Error/500") : null
            }
            <Header fontColor="black"/>

            <div className="MyPageMainContentBox">
                
                <div className="UserInfo">
                    <div className="TopArea">
                        <img src="/img/userImage.png" alt=""  />
                        <h3>{userInfo.nickname}님</h3>
                    </div>
                     
                    <div className="MiddleArea">

                        <Link to="/ReviewManagement">
                            <div>
                                <h4>{reviewCount}</h4>
                                <h4>리뷰 관리</h4>
                            </div>
                        </Link>
                        
                        <Link to="/TravelManagement">
                            <div>
                                <h4>{tourCount}</h4>
                                <h4>여행 관리</h4>
                            </div>
                        </Link>

                        <Link to="/InquireManagement">
                            <div>
                                <h4>{askCount}</h4>
                                <h4>문의 관리</h4>
                            </div>
                        </Link>

                    </div>
                </div>

                <div className="PageMoveBox">
                    <Link to="/ProfileEdit">
                        <div>
                            <span>개인정보 변경</span>
                            <FiChevronRight/>
                        </div>
                    </Link>

                    <Link to="/CustomerService">
                        <div>
                            <span>고객센터</span>
                            <FiChevronRight/>
                        </div>
                    </Link>
                    
                    <Link to="/NoticeList">
                        <div>
                            <span>공지사항</span>
                            <FiChevronRight/>
                        </div>
                    </Link>


                    <Link to="/CustomerQuestion">
                        <div>
                            <span>자주하는 질문</span>
                            <FiChevronRight/>
                        </div>
                    </Link>

                    <Link to="/">
                        <div>
                            <span>로그아웃</span>
                            <FiChevronRight/>
                        </div>
                    </Link>
                </div>
                
            </div>

            <Bottom/>
        </div>
    )
}

export default MyPageMain