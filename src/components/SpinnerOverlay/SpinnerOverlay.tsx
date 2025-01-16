"use client"
import React from 'react';
import Spinner from '../Spinner/Spinner';


const SpinnerOverlay = ({ loading }: {loading: boolean}) => (
  loading ? (
    <div style={
        {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999
        }
    }>
      <Spinner/>
    </div>
  ) : null
);

export default SpinnerOverlay;