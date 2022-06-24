import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,
    Typography,
    TablePagination,
    TableFooter
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 380,
        fontSize: "16px",
        fontFamily: "Quicksand, sans-serif"

    },
    tableContainer: {
        borderRadius: 15,
        margin: '.5rem 2rem',
    },
    tableHeaderCell: {
        color: "#4a4a4a",
        fontWeight: "bold",
        backgroundColor: "#f4f4f4",

    },
    avatar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    status: {
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    }
}));

function MTable({ orders, loading }) {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHeaderCell}>Infos</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Email</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Num Tél</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Items Info</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Prix Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/*
                        <tr> <td>{order.shippingAddress.fullName}</td> <td> {order.email} </td> <td> {order.tel} </td> <td>{order.orderItems[0].name} *  {order.orderItems[0].qty}</td> <td> {order.totalPrice} </td>  </tr>
            */}
                        {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow key={row._id}>
                                <TableCell>
                                    <Grid container>
                                        <Grid item lg={2}>
                                            <Avatar alt={row.shippingAddress.fullName} src='.' className={classes.avatar} />
                                        </Grid>
                                        <Grid item lg={4}>
                                            <Typography className={classes.name}>{row.shippingAddress.fullName}</Typography>
                                            <Typography color="textSecondary" variant="body2">{row.email}</Typography>
                                            <Typography color="textSecondary" variant="body2">{row.tel}</Typography>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                <TableCell>
                                    <Typography color="primary" variant="subtitle2">{row.email} </Typography>
                                </TableCell>

                                <TableCell>
                                    <Typography color="primary" variant="subtitle2">{row.tel} </Typography>
                                </TableCell>

                                <TableCell>
                                    <Typography color="primary" variant="subtitle2">{row.orderItems[0].name} * {row.orderItems[0].qty} </Typography>
                                    {/*<Typography color="textSecondary" variant="body2"> {row.totalPrice} </Typography>*/}
                                </TableCell>


                                <TableCell>{row.totalPrice} dt</TableCell>
                                <TableCell>



                                    {/* <Typography 
                    className={classes.status}
                    style={{
                        backgroundColor: 
                        ((row.status === 'Active' && 'green') ||
                        (loading && 'blue') ||
                        (row.status === 'Blocked' && 'orange'))
                    }}
                  >{row.status}</Typography> */}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 15]}
                            component="div"
                            count={orders.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    );
}

export default MTable;