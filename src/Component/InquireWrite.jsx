import React from "react";
import Header from "./Header";
import Bottom from "./Bottom";
import '../css/InquireWrite.scss';
import { IoDocumentAttachOutline } from "react-icons/io5";
import { useState } from "react";
function InquireWrite() {
    
    const [titleSize, setTitleSize] = useState();
    // 리뷰내용 글자수 입니다.
    const [contentSize, setContentSize] = useState();
    // 숫자로 된 점수입니다.
    const [ScoreNumebr, setScoreNumber] = useState(0);
    const [PreviewImage, setPreviewImage] = useState([]);

    const TitlesizeCalculation = (e) => {
        setTitleSize(e.target.value.length);
    }

    // 리뷰 내용 글자가 적혀질 때 setState를 통해 변경된 값을 저장합니다.
    const ContentsizeCalculation = (e) => {
        setContentSize(e.target.value.length);
    }

    const ReviewImage = (e) => {
        // 현재 파일에 대한 정보를 가져옵니다.
        const ReviewImg = e.target.files;
        
        // newPreviewImg의 id는 현재 PreviewImage의 길이에서 + 1을 해주고, Image는 ReviewImg파일에 대한 정보를 저장합니다.
        const newPreviewImg = {
            id: PreviewImage.length + 1,
            Image: ReviewImg[0].name
        }

        // 새로운 PreviewImg에 대한 정보를 출력해봅니다.
        console.log(newPreviewImg);
        // 값을 갱신하여 화면에 출력되도록 합니다.
        setPreviewImage([...PreviewImage, newPreviewImg]);
    }

    // 만약 이미지 갯수가 3개가 넘었다면 FIle을 추가하는 div를 숨기는 스타일을 적용하기 위한 변수입니다.
    const ImgFilePreview={
        display: 'none'
    }

    const BtnBackColor={
        backgroundColor: "Gray"
    }

    const remove = (id) => {
        const NewPreviewImage = PreviewImage.filter(Image => Image.id !== id);
        setPreviewImage(NewPreviewImage);
    }

    return (
        <div className="InquireWriteBox">
            <Header fontColor="black"/>
            
            <div className="InquireWriteContentBox">
                <h2>문의 작성</h2>
                <hr />
                
                <div className="WriteArea">


                <div className="GuideText" >
                    <p>유형</p>
                </div>

                 <div className="SelectBox">
                    <select> 
                        <option value="1번">유형적기</option>
                        <option value="1번">1번</option>
                    </select>
                 </div>
                   

                    
                    <div className="GuideText" >
                        <p>제목</p>
                        <p>최소 10자</p>
                    </div>

                    <input type="text" placeholder="제목을 입력해주세요" className="InquireTitle" onChange={TitlesizeCalculation} />

                    <div className="GuideText">
                        <p>내용</p>
                        <p>최소 10자</p>
                    </div>

                    <textarea name="" id="" className="WriteContent" placeholder="내용을 입력해주세요" onChange={ContentsizeCalculation}></textarea>
                    
                    <footer className="InquireWriteBottom">
                    <button  disabled={titleSize>=10  && contentSize>=10 ? "" : "disabled"} style={titleSize>=10  && contentSize>=10 ? {} : BtnBackColor}>등록하기</button>
                    </footer>
                </div>
            </div>
            <Bottom></Bottom>
        </div>
    )
}

export default InquireWrite;