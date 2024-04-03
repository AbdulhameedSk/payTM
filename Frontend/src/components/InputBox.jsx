import React from "react";

export const InputBox = ({ name, boxname, onChange, type }) => {
  return (
    <div className="my-2">
      <div>{name}</div>
      <div>
        <input
          onChange={onChange}
          type={type || "text"}
          placeholder={boxname}
          className={`border px-4 py-2 w-full`}
        />
      </div>
    </div>
  );
};
