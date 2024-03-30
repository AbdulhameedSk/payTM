import React from "react";
import { useState } from "react";
export const Users = () => {
  const [users, setUsers] = useState([
    { firstName: "SHAIK", lastName: "ABDULHAMEED", _id: 1 },
  ]);
  return (
    <div className="m-5">
      <div className="font-bold">Users</div>
      <div className="flex mt-2">
        <input
          className="border rounded border-black w-full placeholder-py-2 placeholder-px-4 p-2 "
          type="text"
          placeholder="select users"
        />
        {/* <input
          className="bg-black text-white px-4 py-2 border border-white rounded"
          type="button"
          value="Search"
        />{" "} */}
      </div>
      <div>
        {users.map((user) => (
          <User user={user} />
        ))}{" "}
      </div>
    </div>
  );
};

function User({ user }) {
  return (
    <div className="flex justify-between my-2 border-b">
      <div>
        {user.firstName} {user.lastName}
      </div>
      <div>
        <input
          className="bg-black text-white px-4 py-2 border border-white rounded"
          type="button"
          value="Send Money"
        />
      </div>
    </div>
  );
}
