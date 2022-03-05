import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [marketData, setMarketData] = useState(null);

  let providerValue = {
    test: "test",
    marketData,
    setMarketData
  };

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
};
