import React, { useEffect, useState } from 'react'
import BharatrohanTheme from '../../Components/BharatrohanTheme'
import { ThemeProvider } from '@emotion/react'
import Navbar from '../../Components/Navbar'
import { Box, Button } from '@mui/material'
import { deleteFarmer, manage } from '../../APIS/apiCalls';
import {MaterialReactTable} from "material-react-table";
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'; // Import


const Manage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(true);
  const columns = [
    {
      accessorKey: 'name',
      header: 'Name',
      Cell : ({cell}) => {
          const val = cell.getValue();
          return <>{ val.toUpperCase() }</>
      }
    },
    {
      accessorKey: 'fathername',
      header: 'Father Name',
      Cell : ({cell}) => {
          const val = cell.getValue();
          return <>{ val.toUpperCase() }</>
      }
    },
    {
      accessorKey: 'district',
      header: 'District',
      Cell : ({cell}) => {
          const val = cell.getValue();
          return <>{ val.toUpperCase() }</>
      }
    },
    {
      accessorKey: 'tehsil',
      header: 'Tehsil',
      Cell : ({cell}) => {
          const val = cell.getValue();
          return <>{ val.toUpperCase() }</>
      }
    },
    {
      accessorKey: 'block',
      header: 'Block',
      Cell : ({cell}) => {
          const val = cell.getValue();
          return <>{ val.toUpperCase() }</>
      }
    },
    {
      accessorKey: 'village',
      header: 'Village',
      Cell : ({cell}) => {
          const val = cell.getValue();
          return <>{ val.toUpperCase() }</>
      }
    },
    {
      header: 'Entry created by',
      Cell : ({row}) => {
          console.log(row);
          const user = row.original.userid;
          return <>{ (user?.firstname + ' ' + user?.lastname).toUpperCase() } - {user?.farmers.length}</>
      }
    },
    {
      header: 'Actions',
      Cell : ({row}) => {
          const _id = row.original._id;
          return <>
           <Button color='primary' variant="contained" startIcon={<EditIcon />} onClick={() => handleEdit(_id)}> Edit </Button> &nbsp;
           <Button color='danger' variant="contained" startIcon={<DeleteIcon />} sx={{color : 'white', mt : 1}} onClick={() => handleDelete(_id)}>Delete</Button>
          </>
      }
    },
  ];

  const handleEdit = (id) => {
    navigate(`/onboard/${id}`);
  }

  const handleDelete = (id) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteFarmer(id).then((response) => {
              console.log(response);
              toast.success('Farmer Deleted Successfully');
              setFlag(!flag);
            }).catch(error => {
              toast.error('Unauthorized User');
            }) 
          }
        },
        {
          label: 'No',
          onClick: () => {
            
          }
        }
      ]
    });
  }

  useEffect(()=> {
    (async () =>{
      try{
        const data = await manage();
        if(data.message){
          setData(data.response);
        }
      }catch(error){
        // console.log(error.response)
        toast.error(error.statusText, {
          toastId: 2,
          autoClose: 1000,
        });
      }
    })();
  }, [flag]);

  return (
	  <ThemeProvider theme={BharatrohanTheme}>
      <Box>	
          <Box>
            <Navbar/>
          </Box>

          <Box
              sx={{
                m : 2,
                p : 3,
                height : 'fit-content',
                boxShadow : 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;'
              }}
            >
              <h2>Farmers Onboarded Data</h2>
              <MaterialReactTable
                columns={columns}
                data = {data}
            
                muiTableProps={{
                    sx: {
                    border: '0.3px solid rgba(81, 81, 81, 1)',
                    },
                }}
                muiTableHeadCellProps={{
                    sx: {
                        border: '0.3px solid rgba(81, 81, 81, 1)',
                    },
                }}
                muiTableBodyCellProps={{
                    sx: {
                        border: '0.3px solid rgba(81, 81, 81, 1)',
                    },
                }}
              />
          </Box>
      </Box>
    </ThemeProvider>
  )
}

export default Manage