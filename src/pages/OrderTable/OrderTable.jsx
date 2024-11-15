
// import {
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from '@tanstack/react-table';
// import { format, subDays, addDays } from 'date-fns';
// import { DatePickerWithRange } from '@/components/DatePicker/DatePicker';
// import { Button } from '@/components/ui/button';
// import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import { useEffect, useState } from 'react';
// import OverlapLoader from '@/components/Loader/OverlapLoader';
// import { modifyOrder } from '../../services/Order/Order';
// import { useNavigate } from 'react-router-dom';

// export function OrderTable() {
//   const [date, setDate] = useState({
//     from: subDays(new Date(), 7),
//     to: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
//   });
//   const [data, setData] = useState([]);
//   const [editingOrder, setEditingOrder] = useState({ orderId: null, field: null }); // Track editing state
//   const [updatedValue, setUpdatedValue] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
 
//   useEffect(() => {
//     const mockData = [
//       {
//         accountId: '123456',
//         id: '2121123',
//         timestamp: new Date().toISOString(),
//         action: 'BUY',
//         ordStatus: 'Completed',
//         contractId: 'CONTRACT123',
//         ocoId: 'OCO123',
//         executionProviderId: 'PROVIDER123',
//         takeProfit: '100',
//         stopPrice: '50',
//       },
//       // Add more mock data objects as needed
//     ];

//     setIsLoading(true);
//     setTimeout(() => {
//       setData(mockData);
//       setIsLoading(false);
//     }, 1000);
//   }, [date]);

//   const columns = [
//     {
//       accessorKey: 'accountId',
//       header: 'Account ID',
//     },
//     {
//       accessorKey: 'id',
//       header: 'Order ID',
//       cell: ({ row }) => (
//         <div className="cursor-pointer text-blue-500">
//           {row.getValue('id')}
//         </div>
//       ),
//     },
//     {
//       accessorKey: 'takeProfit',
//       header: 'Take Profit',
//       cell: ({ row }) => (
//         editingOrder.orderId === row.getValue('id') && editingOrder.field === 'takeProfit' ? (
//           <input
//             type="text"
//             value={updatedValue}
//             onChange={(e) => setUpdatedValue(e.target.value)}
//             className="border p-1"
//           />
//         ) : (
//           <span
//             className="cursor-pointer text-green-500"
//             onClick={() => startEditing(row.getValue('id'), 'takeProfit', row.getValue('takeProfit') || '')}
//           >
//             {row.getValue('takeProfit') || '-'}
//           </span>
//         )
//       ),
//     },
//     {
//       accessorKey: 'stopPrice',
//       header: 'Stop Loss',
//       cell: ({ row }) => (
//         editingOrder.orderId === row.getValue('id') && editingOrder.field === 'stopPrice' ? (
//           <input
//             type="text"
//             value={updatedValue}
//             onChange={(e) => setUpdatedValue(e.target.value)}
//             className="border p-1"
//           />
//         ) : (
//           <span
//             className="cursor-pointer text-red-500"
//             onClick={() => startEditing(row.getValue('id'), 'stopPrice', row.getValue('stopPrice') || '')}
//           >
//             {row.getValue('stopPrice') || '-'}
//           </span>
//         )
//       ),
//     },
//     {
//       accessorKey: 'accountId',
//       header: 'Account ID',
//       cell: ({ row }) => <div>{row.getValue('accountId')}</div>,
//     },
//     {
//       accessorKey: 'id',
//       header: 'Order ID',
//       cell: ({ row }) => <div>{row.getValue('id')}</div>,
//     },
//     {
//       accessorKey: 'timestamp',
//       header: 'Date Time',
//       cell: ({ row }) => (
//         <div>{format(new Date(row.getValue('timestamp')), 'yyyy-MM-dd HH:mm:ss')}</div>
//       ),
//     },
//     {
//       accessorKey: 'action',
//       header: 'Action',
//       cell: ({ row }) => <div>{row.getValue('action')}</div>,
//     },
//     {
//       accessorKey: 'ordStatus',
//       header: 'Order Status',
//       cell: ({ row }) => <div>{row.getValue('ordStatus')}</div>,
//     },
//     {
//       accessorKey: 'contractId',
//       header: 'Contract ID',
//       cell: ({ row }) => <div>{row.getValue('contractId')}</div>,
//     },
//     {
//       accessorKey: 'ocoId',
//       header: 'OCO ID',
//       cell: ({ row }) => <div>{row.getValue('ocoId') || '-'}</div>,
//     },
//     {
//       accessorKey: 'executionProviderId',
//       header: 'Execution Provider ID',
//       cell: ({ row }) => <div>{row.getValue('executionProviderId') || '-'}</div>,
//     },
//     {
//       id: 'modify',
//       header: 'Actions',
//       cell: ({ row }) => (
//         editingOrder.orderId === row.getValue('id') ? (
//           <Button variant="outline" size="sm" onClick={() => handleModifyOrder(row.original)}>
//             Save
//           </Button>
//         ) : (
//           <Button variant="outline" size="sm" onClick={() => setEditingOrder({ orderId: row.getValue('id'), field: null })}>
//             Modify
//           </Button>
//         )
//       ),
//     },
//   ];

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//   });

//   const startEditing = (orderId, field, value) => {
//     setEditingOrder({ orderId, field });
//     setUpdatedValue(value);
//   };

//   const handleModifyOrder = async (order) => {
//     try {
//       setIsLoading(true);
//       const orderData = {
//         order_id: order.id,  // Ensure that the order_id is sent as a string
//         orderQty: 1,         // Default value for missing orderQty
//         orderType: 'LIMIT',  // Default value for missing orderType
//         price: updatedValue, // Price could be the updated stopPrice or takeProfit
//         [editingOrder.field]: updatedValue || null,
//       };

//       const response = await modifyOrder(orderData);
//       alert('Order modified successfully!');
//       setEditingOrder({ orderId: null, field: null });  // Close editing mode
//     } catch (error) {
//       console.error('Error modifying order:', error);
//       alert('Failed to modify order.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="flex items-center justify-between pt-4 mb-20">
//         <h1 className="scroll-m-20 w-max text-2xl font-semibold tracking-tight first:mt-0">
//           Orders
//         </h1>
//         <DatePickerWithRange date={date} setDate={setDate} />
//       </div>
//       <OverlapLoader loader={isLoading}>
//         <ScrollArea className="w-full whitespace-nowrap rounded-md border">
//           <Table>
//             <TableHeader>
//               {table.getHeaderGroups().map((headerGroup) => (
//                 <TableRow key={headerGroup.id}>
//                   {headerGroup.headers.map((header) => (
//                     <TableHead key={header.id}>
//                       {flexRender(header.column.columnDef.header, header.getContext())}
//                     </TableHead>
//                   ))}
//                 </TableRow>
//               ))}
//             </TableHeader>
//             <TableBody>
//               {table.getRowModel().rows.length ? (
//                 table.getRowModel().rows.map((row) => (
//                   <TableRow key={row.id}>
//                     {row.getVisibleCells().map((cell) => (
//                       <TableCell key={cell.id}>
//                         {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={columns.length} className="h-24 text-center">
//                     No results.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </ScrollArea>
//       </OverlapLoader>
//     </>
//   );
// }

import { useEffect, useState } from 'react';
import { format, subDays, addDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import OverlapLoader from '@/components/Loader/OverlapLoader';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useReactTable, flexRender, getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';
import { getOrders } from '../../services/Order/Order';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

export function OrderTable() {
  const [date, setDate] = useState({
    from: subDays(new Date(), 7),
    to: addDays(new Date(), 2),
  });
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch data from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const response = await getOrders({
          from: format(date.from, 'yyyy-MM-dd'),
          to: format(date.to, 'yyyy-MM-dd'),
        });
  
        // Check if response has valid data and access the nested data array
        if (response.data && response.data.data && Array.isArray(response.data.data)) {
          setData(response.data.data); // Set the correct data from the response
        } else {
          console.error('Unexpected API response:', response);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchOrders();
  }, [date]);
  
  // Column definitions for the table
  const columns = [
    { accessorKey: 'id', header: 'Order ID' },
    { accessorKey: 'account_id', header: 'Account ID' },
    { accessorKey: 'contract_id', header: 'Contract ID' },
    {
      accessorKey: 'timestamp',
      header: 'Date Time',
      cell: ({ row }) => format(new Date(row.original.timestamp), 'yyyy-MM-dd HH:mm:ss'),
    },
    { accessorKey: 'action', header: 'Action' },
    { accessorKey: 'order_status', header: 'Order Status' },
    { accessorKey: 'symbol', header: 'Symbol' },
    { accessorKey: 'orderQty', header: 'orderQty' },
    
    { accessorKey: 'order_type', header: 'Order Type' },
    { accessorKey: 'stop_loss', header: 'Stop Loss' },
    { accessorKey: 'take_profit', header: 'Take Profit' },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            navigate('/', {
              state: {
                orderId: row.original.id,
                takeProfit: row.original.take_profit,
                stop_loss: row.original.stop_loss, // Example hardcoded value
                orderQty:  row.original.orderQty,
                take_profit_order_id: row.original.take_profit_id,
                stop_loss_order_id: row.original.stop_loss_id,
              },
            })
          }
        >
          Modify
        </Button>
      ),
    },
  ];

  // React Table instance for handling table data and interactions
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Handle date change for date range selection
  const handleDateChange = (newDate, type) => {
    setDate((prev) => ({
      ...prev,
      [type]: newDate,
    }));
  };

  return (
    <div>
      <div className="flex items-center justify-between pt-4 mb-4">
        <h1 className="text-2xl font-semibold">Orders</h1>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              {format(date.from, 'yyyy-MM-dd')} - {format(date.to, 'yyyy-MM-dd')}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4">
            <div className="flex justify-between space-x-4">
              <Calendar selected={date.from} onChange={(newDate) => handleDateChange(newDate, 'from')} />
              <Calendar selected={date.to} onChange={(newDate) => handleDateChange(newDate, 'to')} />
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <OverlapLoader loader={isLoading}>
        <ScrollArea>
          <Table className="min-w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
        <div className="flex justify-between items-center mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <div>
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </OverlapLoader>
    </div>
  );
}
