import { toBePartiallyChecked } from '@testing-library/jest-dom/dist/matchers';
import React,{useState} from 'react';
import {AiOutlineMenu} from "react-icons/ai";
import { useEffect} from 'react';
import {Link} from 'react-router-dom';
import '../css/Header.scss'
import {getCookie, removeCookie} from "../cookie";



function Header(props) {

    const token = getCookie("loginToken");
    let y = window.scrollY;

    const [isOpen, setMenu] = useState(false); // 메뉴창이 열린지 안열린지 판단

    const toggleMenu = () => {
        setMenu(isOpen => !isOpen);
    }

    const tempStyle={
        background:"black",
    }

    const fontColor = {
        color: "white",
    }
    
    // Y축 스크롤값을 확인하기 위해
    let [Scrolly, setScrolly] = useState(0);
 
    const handleFollow = () => {
        setScrolly(window.pageYOffset); // window 스크롤 값을 ScrollY에 저장
    }

    const signOut = () =>{
        removeCookie("loginToken");
        window.location.href = "/";
    }

    useEffect(() => {
        const watch = () => {
            window.addEventListener('scroll', handleFollow);
        }
        watch(); // addEventListener 함수를 실행
        return () => {
            window.removeEventListener('scroll', handleFollow); // addEventListener 함수를 삭제
        }
    })


    return(
        <>
            <header className="Header" style={isOpen ? tempStyle : (Scrolly > 0) ? tempStyle :  {color: props.fontColor}}>
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <h3 style={isOpen ? fontColor : (Scrolly > 0) ? fontColor : {color: props.fontColor}}>Three Go</h3>
                </Link>
                
                <AiOutlineMenu className="menuIcon" onClick={() => toggleMenu()} style={isOpen ? fontColor : (Scrolly > 0) ? fontColor :  {color: props.fontColor}}/>
                <ul className={isOpen ? "show-menu" : "hide-menu"}>
                    <li><Link to="/RecommendList">추천 여행지</Link></li>
                    <li><Link to="/ProductList">주변 가격정보</Link></li>
                    <li><Link to="/ReviewList">여행 리뷰보기</Link></li>
                    <li><Link to="/CustomerService">고객센터</Link></li>
                    <li><Link to="/url">서버변경</Link></li>
                    {
                        token == null
                        ?
                            <li>
                                <div className='loginBox'>
                                    <button className='loginButton'>
                                        <Link to='/Login'>로그인</Link>
                                    </button>

                                    <button className='loginButton'>
                                        <Link to='/SingIn'>회원가입</Link>
                                    </button>
                                </div>
                            </li>
                        :
                            <li>
                                <div className='loginBox'>
                                    <button className='loginButton'>
                                        <Link to="/MyPageMain">마이페이지</Link>
                                    </button>

                                    <button className='loginButton' onClick={signOut}>
                                        <Link to="#">로그아웃</Link>
                                    </button>
                                </div>
                            </li>
                    }


                </ul>
               
            </header>
        </>
    )
}

export default Header;