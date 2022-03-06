import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Typography
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/Context";
import { StyledTableCell, StyledTableRow } from "../../styles/styles";
import { CREATE_DATA, TABLE_HEADER } from "../../utils/Constants";
import TablePaginationActions from "./TablePaginationActions";

const TableComponent = () => {
  const { marketData, loadingTableData } = useContext(AppContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (marketData)
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
          <TableHead>
            <StyledTableRow>
              {TABLE_HEADER.map((head) => (
                <StyledTableCell
                  key={head.id}
                  style={{ minWidth: head.minWidth }}
                >
                  {head.label}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          {loadingTableData ? (
            <Typography>Fetching market data...</Typography>
          ) : marketData ? (
            <>
              <TableBody>
                {(rowsPerPage > 0
                  ? tableData.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : tableData
                ).map((row, index) => (
                  <StyledTableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {TABLE_HEADER.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          {...(column.onClick
                            ? { onClick: () => console.log(row) }
                            : undefined)}
                        >
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </StyledTableRow>
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
