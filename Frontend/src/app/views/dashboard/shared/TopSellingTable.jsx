import {
  Box,
  Card,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import moment from 'moment'

import React, { useState, useEffect } from 'react'
import axios from 'axios';


const CardHeader = styled(Box)(() => ({
  display: 'flex',
  paddingLeft: '24px',
  paddingRight: '24px',
  marginBottom: '12px',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  textTransform: 'capitalize',
}));

const ProductTable = styled(Table)(() => ({
  minWidth: 400,
  whiteSpace: 'pre',
  '& small': {
    width: 50,
    height: 15,
    borderRadius: 500,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
  },
  '& td': { borderBottom: 'none' },
  '& td:first-of-type': { paddingLeft: '16px !important' },
}));

const Small = styled('small')(({ bgcolor }) => ({
  width: 50,
  height: 15,
  color: '#fff',
  padding: '2px 8px',
  borderRadius: '4px',
  overflow: 'hidden',
  background: bgcolor,
  boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
}));

const TopSellingTable = () => {
  const { palette } = useTheme();
  const bgError = palette.error.main;
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;


  const [scheduledappointments, setScheduledappointments] = useState([])




  useEffect(() => {
    axios.get(process.env.REACT_APP_ORIGIN_URL + 'api/scheduledappointments/').then((res) => { setScheduledappointments(res.data); console.log("res", res) })

  }, [])



  return (
    <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
      <CardHeader>
        <Title>Scheduled Appointments</Title>
        {/* <Select size="small" defaultValue="this_month">
          <MenuItem value="this_month">This Month</MenuItem>
          <MenuItem value="last_month">Last Month</MenuItem>
        </Select> */}
      </CardHeader>

      <Box overflow="auto">
        <ProductTable>
          <TableHead>
            <TableRow>

              <TableCell sx={{ px: 3 }} colSpan={2}>
                Date
              </TableCell>

              <TableCell sx={{ px: 0 }} colSpan={3}>
                Patient Name
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={3}>
                Doctor Name
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                Start Time
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                End Time
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {scheduledappointments.map((scheduledappointment, index) => (
              <TableRow key={index} hover>
                <TableCell colSpan={2} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                  {/* <Box display="flex" alignItems="center">
                    <Avatar src={product.imgUrl} />
                    <Paragraph sx={{ m: 0, ml: 4 }}>{product.name}</Paragraph>
                  </Box> */}
                  {moment(scheduledappointment.start_time).format('DD/MM/YYYY')}


                </TableCell>

                <TableCell align="left" colSpan={3} sx={{ px: 0, textTransform: 'capitalize' }}>
                  {scheduledappointment.patient}

                </TableCell>

                <TableCell align="left" colSpan={3} sx={{ px: 0, textTransform: 'capitalize' }}>
                  {scheduledappointment.doctorName}
                </TableCell>

                <TableCell sx={{ px: 0 }} align="left" colSpan={2}>

                  {moment(scheduledappointment.start_time).format('h:mm:ss a')}

                  {/* {product.available ? (
                    product.available < 20 ? (
                      <Small bgcolor={bgSecondary}>{product.available} available</Small>
                    ) : (
                      <Small bgcolor={bgPrimary}>in stock</Small>
                    )
                  ) : (
                    <Small bgcolor={bgError}>out of stock</Small>
                  )} */}
                </TableCell>

                <TableCell sx={{ px: 0 }} colSpan={2}>

                  {moment(scheduledappointment.end_time).format('h:mm:ss a')}

                  {/* <IconButton>
                    <Icon color="primary">edit</Icon>
                  </IconButton> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ProductTable>
      </Box>
    </Card>
  );
};

const productList = [
  {
    imgUrl: '/assets/images/products/headphone-2.jpg',
    name: 'earphone',
    price: 100,
    available: 15,
  },
  {
    imgUrl: '/assets/images/products/headphone-3.jpg',
    name: 'earphone',
    price: 1500,
    available: 30,
  },
  {
    imgUrl: '/assets/images/products/iphone-2.jpg',
    name: 'iPhone x',
    price: 1900,
    available: 35,
  },
  {
    imgUrl: '/assets/images/products/iphone-1.jpg',
    name: 'iPhone x',
    price: 100,
    available: 0,
  },
  {
    imgUrl: '/assets/images/products/headphone-3.jpg',
    name: 'Head phone',
    price: 1190,
    available: 5,
  },
];

export default TopSellingTable;
