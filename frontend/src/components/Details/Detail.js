import React, { useState, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { MangaCard } from "../Mangalist/MangaCard";
import DetailCard from "./DetailCard";

function Detail() {
  const showDetail = useContext(GlobalContext);
  const [cross, setcross] = useState(true);

  return (
    <div>
        {cross &&
        <div>
            {showDetail ? (
              <div className="popup-container">
                <h2 onClick={() => setcross(false)}>X</h2>
                <DetailCard manga={showDetail.showDetail} type="showDetail" />
              </div>
            ) : (
              <h1>pas de detail</h1>
            )}
        </div>
        }
    </div>
  );
}

export default Detail;
