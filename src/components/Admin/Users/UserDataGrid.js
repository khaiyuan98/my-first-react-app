import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import moment from 'moment/moment';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Paper } from '@mui/material';
import { DeleteUserDialog } from './DeleteUserDialog';

const GET_USERS_URL = '/user';

const UserDataGrid = () => {
  const axios = useAxiosPrivate();

  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [chosenItem, setChosenItem] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const handleClickDeleteItem = (user) => {
    setChosenItem(user);
    setDeleteDialogOpen(true);
  };

  const handleClickViewItem = (user) => {
    setChosenItem(user);
    setAddDialogOpen(true);
  };

  const refreshData = () => {
    setIsLoading(true);

    axios.get(GET_USERS_URL)
      .then((response) => {
        setRows(response.data);
      })
      .catch(error => {
      })
      .finally(() => {
        setIsLoading(false);
      });

  }

  const columns = [
    {
      field: 'UserId',
      headerName: 'ID',
      width: 0.5,
      editable: false,
    },
    {
      field: 'Username',
      headerName: 'Username',
      flex: 0.2,
      editable: false,
    },
    {
      field: 'FirstName',
      headerName: 'First name',
      flex: 0.2,
      editable: false,
    },
    {
      field: 'LastName',
      headerName: 'Last name',
      flex: 0.2,
      editable: false,
    },
    {
      field: 'RoleName',
      headerName: 'Role',
      flex: 0.2,
      editable: false,
    },
    {
      field: 'UserGroups',
      headerName: 'Groups',
      flex: 0.2,
      editable: false,
      renderCell: (params) =>
        <div>
          {params.value.map(item =>
            <div>
              {item}
            </div>
          )}
        </div>
    },
    {
      field: 'LastLoginDate',
      headerName: 'Last Login',
      flex: 0.2,
      editable: false,
      valueFormatter: params => {
        return params.value != null ? moment.utc(params?.value).local().format("DD/MM/YYYY hh:mm A") : '-'
      },
    },
    {
      field: 'LastUpdated',
      headerName: 'Last Updated',
      flex: 0.2,
      editable: false,
      valueFormatter: params => {
        return params.value != null ? moment.utc(params?.value).local().format("DD/MM/YYYY hh:mm A") : '-'
      },
    },
    {
      field: 'LastUpdatedBy',
      headerName: 'Updated By',
      flex: 0.2,
      editable: false,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          icon={<VisibilityIcon />}
          label="Duplicate User"
          onClick={() => handleClickViewItem(params.row)}
        />,
        <GridActionsCellItem
          icon={<ModeEditIcon />}
          label="Edit"
          onClick={() => { }}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleClickDeleteItem(params.row)}
          showInMenu
        />,
      ],
    },
  ];

  useEffect(() => {
    refreshData();
  }, []);

  return (
    isLoading ?
      <>
        'Loading...'
      </>
      :
      <>
        <Paper sx={{ minHeight: 500, width: '100%' }}>
          <DataGrid
            sx={{ minHeight: 'inherit' }}
            density='comfortable'
            getRowHeight={() => 'auto'}
            autoPageSize={true}
            getRowId={(row) => row.UserId}
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 15,
                },
              },
            }}
            disableRowSelectionOnClick={true}
          />
        </Paper>
        < DeleteUserDialog itemToDelete={chosenItem} open={deleteDialogOpen} setDeleteDialogOpen={setDeleteDialogOpen} refreshData={refreshData} />
      </>

  );
}

export default UserDataGrid;