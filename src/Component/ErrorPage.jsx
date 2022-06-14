import React from "react";
import {Router, useHistory, useParams} from "react-router-dom";
import { Link } from "react-router-dom";
import '../css/ErrorPage.css'
function ErrorPage() {

    const ErrorList = [
        {
            ErrorNumber: 400,
            ErrorText: '잘못된 요청입니다.'
        },
        {
            ErrorNumber: 401,
            ErrorText: '인증되지 않은 사용자 입니다.'
        },
        {
            ErrorNumber: 403,
            ErrorText: '접근 권한이 없습니다.'
        },
        {
            ErrorNumber: 404,
            ErrorText: '페이지를 찾을 수 없습니다.'
        },
        {
            ErrorNumber: 500,
            ErrorText: '내부 사이트 오류 입니다.'
        },

    ]

    const param = useParams();

    let index = ErrorList.findIndex( (arg) => arg.ErrorNumber == param.error);
    index = index === -1 ? 0 : index;

    const history = useHistory()

    return (
        <div className="ErrorBox">
            <h1>ThreeGo</h1>
            
            <div className="ErrorImgBox">
                <img src="/img/ErrorImage.jpg" alt="Not found Error Image" />
            </div>
            

            <h2>{ErrorList[index].ErrorNumber}</h2>
            
            <h3>{ErrorList[index].ErrorText}</h3>

            <Link to='/'><button>메인페이지로</button></Link>
         
            <button onClick={() => {history.goBack()}}>이전페이지로</button>
           
        </div>
    )

}

export default ErrorPage;