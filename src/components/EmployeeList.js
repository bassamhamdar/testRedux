import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setEmployees } from "../redux/actions/employeeActions";
import { Search } from "./Search";
import { AddEmployee } from "./AddEmployee";

export const EmployeeList = () => {
  const employees = useSelector((state) => state.allEmployees.employees);
  const dispatch = useDispatch();
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`http://localhost:3001`);
      const data = response.data;
      console.log("data", data);

      if (data.success) dispatch(setEmployees(data.data));
    } catch (err) {
      console.log("error while fetching employess frontend", err);
    }
  };
  const deleteEmployee = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3001/delete/${id}`);
      const data = response.data;
      if (!data.success) throw new Error(data.message);
      console.log(data);
      if (data.success) {
        dispatch(setEmployees(data.data));
      }
    } catch (err) {}
  };

  useEffect(() => fetchEmployees(), []);
  return (
    <div>
      <AddEmployee />
      Employee List
      <Search />
      <div>
        {employees.map((empl, i) => (
          <div key={i}>
            <div> name:{empl.name}</div>
            <div> email: {empl.email}</div>
            <button onClick={() => deleteEmployee(empl._id)}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
};
