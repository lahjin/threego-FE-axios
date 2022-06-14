import {React, useEffect, useRef, useState} from "react";
import Header from "./Header";
import Bottom from "./Bottom";
import { FaStar } from 'react-icons/fa';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import '../css/ReviewManagement.scss'
import axios from "axios";
import {apiUrl} from "../url";
import {getCookie} from "../cookie";
import {useHistory} from "react-router-dom";

function ReviewForm ({List, setReviewManage, ReviewManage, setDeleteCheckList, deleteCheckList, reviewDelete}) {

    let ReviewStar = [];

    const [ReviewSize, setReviewSize] = useState(0);
    const ReviewImage = useRef();

    useEffect(()=>{
        ReviewImage.current.style.transform = `translateX(-${ReviewSize}px)`;
    }, [ReviewSize])

    const RightSlide = () => {
        const MaxSize = ReviewImage.current.clientWidth * 2
        if(ReviewSize < MaxSize)
        {
            setReviewSize(ReviewSize + ReviewImage.current.clientWidth);
        }
    }

    const LeftSlide = () => {
        if(ReviewSize > 0)
        {
            setReviewSize(ReviewSize - ReviewImage.current.clientWidth);
        }
    }



    for(let i=0; i<List.point; i++)
    {
        ReviewStar.push(i);
    }


    const isDeleteChecked = (bool, id) =>{
        if(bool){
            setDeleteCheckList((currentArray) => [...currentArray, id]);
        }
        else{
            setDeleteCheckList(deleteCheckList.filter(value => value !== id))
        }
    }
    
    return (
        <div className="ReviewForm">
            <input type="checkbox" onChange={(event) =>{isDeleteChecked(event.target.checked,List.id)}} />
            <div className="MiddleTopArea">
                <div className="NameAndScore">
                    <h3>{List.title}</h3>
                    <h4>{List.tour_name}</h4>
                    {ReviewStar.map((idx)=> (<FaStar key={idx}/>))}
                </div>

                <div className="MiddleDeleteBtn">
                    {/* <button>수정</button> */}
                    {/* 변수 리스트에서도 지우고 백엔드에서도 지우라고 호출 */}
                    <button onClick={()=>{reviewDelete(List.id)}} >삭제</button>
                </div>

            </div>

            <div className="MiddleImageArea" style={List.image_name1 != "" ? {} : {display: 'none'}}>
                
                <div className="ImageBox" ref={ReviewImage}>
                    <img src={List.image_name1} alt="" />
                    <img src={List.image_name2} alt="" />
                    <img src={List.image_name3} alt="" />
                </div>
        
                <div className="SlideBtn">
                    <div className="BtnArea">
                    <AiOutlineArrowLeft onClick={LeftSlide} className="Arrow" />
                    <AiOutlineArrowRight onClick={RightSlide} className="Arrow" />
                    </div>
                </div>
            </div>

            <div className="MiddleMiddleArea">
                <p>{List.content}</p>
            </div>
        </div>
    )
}

function ReviewManagement() {

    const [ReviewManage, setReviewManage] = useState([])

    const [deleteCheckList, setDeleteCheckList] = useState([]);

    const userInfo = getCookie("loginToken");
    const history = useHistory();
    const getMyReview = () =>{
        axios({
            method: 'get',
            url: apiUrl + '/review/user/list/' + userInfo.id,
            header: {
                "Content-Type": "application/json",
            },
            responseType: 'json'
        }).then((response) => {
            setReviewManage(response.data);
        }).catch((error) => {
        })
    }

    useEffect(() => {
        getMyReview();
    },[])

    const reviewDelete = (id) => {
        axios.post(
            apiUrl + '/review/delete',
            {"id": id, "user_id": userInfo.id},
            {headers: {Authorization: userInfo.token}}
        ).then((response) =>{
            getMyReview();
        }).catch((error) => {

        })
    }

    const checkDelete = () => {
        deleteCheckList.map((i) =>{reviewDelete(i)});
        getMyReview();
    }

    return (
        <div className="ReviewManagementBigBox">
            {
                userInfo === undefined ? history.push("/Error/500") : null
            }
            <Header fontColor="black"/>
                <div className="ReviewManagementContentBox">

                    <div className="TopArea">
                        <h3>리뷰 관리</h3>

                        <div className="SelectAndDeleteBox">
                            
                            <div className="SelectBox">
                                {/* <input type="checkbox" /> */}
                                <h4>총 {ReviewManage.length}개</h4>
                            </div>
                            <h4 className="Delete" onClick={checkDelete}>선택삭제</h4>

                        </div>
                    </div>
                    <div className="MiddleArea">
                        {
                            ReviewManage && ReviewManage.length > 0 ?
                            ReviewManage.map((List)=>(<ReviewForm ReviewManage={ReviewManage} setReviewManage={setReviewManage} deleteCheckList={deleteCheckList} setDeleteCheckList={setDeleteCheckList} reviewDelete={reviewDelete} List={List} key={List.id}/>)) :
                            <h3 className="NoReview">리뷰가 없어요 ㅜ.ㅜ</h3> 
                        }
                      
                    </div>
                </div>
            <Bottom/>
        </div>
    )
}

export default ReviewManagement