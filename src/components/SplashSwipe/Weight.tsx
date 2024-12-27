import React, { useState } from 'react'
import Button from '../Button/Button'
import Image from 'next/image'
import { useInformationContext } from '@/contexts/information/information-context'
import { Slider } from '@mui/material'
export default function Weight() {
  const { information, handleChangeInformation } = useInformationContext()
  const getWeightValue = (value: number) => value.toString()

  return (
    <div className="flex flex-col justify-around gap-8 items-center">
      <span className='text-3xl dark:text-white text-cyan-950 font-semibold text-center'>What is your Weight ? 🧑🏋️</span>
      <Image src="/icons/weight.svg" alt="" width={200} height={200}/>
      <div className="px-6 w-full flex items-center gap-4">
      <Slider
              aria-label="weight"
              size="medium"
              defaultValue={50}
              getAriaValueText={getWeightValue}
              valueLabelDisplay="auto"
              step={1}
              color="warning"
              max={120}
              min={40}
              onChange={(e, value) => {
                handleChangeInformation(
                  "weight",
                    Number(value)
                );
              }}
            /> 
            <span className="text-xl font-semibold">Kg</span>
      </div>
           
     
    </div>

  )
}
