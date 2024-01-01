import React, { useState, useEffect } from "react";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersResponse = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const usersData = await usersResponse.json();
        const usersWithPostCount = await Promise.all(
          usersData.map(async (user) => {
            const postsResponse = await fetch(
              `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
            );
            const postsData = await postsResponse.json();

            console.log("postsData",postsData)
            return { ...user, postCount: postsData.length };
          })
        );

        setUsers(usersWithPostCount);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <div className="bgColor fullWidth innerHeader h-40 p-10">
        <h3 className="m-0 textColor pt-5 pb-5 font18 text-center">
          {"User's Directory"}
        </h3>
      </div>
     
      <div className="pt-70">
        {users.map((user) => {
          return(
            <Card key={user?.id} onClick={() => { navigate(`/user/${user?.id}`, { state: {id: user?.id} }) }}>
              <div className="d-flex justifyBetween">
                <p className="textColor font16">{`Name: ${user.name}`}</p>
                <div className="text-break">
                  <p className="textColor font16 pr-5 text-break">{`Posts: ${user.postCount}`}</p>
                  </div>
            </div>
          </Card>)
        })}
      </div>
    </>
  );
};

export default UserList;
