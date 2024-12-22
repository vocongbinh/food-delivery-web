"use client";
import React, { useState } from "react";
import Input from "@/components/Input/Input";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import NcLink from "@/components/NcLink/NcLink";
import Heading2 from "@/components/Heading/Heading2";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthSchema } from "@/schemas/authSchema";
import { z } from "zod";
import { AuthRequest } from "@/types/auth";
import { useLogin } from "@/react-query/auth";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
// import { DishesApi } from "@/apis/dish";
import {
  Slider,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { AuthsApi } from "@/apis/auths";
import { DishesApi } from "@/apis/dishes";
const converter = require("number-to-words");
const activitiesMark = [
  {
    value: 0,
    label: "Little/no exercise",
  },
  {
    value: 25,
    label: "Light exercise",
  },
  {
    value: 50,
    label: "Moderate exercise",
  },
  {
    value: 75,
    label: "Very active",
  },
  {
    value: 100,
    label: "Extra active",
  },
];

const goalsMark = [
  {
    value: 0,
    label: "Maintain weight",
  },
  {
    value: 100 / 3,
    label: "Mild weight loss",
  },
  {
    value: 200 / 3,
    label: "Weight loss",
  },
  {
    value: 100,
    label: "Extreme weight loss",
  },
];
interface InformationProps {
  activity: string;
  age: number;
  height: number;
  weight: number;
  weightLoss: string;
  mealPerDay: number;
}
const initialInformation: InformationProps = {
  activity: "Light exercise",
  age: 18,
  height: 160,
  weight: 40,
  weightLoss: "Maintain weight",
  mealPerDay: 3,
};
const InformationPage = ({}) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [information, setInformation] =
    useState<InformationProps>(initialInformation);
  const login = useLogin();

  const handleChangeInformation = (
    key: keyof InformationProps,
    value: number | string
  ) => {
    setInformation((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };
  const getAriaValue = (value: number) => {
    switch (value) {
      case 0:
        return "Little/no exercise";
      case 25:
        return "Light exercise";
      case 50:
        return "Moderate exercise";
      case 4:
        return "Very active";
      case 5:
        return "Extra active";
      default:
        return "No exercise";
    }
  };

  const handleContinue = async () => {
    // await AuthsApi.updateUser(information, 24);
    console.log("ff");
    const data = await DishesApi.getRecommendedDishes();
    console.log(data);
  };

  const renderAgeItem = () => {
    const items = [];
    for (let i = 18; i <= 100; i++) {
      items.push(
        <MenuItem key={i} value={i}>
          {converter.toWords(i)}
        </MenuItem>
      );
    }
    return items;
  };

  const renderHeightItem = () => {
    const items = [];
    for (let i = 140; i <= 200; i++) {
      items.push(
        <MenuItem key={i} value={i}>
          {i} cm
        </MenuItem>
      );
    }
    return items;
  };

  const renderWeightItem = () => {
    const items = [];
    for (let i = 30; i <= 200; i++) {
      items.push(
        <MenuItem key={i} value={i}>
          {i} kg
        </MenuItem>
      );
    }
    return items;
  };

  return (
    <>
      <header className="text-center max-w-2xl mx-auto mb-3 sm:mb-16 lg:mb-6 ">
        <h2 className="text-4xl font-semibold">Update Your Information</h2>
      </header>

      <div className="max-w-lg mx-auto space-y-2 mt-12">
        <div className="grid grid-cols-1 gap-10">
          <label className="flex justify-between">
            <span className="text-neutral-800 dark:text-neutral-200">
              What is your age?
            </span>
            <FormControl className="w-1/3">
              <InputLabel id="age">Age</InputLabel>
              <Select
                value={information.age}
                labelId="age"
                label="Age"
                onChange={(e) => {
                  handleChangeInformation("age", e.target.value as number);
                }}
              >
                {renderAgeItem()}
              </Select>
            </FormControl>
          </label>
          <label className="flex justify-between">
            <span className="text-neutral-800 dark:text-neutral-200">
              What is your height?
            </span>
            <FormControl className="w-1/3">
              <InputLabel id="height">Height</InputLabel>
              <Select
                value={information.height}
                labelId="height"
                label="Height"
                onChange={(e) => {
                  handleChangeInformation("height", e.target.value as number);
                }}
              >
                {renderHeightItem()}
              </Select>
            </FormControl>
          </label>

          <label className="flex justify-between">
            <span className="text-neutral-800 dark:text-neutral-200">
              What is your weight?
            </span>
            <FormControl className="w-1/3">
              <InputLabel id="weight">Weight</InputLabel>
              <Select
                value={information.weight}
                labelId="weight"
                label="Weight"
                onChange={(e) => {
                  handleChangeInformation("weight", e.target.value as number);
                }}
              >
                {renderWeightItem()}
              </Select>
            </FormControl>
          </label>
          <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  What is your activity level?
                </span>
                {/* <ul>
                  <li>1: Little/no exercise </li>
                  <li>2: Light exercise</li>
                  <li>3: Moderate exercise (3-5 days/week)</li>
                  <li>4: Very active (6-7 days/week)</li>
                  <li>5: Extra active (very active day & physical job)</li>
                </ul> */}
                <Slider
                  aria-label="activity marks"
                  defaultValue={25}
                  getAriaValueText={getAriaValue}
                  step={25}
                  valueLabelDisplay="off"
                  marks={activitiesMark}
                  onChange={(e, value) => {
                    handleChangeInformation(
                      "activity",
                      activitiesMark.filter(
                        (activity) => activity.value === value
                      )[0].label
                    );
                  }}
                />
              </label>
            </span>
          </label>
          <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  What is your goal?
                </span>

                <Slider
                  aria-label="goal marks"
                  defaultValue={0}
                  step={100 / 3}
                  valueLabelDisplay="off"
                  marks={goalsMark}
                  color="warning"
                  onChange={(e, value) => {
                    handleChangeInformation(
                      "weightLoss",
                      goalsMark.filter((goal) => goal.value === value)[0].label
                    );
                  }}
                />
              </label>
            </span>
          </label>
          <ButtonPrimary onClick={handleContinue}>Continue</ButtonPrimary>
        </div>
      </div>
    </>
  );
};

export default InformationPage;
