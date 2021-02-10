import React, { useState, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { MangaCard } from "../Mangalist/MangaCard";
import DetailCard from "./DetailCard";
function Detail() {
  const showDetail = useContext(GlobalContext);
  console.log({ showDetail });

  return (
    <div>
      {console.log(showDetail)}

      {/* {showDetail.showDetail.length > 0 ? (
        <div className="manga-detail">
            {console.log(showDetail)}
          {showDetail.showDetail.map((manga) => (
              
            <DetailCard manga={manga} type="showDetail" />
          ))}
          
        </div>
      ) : (
        <h1>pas de detail</h1>
      )} */}

      {showDetail ? (
        <div className="manga-detail">
          {console.log(showDetail)}
         
            <DetailCard manga={showDetail.showDetail} type="showDetail" />
        
        </div>
      ) : (
        <h1>pas de detail</h1>
      )}
    </div>
  );
}

export default Detail;
