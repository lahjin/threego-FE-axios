import React from "react";
import '../css/Bottom.css'

function Bottom() {
    return (
    <>
        <footer className="bottom">
            
            <div className="topText">
                <h3>ThreeGo</h3>
                
                <div className="BtnBox">
                    <button>문의하기</button>
                    <button>자주하는질문</button>
                </div>
            </div>

            <div className="centerText">
               <span>ThreeGo는 통신판매중개로서 당사자가 아니며 상품 거래정보 및 거래등에 대해 책임을 지지 않습니다.</span>
            </div>

            <div className="bottomText">
                <span>찾아오는길</span>
                <span>고객센터</span>
                <span>추후추가</span>
            </div>
        </footer>
    </>
    )
}

export default Bottom;