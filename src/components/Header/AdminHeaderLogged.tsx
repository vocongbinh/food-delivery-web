"use client";
import React, { FC } from "react";
import AdminMainNav2Logged from "./AdminMainNav2Logged";

export interface HeaderLoggedProps {

}


const AdminHeaderLogged: FC<HeaderLoggedProps> = () => {
  return (
    <div className="nc-HeaderLogged sticky top-0 w-full z-40">
      <AdminMainNav2Logged  />
    </div>
  );
};

export default AdminHeaderLogged;
