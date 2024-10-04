import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  const [loading, setLoading] = useState(true); // Add a loading state

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res?.data?.data));
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="font-bold text-2xl">Loading...</h1>
      </div>
    );
  }

  if (!connections || connections.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="font-bold text-2xl">No Connections Found!</h1>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h1 className="font-bold text-2xl my-10">Connections</h1>

      {connections.map((connection) => {
        const { firstName, lastName, url, gender, age, about } = connection;

        return (
          <div key={firstName} className="flex justify-center">
            <div className="flex flex-row gap-8 items-center m-4 p-4 rounded-lg bg-base-300 md:w-[60%]">
              <img
                src={url}
                alt={`${firstName} ${lastName}`}
                className="w-32 h-32 object-cover rounded-full"
              />
              <div className="flex flex-col text-left md:items-start gap-3">
                <h2 className="font-bold text-xl">
                  {firstName} {lastName}
                </h2>
                <p>
                  {age}
                  {", "}
                  {gender}
                </p>
                <p>{about}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
