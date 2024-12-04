  import { useEffect, useState } from 'react';
  import { format, subDays, addDays } from 'date-fns';
  import { useNavigate } from 'react-router-dom';
  import OverlapLoader from '@/components/Loader/OverlapLoader';
  import { Button } from '@/components/ui/button';
  import { ScrollArea } from '@/components/ui/scroll-area';
  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
  import { useReactTable, flexRender, getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';
  import { Calendar } from '@/components/ui/calendar';
  import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
  import { getOrders } from '../../services/Order/Order'; // API function to fetch data

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

          if (response?.data && Array.isArray(response.data.orders)) {
            setData(response.data.orders);
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
      const intervalId = setInterval(fetchOrders, 100000); // Fetch data every 10 seconds
      return () => clearInterval(intervalId);
    }, [date]);

    // Column definitions for the table
    const columns = [
      { accessorKey: 'order_id', header: 'Order ID' },
      { accessorKey: 'symbol', header: 'Symbol' },
      { accessorKey: 'quantity', header: 'Quantity' },
      { accessorKey: 'side', header: 'Side' },
      { accessorKey: 'order_type', header: 'Order Type' },
      { accessorKey: 'api_status', header: 'Status' },
      { accessorKey: 'stop_loss.price', header: 'Stop Loss Price' },
      { accessorKey: 'stop_loss.status', header: 'SL Status' },
      { accessorKey: 'take_profit.price', header: 'Take Profit Price' },
      { accessorKey: 'take_profit.status', header: 'TP Status' },
    ];

    // Handle row click to navigate and pass data
    const handleModifyClick = (row) => {
      console.log('Navigating with state:', {
        orderId: row.original.order_id,
        initialOrderType: row.original.order_type,
        orderQty: row.original.quantity,
        stopLossId: row.original.stop_loss?.order_id,
        stopLossPricez: row.original.stop_loss?.price,
        takeProfitId: row.original.take_profit?.order_id,
        takeProfitPricex: row.original.take_profit?.price,
        isfromModify: true,
      });

      navigate('/', {
        state: {
          orderId: row.original.order_id,
          initialOrderType: row.original.order_type,
          orderQty: row.original.quantity,
          stopLossId: row.original.stop_loss?.order_id,
          stopLossPricez: row.original.stop_loss?.price, // Pass stopLossPrice
          takeProfitId: row.original.take_profit?.order_id,
          takeProfitPricex: row.original.take_profit?.price, // Pass takeProfitPrice
          isfromModify: true,
        },
      });
    };

    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    });

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
                      <TableCell>
                        <Button
                          onClick={() => handleModifyClick(row)}
                          disabled={row.original.api_status === 'pending'}
                        >
                          Modify
                        </Button>
                      </TableCell>
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
