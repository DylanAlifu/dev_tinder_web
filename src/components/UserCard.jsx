import axios from "axios";
import PropTypes from "prop-types";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user, showActions }) => {
  const { firstName, lastName, age, gender, url, about, _id } = user;

  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(userId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card bg-base-300 w-auto md:w-96 h-[616px] shadow-xl mx-10 mb-10 md:mt-10">
      <figure>
        <img
          src={url}
          alt={firstName}
          className="object-cover h-[300px] w-full"
        />
      </figure>
      <div className="card-body flex gap-4">
        <div>
          <h2 className="card-title font-bold text-4xl">
            {firstName + " " + lastName}
          </h2>

          <span>
            {age}, {gender}
          </span>
        </div>

        <p>{about}</p>
        {showActions && (
          <div className="card-actions justify-between my-4">
            <button
              className="btn btn-error w-[35%]"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-primary w-[35%]"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Add prop types for the UserCard component to ensure the user prop is an object with the following properties:
UserCard.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    gender: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  showActions: PropTypes.bool,
};

export default UserCard;
