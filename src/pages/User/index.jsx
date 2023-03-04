import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { gorestApi } from "../../services/gorestApi";

const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function GetUser() {
      setLoading(true);
      try {
        const res = await gorestApi.get(`/users/${id}`);
        console.log(res.data, "--single user data in userpage");
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setUser(null);
        setLoading(false);
      }
    }

    GetUser();
  }, [id]);

  return (
    <section className="p-20 bg-slate-700 min-h-screen flex  items-center justify-center">
      {loading ? (
        <Skeleton
          height={"21.8rem"}
          width={"24rem"}
          highlightColor="#64748b"
          baseColor="#1e293b"
        />
      ) : (
        user && (
          <div
            className="w-full max-w-sm    
       rounded-lg  bg-gray-800  h-fit"
          >
            <div className="flex justify-end px-4 pt-4">
              <button
                id="dropdownButton"
                className="text-slate-600"
                type="button"
              >
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                </svg>
              </button>
            </div>
            <div className="flex flex-col items-center pb-10 gap-y-2">
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src={
                  user?.gender?.toLowerCase() === "male"
                    ? "https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-8-avatar-2754583_120515.png"
                    : "https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-9-avatar-2754584_120518.png"
                }
                alt=".."
              />
              <h5 className="mb-1  font-semibold uppercase text-gray-900 dark:text-white">
                {user?.name}
              </h5>
              {/* <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {user?.firstName + user?.lastName}
              </h5> */}
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {user?.email}
              </span>
              {/* <span className="text-sm text-gray-500 dark:text-gray-400">
                {user?.phone}
              </span> */}
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {user?.gender}
              </span>
              <div className="flex mt-4 space-x-3 md:mt-6">
                <button className="px-4 py-2 text-sm font-medium  text-white bg-blue-700 rounded-lg hover:bg-blue-800 ">
                  Add friend
                </button>
                <button className="px-4 py-2 text-sm font-medium  text-gray-900 bg-white  rounded-lg hover:bg-gray-100 ">
                  Message
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </section>
  );
};

export default User;
