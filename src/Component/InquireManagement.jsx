import {React, useEffect, useState} from "react";
import Header from "./Header";
import Bottom from "./Bottom";
import '../css/InquireManagement.scss'

function InquireForm({Inquire, setInquire, RealInquire, CheckInquirelList, setCheckInquireList, setAllSelectBool}) {

    function RemoveInquire() {
        setInquire(RealInquire.filter((List)=>List.id !== Inquire.id))
    }
    
    function CheckInquire(e) {
        setInquire(RealInquire.map((List)=>(List.id == Inquire.id  ? {...List, checkBool: e.target.checked} : List)))
        
        if(Inquire.checkBool == false)
        {
            setCheckInquireList(CheckInquirelList + 1);
        }
        else if(Inquire.checkBool == true) {
            setCheckInquireList(CheckInquirelList - 1);
        }

    }

    useEffect(()=>{
        console.log(RealInquire.length);
        if(CheckInquirelList == RealInquire.length)
        {
            setAllSelectBool(true);
        } else {
            setAllSelectBool(false);
        }
    },[CheckInquirelList])

    return (
        <div className="InquireForm">
            {/* 체크여부 */}
            <div className="BoxOne">
                <input type="checkbox" onChange={CheckInquire} name="InquireList" checked={Inquire.checkBool} />
                <div className="TitleAndWriteDays">
                    <p>{Inquire.Title}</p>
                    <p>{Inquire.WriteDays}</p>
                </div>
            </div>
        
            <div className="State">
                {Inquire.Process == true ? <h4>처리완료</h4> : <h4 style={{color: 'royalblue'}}>처리중</h4>}
            </div>

            <button onClick={RemoveInquire}>삭제</button>
        </div>  
    )
}


function InquireManagement() {

    const [Inquire, setInquire] = useState([
        {
            id: 1,
            Title: '제목입니다',
            WriteDays: '2022-05-13',
            Content: '얼씨구1',
            Process: true,
            checkBool: false
        },
        {
            id: 2,
            Title: '제목입니다',
            WriteDays: '2022-05-13',
            Content: '얼씨구2',
            Process: false,
            checkBool: false
        },
        {
            id: 3,
            Title: '제목입니다',
            WriteDays: '2022-05-13',
            Content: '얼씨구3',
            Process: false,
            checkBool: false
        },
    ])

    const [AllSelectBool, setAllSelectBool] = useState(false);
    const [CheckInquirelList, setCheckInquireList] = useState(0);
    
    function SelectRemove() {
        setInquire(Inquire.filter(List => List.checkBool == false))
    }

    function AllSelect(e) {
        if(AllSelectBool == false)
        {
            setAllSelectBool(e.target.checked);
            setInquire(Inquire.map((List)=>({...List, checkBool: e.target.checked})));
        } else if(AllSelectBool == true ) {
            setAllSelectBool(false);
            setInquire(Inquire.map((List)=>({...List, checkBool: e.target.checked})));
        }
    }

    useEffect(()=>{
         console.log(AllSelectBool)
    }, [AllSelectBool]);

    return (
        <div className="InquireManagementBigBox">
            <Header fontColor="black"/>
                <div className="InquireManageMentContentBox">
                    <h3>문의 관리</h3>
                    
                    <div className="SelectAndDeleteBox">
                        <div className="SelectBox">
                            <input type="checkbox" name='InquireList' onChange={AllSelect} checked={AllSelectBool}/>
                            <h4>전체선택</h4>
                        </div>

                        <h4 className="SelectDelete" onClick={SelectRemove}>선택삭제</h4>
                    </div>
                    
                    {Inquire.length > 0 ? Inquire.map((List) => (<InquireForm key={List.id} setAllSelectBool={setAllSelectBool} RealInquire={Inquire} setInquire={setInquire} CheckInquirelList={CheckInquirelList} setCheckInquireList={setCheckInquireList} Inquire={List}/>)) : <h3 className='NoInquireList'>아무것도 없어요 ㅜㅜ</h3>}

                </div>
            <Bottom/>
        </div>
    )
}

export default InquireManagement;