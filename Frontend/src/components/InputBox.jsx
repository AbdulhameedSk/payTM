import React from "react";

export const InputBox = ({ name, boxname }) => {
  return (
    <div className="my-2">
      <div>{name}</div>
      <div>
        <input
          type="text"
          placeholder={boxname}
          className={`border px-4 py-2 w-full`}
        />
      </div>
    </div>
  );
};
