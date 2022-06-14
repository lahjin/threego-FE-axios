import React, {useEffect, useState} from "react";
import Bottom from "./Bottom";
import Header from "./Header";
import {Link} from 'react-router-dom';
import {FaStar} from 'react-icons/fa';
import {BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill} from "react-icons/bs";
// css
import "../css/ReviewList.scss";
import {useHistory} from "react-router";
import axios from "axios";
import {apiUrl} from "../url";


function ReviewScore({review})
{
    const rendering = () => {
      const result = [];
      for (let i = 0; i < review.point; i++) {
        result.push(<FaStar className="star" key={i}/>);
      }
      return result;
    };
    return <div>{rendering()}</div>;
}


function ReviewForm({review, GoodToggle,BadToggle, history}) {

    return (
        <div className="UserReviewForm">
                    
        {/* 사용자 정보 :) 유저 이미지, 이름, 별점 */}
        <div className="userInfo">  
          <div className="BoxOne">
            <img src="/img/Yeosu.jpg" alt="유저 이미지" />
            <div className="NameAndReview">
                <h3 className="userName">{review.nickname}</h3>
                <ReviewScore className="ReviewStar" review={review}/>
            </div>
          </div>

            <div className="Date">
                {review.date}
            </div>
        </div>

        <div className="ReviewTitle">
          <h3>{review.title}</h3>
        </div>

        <div className="BoxTwo">
            <div className="ReviewBtn">
                <button onClick={()=>{GoodToggle(review.id)}}>{review.good} GOOD</button>
                <button onClick={()=>{BadToggle(review.id)}}>{review.bad} Bad</button>
            </div>             

            <div className="more">
                
            <span onClick={()=>{history.push({pathname: "/ReviewDetail", state: {Review: review}})}}>더보기</span>
                
            </div>
        </div>
    </div>
    )
}

function ReviewList() {
    
    const history = useHistory();

    const [review, setReview] = useState();
    const [page, setPage] = useState();

    const getReview = async () =>{
        await axios({
            method: 'post',
            url: apiUrl + '/review/list',
            header: {
                "Content-Type": "application/json",
            },
            responseType: 'json',
            data: {
                "pageIndex": PageNumber
            }
        }).then((response) => {
            console.log(response);
            setReview(response.data.lists);
            setPage(response.data.page);
            setLoading(false);

        }).catch((error) => {
        })
    }

    const updateGood = async (id) => {
        await axios.get(apiUrl + "/review/good/" + id);
    }

    const updateBad = async (id) => {
        await axios.get(apiUrl + "/review/bad/" + id);
    }

    useEffect(()=>{
        getReview();
    },[]);

    const Paging = () =>{
        const result = [];
        for(let i = page.startPage; i<=page.endPage; i++){
            result.push(
                <li key={i} onClick={(e)=>{PageNumberClick(e)}}>{i}</li>
            );
        }
        return result;
    }

    // 최신값 논리값 변수
    const [LatestBool, SetLatestBool] = useState(true)

    //추천순 논리값 변수
    const [RecBool, SetRecBool] = useState()
    
    // Good버튼 누를 때 활성화 됩니다. (한명단 한번만 체크되게 하기 위해서 선언)
    const [GoodPointBool, setGoodPointBool] = useState(true);

    // Bad버튼 누를 때 활성화 됩니다.
    const [BadPointBool, setBadPointBool] = useState(true);
    
    // Loading 변수
    const [Loading, setLoading] = useState(false);

    // 페이지 번호 입니다.
    const [PageNumber, setPageNumber] = useState(1);

    const PageNumberClick = (e) => {
        let pageNumber = parseInt(e.target.innerHTML);
        console.log(typeof pageNumber);
        setPageNumber(pageNumber);        
    }

    const RightIconClick = () => {
        if(page.next)
            setPageNumber(PageNumber + 1);
    }

    const LeftIconClick = () => {
        if(page.prev)
            setPageNumber(PageNumber - 1);
    }

    useEffect(()=> {
        getReview();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [PageNumber])


    useEffect(() => {
        console.log(RecBool, LatestBool)
    }, [RecBool])

    useEffect(() => {
        console.log(GoodPointBool);
    }, [GoodPointBool])

    // 좋아요버튼 눌렀을 때
    const GoodToggle = id => {
        updateGood(id);
        getReview();
    };

    const BadToggle = id => {      
        updateBad(id);
        getReview();
    };
    
    const MiddleForm = () => {
        return (
            <>
               <div className="ReviewMiddleArea">
                    
                    <div className="UmmName">
                        <h2 className="ReviewCount">{page && page.indexCount}개의 게시물</h2>
                        
                        <ul>
                            <li onClick={()=>{SetLatestBool(true); SetRecBool(false);}} style={LatestBool ? {color: "royalblue"} : {color: "#676767"}}>최신순</li>
                            <li onClick={()=>{SetRecBool(true); SetLatestBool(false);}} style={RecBool ? {color: "royalblue"} : {color: "#676767"}}>별점순</li>
                        </ul>
                    </div>
                    {/* 리뷰내용들 */}
                    {review && review.map(a => (
                            <ReviewForm review={a} key={a.id} GoodToggle={GoodToggle} BadToggle={BadToggle} history={history}/>
                        ))}


                </div>
                
                <footer className="ReviewBottomArea">
                    <BsFillArrowLeftCircleFill className="ArrowBtn" onClick={()=>{LeftIconClick()}} style={PageNumber <= 1 ? {opacity: 0} : {}}/>
                        <ul className="ReviewListNumber">
                            {page && page.indexCount ? <Paging/> : null}
                        </ul>
                    <BsFillArrowRightCircleFill className="ArrowBtn" onClick={() => {RightIconClick()}} style={page && PageNumber != page.endPage ? {} : {opacity: 0}}/>
                </footer>
            </>
        )
    }

    return(
        <div className="ReviewListBigBox">
            <Header/>
            
            <div className="ReviewTopArea">
                <h1 className="ReviewLocation">여행 리뷰</h1>

                <div className="Score">
                    {/*<TopScore/>*/}
                </div>
                {/* 리뷰 작성 버튼 누르면 작성 페이지로 이동합니다. */}
                <Link to='/ReviewWrite'>
                    <button>리뷰 작성</button>
                </Link>
            </div>

            {Loading == true ? <h2 className="Loading">로딩중입니다.</h2> : <MiddleForm/> }
         

            <Bottom/>
        </div>
    )
}

export default ReviewList;