import React,{useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { styled,  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,Table } from '@mui/material';
import { Span } from "app/components/Typography";

import { Breadcrumb, SimpleCard } from 'app/components';
const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
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
  

const AddBranches = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
  return (
  
   <Container>
        <Box className="breadcrumb">
        <Breadcrumb routeSegments={[ { name: 'Add Branches' }]} />
      </Box>

                        <div className="card">
                            <div className="header">




                                {/* ***************Add Branch Modal*********************** */}
                            <div style={{display:'flex',justifyContent:'center'}}>
      <Button onClick={handleOpen} style={{fontWeight:'bolder',fontSize:'15px'}}>Add Clinic Branches</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Branch
          </Typography>
          {/* <hr></hr> */}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <input></input>
          </Typography>
          <div style={{display:'flex',justifyContent:'flex-end'}}>

          <Button onClick={handleClose}> <strong>Close</strong></Button>
          <Button onClick={handleOpen}> <strong>Add</strong></Button>
          </div>
        </Box>
      </Modal>
    </div>

    {/* *********Add Branch Modal******************* */}
    
                                {/* <h2> */}
                                    {/* <strong>Table</strong> With State Save</h2> */}
                             
                            </div>
                            <div className="body">
                                <div className="table-responsive" style={{display:'flex',justifyContent:'center'}}>
                                

                                    <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell align="center">Sr</TableCell>
                <TableCell align="center">Clinic Branches</TableCell>
                <TableCell align="center">Delete</TableCell>
                <TableCell align="center">CNIC</TableCell>
          
              </TableRow>
            </TableHead>
            {/* <TableBody>
              {getDi
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((items, id) => (
                  <TableRow key={id}>
                    <TableCell align="center">{id}</TableCell>
                    <TableCell align="center">{items.name}</TableCell>
                    <TableCell align="center"><button onClick={async () => {
                              await axios.delete(process.env.REACT_APP_ORIGIN_URL + `api/diseases/${items.id}`); setUpdate(!update)
                            }} style={{ backgroundColor: "#365CAD", color: "white", padding: "2px", borderRadius: '4px', }}
                            //   title="Delete"
                            >Delete</button></TableCell>
                    <TableCell align="center"><button style={{ padding: "2px", borderRadius: '4px' }} onClick={() => { setEditDisease({ id: items.id, name: items.name }); handleOpenEdit() }}>Edit</button></TableCell>
        
                                 {/* <Button color="primary" variant="contained">
          {/* <Icon>send</Icon> */}
          {/* <Span sx={{ pl: 1, textTransform: "capitalize" }}>Details</Span> */}
        {/* </Button>  */}
                    

                    
                  {/* </TableRow> */}
                {/* ))} */}
            {/* </TableBody>  */}
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
                        </div>
        
        
          </Container>
  )
}

export default AddBranches