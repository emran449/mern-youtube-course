import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import ShoppingOrderDetailsView from "./order-details";


const ShoppingOrders = () => {

    const [openDetailsDialog, setOpenDetailsDialog] = useState(false)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Order Date</TableHead>
                            <TableHead>Order Status</TableHead>
                            <TableHead>Order Price</TableHead>
                            <TableHead>
                                <span className="sr-only">Details</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>789455</TableCell>
                            <TableCell>27/11/2026</TableCell>
                            <TableCell>In Process</TableCell>
                            <TableCell>$1000</TableCell>
                            <TableCell>
                                <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
                                    <DialogTrigger render={<Button>View Details</Button>}></DialogTrigger>
                                        <ShoppingOrderDetailsView/>

                                </Dialog>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default ShoppingOrders;