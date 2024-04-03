import React, { useState, useSyncExternalStore } from "react";
import { Heading } from "../components/Header";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Button } from "../components/Button";

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white rounded-lg p-8 shadow-md w-1/4">
        <div className="flex flex-col justify-center items-center">
          <Heading label={"Send Money"}></Heading>
          <SubHeading label={"Lets send Money "}></SubHeading>
        </div>
        <div className="flex py-5">
          <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ">
            <svg
              className="absolute w-12 h-12 text-gray-400 -left-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <div className="font-black m-2 px-3">{name}</div>
        </div>
        <div className="">
          <div className="font-black">Amount (in Rs)</div>
          <InputBox
            type={"text"}
            boxname={"Enter amount"}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
          <div className="flex justify-center">
            <Button
              onPress={() => {
                axios
                  .post(
                    "http://localhost:3000/api/v1/account/transfer",
                    {
                      to: id,
                      amount,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      },
                    }
                  )
                  .then((res) => console.log(res))
                  .catch((err) => console.log(err));
              }}
              label="SignUp"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
