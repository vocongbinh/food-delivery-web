import React, { useState } from 'react'
import Button from '../Button/Button'
import Image from 'next/image'
import { useInformationContext } from '@/contexts/information/information-context'
import { Knob, KnobChangeEvent } from 'primereact/knob';
import { Slider } from '@mui/material'
import { get } from 'lodash';
export default function Goal() {
  const { information, handleChangeInformation } = useInformationContext()

  const getGoalValue = (value: number) => {
    switch (value) {
      case 0:
        return "Maintain weight";
      case 100/3:
        return "Mild weight loss";
      case 200/3:
        return "Weight loss";
      case 100:
        return "Extreme weight loss";
      default:
        return "Maintain weight";
    }
  };

  const getGoalColor = (value: number) => {
    switch (value) {
      case 0:
        return "#FF0000"; 
      case 100/3:
        return "#FFA500"; 
      case 200/3:
        return "#FFFF00"; 
      case 100:
        return "#00FF00"; 
      default:
        return "#FF0000"; 
    }
  };
  const renderLegends = () => {
    let result = [];
    for (let i = 0; i <= 100; i += 100/3) {
      result.push(
        <span className="flex gap-2 items-center"><div style={{ backgroundColor: i == 0 ? "#cfcfcf" : getGoalColor(i) }} className={`w-8 h-8 rounded-full`}></div> {getGoalValue(i)}</span>
      )
    }
    return result
  }
  const handleChange = (e: KnobChangeEvent) => {
    const value = e.value;
    setValue(value);
    handleChangeInformation(
      "weightLoss",
      getGoalValue(value)
    );
  }
  const [value, setValue] = useState(100/3);
  return (
    <div className="flex flex-col justify-around gap-8 items-center">
      <span className='text-3xl dark:text-white text-cyan-950 font-semibold text-center'>What is your Goal ? 🎯</span>
      <div className="mt-10 w-full flex justify-evenly items-center gap-4">
        <Knob value={value} valueColor={getGoalColor(value)} onChange={handleChange} min={0} max={100} step={100/3} valueTemplate={""} size={200} />
        <div className="flex flex-col gap-2">
          {renderLegends()}
        </div>
      </div>


    </div>

  )
}
