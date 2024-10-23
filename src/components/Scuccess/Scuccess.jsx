export default function Success() {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-950'>
      <div className='bg-green-500 rounded-full p-4 mb-6'>
        <CheckIcon className='text-white h-8 w-8' />
      </div>
      <h1 className='text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2'>
        Success!
      </h1>
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <polyline points='20 6 9 17 4 12' />
    </svg>
  );
}
