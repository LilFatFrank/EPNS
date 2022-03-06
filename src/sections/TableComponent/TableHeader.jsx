import {
  Button,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel
} from "@mui/material";
import { TABLE_HEADER } from "../../utils/Constants";

const TableHeader = (props) => {
  const { order, orderBy, onRequestSort, reset } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {TABLE_HEADER.map((headCell) => (
          <TableCell
            key={headCell.id}
            style={{ minWidth: headCell.minWidth }}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
