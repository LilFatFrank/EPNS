import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./context/Context";
import { FilterComponent, SidebarComponent, TableComponent } from "./sections";
import "./styles/app.scss";

const App = () => {
  const { callApi } = useContext(AppContext);

  const [showDetails, setShowDetails] = useState(null);
  const [open, setOpen] = useState(false);

  const openSidebar = (coin) => {
    setShowDetails(coin);
    setOpen(true);
  };

  useEffect(() => {
    callApi("market");
  }, []);

  return (
    <Box component={"div"} className="wrapper pad-all-20">
      <FilterComponent />
      <TableComponent showDetails={(coin) => openSidebar(coin)} />
      <SidebarComponent
        coin={showDetails}
        onClose={() => setOpen(false)}
        open={open}
      />
    </Box>
  );
};

export default App;
