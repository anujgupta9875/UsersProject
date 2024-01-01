import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "./Card";
import Clock from "./Clock";
import Back from '../assets/back.png';


const UserProfile = () => {
  const { state: { id: userId } = {} } = useLocation();
  const navigate = useNavigate()
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const popupRef = useRef(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => response.json())
      .then((response) => setUser(response))
      .catch((error) => console.error("Error fetching user details:", error));

    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((response) => response.json())
      .then((response) => setPosts(response))
      .catch((error) => console.error("Error fetching user posts:", error));
  }, [userId]);

  const handleOutsideClick = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target) && !event.target.closest('.card')) {
      setShowPopUp(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);


  const Popup = ({ title, body,userId }) => {
    return (
      <>
        <div className="backdrop"></div>
        <div className="popup " ref={popupRef}>
          <div className="popup-content">
          <h2 className="textColor font16 text-center">{`User Id: ${userId}`}</h2>
            <h2 className="textColor font16 text-center">{title}</h2>
            <p className="textColor font14 bgColour">{body}</p>
          </div>
        </div>
      </>
    );
  };

  const openPopup = (post) => {
    setShowPopUp(true);
    setSelectedPost(post);
  };


  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="bgColor fullWidth innerHeader h-40 p-10">
        <div className="d-flex justifyBetween">
          <div onClick={() => navigate(-1)}>
            <div  className="d-flex">
            <img
              style={{paddingTop:3}}
              height={23}
              width={23}
              src={Back}
              alt="Play"
              />
              <div>
                <h3 className="m-0 textColor pt-5 pb-5 font18">{"Back"}</h3>
              </div>
          </div>
          </div>
          <div className="text-center m-header">
            <h3 className="m-0 textColor pt-5 pb-5 font18">{"User's Details"}</h3>
          </div> 
          <div></div>
        </div>
      </div>
      <div className="pt-70">
      <div>
        <Clock />
      </div>
      <div className="pb-5">
        <Card>
          <div className="userDetailCard">
            <p className="textColor font14" style={{ overflowWrap: "break-word" }}>{user?.name}</p>
            <p className="textColor font14" style={{ overflowWrap: "break-word" }}>{`${user?.address?.street} ${user?.address?.suite} ${user?.address?.city}`}</p>
          </div>
          <div className="userDetailCard">
            <div className="userDetailBody">
              <p className="textColor font14 text-break">{user?.username} </p>
              <p className="textColor font14 pr-10  userInnerBody pl-10 ">{"|"} </p>
              <p className="textColor font14 text-break">{user?.company?.catchPhrase}</p>
            </div>
            <div className="userDetailCard">
            <div className="userDetailBody">
              <p className="textColor font14 text-break">{user?.email} </p>
              <p className="textColor font14 userInnerBody pr-10 pl-10">{"|"} </p>
                <p className="textColor font14 text-break">{user?.phone}</p>
              </div>
            </div>
          </div>
          </Card>
          
        </div>
        <h3 className="textColor pt-5 pb-5 font18 m-20 pt-10">{"POSTS"}</h3>

      <div className="cardContainer">
        {posts.map((post) => (
          <div key={post.id} className="card">
            <Card onClick={() => openPopup(post)}>
              <p className="textColor font14 ">{post.title}</p>
              <p className="textColor font12 ">{post.body}</p>
            </Card>
          </div>
        ))}
        {showPopUp && <Popup title={selectedPost.title} body={selectedPost.body} userId={selectedPost.userId}/>}
        </div>
        </div>
    </>
  );
};

export default UserProfile;
