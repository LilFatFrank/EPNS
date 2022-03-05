import { Box } from "@mui/material";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/Context";
import { FilterComponent, TableComponent } from "./sections";
import "./styles/app.scss";

const App = () => {
  const { setMarketData } = useContext(AppContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch(
      "https://coingecko.p.rapidapi.com/coins/markets?vs_currency=usd&page=1&per_page=100&order=market_cap_desc",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": process.env.REACT_APP_API_HOST,
          "x-rapidapi-key": process.env.REACT_APP_API_KEY
        }
      }
    );
    const data = await response.json();
    setMarketData(data);
  };

  return (
    <Box component={"div"} className="wrapper">
      <FilterComponent />
      <TableComponent />
    </Box>
  );
};

export default App;
