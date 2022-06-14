import React from "react";
import Header from "./Header";
import Bottom from "./Bottom";
import {useLocation} from "react-router";
import '../css/InquireDetail.scss'

function InquireDetail() {

    const location = useLocation();
    const IsInquire = location.state.Inquire;
    console.log(IsInquire)

    return (
        <div className="InquireDetailBigBox">
            <Header fontColor="black"/>
            <div className="InquireDetailContentBox">
                <h2>문의내역</h2>
                
                <div className="UserArea">
                    
                    <div className="TopArea">
                        <button>Q</button>
                        <h3>{IsInquire.Title}</h3>
                    </div>

                    <div className="MiddleArea">
                        <p className="">
                            {IsInquire.Content}
                        </p>
                    </div>

                </div>

                <div className="AdminArea" style={IsInquire.Process ? {} : {display: 'none'} }>
                    <div className="TopArea">
                        <button>A</button>
                        <h3>답변 제목에 대한 영역입니다.</h3>
                    </div>

                    <div className="MiddleArea">
                        <p className="">
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry's standard dummy text
                        ever since the 1500s, when an unknown printer took a galley of type
                        and scrambled it to make a type specimen book. It has survived not only
                        five centuries, but also the leap into electronic typesetting, remaining essentially
                        unchanged. It was popularised in the 1960s with the release of Letraset sheets containing 
                        Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker 
                        including versions of Lorem Ipsum.
                        </p>
                    </div>
                </div>


            </div>
            <Bottom/>
        </div>
    );
}

export default InquireDetail;