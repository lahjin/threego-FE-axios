import React, {useEffect} from "react";
import Header from "./Header";
import { useState } from "react";
import '../css/Login.css';
import {IoMdArrowBack} from "react-icons/io";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import {apiUrl} from "../url";
import {setCookie} from "../cookie";


function Login() {
    const history = useHistory();

    const [username,setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [validate, setValidate] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const usernameOnchange = (e)=> {
        setUsername(e.target.value);
     }

     const pwdOnchange = (e)=> {
        setPassword(e.target.value);
     }

     const loginAccess = (e) => {

         if(username.length === 0){
            setValidate(true);
            setErrorMessage("아이디를 입력 해 주세요.");
            return;
        }

         if(password.length === 0){
             setValidate(true);
             setErrorMessage("비밀번호를 입력 해 주세요.");
             return;
         }

         axios({
             method: 'post',
             url: apiUrl + '/auth/signin',
             header: {
                 "Content-Type": "application/json",
             },
             responseType: 'json',
             data: {
                 "username": username,
                 "password": password,
             }
         }).then((response) => {
             if(response.status == 200){
                 let time = new Date();
                 time.setMinutes(time.getMinutes() +30);
                 setCookie('loginToken', response.data,{
                     expires:time
                 });
                 history.push("/");
             }
         }).catch((error) => {
             setValidate(true);
             setErrorMessage("아이디 혹은 비밀번호 오류입니다.");
         })
     }

    return(
      <div className="LoginBox">

            <div className="LoginShape">
                <div className="Text">
                    {/* <Link to='/'>
                        <IoMdArrowBack className="BackIcon"/>
                    </Link> */}
                    <Link to="/"><h1>ThreeGo</h1></Link>
                </div>

                <input type="text" placeholder="ID" onChange={usernameOnchange}/>
                <input type="password" placeholder="pwd" onChange={pwdOnchange}/>
                {validate ? <span> {errorMessage} </span> : null}
                <button  onClick={loginAccess} >로그인</button>
               
                <ul className="subText">
                    <li><Link to='/SingIn' className="SignInLink">회원가입</Link></li>
                    <li>아이디 찾기</li>
                    <li>비밀번호 찾기</li>
                </ul>
            </div>
       

      </div>
    );
}

export default Login;