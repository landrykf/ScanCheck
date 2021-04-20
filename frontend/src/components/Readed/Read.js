import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useCallback } from "react";

export const Read = (props) => {
  const [read, setRead] = useState(null);
  const [readNumber, setReadNumber] = useState(0);

  const userData = useSelector((state) => state.userReducer);

  const variables = {
    mangaId: props.mangaId,
    userId: userData._id,
  };

  const onRead = () => {
    if (read === null) {
      axios.post("/api/manga/addToRead", variables).then((response) => {
        if (response.data.success) {
          setReadNumber(readNumber + 1);
          setRead("readed");
        } else {
          console.log("Failed to increase read");
        }
      });
    } else {
      axios.post("/api/manga/removeFromReaded", variables).then((response) => {
        if (response.data.success) {
          setReadNumber(readNumber - 1);
          setRead(null);
        } else {
          console.log("failed to decrease read");
        }
      });
    }
  };

  useEffect(() => {
    async function loadReaded() {
      axios.post("/api/manga/getreads", variables).then((response) => {
        if (response.data.success) {
          setReadNumber(response.data.reads.length);
          response.data.reads.map((read) => {
            if (read.userId === userData._id) {
              setRead("readed");
            }
          });
        } else {
          console.log("failed to get reads");
        }
      });
    }
    loadReaded();
  }, []);

  return (
    <div>
      <div onClick={onRead}>
        {read === "readed" ? (
          <button className="ctrl-btn">
            <i className="fas fa-book-open"></i>
          </button>
        ) : (
          <button className="ctrl-btn">
            <i className="fas fa-book"></i>
          </button>
        )}
      </div>
    </div>
  );
};
