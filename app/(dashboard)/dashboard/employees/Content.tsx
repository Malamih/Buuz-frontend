"use client";
import React, { useEffect, useState } from "react";
import { AddButton } from "./AddButton";
import { Input } from "@/components/ui/input";
import { Employee } from "./Employee";
import { useGetEmployees } from "@/services/employees";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

export const Content = () => {
  const [name, setName] = useState("");
  const [nameInput, setNameInput] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setName(nameInput);
    }, 400);

    return () => {
      clearTimeout(timeout);
    };
  }, [nameInput]);

  const { data, isPending } = useGetEmployees({ name });
  return (
    <>
      <div className="bg-white p-4 m-2 rounded-2xl">
        <div className="header flex gap-2 justify-between">
          <Input
            placeholder="Search by name.."
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            disabled={isPending}
          />
          <div className="options">
            <AddButton />
          </div>
        </div>
        {data && data?.payload?.length < 1 && (
          <h1 className="text-xl font-medium text-center mt-4 text-gray-400">
            No Employees
          </h1>
        )}
        <div
          className="employees flex flex-wrap gap-4 mt-8"
          style={{ rowGap: 8 }}
        >
          {data?.payload?.map((employee, i: number) => {
            return <Employee key={i} employee={employee} />;
          })}
        </div>
      </div>
    </>
  );
};
