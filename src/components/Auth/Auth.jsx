import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
 
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { useRef } from 'react';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { MdErrorOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';

export function Auth() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { toast } = useToast();
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (!email || !password) {
      return toast({
        className: cn('top-0 right-0 fixed md:max-w-[420px] md:top-4 md:right-4'),
        duration: 1000,
        title: 'Warning',
        description: 'Please fill in all required fields',
        action: <MdErrorOutline className='text-4xl text-yellow-500' />,
      });
    }

    if (password !== confirmPassword) {
      return toast({
        className: cn('top-0 right-0 fixed md:max-w-[420px] md:top-4 md:right-4'),
        duration: 1000,
        title: 'Warning',
        description: 'Passwords do not match',
        action: <MdErrorOutline className='text-4xl text-yellow-500' />,
      });
    }

    try {
      const response = await axios.post('https://47e9-150-107-43-93.ngrok-free.app/users/', {
        email,
        password,
      });

      if (response?.data) {
        localStorage.setItem('token', response.data.token); // Adjust as per the API response structure
        navigate('/dashboard/home');
        toast({
          className: cn('top-0 right-0 fixed md:max-w-[420px] md:top-4 md:right-4'),
          duration: 1000,
          title: 'Success',
          action: <IoIosCheckmarkCircle className='text-4xl text-green-500' />,
        });
      }
    } catch (error) {
      toast({
        className: cn('top-0 right-0 fixed md:max-w-[420px] md:top-4 md:right-4'),
        duration: 1000,
        position: 'top-center',
        description: error.response?.data?.message || 'An error occurred',
        action: <MdErrorOutline className='text-4xl text-red-500' />,
      });
    }
  }

  return (
    <>
      <Helmet>
        <title>Register - PickMyTrade</title>
      </Helmet>
      <div className='flex min-h-screen w-full flex-col justify-center items-center'>
        <div className='w-full md:w-1/3'>
          <Card className='mx-10 md:m-0'>
            <CardHeader className='mb-6'>
              <CardTitle className='text-3xl mt-14'>Register</CardTitle>
              <CardDescription>Create an account to start trading</CardDescription>
            </CardHeader>
            <form onSubmit={onSubmit}>
              <CardContent className='pb-0'>
                <div className='flex flex-col space-y-4'>
                  <div className='flex flex-col'>
                    <Label htmlFor='email'>Email*</Label>
                    <Input ref={emailRef} id='email' className='rounded-full' placeholder='Enter Email' />
                  </div>
                  <div className='flex flex-col'>
                    <Label htmlFor='password'>Password*</Label>
                    <Input ref={passwordRef} type='password' id='password' className='rounded-full' placeholder='Enter Password' />
                  </div>
                  <div className='flex flex-col'>
                    <Label htmlFor='confirmPassword'>Confirm Password*</Label>
                    <Input ref={confirmPasswordRef} type='password' id='confirmPassword' className='rounded-full' placeholder='Confirm Password' />
                  </div>
                </div>
              </CardContent>
              <div className='mt-6 flex justify-center'>
                <Button type='submit' className='rounded-full w-full'>
                  Register
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}
