import React, { useEffect, useState } from 'react'
import BharatrohanTheme from '../../Components/BharatrohanTheme'
import { ThemeProvider } from '@emotion/react'
import Navbar from '../../Components/Navbar'
import { Box } from '@mui/material'
import { manage } from '../../APIS/apiCalls';
import {MaterialReactTable} from "material-react-table";

const Manage = () => {
  const [data, setData] = useState([]);
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
        console.log(row)
          const user = row.original.userid;
          return <>{ user?.firstname + ' ' + user?.lastname }</>
      }
    },
  ]

  useEffect(()=> {
    (async () =>{
      const data = await manage();
      if(data.message){
        setData(data.response);
      }
    })();
  }, []);

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