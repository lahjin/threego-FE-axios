import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Bottom from "./Bottom";
import { Link } from 'react-router-dom';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
// 추천 여행지 영역
function RecommendInfo({recommend}) {
    return(
      <div className="imgarea" style={{backgroundImage: "url(" + recommend.background + ")"}}>
        <div className="infotext">
            <h2>{recommend.recommendTitle}</h2>
            <h3 width="350">{recommend.recommendSmallTitle}</h3>
        </div>

        <div className="ButtonBox">
            <button>여행시작</button>
            <button>리뷰보기</button>
        </div>
      </div>
    )
}

// 가격영역
function Price({product}) {
    return (
        <div className="productInfo">
            <span>{product.productName}</span>
            <span>{product.productPrice}</span>
            <span>{product.productSell}</span>
            <span>{product.productDate}</span>
        </div>
    )
}

// 리뷰영역 
function ReviewInfo({review}) {
    return (
        <div className="reviewBox">
            <div className="reviewImg"></div>
            <div className="reviewText">
                <h3>{review.reviewTitle}</h3>
                <span>{review.reviewUser}</span>
                <p>{review.reviewStar}</p>
            </div>
        </div>
    )
}

function Slide({content, slidex, slideInfo}) {
    
    return (
        <div className="Content" style={{transform: `translateX(${slidex}px)`, backgroundImage: "url(" + slideInfo.LocationImg + ")"}} ref={content}>
                    {/* 이미지 안쪽에 텍스트와 버튼 */}
            <div className="explanation">
                <div>
                    <h1>{slideInfo.BigLocation}</h1>
                    <h2>{slideInfo.SmallLocation}</h2>
                </div>
            </div>
        </div>   
    )
}


function MainPage(props) {
   
    // 상품정보 오브젝트
    const [product, setProduct] = useState([
        {
            productId: 1,
            productName: '오징어',
            productPrice: 3000,
            productSell: '롯데마트',
            productDate: '2022-02-28'
        },
        {
            productId: 2,
            productName: '오징어',
            productPrice: 3000,
            productSell: '롯데마트',
            productDate: '2022-02-28'
        },
        {
            productId: 3,
            productName: '오징어',
            productPrice: 3000,
            productSell: '롯데마트',
            productDate: '2022-02-28'
        },
        {
            productId: 4,
            productName: '오징어',
            productPrice: 3000,
            productSell: '롯데마트',
            productDate: '2022-02-28'
        }
    ]);

    // 추천 여행지에 대한 정보입니다.
    const [recommend, setRecommend] = useState([
        {
            // 배경이미지도 추가할 예정 
            recommendId: 1,
            recommendTitle: '영진전문대학',
            recommendSmallTitle: '대구광역시 북구 복현로 35',
            background:  "/img/Yeongjin.jpg"
        },
        {
            recommendId: 2,
            recommendTitle: '스파크랜드',
            recommendSmallTitle: '대구광역시 중구 동성로2길 61',
            background: '/img/Daegu.jpg'
        },
        {
            recommendId: 3,
            recommendTitle: '신세계 백화점',
            recommendSmallTitle: '대구광역시 동구 동부로 149',
            background: '../img/DaeguShinsaegae.jpg'
        }
    ])

    // 리뷰에 대한 정보입니다.
    const [review, setReview] = useState([
        {
            //리뷰이미지 추가할 예정
            reviewId: 1,
            reviewTitle: '리뷰제목1',
            reviewUser: '사용자명1',
            reviewStar: '별갯수1',
        },
        {
            //리뷰이미지 추가할 예정
            reviewId: 2,
            reviewTitle: '리뷰제목2',
            reviewUser: '사용자명2',
            reviewStar: '별갯수2',
        },
        {
            //리뷰이미지 추가할 예정
            reviewId: 3,
            reviewTitle: '리뷰제목3',
            reviewUser: '사용자명3',
            reviewStar: '별갯수3',
        },
        {
            //리뷰이미지 추가할 예정
            reviewId: 4,
            reviewTitle: '리뷰제목4',
            reviewUser: '사용자명4',
            reviewStar: '별갯수4'
        },
    ])

    // 메인페이지 슬라이드에 대한 정보
    const [slideInfo, setSlideInfo] = useState([
        {
            id: 1,
            BigLocation: "Daegu", // ex:) 대구, 서울, 광주 등등 
            SmallLocation: "스파크 랜드", // BigLocaion 안에 관광지 혹은 가게이름
            LocationImg: '/img/Daegu.jpg' // 이미지 파일
        },
        {
            id: 2,
            BigLocation: "Yeosu", // ex:) 대구, 서울, 광주 등등 
            SmallLocation: "여수 라피끄 카페", // BigLocaion 안에 관광지 혹은 가게이름
            LocationImg: '/img/Yeosu.jpg' // 이미지 파일
        },
        {
            id: 3,
            BigLocation: "Daegu", // ex:) 대구, 서울, 광주 등등 
            SmallLocation: "모노릭 카페", // BigLocaion 안에 관광지 혹은 가게이름
            LocationImg: '/img/DaeguCafe.jpg' // 이미지 파일
        },
        {
            id: 4,
            BigLocation: "Gangwon-do", // ex:) 대구, 서울, 광주 등등 
            SmallLocation: "스위밍 터틀 카페", // BigLocaion 안에 관광지 혹은 가게이름
            LocationImg: '/img/SwimmingTuttleCafe.jpg' // 이미지 파일
        }
    ])

//  slide와 slidex는 slideInfo에 넣게 되면 setSlide / setSlidex가 힘들어지기 때문에 따로 만들었습니다.
   const [slide, setSlide] = useState(1)
   const [slidex, setSlidex] = useState(0);

   // ref를 통해 요소에 대한 정보를 가져오기 위해 만들었습니다.
   const content = useRef(null);
    
   let timer = "";
   return (
        <>
        <Header/>
        
        <div className="slideBigBox">
            <div className="slide-Box">
         
            {slideInfo.map(slide =>(
                <Slide key={slide.id} slideInfo={slide} content={content} slidex={slidex} />
            ))}

            {
                useEffect(() => {
                    timer = setTimeout(() => {
                        setSlidex((slidex - content.current.clientWidth))
                        setSlide(slide + 1);
                    }, 4000);

                    if(slide == slideInfo.length + 1)
                    {
                        setSlidex(0);
                        setSlide(1);
                    }
                }, [slidex])
            }

            </div>
            
            {/* 현재 슬라이드 위치와 전체길이를 확인할 수 있습니다. */}
            <p>{slide} / {slideInfo.length}</p>

            <div className="slideBtnBox">
                <div>
                    {/* 왼쪽 버튼 */}
                    <button onClick={() => {
                    
                    clearTimeout(timer);
                    if(slide > 1){
                        setSlidex(slidex + content.current.clientWidth)
                        setSlide(slide - 1)
                    }
                    else if(slide == 1)
                    {
                        console.log(content.current.clientWidth);
                        setSlidex(-((slideInfo.length - 1) * content.current.clientWidth));
                        setSlide(slideInfo.length);
                    }
                    }}><AiOutlineArrowLeft/></button>

                    {/* 오른쪽 버튼 */}
                    <button onClick={() => {
                         clearTimeout(timer);
                        // 슬라이드가 1보다 크거나 같다면
                        if(slide >= 1){
                        setSlidex(slidex - content.current.clientWidth)
                        setSlide(slide + 1)
                        console.log(slidex)
                        if(slide == slideInfo.length)
                        {
                            setSlidex(0);
                            setSlide(1);
                        }
                    }
                    }}><AiOutlineArrowRight/></button>
                </div>
            </div>

        </div>
       
    
        {/* 추천 여행지 div */}
        <div className="recommend">
          
            <div className="travelList">
            <div className="textarea">
                <h3>추천 여행지</h3>
                <Link to='/RecommendList'>더보기</Link>
            </div>
                {recommend.map(a => (
                    <RecommendInfo recommend={a} key={a.recommendId}/>
                ))}
            </div>

        </div>

        {/* 주변가격정보 */}
        <div className="priceInfo">

            <div className="priceList">
                
                <div className="textarea">
                    <h3>주변가격정보</h3>
                    <a href="https://studiomeal.com/archives/197">더보기</a>  
                </div>

                <div className="pricearea">
                  {/* 상단 텍스트 */}
                  <div className="toptext">
                    <h4>상품명</h4>
                    <h4>가격</h4>
                    <h4>판매업소</h4>
                    <h4>날짜</h4>
                  </div>
                  <hr />
                  <div>
                    {product.map(product => (
                      <Price product={product} key={product.productId}/>
                    ))}
                  </div>

                </div>
            </div>
        </div>

        {/* 리뷰정보 */}
        <div className="reviewInfo">

             <div className="reviewList">
        
                <div className="textarea">
                    <h3>리뷰</h3>
                    <a href="https://studiomeal.com/archives/197">더보기</a>  
                </div>

                <div className="reviewarea">
                    {review.map(review => (
                        <ReviewInfo review={review} key={review.reviewId}/>
                    ))}
                </div>
            </div>

        </div>

        <Bottom/>

     
    </> 
    );
}

export default MainPage;