import { useSnackbar } from "notistack";
import { createContext, useState } from "react";
import { getTableData } from "../utils/ApiCall";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [marketData, setMarketData] = useState(null);
  const [sidebarData, setSidebarData] = useState(null);
  const [loadingTableData, setLoadingTableData] = useState(false);
  const [loadingSidebarData, setLoadingSidebarData] = useState(false);

  const notification = (message, variant) =>
    enqueueSnackbar(message, { variant });

  const callApi = async (...params) => {
    switch (params[0]) {
      case "market":
        try {
          setLoadingTableData(true);
          const data = await getTableData(params[1] || undefined);
          if (data) {
            setLoadingTableData(false);
            setMarketData(
              params[1]
                ? [
                    {
                      id: data.id,
                      symbol: data.symbol,
                      current_price: data.market_data.current_price.usd,
                      market_cap: data.market_data.market_cap.usd,
                      market_cap_rank: data.market_cap_rank,
                      low_24h: data.market_data.low_24h.usd,
                      high_24h: data.market_data.high_24h.usd,
                      ath: data.market_data.ath.usd
                    }
                  ]
                : data
            );
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
    callApi: (...params) => callApi(...params),
    notification
  };

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
};
