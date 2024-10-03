import { useState } from "react";
import UserCard from "./UserCard";
import PropTypes from "prop-types";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ user }) => {
  const { _id } = user;

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [url, setUrl] = useState(user.url);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSave = async () => {
    setError(""); // Clear previous errors
    setShowToast(false); // Hide any toasts

    if (!firstName || !lastName || !age || !url || !gender || !about) {
      setError("All fields are required.");
      return;
    }

    if (isNaN(age) || age <= 0) {
      setError("Please enter a valid age.");
      return;
    }

    try {
      // Save the user data
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, url, gender, about },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      setShowToast(true);

      const i = setTimeout(() => {
        setShowToast(false);
        clearTimeout(i);
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancel = () => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setAge(user.age);
    setUrl(user.url);
    setGender(user.gender);
    setAbout(user.about);
    setError(""); // Clear any errors
    setShowToast(false); // Hide any toasts

    // redirect to feed page
    navigate("/");
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center">
        <div className="flex justify-center m-10">
          <div className="card bg-base-300 shadow-xl w-auto">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div className="gap-2 my-3 grid grid-cols-2">
                {/* First Name */}
                <div>
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <label className="input input-bordered flex items-center gap-2">
                    <input
                      type="text"
                      className="grow"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </label>
                </div>

                {/* Last Name */}
                <div>
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <label className="input input-bordered flex items-center gap-2">
                    <input
                      type="text"
                      className="grow"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </label>
                </div>

                {/* Age */}
                <div>
                  <div className="label">
                    <span className="label-text">Age</span>
                  </div>
                  <label className="input input-bordered flex items-center gap-2">
                    <input
                      type="number"
                      className="grow"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </label>
                </div>

                {/* Gender */}
                <div>
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <label className="input input-bordered flex items-center gap-2">
                    <input
                      type="text"
                      className="grow"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </label>
                </div>

                {/* URL */}
                <div className="col-span-2">
                  <div className="label">
                    <span className="label-text">Url</span>
                  </div>
                  <label className="input input-bordered flex items-center gap-2">
                    <input
                      type="text"
                      className="grow"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </label>
                </div>

                {/* About */}
                <div className="col-span-2">
                  <div className="label">
                    <span className="label-text">About</span>
                  </div>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </div>
              </div>

              {/* Display errors or success messages */}
              <div className="mb-4 h-5">
                {error && <div className="text-red-500">{error}</div>}
              </div>

              <div className="card-actions justify-between">
                <button
                  className="btn btn-primary w-[35%]"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="btn btn-outline btn-primary w-[35%]"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        <UserCard
          user={{ firstName, lastName, age, gender, about, url, _id }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

EditProfile.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    gender: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default EditProfile;
