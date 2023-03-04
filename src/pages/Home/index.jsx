import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { gorestApi } from "../../services/gorestApi";

const Home = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function GetAllUsers() {
      setLoading(true);
      try {
        const res = await gorestApi.get("/users");
        console.log(res.data, "-- users in home page");
        // setUsers(res.data.users);
        setUsers(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setUsers(null);
        setLoading(false);
      }
    }

    GetAllUsers();
  }, []);

  return (
    <section className="bg-slate-700 p-5">
      <h2 className="text-2xl text-white p-2 font-medium">All Users</h2>
      <hr />
      <br />
      <div className="flex justify-center flex-wrap gap-4">
        {loading ? (
          <>
            <Skeleton
              height={"17.5rem"}
              width={"24rem"}
              highlightColor="#64748b"
              baseColor="#1e293b"
              count={3}
            />
            <Skeleton
              height={"17.5rem"}
              width={"24rem"}
              highlightColor="#64748b"
              baseColor="#1e293b"
              count={3}
            />
          </>
        ) : (
          users?.length &&
          users?.map((user) => (
            <div
              key={user?.id}
              className={`rounded-md bg-slate-800 p-5 w-96 text-white border-2  ${
                user?.gender?.toLowerCase() == "male"
                  ? "border-blue-500 "
                  : "border-rose-500 "
              } ${user?.a}`}
            >
              <ul className="leading-8">
                <li>
                  <span className="font-semibold">Username:</span>{" "}
                  {/* {user?.username ? user?.username : "-"} */}
                  {user?.name ? user?.name : "-"}
                </li>
                <li>
                  <span className="font-semibold">Email ID:</span>{" "}
                  {user?.email ? user?.email : "-"}
                </li>
                <li className="capitalize">
                  <span className="font-semibold">Gender:</span>{" "}
                  {user?.gender ? user?.gender : "-"}
                </li>
              </ul>
              <Link
                to={"/user/" + user?.id}
                className={`${
                  user?.gender?.toLowerCase() == "female"
                    ? "bg-rose-600"
                    : "bg-blue-600"
                } font-semibold px-3 rounded-md py-2 hover:scale-95 inline-block text-sm mt-3`}
              >
                View User
              </Link>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Home;
