import { createContext, useState } from "react";
import { getTableData } from "../utils/ApiCall";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [marketData, setMarketData] = useState(null);
  const [sidebarData, setSidebarData] = useState(null);
  const [loadingTableData, setLoadingTableData] = useState(false);
  const [loadingSidebarData, setLoadingSidebarData] = useState(false);

  const callApi = async (...params) => {
    switch (params[0]) {
      case "market":
        try {
          setLoadingTableData(true);
          const data = await getTableData(params[1] || undefined);
          if (data) {
            setLoadingTableData(false);
            setMarketData(params[1] ? [data] : data);
          }
        } catch (e) {
          setLoadingTableData(false);
          setMarketData(null);
        }
        break;
      case "sidebar":
        try {
          setLoadingSidebarData(true);
          const data = await getTableData(params[1]);
          if (data) {
            setLoadingSidebarData(false);
            setSidebarData(data);
          }
        } catch (e) {
          setLoadingSidebarData(false);
          setSidebarData(null);
        }
        break;
      default:
        break;
    }
  };

  let providerValue = {
    test: "test",
    marketData,
    sidebarData,
    loadingTableData,
    loadingSidebarData,
    callApi: (...params) => callApi(...params)
  };

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
};
