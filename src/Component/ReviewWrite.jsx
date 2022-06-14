import React, { useState } from "react";
import { FaStar } from 'react-icons/fa';
import '../css/ReviewWrite.scss'
import { useEffect } from "react";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import axios from "axios";


function ReviewWrite() {


    // 별의 갯수만큼 ARRAY 설정
    const ARRAY = [0, 1, 2, 3, 4];
    // 제목 글자수 입니다.
    const [titleSize, setTitleSize] = useState();
    // 리뷰내용 글자수 입니다.
    const [contentSize, setContentSize] = useState();
    // 숫자로 된 점수입니다.
    const [ScoreNumebr, setScoreNumber] = useState(0);
    // 이미지를 저장할 오브젝트 변수입니다.
    const [PreviewImage, setPreviewImage] = useState([]);

    // 제목 글자가 적혀질 때 setState를 통해 변경된 값을 저장합니다.
    const TitlesizeCalculation = (e) => {
        setTitleSize(e.target.value.length);
    }

    // 리뷰 내용 글자가 적혀질 때 setState를 통해 변경된 값을 저장합니다.
    const ContentsizeCalculation = (e) => {
        setContentSize(e.target.value.length);
    }

    // 리뷰 Star에 대한 변수입니다.
    const [active, setActive] = useState([
        {
            id:1,
            active: false
        },
        {
            id:2,
            active: false
        },
        {
            id:3,
            active: false
        },
        {
            id:4,
            active: false
        },
        {
            id:5,
            active: false
        }
     ]);

    const handleStarClick = index => {
        let Actives = [...active]; // active 배열 복사
        for (let i = 0; i < 5; i++) {
          Actives[i] = i <= index ? true : false; // 복사한 active에서 클릭한 값만큼 true로 바꿔준다.
        }
        // 복사한 active를 setActive를 통해 값을 변경한다.
        setActive(Actives);
      };

    // useEffect를 통해서 active값이 변하거나 페이지가 렌더링 될 때 console.log에 active를 나타나게 설정
    useEffect(()=>{
        console.log(active)
        sendReview();
    }, [active])

    useEffect(() => {
        console.log(titleSize)
    }, [titleSize])

    useEffect(() => {
        console.log(contentSize)
    }, [contentSize])

    // filterBoolean을 통해서 active에 True인 boolean값을 가져온다.
    const sendReview = () => {
        let score = active.filter(Boolean).length; // 그럼 이 값이 점수가 된다.
        console.log(score);
    };



    // 리뷰 이미지에 대한 함수입니다.
    const ReviewImage = (e) => {
    
        // 현재 파일에 대한 정보를 가져옵니다.
        const ReviewImg = e.target.files;
        //사진 파일이 있는지 체크
        if(ReviewImg[0]){
            let reader = new FileReader();

            //첫번째 파일을 읽어들임
            reader.readAsDataURL(e.target.files[0]);
            //로드 성공시 실행되는 함수
            reader.onload = () =>{

                const newPreviewImg = {
                    id: PreviewImage.length + 1,
                    Image: reader.result.toString()
                }
                setPreviewImage([...PreviewImage, newPreviewImg]);
            }
        }


    }

    // 만약 이미지 갯수가 3개가 넘었다면 FIle을 추가하는 div를 숨기는 스타일을 적용하기 위한 변수입니다.
    const ImgFilePreview={
        display: 'none'
    }

    const BtnBackColor={
        backgroundColor: "Gray"
    }

    console.log(PreviewImage.length)

    const remove = (id) => {
        const NewPreviewImage = PreviewImage.filter(Image => Image.id !== id);
        setPreviewImage(NewPreviewImage);
    }

   

    return (
        <>
            {/* 상단부분 */}
            <header className="ReviewWriteHeader">
                리뷰 작성 
            </header>

            <div className="ReviewArea">
                
                <div className="PointArea">
                    <h2>여행은 어떠셨나요??</h2>
                    <div className="ScoreBox">
                        {ARRAY.map((el, idx) => { // map을 통해 ARRAY값을 가져오고 
                            return (
                                <FaStar
                                key={idx} // key = 0~4까지
                                size="50" // 
                                onClick={() => {handleStarClick(el);}} // 클릭시 handleStarClick 함수 실행 
                                className={active[el] && 'yellowStar'} // 참이라면 yellowStar 활성화
                                />
                            );
                        })}  
                    </div>
                    {/* <h2>{active.filter(Boolean).length}</h2> */}
                </div>
    
                <div className="WriteArea">
                    <div className="GuideText" >
                        <p>제목</p>
                        <p>최소 10자</p>
                    </div>

                    <input type="text" placeholder="제목을 입력해주세요" className="Title" onChange={TitlesizeCalculation}/>
            
                    <div className="GuideText">
                        <p>내용</p>
                        <p>최소 10자</p>
                    </div>

                    <textarea name="" id="" className="WriteContent" placeholder="내용을 입력해주세요" onChange={ContentsizeCalculation} ></textarea>
   
                    

                    <div className="GuideText">
                        <p>사진등록</p>
                    </div>

                    <div className="ReviewWriteImageArea">
        
                        
                        {/* <img src={"/img/" + Image} alt="Image" /> */}
                        {/* accept="image/*"은 이미지만 업로드 가능하게 하는것 */}

                        {PreviewImage.map(a => (<img src={a.Image} alt="" key={a.id} onClick={()=>{remove(a.id)}}/>))}
                     
                        {/* 이미지가 3개가 넘으면 display:none이 되도록 설정 */}
                        <label className="ReviewImgLabel" style={PreviewImage.length >=3 ? ImgFilePreview : {}} >
                            <IoDocumentAttachOutline size="40px"/>
                            <span>이미지 추가</span>
                            <input type="file" name="file" accept="image/*" onChange={ReviewImage}/>
                        </label>

                    </div>
                </div>

                <footer className="ReviewWriteBottom">
                    <button  disabled={titleSize>=10  && contentSize>=10 ? "" : "disabled"} style={titleSize>=10  && contentSize>=10 ? {} : BtnBackColor}>등록하기</button>
                </footer>
            </div>
                
        </>
    )
}

export default ReviewWrite;