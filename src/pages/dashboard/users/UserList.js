import * as React from "react";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Typography, Divider } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Modal from "@mui/material/Modal";
import AddForm from "./AddForm";
import useAxios from "../../../hooks/use-axios";
import CircularProgress from "@mui/material/CircularProgress";
import { Snackbar, Alert } from "@mui/material";
import EditForm from "./EditForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function UserList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [isEditFormOpen, setisEditFormOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    status: "",
    message: "",
  });
  const [editUserId, setEditUserId] = useState("");

  const handleOpen = async () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleCloseEditForm = () => {
    setisEditFormOpen(false);
  };

  const Axios = useAxios();

  const getUsers = async () => {
    setLoading(true);
    await Axios({
      method: "GET",
      url: `/api/v1/admin/user?page=${
        page + 1
      }&limit=${rowsPerPage}&search=${search}`,
    })
      .then((res) => {
        console.log(res);
        setTotal(res.data.total);
        setRows(res.data.data);
      })
      .catch((err) => {
        setErrorMessage({
          status: "error",
          message: err.response.data.description,
        });
        setIsSnackbarOpen(true);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getUsers();
  }, [page, rowsPerPage, search]);

  const handleChangePage = (event, newPage) => {
    console.log("New Page", newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onSearchHandler = (event) => {
    setSearch(event.target.value);
  };

  const editUser = (id) => {
    setisEditFormOpen(true);
    setEditUserId(id);
  };

  const deleteUser = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        deleteApi(id);
      }
    });
  };

  const deleteApi = async (id) => {
    await Axios({
      method: "DELETE",
      url: `/api/v1/admin/user?user_id=${id}`,
    })
      .then((res) => {
        console.log(res);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        getUsers();
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Try Again",
          text: "Something went wrong!",
        });
      });
  };
  return (
    <>
      <div>
        <Modal
          open={isEditFormOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <EditForm
              id={editUserId}
              callGetUsers={getUsers}
              closeEvent={handleCloseEditForm}
              setModalOpen={setOpen}
            />
          </Box>
        </Modal>
      </div>
      <div>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddForm
              callGetUsers={getUsers}
              closeEvent={handleClose}
              setModalOpen={setOpen}
            />
          </Box>
        </Modal>
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ padding: "20px" }}
        >
          Users List
        </Typography>
        <Divider />
        <Box height={10} />
        <Stack
          sx={{ marginLeft: 2, marginRight: 2 }}
          direction="row"
          spacing={2}
          className="my-2 mb-2"
        >
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={rows}
            sx={{ width: 300 }}
            getOptionLabel={(rows) => rows.name || ""}
            renderInput={(params) => (
              <TextField
                value={search}
                onChange={onSearchHandler}
                {...params}
                size="small"
                label="Search Users"
              />
            )}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <Button
            onClick={handleOpen}
            variant="contained"
            endIcon={<AddCircleIcon />}
          >
            Add
          </Button>
        </Stack>
        <Box height={10} />

        {loading && (
          <Box>
            <CircularProgress sx={{ ml: 50 + "%", mt: 7 + "%" }} />
          </Box>
        )}
        {!loading && (
          <TableContainer sx={{ height: "auto" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Name
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    User Name
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1}>
                      <TableCell key={row.user_id} align="left">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.user_name}</TableCell>
                      <TableCell align="left">
                        <Stack spacing={2} direction="row">
                          <EditIcon
                            style={{
                              fontSize: "20px",
                              color: "blue",
                              cursor: "pointer",
                            }}
                            className="cursor-pointer"
                            onClick={() => editUser(row.user_id)}
                          />
                          <DeleteIcon
                            style={{
                              fontSize: "20px",
                              color: "darkred",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              deleteUser(row.user_id);
                            }}
                          />
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <TablePagination
          component="div"
          page={page}
          rowsPerPage={rowsPerPage}
          count={total}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[15, 25, 50]}
        />
      </Paper>
      {isSnackbarOpen && (
        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose}
            severity={errorMessage.status}
            sx={{ width: "100%" }}
          >
            {errorMessage.message ? errorMessage.message : "Try Again"}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
