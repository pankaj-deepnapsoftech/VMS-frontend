import { createContext } from "react";



// eslint-disable-next-line react-refresh/only-export-components
export const TVMDashboardContext = createContext({});


// eslint-disable-next-line react/prop-types
const TVMDashboardContextProvider = ({children}) => {

    return (
        <TVMDashboardContext.Provider value={{}} >
            {children}
        </TVMDashboardContext.Provider>
    )
};

export default TVMDashboardContextProvider;





