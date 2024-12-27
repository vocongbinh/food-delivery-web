import React, { useState } from 'react'
import Button from '../Button/Button'
import Image from 'next/image'
import { useInformationContext } from '@/contexts/information/information-context'
import { Slider } from '@mui/material'
export default function Height() {
  const { information, handleChangeInformation } = useInformationContext()
  const getHeightValue = (value: number) => value.toString()

  return (
    <div className="flex flex-col justify-around gap-8 items-center">
      <span className='text-3xl dark:text-white text-cyan-950 font-semibold text-center'>What is your Height ? 📐🧍‍♂️</span>
      <Image src="/icons/height.svg" alt="" width={200} height={200}/>
      <div className="px-6 w-full flex items-center gap-4">
      <Slider
              aria-label="height"
              size="medium"
              defaultValue={160}
              getAriaValueText={getHeightValue}
              valueLabelDisplay="auto"
              color="error"
              step={1}
              max={200}
              min={140}
              onChange={(e, value) => {
                handleChangeInformation(
                  "height",
                    Number(value)
                );
              }}
            /> 
            <span className="text-xl font-semibold">Cm</span>
      </div>
           
     
    </div>

  )
}
