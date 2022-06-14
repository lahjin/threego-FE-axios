import React from "react";
import Header from "./Header";
import Bottom from "./Bottom";
import { FiAlertCircle,  FiHelpCircle, FiUsers  } from "react-icons/fi";
import { Link } from "react-router-dom";
import '../css/CustomerService.scss'

function CustomerService() {

    return(
        <div className="CustomerServiceBigBox">
        <Header fontColor="black"/>
        <div></div>
        <div className="CustomerServiceHeader">
            
            <div className="TopText">
                <h2>고객센터</h2>
                <h3>원하시는 서비스를 선택해주세요</h3>
            </div>

            <div className="LinkBox">
                <Link to="/NoticeList">
                    <div className="ServiceBox">
                        <FiAlertCircle className="icons"/>
                        <p>공지사항</p>
                    </div>
                </Link>

                <Link to="/CustomerQuestion">
                    <div>
                        <FiHelpCircle className="icons"/>
                        <p>자주묻는 질문</p>
                    </div>
                </Link>

                <Link to="/InquireList">
                    <div>
                        <FiUsers className="icons"/>
                        <p>문의내역 보기</p>
                    </div>
                </Link>
            </div>

            <div className="BtnBox">
                <Link to="/InquireWrite">
                    <button>1:1 문의 작성</button>    
                </Link>
            </div>
        </div>


    
        <Bottom/>
        </div>
    )
}

export default CustomerService;