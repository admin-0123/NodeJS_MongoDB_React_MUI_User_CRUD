import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TablePagination,
  Grow,
  Box,
  IconButton,
  InputAdornment,
  TextField
} from "@mui/material";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled, useTheme } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { User, UserData } from "../utils/interfaces";
import { formatDate } from "../utils/functions";
import { useDispatch } from 'react-redux';
import { createUserData, deleteUserData, updateUserData } from '@/store/results.action';
import Swal from 'sweetalert2';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.secondary.main,
  },
  "&:hover": {
    cursor: 'pointer',
    backgroundColor: theme.palette.action.hover
  }
}));

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default function UserTable(props: any) {
  const { data } = props;

  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [newUser, setNewUser] = useState<any>({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [selectedUser, setSelectedUser] = useState<User>({
    _id: '',
    firstName: '',
    lastName: '',
    email: ''
  });

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const filterProfile = (profiles: any) => {
    return profiles.filter((profile: User) =>
      JSON
        .stringify(profile).toUpperCase()
        .includes(search.toUpperCase())
    );
  }

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = ({ target: { value } }: any) => {
    setSearch(value);
    setPage(0);
  }

  const handleCreateDialogOpen = () => {
    setCreateDialogOpen(true);
  }

  const handleEditDialogOpen = (user: UserData) => {
    const { _id, firstName, lastName, email } = user;
    setSelectedUser({ _id, firstName, lastName, email });
    setEditDialogOpen(true);
  }

  const handleCreateDialogClose = () => {
    setCreateDialogOpen(false);
  }

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  }

  const createData = () => {
    dispatch(createUserData(newUser))
      .then(() => handleCreateDialogClose());
  }

  const updateData = () => {
    dispatch(updateUserData(selectedUser))
      .then(() => handleEditDialogClose());
  }

  const deleteData = (user: UserData) => {
    const { _id, firstName, lastName, email } = user;
    setSelectedUser({ _id, firstName, lastName, email });

    Swal.fire({
      icon: "warning",
      title: "Will delete the user",
      text: "Are you sure you want to delete this user?",
      showConfirmButton: true,
      showCancelButton: true
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(deleteUserData(selectedUser))
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Deleted the user successfully!",
              showConfirmButton: true
            })
          })
      }
    })
  }

  return (
    <>
      <div className='flex justify-between items-center w-full container'>
        <TextField
          label="Search"
          variant="outlined"
          className='m-4 text-right'
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          value={search}
          onChange={handleSearch}
        />

        <Button
          color='primary'
          variant='contained'
          className='font-bold text-lg h-12 m-4 bg-gray-700'
          onClick={handleCreateDialogOpen}
        >
          Create
        </Button>
      </div>

      <Grow in={true}>
        <TableContainer component={Paper} className="relative mb-12 container">

          <Table className="shadow-md rounded-md">
            <TableHead>
              <TableRow>
                <StyledTableCell>Object ID</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {
                filterProfile(data).length > 0 ?
                  (rowsPerPage > 0
                    ? filterProfile(data).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : filterProfile(data)
                  ).map((user: UserData, index: number) => (
                    <StyledTableRow key={user._id}>
                      <StyledTableCell>{user._id}</StyledTableCell>
                      <StyledTableCell>
                        {user.firstName} {user.lastName}
                      </StyledTableCell>
                      <StyledTableCell>{user.email}</StyledTableCell>
                      <StyledTableCell>{formatDate(user.date)}</StyledTableCell>
                      <StyledTableCell>
                        <IconButton onClick={() => handleEditDialogOpen(user)} >
                          <EditIcon />
                        </IconButton>

                        <IconButton onClick={() => deleteData(user)}>
                          <DeleteIcon />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                  :
                  <StyledTableRow>
                    <TableCell colSpan={6}>
                      <h1 className='w-full text-3xl text-center p-4'>No matching data</h1>
                    </TableCell>
                  </StyledTableRow>
              }

              {emptyRows > 0 && (
                <StyledTableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </StyledTableRow>
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  count={filterProfile(data).length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Grow>

      <Dialog open={createDialogOpen} onClose={handleCreateDialogClose}>
        <DialogTitle>Create User Data</DialogTitle>

        <DialogContent className='flex flex-col w-96'>
          <TextField
            label='First Name'
            variant='outlined'
            className='my-2'
            value={newUser.firstName}
            onChange={({ target: { value } }) => setNewUser({ ...newUser, firstName: value })}
          />

          <TextField
            label='Last Name'
            variant='outlined'
            className='my-2'
            value={newUser.lastName}
            onChange={({ target: { value } }) => setNewUser({ ...newUser, lastName: value })}
          />

          <TextField
            label='Email Address'
            variant='outlined'
            className='my-2'
            value={newUser.email}
            onChange={({ target: { value } }) => setNewUser({ ...newUser, email: value })}
          />

          <Button
            color='primary'
            variant='contained'
            className='font-bold text-lg h-12 my-4 bg-gray-700'
            onClick={createData}
          >
            CREATE
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Edit User Data</DialogTitle>

        <DialogContent className='flex flex-col w-96'>
          <TextField
            label='First Name'
            variant='outlined'
            className='my-2'
            value={selectedUser.firstName}
            onChange={({ target: { value } }) => setSelectedUser({ ...selectedUser, firstName: value })}
          />

          <TextField
            label='Last Name'
            variant='outlined'
            className='my-2'
            value={selectedUser.lastName}
            onChange={({ target: { value } }) => setSelectedUser({ ...selectedUser, lastName: value })}
          />

          <TextField
            label='Email Address'
            variant='outlined'
            className='my-2'
            value={selectedUser.email}
            onChange={({ target: { value } }) => setSelectedUser({ ...selectedUser, email: value })}
          />

          <Button
            color='primary'
            variant='contained'
            className='font-bold text-lg h-12 my-4 bg-gray-700'
            onClick={updateData}
          >
            Edit
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
