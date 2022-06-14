import React from "react";
import { FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi";
function Page() {
    return (
        <>
              <FiArrowLeftCircle className="ArrowBtn"/>
                <ul className="NoticeListNumber">
                    <li><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">4</a></li>
                    <li><a href="#">5</a></li>
                    
                </ul>
                <FiArrowRightCircle className="ArrowBtn"/>
        </>
    )
}

export default Page