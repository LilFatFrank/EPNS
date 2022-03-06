import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
  Typography
} from "@mui/material";
import { useContext, useState } from "react";
import { AppContext } from "../../context/Context";
import "./FilterComponent.scss";

const defaultFormValues = {
  coin: ""
};

const FilterComponent = () => {
  const { callApi } = useContext(AppContext);
  const [formValues, setFormValues] = useState(defaultFormValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    callApi(
      "market",
      formValues.coin === "avalanche" ? "avalanche-2" : formValues.coin
    );
  };

  return (
    <Box component={"div"} className="component pad-all-20">
      <Typography variant="h6">Apply Filter</Typography>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <FormControl>
          <TextField
            id="coin-input"
            name="coin"
            label="Coin"
            type="text"
            placeholder="e.g. bitcoin"
            onChange={(e) =>
              setFormValues({ ...defaultFormValues, coin: e.target.value })
            }
          />
          <FormHelperText>Please input id in lowercase</FormHelperText>
          <FormHelperText>Leave empty to search all</FormHelperText>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          style={{ background: "black" }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default FilterComponent;
