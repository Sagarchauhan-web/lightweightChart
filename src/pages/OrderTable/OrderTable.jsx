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
// import { getOrders } from '../../services/Order/Order';
// import { useEffect, useState } from 'react';
// import OverlapLoader from '@/components/Loader/OverlapLoader';

// export function OrderTable() {
//   const [date, setDate] = useState({
//     from: subDays(new Date(), 7),
//     to: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
//   });
//   const [data, setData] = useState([]);
//   const [sorting, setSorting] = useState([]);
//   const [columnFilters, setColumnFilters] = useState([]);
//   const [columnVisibility, setColumnVisibility] = useState({});
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const getAllOrders = async () => {
//       setIsLoading(true);
//       const response = await getOrders({
//         from_date: format(date?.from, 'yyyy-MM-dd'),
//         to_date: format(date?.to, 'yyyy-MM-dd'),
//       });
//       console.log('response here', response.data);
//       setData(response.data);
//       setIsLoading(false);
//     };

//     getAllOrders();
//     const timeout = setTimeout(() => {
//       getAllOrders();
//     }, 10000);

//     return () => clearTimeout(timeout);
//   }, [date]);

//   const columns = [
//     {
//       accessorKey: 'accountId',
//       header: 'Account ID',
//       cell: ({ row }) => <div className='capitalize'>{row.getValue('accountId')}</div>,
//     },
//     {
//       accessorKey: 'id',
//       header: 'Order ID',
//       cell: ({ row }) => <div className='capitalize'>{row.getValue('id')}</div>,
//     },
//     {
//       accessorKey: 'timestamp',
//       header: 'Date Time',
//       cell: ({ row }) => <div>{format(new Date(row.getValue('timestamp')), 'yyyy-MM-dd HH:mm:ss')}</div>,
//     },
//     {
//       accessorKey: 'symbol',
//       header: 'Symbol',
//       cell: ({ row }) => <div className='uppercase'>{row.getValue('symbol')}</div>,
//     },
//     {
//       accessorKey: 'action',
//       header: 'Action',
//       cell: ({ row }) => <div className='capitalize'>{row.getValue('action')}</div>,
//     },
//     {
//       accessorKey: 'ordStatus',
//       header: 'Order Status',
//       cell: ({ row }) => <div className='capitalize'>{row.getValue('ordStatus')}</div>,
//     },
//     {
//       accessorKey: 'order_type',
//       header: 'Order Type',
//       cell: ({ row }) => <div className='capitalize'>{row.getValue('order_type')}</div>,
//     },
//     {
//       accessorKey: 'quantity',
//       header: 'Quantity',
//       cell: ({ row }) => <div>{row.getValue('quantity')}</div>,
//     },
//     {
//       accessorKey: 'order_msg',
//       header: 'Reject Reason',
//       cell: ({ row }) => <div>{row.getValue('order_msg') || '-'}</div>,
//     },
//     {
//       accessorKey: 'oco_id',
//       header: 'OCO ID',
//       cell: ({ row }) => <div>{row.getValue('oco_id') || '-'}</div>,
//     },
//     {
//       accessorKey: 'avgprice',
//       header: 'Average Price',
//       cell: ({ row }) => <div>{row.getValue('avgprice') || '-'}</div>,
//     },
//     {
//       accessorKey: 'price',
//       header: 'Price',
//       cell: ({ row }) => <div>{row.getValue('price') || '-'}</div>,
//     },
//     {
//       accessorKey: 'contractId',
//       header: 'Contract ID',
//       cell: ({ row }) => <div>{row.getValue('contractId')}</div>,
//     },
//     {
//       accessorKey: 'executionProviderId',
//       header: 'Execution Provider ID',
//       cell: ({ row }) => <div>{row.getValue('executionProviderId')}</div>,
//     },
//   ];

//   const table = useReactTable({
//     data,
//     columns,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//     },
//   });

//   return (
//     <>
//       <div className='flex items-center justify-between pt-4 mb-20'>
//         <h1 className='scroll-m-20 w-max text-2xl font-semibold tracking-tight first:mt-0'>
//           Orders
//         </h1>
//         <DatePickerWithRange date={date} setDate={setDate} />
//       </div>
//       <OverlapLoader loader={isLoading}>
//         <ScrollArea className={`w-full whitespace-nowrap rounded-md border`}>
//           <Table className='display-none'>
//             <TableHeader>
//               {table.getHeaderGroups().map((headerGroup) => (
//                 <TableRow key={headerGroup.id}>
//                   {headerGroup.headers.map((header) => (
//                     <TableHead key={header.id}>
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(header.column.columnDef.header, header.getContext())}
//                     </TableHead>
//                   ))}
//                 </TableRow>
//               ))}
//             </TableHeader>
//             <TableBody>
//               {table.getRowModel().rows?.length ? (
//                 table.getRowModel().rows.map((row) => (
//                   <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
//                     {row.getVisibleCells().map((cell) => (
//                       <TableCell key={cell.id}>
//                         {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={columns.length} className='h-24 text-center'>
//                     No results.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//           <ScrollBar orientation='horizontal' />
//         </ScrollArea>
//       </OverlapLoader>
//       <div className='flex items-center justify-end space-x-2 py-4'>
//         <Button variant='outline' size='sm' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
//           Previous
//         </Button>
//         <Button variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
//           Next
//         </Button>
//       </div>
//     </>
//   );
// }

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { format, subDays, addDays } from 'date-fns';
import { DatePickerWithRange } from '@/components/DatePicker/DatePicker';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getOrders } from '../../services/Order/Order';
import { useEffect, useState } from 'react';
import OverlapLoader from '@/components/Loader/OverlapLoader';
import { useNavigate } from 'react-router-dom'; // Ensure this line is present

 
 
export function OrderTable() {
  const navigate = useNavigate();
  const [date, setDate] = useState({
    from: subDays(new Date(), 7),
    to: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
  });
  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAllOrders = async () => {
      setIsLoading(true);
      const response = await getOrders({
        from_date: format(date?.from, 'yyyy-MM-dd'),
        to_date: format(date?.to, 'yyyy-MM-dd'),
      });
      console.log('response here', response.data);
      setData(response.data);
      setIsLoading(false);
    };

    getAllOrders();
    const timeout = setTimeout(() => {
      getAllOrders();
    }, 10000);

    return () => clearTimeout(timeout);
  }, [date]);

  const columns = [
    {
      accessorKey: 'accountId',
      header: 'Account ID',
      cell: ({ row }) => <div className='capitalize'>{row.getValue('accountId')}</div>,
    },
    {
      accessorKey: 'id',
      header: 'Order ID',
      cell: ({ row }) => <div className='capitalize'>{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'timestamp',
      header: 'Date Time',
      cell: ({ row }) => <div>{format(new Date(row.getValue('timestamp')), 'yyyy-MM-dd HH:mm:ss')}</div>,
    },
    {
      accessorKey: 'symbol',
      header: 'Symbol',
      cell: ({ row }) => <div className='uppercase'>{row.getValue('symbol')}</div>,
    },
    {
      accessorKey: 'action',
      header: 'Action',
      cell: ({ row }) => <div className='capitalize'>{row.getValue('action')}</div>,
    },
    {
      accessorKey: 'ordStatus',
      header: 'Order Status',
      cell: ({ row }) => <div className='capitalize'>{row.getValue('ordStatus')}</div>,
    },
    {
      accessorKey: 'order_type',
      header: 'Order Type',
      cell: ({ row }) => <div className='capitalize'>{row.getValue('order_type')}</div>,
    },
    {
      accessorKey: 'quantity',
      header: 'Quantity',
      cell: ({ row }) => <div>{row.getValue('quantity')}</div>,
    },
    {
      accessorKey: 'order_msg',
      header: 'Reject Reason',
      cell: ({ row }) => <div>{row.getValue('order_msg') || '-'}</div>,
    },
    {
      accessorKey: 'oco_id',
      header: 'OCO ID',
      cell: ({ row }) => <div>{row.getValue('oco_id') || '-'}</div>,
    },
    {
      accessorKey: 'avgprice',
      header: 'Average Price',
      cell: ({ row }) => <div>{row.getValue('avgprice') || '-'}</div>,
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }) => <div>{row.getValue('price') || '-'}</div>,
    },
    {
      accessorKey: 'contractId',
      header: 'Contract ID',
      cell: ({ row }) => <div>{row.getValue('contractId')}</div>,
    },
    {
      accessorKey: 'executionProviderId',
      header: 'Execution Provider ID',
      cell: ({ row }) => <div>{row.getValue('executionProviderId')}</div>,
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <>
      
      <div className='flex items-center justify-between pt-4 mb-20'>
        <h1 className='scroll-m-20 w-max text-2xl font-semibold tracking-tight first:mt-0'>
          Orders
        </h1>
        <DatePickerWithRange date={date} setDate={setDate} />
        
      </div>
      <div className="flex items-center mb-4">
        <Button variant='outline' size='sm' onClick={() => navigate('/')}>
          Dashboard
        </Button>
      </div>
      <OverlapLoader loader={isLoading}>
        <ScrollArea className={`w-full whitespace-nowrap rounded-md border`}>
          <Table className='display-none'>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className='h-24 text-center'>
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      </OverlapLoader>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <Button variant='outline' size='sm' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </>
  );
}
