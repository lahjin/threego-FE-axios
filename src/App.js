import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link,Switch } from "react-router-dom";
import './App.css';

// 컴포넌트 import
import MainPage from './Component/MainPage';
import Login from './Component/Login';
import SignIn from './Component/SignIn';
import RecommendList from './Component/RecommendList';
import ErrorPage from './Component/ErrorPage';
import ReviewList from './Component/ReviewList';
import ReviewWrite from './Component/ReviewWrite';
import ReviewDetail from './Component/ReviewDetail';
import CustomerService from './Component/CustomerService';
import CustomerQuestion from './Component/CustomerQuestion';
import NoticeList from './Component/NoticeList';
import NoticeDetail from './Component/NoticeDetail';
import InquireList from './Component/InquireList';
import InquireWrite from './Component/InquireWrite';
import InquireDetail from './Component/InquireDetail';
import MyPageMain from './Component/MyPageMain';
import ReviewManagement from './Component/ReviewManagement';
import ProfileEdit from "./Component/ProfileEdit";
import TravelManagement from "./Component/TravelManagement";
import InquireManagement from "./Component/InquireManagement";
import RecommendListInfo from "./Component/RecommendListInfo";
import ProductList from "./Component/ProductList";
import Url from "./urlConnect";

function App() {
  
  const fixcss = {
    position: 'fixed',
    top: '-${window.scrollY}px',
    overflow: 'scroll',
    width: '100%'
  }

  const [scrollfix, setScrollfix] = useState();
  return (
    <Router>
      <Switch>
        {/* 주소가 /라면 아래 실행 */}
        <Route exact path="/">
          <div className="App" style={scrollfix ? fixcss : null}>
            <MainPage path="/" scrollfix={(aa) => {setScrollfix(aa)}} ></MainPage>
          </div>
        </Route>

        {/* 주소가 /Login이라면 아래 실행 */}
        <Route exact path="/Login">
            <Login/>
        </Route>

        <Route path="/SingIn">
            <SignIn/>
        </Route>

        <Route path="/RecommendList">
            <RecommendList/>
        </Route>

        <Route path="/ReviewList">
            <ReviewList/>
        </Route>

        <Route path="/ReviewWrite">
            <ReviewWrite/>
        </Route>

        <Route path="/ReviewDetail">
          <ReviewDetail/>
        </Route>

        <Route path="/CustomerService">
          <CustomerService/>
        </Route>

        <Route path="/NoticeList">
          <NoticeList/>
        </Route>

        <Route path="/NoticeDetail">
          <NoticeDetail/>
        </Route>

        <Route path="/InquireList">
          <InquireList/>
        </Route>

        <Route path="/InquireWrite">
          <InquireWrite/>
        </Route>

        <Route path="/InquireDetail">
          <InquireDetail/>
        </Route>

        <Route path="/CustomerQuestion">
          <CustomerQuestion/>
        </Route>

        <Route path="/MyPageMain">
          <MyPageMain/>
        </Route>

        <Route path="/MyPageMain">
          <MyPageMain/>
        </Route>

        <Route path="/ReviewManagement">
          <ReviewManagement/>
        </Route>

        <Route path="/ProfileEdit">
          <ProfileEdit/>
        </Route>

        <Route path="/TravelManagement">
          <TravelManagement/>
        </Route>

        <Route path="/InquireManagement">
          <InquireManagement/>
        </Route>

        <Route path="/RecommendListInfo/:id">
            <RecommendListInfo/>
        </Route>

        <Route path="/ProductList">
          <ProductList/>
        </Route>

        <Route path="/url">
          <Url/>
        </Route>

        <Route path="/Error/:error">
            <ErrorPage/>
        </Route>

        <Route path="*">
            <ErrorPage/>
        </Route>

      </Switch>
    </Router>
  );

  


        

}

export default App;
