import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
      .then((res) => {
        setUsers(res.data.user);
      });
  }, [filter]);

  return (
    <div className="m-5">
      <div className="font-bold">Users</div>
      <div className="flex mt-2">
        <input
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded border-black w-full placeholder-py-2 placeholder-px-4 p-2 "
          type="text"
          placeholder="select users"
        />
      </div>
      <div>
        {users.map((user) => (
          <User user={user} key={user.id} />
        ))}
      </div>
    </div>
  );
};

function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between my-2 border-b">
      <div>
        {user.firstName} {user.lastName}
      </div>
      <div>
        <Button
          onPress={(e) => {
            navigate(
              "/send?id=" +
                user._id +
                "&name=" +
                user.firstName +
                " " +
                user.lastName
            );
          }}
          type="button"
          label="Send Money"
        />
      </div>
    </div>
  );
}
