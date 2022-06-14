import {React, useEffect, useState} from "react";
import Header from "./Header";
import Bottom from "./Bottom";
import '../css/CustomerQuestion.scss'


function QnAForm({qna,QnA, setQnA}) {
    return(
        <div style={qna.categoryBool ? {display:'block'} : {display: 'none'}}>
            <hr />
            <div className="QuestionArea" onClick={()=>{setQnA( QnA.map(list => list.id == qna.id ? {...list, clickBool: !qna.clickBool} : list))}}>
                <button>Q</button>   

                <div className="TextArea">
                    <p>{qna.QuestionCategory}</p>
                    <p>{qna.QuestionTitle}</p>
                </div>
            </div>

            <div className="AnswerArea" style={qna.clickBool ? {display: 'flex'} : {display: 'none'}}>
                <button>A</button>
                <div className="TextArea">
                    <p>{qna.AnswerTitle}</p>
                </div>
                
            </div>

        </div>
    )
}

function CustomerQuestion() {
    
    const [QnA, setQnA] = useState([
        {
            id: 1,
            QuestionTitle: "질문1 입니다.",
            QuestionCategory: "여행문의",
            AnswerTitle: "답변 내용입니다.",
            clickBool: false,
            categoryBool: true
        },
        {
            id: 2,
            QuestionTitle: "질문2 입니다.",
            QuestionCategory: "회원문의",
            AnswerTitle: "답변 내용 입니다",
            clickBool: false,
            categoryBool: true
        },
        {
            id: 3,
            QuestionTitle: "질문3 입니다.",
            QuestionCategory: "서비스 이용문의",
            AnswerTitle: "답변 제목 입니다",
            clickBool: false,
            categoryBool: true
        },
        {
            id: 4,
            QuestionTitle: "질문4 입니다.",
            QuestionCategory: "여행문의",
            AnswerTitle: "답변 제목 입니다",
            clickBool: false,
            categoryBool: true
        },
        {
            id: 5,
            QuestionTitle: "질문5 입니다.",
            QuestionCategory: "여행문의",
            AnswerTitle: "답변 제목 입니다",
            clickBool: false,
            categoryBool: true
        }
    ]);

   useEffect(()=>{
    console.log(QnA);
   },[QnA])

    function ChangeCategory(e) {
        console.log(e.target.value)
        setQnA(QnA.map(qna => qna.QuestionCategory == e.target.value || e.target.value == "전체" ? {...qna, categoryBool: true} : {...qna, categoryBool: false}));
    }

    return (
        <div className="CustomerQuestionBigBox">
            <Header fontColor="black"/>
                <div className="CustomerQuestionBox">
                    <h3>자주묻는 질문</h3>
                    <select className="Category" onChange={(e)=> {ChangeCategory(e)}}>
                        <option value="전체">전체</option>
                        <option value="여행문의">여행문의</option>
                        <option value="회원문의">회원문의</option>
                        <option value="서비스 이용문의">서비스 이용문의</option>
                    </select>

                    {QnA.map((qna)=>(<QnAForm setQnA={setQnA} qna={qna} QnA={QnA} key={qna.id}/>))}      
                </div>
            <Bottom/>
        </div>
    )
}

export default CustomerQuestion;