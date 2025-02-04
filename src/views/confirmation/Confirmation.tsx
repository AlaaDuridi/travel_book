import React, { useState } from 'react';
import { useAppSelector } from '../../store/hooks.ts';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { IBookingResponse } from '../../types/models/booking.model.ts';

const PaymentHistory = () => {
  const { bookings } = useAppSelector((state) => state.booking);
  const [openDetails, setOpenDetails] = useState<number | null>(null); // Track the open details for each booking

  const printInvoice = (payment: IBookingResponse[]) => {
    const printWindow = window.open('', '_blank', 'width=800, height=600');

    // Constructing a simple HTML structure for the invoice
    let content = `
        <html>
            <head>
                <title>Invoice</title>
                <style>
                    body { font-family: Arial, sans-serif; }
                    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                    table, th, td { border: 1px solid black; }
                    th, td { padding: 8px; text-align: left; }
                </style>
            </head>
            <body>
                <h2>Invoice</h2>
                <h3>Customer: ${payment[0].customerName}</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Room Number</th>
                            <th>Room Type</th>
                            <th>Total Cost</th>
                            <th>Payment Method</th>
                            <th>Booking Status</th>
                        </tr>
                    </thead>
                    <tbody>
    `;

    // Add each booking item
    payment.forEach((booking) => {
      content += `
            <tr>
                <td>${booking.roomNumber}</td>
                <td>${booking.roomType}</td>
                <td>${booking.totalCost.toFixed(2)}</td>
                <td>${booking.paymentMethod}</td>
                <td>${booking.bookingStatus}</td>
            </tr>
        `;
    });

    content += `
                    </tbody>
                </table>
            </body>
        </html>
    `;

    // Writing the content to the new window
    printWindow?.document.write(content);
    printWindow?.document.close();

    // Calling the print dialog
    printWindow?.print();
  };

  // Function to toggle the details view
  const toggleDetails = (index: number) => {
    setOpenDetails(openDetails === index ? null : index); // Toggle open/close for details
  };

  return (
    <Box sx={{ padding: 2 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>Number of Items</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((payment, index) => {
              // Calculate total price and number of items for each payment
              const totalPrice = payment.reduce((acc, booking) => acc + booking.totalCost, 0);
              const numberOfItems = payment.length;

              return (
                <React.Fragment key={index}>
                  <TableRow>
                    <TableCell>{payment[0].customerName}</TableCell>
                    <TableCell>{numberOfItems}</TableCell>
                    <TableCell>{totalPrice.toFixed(2)}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => toggleDetails(index)}>
                        {openDetails === index ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </TableCell>
                  </TableRow>

                  {/* Expanded row for details */}
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Collapse in={openDetails === index}>
                        <Box sx={{ padding: 2 }}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Room Number</TableCell>
                                <TableCell>Room Type</TableCell>
                                <TableCell>Total Cost</TableCell>
                                <TableCell>Payment Method</TableCell>
                                <TableCell>Booking Status</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {payment.map((booking, subIndex) => (
                                <TableRow key={subIndex}>
                                  <TableCell>{booking.roomNumber}</TableCell>
                                  <TableCell>{booking.roomType}</TableCell>
                                  <TableCell>{booking.totalCost.toFixed(2)}</TableCell>
                                  <TableCell>{booking.paymentMethod}</TableCell>
                                  <TableCell>{booking.bookingStatus}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                          <Button
                            onClick={() => printInvoice(payment)}
                            variant='contained'
                            color='primary'
                            sx={{ marginTop: 2 }}
                          >
                            Print Invoice
                          </Button>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PaymentHistory;
