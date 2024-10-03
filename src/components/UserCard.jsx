import PropTypes from "prop-types";

const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, url, about } = user;

  return (
    <div className="card bg-base-300 w-96 shadow-xl h-[800px]">
      <figure>
        <img src={url} alt={firstName} className="object-cover h-[400px]" />
      </figure>
      <div className="card-body flex gap-16">
        <div>
          <h2 className="card-title font-bold text-4xl">
            {firstName + " " + lastName}
          </h2>

          <span>
            {age}, {gender}
          </span>
        </div>

        <p>{about}</p>

        <div className="card-actions justify-between my-4">
          <button className="btn btn-error w-[35%]">Ignore</button>
          <button className="btn btn-primary w-[35%]">Interested</button>
        </div>
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
  }).isRequired,
};

export default UserCard;
