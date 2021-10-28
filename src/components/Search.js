import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setEmployees } from "../redux/actions/employeeActions";

export const Search = () => {
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const onSubmit = (d) => searchEmployees(d.name);
  const searchEmployees = async (value) => {
    try {
      const response = await axios.get(`http://localhost:3001/search/${value}`);
      const data = response.data;
      console.log("searched dataaa", data);

      if (data.success) dispatch(setEmployees(data.data));
    } catch (err) {
      console.log("error while fetching employess frontend", err);
    }
  };

  return (
    <div>
      <span>Search: </span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} placeholder="search for employees" />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};
