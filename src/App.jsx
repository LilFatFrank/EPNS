import { Box } from "@mui/material";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/Context";
import { FilterComponent, TableComponent } from "./sections";
import "./styles/app.scss";
import { BASE_URL } from "./utils/Constants";
import { getTableData } from "./utils/ApiCall";

const App = () => {
  const { callApi } = useContext(AppContext);

  useEffect(() => {
    callApi("market");
  }, []);

  return (
    <Box component={"div"} className="wrapper pad-all-20">
      <FilterComponent />
      <TableComponent />
    </Box>
  );
};

export default App;
