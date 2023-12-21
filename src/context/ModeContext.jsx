import { createContext, useContext } from "react";

const ModeContext = createContext('light');

export const useMode = () => {
    return useContext(ModeContext);
}

export default ModeContext;