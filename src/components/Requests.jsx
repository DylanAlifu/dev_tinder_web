import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      // this _id will fall in the action.payload
      dispatch(removeRequest(_id));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/pending", {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requests || requests.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="font-bold text-2xl">No Requests Found!</h1>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h1 className="font-bold text-2xl my-10">Requests</h1>

      {requests.map((request) => {
        const { fromUserId } = request;

        return (
          <div key={fromUserId._id} className="flex justify-center">
            <div className="m-2 md:m-6 p-4 rounded-lg bg-base-300 w-[75%] md:w-[50%] flex items-center justify-around gap-8">
              <div className="flex items-center gap-6 w-1/2">
                <img
                  src={fromUserId.url}
                  alt={`${fromUserId.firstName} ${fromUserId.lastName}`}
                  className="w-20 h-20 object-cover rounded-full"
                />
                <h2 className="font-bold text-xl w-fit">
                  {fromUserId.firstName} {fromUserId.lastName}
                </h2>
              </div>
              <div className="flex gap-8">
                <button
                  className="btn btn-primary btn-md"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-error btn-md"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
