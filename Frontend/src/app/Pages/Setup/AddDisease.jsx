import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import {
  styled, TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow, Table
} from '@mui/material';
import { Span } from "app/components/Typography";
import { NotificationManager,NotificationContainer } from 'react-notifications';
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

const AddDisease = () => {
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = useState(false)
  const [disease, setDisease] = useState([])
  const [getDisease, setGetDisease] = useState([])
  const [editDisease, setEditDisease] = useState({
    id: null,
    name: ""

  })

  const [update, setUpdate] = useState("")
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenEdit = () => setOpenEdit(true)
  const handleCloseEdit = () => setOpenEdit(false)
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
  const apiDisease = async () => {
try{ 
      axios.post(process.env.REACT_APP_ORIGIN_URL + 'api/diseases', {
        name: disease
      })
      NotificationManager.succes("Something went wrong")
    }
    catch{
      NotificationManager.error("Something went wrong")

    }

    
    }
  
  const handleInput = (e) => {
    let name, value;

    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setEditDisease({ ...editDisease, [name]: value });
  }


  useEffect(() => {
    axios.get(process.env.REACT_APP_ORIGIN_URL + 'api/diseases/').then((res) => { setGetDisease(res.data); console.log("res", res) })

  }, [update])
  return (

    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Add Disease' }]} />
      </Box>
      <NotificationContainer/>

      <div className='card'>
        <div className='card_body'>

          {/* ***************Add Disease Modal************* */}

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <h5 style={{margin:"20px"}}>Diseases</h5>
            <Button onClick={handleOpen} style={{ marginTop: '2rem', marginBottom: '2rem', marginLeft:"auto", marginRight:"30px" }} color='primary' variant="contained"><Span sx={{ pl: 0, textTransform: "capitalize" }}>Add Disease</Span></Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Add New Disease
                </Typography>
                {/* <hr></hr> */}
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <input style={{paddingLeft:'0.3rem'}} placeholder='Enter Disease' value={disease} onChange={(e) => setDisease(e.target.value)} />
                  {disease.length <=1 ? (<p style={{color:"red"}}>Enter Disease Name</p>):null}
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

                  <Button onClick={handleClose}> <strong>Close</strong></Button>
                  <Button onClick={() => { apiDisease(); handleClose() ; setDisease(""); setUpdate(!update) }}> <strong>Add</strong></Button>
                </div>
              </Box>
            </Modal>
          </div>


          {/******************Edit Disease Model*****************/}

          <Modal
            open={openEdit}
            onClose={handleCloseEdit}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Edit New Disease
              </Typography>
              {/* <hr></hr> */}
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <input style={{paddingLeft:'0.3rem'}} placeholder='Enter Disease' value={editDisease.name} onChange={(e) => setEditDisease({ ...editDisease, name: e.target.value })} />
                
              
              </Typography>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

                <Button onClick={handleCloseEdit}> <strong>Close</strong></Button>
                <Button onClick={() => {
                  axios.put(process.env.REACT_APP_ORIGIN_URL + `api/diseases/${editDisease.id}`, {
                    // id:editDisease.id,
                    name: editDisease.name
                  })
                    ; handleCloseEdit(); setUpdate(!update)
                }}> <strong>Add</strong></Button>
              </div>
            </Box>
          </Modal>
          {console.log("disease", editDisease)}

          {/* *************************Add Disease Table******************************* */}



          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell align="center" width={20}>Sr</TableCell>
                <TableCell align="left"  width={200}>Diseases</TableCell>
                <TableCell align="center"  width={20}>Delete</TableCell>
                <TableCell align="center"  width={20}>Edit</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {getDisease
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((items, id) => (
                  <TableRow key={id}>
                    <TableCell align="center" width={20}>{id}</TableCell>
                    <TableCell align="left" width={200}>{items.name}</TableCell>
                    <TableCell align="center" width={20}><button onClick={async () => {
                      await axios.delete(process.env.REACT_APP_ORIGIN_URL + `api/diseases/${items.id}`); setUpdate(!update)
                    }} style={{ backgroundColor: "#365CAD", color: "white", padding: "2px", borderRadius: '4px', }}

                    >Delete</button></TableCell>
                    <TableCell align="center" width={20}><button style={{ padding: "2px", borderRadius: '4px' }} onClick={() => { setEditDisease({ id: items.id, name: items.name }); handleOpenEdit() }}>Edit</button></TableCell>

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

export default AddDisease