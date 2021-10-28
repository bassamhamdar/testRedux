import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setEmployees } from "../redux/actions/employeeActions";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const AddEmployee = () => {
  const schema = yup.object().shape({
    name: yup.string().min(3).required(),
    email: yup.string().email().required(),
    phone: yup.string().min(8).max(8).required(),
  });

  const employees = useSelector((state) => state.allEmployees.employees);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (d) => {
    saveEmployee(d);
  };

  const saveEmployee = async (value) => {
    try {
      const response = await axios.post(`http://localhost:3001/add`, value);
      const data = response.data;
      console.log("added data", data);
      if (data.success) {
        dispatch(setEmployees([...employees, data.data]));
        reset();
      }
    } catch (e) {}
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} placeholder="name" />
        <p>{errors.name?.message}</p>
        <input {...register("email")} placeholder="email" />
        <p>{errors.email?.message}</p>
        <input {...register("phone")} placeholder="phone" />
        <p>{errors.phone?.message}</p>
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};
