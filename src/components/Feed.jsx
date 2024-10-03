import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const [randomIndex, setRandomIndex] = useState(null);
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      if (feed) return;  // If feed already exists, do not fetch again

      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  // Generate random index once feed is loaded and if randomIndex hasn't been set
  useEffect(() => {
    if (feed && feed.length > 0 && randomIndex === null) {
      const randomIdx = Math.floor(Math.random() * feed.length);
      setRandomIndex(randomIdx);
    }
  }, [feed, randomIndex]);

  // Check if no feed is available and return "No User Found" message
  if (feed && feed.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="font-bold text-2xl">No User Found!</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center my-10">
      {feed && randomIndex !== null && (
        <UserCard user={feed[randomIndex]} showActions={true} />
      )}
    </div>
  );
};

export default Feed;
