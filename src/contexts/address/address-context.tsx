"use client"
import { 
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
interface Location {
  latitude: number;
  longitude: number;
}
interface ContextValue {
  address: string;
  setAddress: (value: string) => void;
  location: Location ;
  setLocation: Dispatch<SetStateAction<Location >>;
}
const initialLocation: Location = {latitude: 0, longitude: 0}

export const AddressContext = createContext<ContextValue>({
  address: "",
  setAddress: () => { },
  location: {latitude: 0, longitude: 0},  
  setLocation: () => { },
});


const AddressProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState<Location>(initialLocation);
  
  return (
    <AddressContext.Provider
      value={{
        address,
        setAddress,
        location,
        setLocation

      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddressContext = () => useContext(AddressContext);

export default AddressProvider;
