"use client"
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
export interface InformationProps {
    activity: string;
    age: number;
    height: number;
    weight: number;
    weightLoss: string;
    mealPerDay: number;
    gender: string;
}

const initialInformation: InformationProps = {
    activity: "Light exercise",
    age: 18,
    height: 160,
    weight: 40,
    weightLoss: "Maintain weight",
    mealPerDay: 3,
    gender: 'male'
};
interface ContextValue {
    information: InformationProps;
    setInformation: Dispatch<SetStateAction<InformationProps>>;
    handleChangeInformation: (key: keyof InformationProps, value: number | string) => void;
}
export const InformationContext = createContext<ContextValue>({
    information: initialInformation,
    setInformation: () => { },
    handleChangeInformation: () => { },
});
const InformationProvider = ({ children }: { children: ReactNode }) => {
    const [information, setInformation] =
        useState<InformationProps>(initialInformation);
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
    return (
        <InformationContext.Provider
            value={{
                information,
                setInformation,
                handleChangeInformation
            }}
        >
            {children}
        </InformationContext.Provider>
    );
};

export const useInformationContext = () => useContext(InformationContext);

export default InformationProvider;