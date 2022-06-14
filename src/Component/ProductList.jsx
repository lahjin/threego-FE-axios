import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import Header from "./Header";
import Bottom from "./Bottom";
import { GoLocation } from "react-icons/go";
import '../css/ProductList.scss';


// 상품정보 박스에 요소들
function ItemListForm({Info}) {
    return (
        <div className="ItemListForm">
            <div className="TopArea">
                <h2>가격 : {Info.판매가격}</h2>
                <p>날짜 : {Info.조사일}</p>
            </div>
            
            <div className="LocationInfo">
                <GoLocation/>
                <span className="LocationText">{Info.판매업소}</span>
            </div>
            
            <div className="BottomArea">
                {/* API에서 Y면 YES N이면 NO */}
                <div className={Info.원플러스원 === "Y" ? "YES" : "NO"}>
                    <span>1 + 1 {Info.원플러스원 !== null ? Info.원플러스원 : "정보가 없습니다."}</span>
                </div>

                <div className={Info.세일여부 === "Y" ? "YES" : "NO"}>
                    <span>SALE {Info.세일여부 !== null ? Info.세일여부 : "정보가 없습니다."}</span>
                </div>
                
            </div>            
        </div>
    )
}


function ProductList() {

    const [loading, setLoading] = useState(null);
    
    // api값을 저장할 items
    const [items, setItems] = useState([]);
    
    // items에서 filter를 거친 값을 저장
    const [newItems, setNewItems] = useState([]);

    const [error, setError] = useState(false);
    
    const secondSelect = useRef();
    
    // 유저가 select에서 선택한 값을 저장
    const [searchItem, setSearchItem] = useState({
        id: 1,
        itemDate: '',
        itemName: '',
        clickBool: false,
    });
    
    // 서비스 키를 저장하는 변수입니다. (env파일로 하면 안전하다고 해서 해봤는데 안되서 여기에 변수 만들었어욥 ㅜㅜ)
    const SERVICE_KEY = 's4sQT%2F2CNziwuHItpzeGE7tJ4gyBZ876iXoUvxDE4AQ4En96j9ISealB7QFnkf4GceyA3p2EPi0I6z3K7zqliQ%3D%3D'

    // URL은 날짜별로 API를 보관하는 변수입니다.
    const url = [`https://api.odcloud.kr/api/15083256/v1/uddi:44980de3-b41a-488e-baf4-e08be5c7c76c?serviceKey=${SERVICE_KEY}&page=1&perPage=10&returnType=JSON`,
                 `https://api.odcloud.kr/api/15083256/v1/uddi:c5d5c5b8-4e92-4adb-9d4f-cf4a59192679?serviceKey=${SERVICE_KEY}&page=1&perPage=10&returnType=JSON`,
                 `https://api.odcloud.kr/api/15083256/v1/uddi:fa70d5d3-89c0-4d00-a17e-a54b1437f1bf?serviceKey=${SERVICE_KEY}&page=1&perPage=10&returnType=JSON`];

    // 0506에 대한 상품정보 API를 호출
    const LoadData = async(i) => {
        try {
            const response = await axios.get(
              url[i]
            )
            const responedata = response.data.data;
            setItems(responedata);
        }
        catch(e) {
            setError(e);
        }
        setLoading(false);
    }

    const onClickSelect = (e) =>{
        LoadData(e.target.value - 1);
    }

    // LoadData0506을 실행
    // useEffect(()=>{
        
    // }, [])

    // searchItem이 변경될때마다 setNewItems를 실행 
    useEffect(()=>{
        setNewItems(items.filter(List => List.상품명 == searchItem.itemName && List.조사일 == searchItem.itemDate));
    }, [searchItem])

    useEffect(()=>{
        console.log(newItems);
    }, [newItems]);

    // sort는 정렬을 의미합니다.
    newItems.sort((a,b) => {
        // a가 b보다 크다면 앞에 옵니다
        if(a.판매가격 > b.판매가격)
        {
            return 1;
        } 
        // b가 a보다 크다면 앞에 옵니다
        else if (a.판매가격 < b.판매가격)
        {
            return -1;
        } 
        // 0이라면 변경하지 않습니다.
        else {
            return 0;
        }
    });

    let DistinctTextName = []; // 중복을 제거하는 변수입니다.

    // TextName은 items에서 상품명을 가져와서 저장하는 변수입니다 (중복제거X);
    if(searchItem.clickBool == true)
    {
        let TextName = [];
        items.map((List)=> {TextName.push(List.상품명)}) // items에서 가져옴
        DistinctTextName = [...new Set(TextName)]; // DistinctTextName은 TextName에서 중복되는이름들을 제거한 값입니다.
    }
  
    return (
        <div className="ProductListBigBox">
            
            <Header fontColor="black" />
            {/* 상품정보가 들어갈 영역입니다. */}
            <div className="ProductListContentBox">
                {/* 어떤 페이지인지 알려주는 Text */}
               <h3 className="TitleText">상품정보</h3>
                {/* 년도선택 박스  */}

               {/* 날짜 선택 */}
               <select name="" id=""  onChange={(e)=>{
                   // value값이 0이 아니라면 clickbool= true
                   if(e.target.value !== "0")
                   {
                    setSearchItem({ ...searchItem,  itemDate: e.target[e.target.value].innerText, itemName: '', clickBool:true}); 
                    onClickSelect(e);    
                    // useRef인 secondSelect => 현재 상품선택 select문에 대한 정보를 가져오고 있고 if문이 참이라면 selectIndex를 0으로 만들어서 상품을 선택해주세요가 보이게 설정
                    secondSelect.current.selectedIndex = 0
                   } else if(e.target.value == "0")
                   {
                        setSearchItem({ ...searchItem,  itemDate: e.target[e.target.value].innerText, itemName: '', clickBool:false}); 
                   }
                   }}>
                   <option key="날짜를 선택해주세요" value="0">날짜를 선택해주세요</option>
                   <option key="2022-05-06" value="1">2022-05-06</option>
                   <option key="2022-04-08" value="2">2022-04-08</option>
                   <option key="2022-03-04" value="3">2022-03-04</option>
               </select>

               {/* 상품 선택 */}
               <select name="" id="" ref={secondSelect} onChange={(e)=>{setSearchItem({...searchItem, itemName: e.target.value}); }}>
                   <option>상품을 선택해주세요</option>
                    {DistinctTextName.map((List, index) => (
                        <option value={List} key={index}>{List}</option>
                    ))}
               </select>
                
                {/* 클릭시 조건에 맞는 ITEM들은 SET합니다. */}
                {/* <div className="ButtonBox">
                    <button className="SearchItemBtn" onClick={()=>{setItems(items.filter(List => List.상품명 == searchItem.itemName && List.조사일 == searchItem.itemDate));}}>검색하기</button>
                </div> */}
                {/* 선택한 상품정보에 대한 값이 나오는 박스입니다. */}
                <div className="ProductListInfo">
                    {/* searchItem = 사용자가 찾고자 하는 아이템 */}
                    {/* 사용자가 (년도, 날짜, 상품)을 선택했을 때 해당되는 값이 저장되도록 설정 */}
                    {/* ↓↓ searchItem이 비어있을 때 아직 상품이 없다는 로직 */}
                    {newItems.length > 0 ? newItems.map((List, index) => (<ItemListForm key={index} Info={List} />)) : 
                                        <h3>해당되는 상품이 없습니다.</h3>}

                </div>
            </div>
            
            <Bottom/>
        </div>
    )
}

export default ProductList;