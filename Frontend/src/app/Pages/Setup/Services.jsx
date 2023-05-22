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

const Services = () => {
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = useState(false)
  const [service, setService] = useState({
    service: "",
    price: null,
    description:""
  })
  const [getService, setGetService] = useState([])
  const [editService, setEditService] = useState({
    id: null,
    service: "",
    price: null,
    description:""

  })

  const [update, setUpdate] = useState("")
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenEdit = () => setOpenEdit(true)
  const handleCloseEdit = () => setOpenEdit(false)
  const [services, setServices] = useState([])

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const apiService = () => {
    return (
      axios.post(process.env.REACT_APP_ORIGIN_URL + 'api/services', {
        service_name: service.service,
        charges: service.price,
        description:service.description

      })

    )
  }
  const handleInput = (e) => {
    let name, value;

    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setEditService({ ...editService, [name]: value });
  }

  const serviceHandler = (e) => {
    setService((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }


  useEffect(() => {
    axios.get(process.env.REACT_APP_ORIGIN_URL + 'api/services/').then((res) => { setGetService(res.data); console.log("get", res) })

  }, [update])
  return (

    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Services' }]} />
      </Box>

      <div className='card'>
        <div className='card_body'>

          {/* ***************Add Service Modal************* */}

          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h5 style={{margin:"20px"}}>Services</h5>

            <Button onClick={handleOpen} style={{ marginTop: '2rem', marginBottom: '2rem', marginLeft: "auto", marginRight: "30px" }} color='primary' variant="contained"><Span sx={{ pl: 0, textTransform: "capitalize" }}>Add Service</Span></Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Add New Service
                </Typography>
                {/* <hr></hr> */}
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <div>
                    <label>Service Name:</label>
                  </div>
                  <div>
                    <input style={{paddingLeft:'0.3rem'}} placeholder='Enter Service' name="service" value={service.service} onChange={serviceHandler} />
                    {service.service <=1 ? (<p style={{color:"red"}}>Enter Service Name</p>):null}
                  </div>
                  <div>
                    <label>Charges:</label>
                  </div>
                  <div>
                    <input style={{paddingLeft:'0.3rem'}} placeholder='PKR' name="price" value={service.price} onChange={serviceHandler} />
                    {service.price <=1 ? (<p style={{color:"red"}}>Enter Price</p>):null}
                  </div>
                  <div>
                    <label>Description:</label>
                  </div>
                  <div>
                    <input style={{paddingLeft:'0.3rem'}} placeholder='description' name="description" value={service.description} onChange={serviceHandler} />
                  </div>
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

                  <Button onClick={handleClose}> <strong>Close</strong></Button>
                  <Button onClick={() => { apiService(); handleClose(); setService(""); setUpdate(!update) }}> <strong>Add</strong></Button>
                </div>
              </Box>
            </Modal>
          </div>


          {/******************Edit Service Model*****************/}

          <Modal
            open={openEdit}
            onClose={handleCloseEdit}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Edit Service
              </Typography>
              {/* <hr></hr> */}
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <input style={{paddingLeft:'0.3rem'}} placeholder='Edit Service' value={editService.service} onChange={(e) => setEditService({ ...editService, service: e.target.value })} />
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <input style={{paddingLeft:'0.3rem'}} placeholder='Edit charges' value={editService.price} onChange={(e) => setEditService({ ...editService, price: e.target.value })} />
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <input style={{paddingLeft:'0.3rem'}} placeholder='description' value={editService.description} onChange={(e) => setEditService({ ...editService, description: e.target.value })} />
              </Typography>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

                <Button onClick={handleCloseEdit}> <strong>Close</strong></Button>
                <Button onClick={() => {
                  axios.put(process.env.REACT_APP_ORIGIN_URL + `api/Services/${editService.id}`, {
                    // id:editService.id,
                    service_name: editService.service,
                    charges: editService.price,
                    description:editService.description
                  })
                    ; handleCloseEdit(); setUpdate(!update)
                }}> <strong>Add</strong></Button>
              </div>
            </Box>
          </Modal>
          {console.log("Service", editService)}

          {/* *************************Add Service Table******************************* */}



          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell align="center" width={20}>Sr</TableCell>
                <TableCell align="left" width={100}>Services</TableCell>
                <TableCell align="center" width={100}>Description</TableCell>
                <TableCell align="center" width={20}>Charges</TableCell>
                <TableCell align="center" width={20}>Delete</TableCell>
                <TableCell align="center" width={20}>Edit</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {getService
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((items, id) => (
                  <TableRow key={id}>
                    <TableCell align="center" width={20}>{id}</TableCell>
                    <TableCell align="left" width={100}>{items.service_name}</TableCell>
                    <TableCell align="center" width={100}>{items.description}</TableCell>
                    <TableCell align="center" width={20}>{items.charges}</TableCell>
                    <TableCell align="center" width={20}><button onClick={async () => {
                      await axios.delete( process.env.REACT_APP_ORIGIN_URL + `api/Services/${items.id}`); setUpdate(!update)
                    }} style={{ backgroundColor: "#365CAD", color: "white", padding: "2px", borderRadius: '4px', }}

                    >Delete</button></TableCell>
                    <TableCell align="center" width={20}><button style={{ padding: "2px", borderRadius: '4px' }} onClick={() => { setEditService({ id: items.id, service: items.service_name, price: items.charges, description: items.description }); handleOpenEdit() }}>Edit</button></TableCell>

                  </TableRow>
                ))}
            </TableBody>
          </StyledTable>
          <TablePagination
            sx={{ px: 2 }}
            page={page}
            component="div"
            rowsPerPage={rowsPerPage}
            count={services.length}
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

export default Services;