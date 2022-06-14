import React from "react";
import Header from "./Header";
import Bottom from "./Bottom";
import '../css/NoticeDetail.scss'
import {useLocation} from "react-router";
function NoticeDetail() {



    const location = useLocation();

    const IsNotice = location.state.Notice;

    return (
        <div className="NoticeDetailBigBox">
             <Header fontColor="black"/>

             <div className="NoticeDetailContentBox">
                 <h1>공지사항</h1>
                 <hr />
                
                 <div className="NoticeDetailContent">
                    

                    <div className="NoticeDetailTextContent">
                        <header>
                            <p>{IsNotice.title} </p>
                            <p>{IsNotice.date}</p>
                        </header>
                        <p>
                            {IsNotice.content}
                        </p>

                        {/*<img src="/img/Daegu.jpg" alt="이미지 파일" />*/}
                    </div>     
                       
                   
                 </div>
             </div>

             <Bottom/>
        </div>
    );
}

export default NoticeDetail