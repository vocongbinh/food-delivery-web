import React, { useState } from 'react'
import Button from '../Button/Button'
import Image from 'next/image'
import { useInformationContext } from '@/contexts/information/information-context'
import { Knob, KnobChangeEvent } from 'primereact/knob';
import { Slider } from '@mui/material'
import { get } from 'lodash';
export default function Activity() {
  const { information, handleChangeInformation } = useInformationContext()

  const getActivityValue = (value: number) => {
    switch (value) {
      case 0:
        return "Little/no exercise";
      case 25:
        return "Light exercise";
      case 50:
        return "Moderate exercise (3-5 days/week)";
      case 75:
        return "Very active (6-7 days/week)";
      case 100:
        return "Extra active (very active & physical job)";
      default:
        return "Little/no exercise";
    }
  };

  const getActivityColor = (value: number) => {
    switch (value) {
      case 0:
        return "#FF0000"; // Red
      case 25:
        return "#FFA500"; // Orange
      case 50:
        return "#FFFF00"; // Yellow
      case 75:
        return "#AED581"; // Green
      case 100:
        return "#00FF00"; // Blue
      default:
        return "#FF0000"; // Red
    }
  };
  const renderLegends = () => {
    let result = [];
    for (let i = 0; i <= 100; i += 25) {
      result.push(
        <span className="flex gap-2 items-center"><div style={{ backgroundColor: i == 0 ? "#cfcfcf" : getActivityColor(i) }} className={`w-8 h-8 rounded-full`}></div> {getActivityValue(i)}</span>
      )
    }
    return result
  }
  const handleChange = (e: KnobChangeEvent) => {
    const value = e.value;
    setValue(value);
    handleChangeInformation(
      "activity",
      getActivityValue(value)
    );
  }
  const [value, setValue] = useState(25);
  return (
    <div className="flex flex-col justify-around gap-8 items-center">
      <span className='text-3xl dark:text-white text-cyan-950 font-semibold text-center'>What is your Activity ? 🧑🏋️</span>
      <div className="mt-10 w-full flex justify-between items-center gap-4">
        <Knob value={value} valueColor={getActivityColor(value)} onChange={handleChange} min={0} max={100} step={25} valueTemplate={""} size={200} />
        <div className="flex flex-col gap-2">
          {renderLegends()}
        </div>
      </div>


    </div>

  )
}
