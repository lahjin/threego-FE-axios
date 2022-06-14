import {React, useEffect, useState} from "react";
import Header from "./Header";
import Bottom from "./Bottom";
import Page from "./Page";
import { FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import '../css/NoticeList.scss'
import {useHistory} from "react-router";
import axios from "axios";
import {apiUrl} from "../url";


function NoticeList() {


    //제목 내용 작성일자 상태
    const [Notice, setNotice] = useState();

    // 페이지 번호 입니다.
    const [PageNumber, setPageNumber] = useState(1);

    const [page, setPage] = useState();
    // api 로딩
    const [Loading, setLoading] = useState(true);
    // 서버에서 데이터를 받아오는 중입니다.
    const history = useHistory();

    const getNotice = async () =>{
        await axios({
            method: 'post',
            url: apiUrl + '/notice/list',
            header: {
                "Content-Type": "application/json",
            },
            responseType: 'json',
            data: {
                "pageIndex": PageNumber
            }
        }).then((response) => {
            console.log(response);
            setNotice(response.data.lists);
            setPage(response.data.page);
            setLoading(false);

        }).catch((error) => {
        })
    }

    const Paging = () =>{
        const result = [];
        for(let i = page.startPage; i<=page.endPage; i++){
            result.push(
                <li key={i} onClick={(e)=>{PageNumberClick(e)}}>{i}</li>
            );
        }
        return result;
    }

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
        getNotice();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [PageNumber])

    function NoticeList() {
        return (
            <>
                {Notice.map((ref) => (
                    <div className="ListForm" key={ref.id} onClick={()=>{history.push({pathname: "/NoticeDetail",state: {Notice: ref}})}} >
                        <div className="Text">
                            <p className="Title">{ref.title}</p>
                            <p className="WriteDay">{ref.date}</p>
                        </div>
                        <FiArrowRightCircle className="Icons"/>
                    </div>
                ))}

            <footer className="NoticeListBottomArea">
                <div className="PageNumberBox">
                    <FiArrowLeftCircle className="ArrowBtn" onClick={()=>{LeftIconClick()}} style={PageNumber == 1 ? {opacity: 0} : {}}/>
                        <ul className="NoticeListNumber">
                            {page && page.indexCount ? <Paging/> : null}
                        </ul>
                    <FiArrowRightCircle className="ArrowBtn" onClick={() => {RightIconClick()}} style={page && PageNumber != page.endPage ? {} : {opacity: 0}}/>
                </div>
            </footer>
            </>
        )
    }

    return (
        <div className="NoticeListBigBox">
            <Header fontColor="black"/>
            
            <div className="NoticeListMiddleBox" >
                <h1>공지사항</h1>
                <hr />
                
                {Loading == true ? <h3>데이터를 불러오고 있습니다.</h3> : <NoticeList/> }

            </div>
            <Bottom/>
        </div>
    )
}

export default NoticeList;