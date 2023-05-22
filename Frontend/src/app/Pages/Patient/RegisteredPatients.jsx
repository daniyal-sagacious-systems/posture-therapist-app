import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
  Box, styled, Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Icon, Button
} from '@mui/material';
import { Span } from "app/components/Typography";
import { Breadcrumb, SimpleCard } from 'app/components';

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));



const RegisteredPatients = () => {
  const [patients, setPatients] = useState([])

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    axios.get(process.env.REACT_APP_ORIGIN_URL + 'api/patients/').then((res) => { setPatients(res.data); console.log("res", res) }).catch(e => console.log("E", e))
    console.log("patients", patients)

  }, [])

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Registered Patients' }]} />
      </Box>

      <div className='card'>
        <div className='card-body'>


          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell align="left" width={50}>Sr</TableCell>
                <TableCell align="left">First Name</TableCell>
                <TableCell align="left">Last Name</TableCell>
                <TableCell align="center">CNIC</TableCell>
                <TableCell align="center">Mobile No</TableCell>
                <TableCell align="center">Practitioner Type</TableCell>
                <TableCell align="right">Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((items, id) => (
                  <TableRow key={id}>
                    <TableCell align="left">{id}</TableCell>
                    <TableCell align="left">{items.first_name}</TableCell>
                    <TableCell align="left">{items.surname}</TableCell>
                    <TableCell align="center">{items.cnic}</TableCell>
                    <TableCell align="center">{items.mobile_no}</TableCell>
                    <TableCell align="center">{items.date_registered}</TableCell>
                    <TableCell align="right"><Link
                      to="/patientdetails"
                      state={{ patient: items }}

                      style={{ textDecoration: "none" }}
                    >
                      <button
                        style={{ padding: "0.2rem", border: "0.1px solid grey", borderRadius: "5px", fontWeight: "bold", background: "#365CAD", color: "white" }}
                        variant="success"
                      >
                        Details
                      </button>
             
                    </Link>

                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </StyledTable>


          <TablePagination
            sx={{ px: 2 }}
            page={page}
            component="div"
            rowsPerPage={rowsPerPage}
            count={patients.length}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
            nextIconButtonProps={{ "aria-label": "Next Page" }}
            backIconButtonProps={{ "aria-label": "Previous Page" }}
          />
        </div>
      </div>

    </Container>

  )
}

export default RegisteredPatients