import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableFooter,
  TablePagination,
  Typography
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/Context";
import { CREATE_DATA, TABLE_HEADER } from "../../utils/Constants";
import TableHeader from "./TableHeader";
import TablePaginationActions from "./TablePaginationActions";

const TableComponent = ({ showDetails }) => {
  const { marketData, loadingTableData } = useContext(AppContext);
  const [order, setOrder] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableData, setTableData] = useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  useEffect(() => {
    if (marketData) {
      setTableData([
        ...marketData.map((data) =>
          CREATE_DATA(
            data.id,
            data.symbol,
            data.current_price,
            data.market_cap,
            data.market_cap_rank,
            data.high_24h,
            data.low_24h,
            data.ath
          )
        )
      ]);
    }
  }, [marketData]);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box component={"div"}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHeader
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            reset={() => {
              setOrder("");
              setOrderBy("");
            }}
          />
          {loadingTableData ? (
            <Typography>Fetching market data...</Typography>
          ) : marketData ? (
            <>
              <TableBody>
                {tableData
                  .slice()
                  .sort(getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      {TABLE_HEADER.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            {...(column.onClick
                              ? { onClick: () => showDetails(row.id) }
                              : undefined)}
                          >
                            {column.format ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      10,
                      25,
                      50,
                      { label: "All", value: -1 }
                    ]}
                    colSpan={24}
                    count={tableData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        "aria-label": "rows per page"
                      },
                      native: true
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </>
          ) : (
            <Typography>No data.</Typography>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableComponent;
