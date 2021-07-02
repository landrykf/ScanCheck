import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ResultCard } from "./ResultCard";
import { UserCard } from "./UserCard";

export const Add = () => {
  const [query, setQuery] = useState("");
  const [mangas, setManga] = useState([]);
  // const usersData = useSelector((state) => state.usersReducer);
  const [Loading, setLoading] = useState(false);

  const [usersData, setUsersData] = useState([]);
  const [users, setUsers] = useState([]);

  const onChange = (event) => {
    event.preventDefault();

    setQuery(event.target.value);

    if (event.target.value.length > 3 && event.target.value !== "") {
      fetch(
        `https://api.jikan.moe/v3/search/manga?q=${query}&order_by=title&sort=asc&limit=20`
      )
        .then((res) => res.json())
        .then((data) => {
          if (!data.errors) {
            setManga(data.results);
          } else {
            setManga([]);
          }
        });

      axios.get(`/api/users`).then((response) => {
        setUsersData(response.data);
      });

      const userRes = usersData.filter((user) => {
        return user.username.toLowerCase().includes(query.toLowerCase());
      });
      setUsers(userRes);
      setTimeout(() => {
        setLoading(true);
      }, 1000);
    } else {
      setManga([]);
      setUsers([]);
    }
  };

  return (
    <div className="add-page">
      <div className="container">
        <div className="add-content">
          <div className="input-wrapper">
            <input
              id="search"
              type="search"
              placeholder="Rechercher un manga"
              value={query}
              onChange={onChange}
            />
          </div>

          {users.length > 0 && (
            <>
              {Loading ? (
                <div>
                  {" "}
                  <h2 className="users">utilisateurs</h2>
                  <div className="user-search-result">
                    {users.map((user) => (
                      <UserCard
                        username={user.username}
                        image={user.picture}
                        userId={user._id}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div>chargement</div>
              )}
            </>
          )}

          {mangas?.length > 0 && (
            <>
              {" "}
              {Loading ? (
                <ul className="results">
                  {mangas.map((manga) => (
                    <li key={manga.mal_id}>
                      <ResultCard
                        title={manga?.title}
                        image={manga?.image_url}
                        mangaId={manga.mal_id}
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <div>chargement ...</div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
};
