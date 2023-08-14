import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import Button from "@mui/material/Button";
import { ArrowForwardIos } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";

import SearchAppBar from "./Search";
import { PlusCircleFilled } from "@ant-design/icons";

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

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    label: "Pokemon Name",
  },
  {
    id: "primaryType",
    numeric: false,
    label: "Primary Type",
  },
  {
    id: "secondaryType",
    numeric: false,
    label: "Secondary Type",
  },
  {
    id: "buttons",
    numeric: false,
    label: "",
  },
];

function TableToolBar(props) {
  const handleAddClick = () => {
    props.navigate({ pathname: "/admin/save-pokemon" });
  };
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      {props.title === "Pokemons" && (
        <SearchAppBar
          setSearchText={props.setSearchText}
          bckgrndClr="lightgray"
        />
      )}
      <Typography
        sx={{
          flex: "1 1 100%",
          position: "absolute",
          ml: 50,
        }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {props.title}
      </Typography>
      {props.title === "Pokemons" && (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={(event) => handleAddClick(event)}
          sx={{ marginLeft: 60 }}
          endIcon={<PlusCircleFilled />}
        >
          Add New Pokemon
        </Button>
      )}
    </Toolbar>
  );
}

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function PokemonList(props) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  let navigate = useNavigate();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event, id) => {
    navigate({ pathname: `/pokemons/${id}` });
  };

  const handleRemoveClick = async (event, id) => {
    const responseStatus = await props.removeMethod(id);
    if (responseStatus === 200) {
      window.location.reload();
    }
  };

  const handleDetailClick = (event, id) => {
    navigate({ pathname: `/pokemons/${id}` });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleUpdateClick = (event, id) => {
    navigate({ pathname: `/admin/update-pokemon/${id}` });
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(props.rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [props.rows, order, orderBy, page, rowsPerPage]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 5, mt: 5 }}>
        <TableToolBar
          title={props.title}
          setSearchText={props.setSearchText}
          navigate={navigate}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="pokemonsList"
            size="medium"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={props.rows.length}
            />
            <TableBody>
              {visibleRows.map((row) => {
                const labelId = `enhanced-table-checkbox-${row.id}`;

                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.id}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="normal"
                      onClick={(event) => handleClick(event, row.id)}
                    >
                      <Typography
                        sx={{ textDecoration: "underline" }}
                        display="inline"
                      >
                        {row.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">{row.primaryType}</TableCell>
                    <TableCell align="left">{row.secondaryType}</TableCell>
                    <TableCell align="left">
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={(event) => handleRemoveClick(event, row.id)}
                        sx={{ marginRight: 4 }}
                      >
                        Remove
                      </Button>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={(event) => handleDetailClick(event, row.id)}
                        endIcon={<ArrowForwardIos />}
                      >
                        Details
                      </Button>
                      {props.title === "Pokemons" && (
                        <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                          onClick={(event) => handleUpdateClick(event, row.id)}
                          sx={{ marginLeft: 4 }}
                        >
                          Update
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 55 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
