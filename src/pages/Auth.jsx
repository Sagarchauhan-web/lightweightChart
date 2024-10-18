import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { register } from '@/services/Auth/auth';
import { AxiosError } from 'axios';
import { useRef, useState } from 'react';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { CiWarning } from 'react-icons/ci';
import { MdErrorOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export function Register() {
  const [isRegisterPage, setIsRegisterPage] = useState(true);
  const nameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const { toast } = useToast();
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();

    const username = nameRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      return toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
        ),
        duration: 1000,
        title: 'Warning',
        description: 'Passwords do not match',
        action: <CiWarning className='text-4xl font-bold text-yellow-500' />,
      });
    }

    if (!username) {
      return toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
        ),
        duration: 1000,
        title: 'Warning',
        description: 'Enter username',
        action: <CiWarning className='text-4xl font-bold text-yellow-500' />,
      });
    }

    if (!password) {
      return toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
        ),
        duration: 1000,
        title: 'Warning',
        description: 'Enter password',
        action: <CiWarning className='text-4xl font-bold text-yellow-500' />,
      });
    }

    let response;

    try {
      response = await register({
        email: username,
        password,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        return toast({
          className: cn(
            'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
          ),
          duration: 1000,
          description: error.response?.data || 'Error occurred',
          action: <MdErrorOutline className='text-4xl text-red-500' />,
        });
      }
    }

    if (response) {
      setIsRegisterPage(false);
      toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
        ),
        duration: 2000,
        title: 'Email Sent For Verification',
        action: <IoIosCheckmarkCircle className='text-4xl text-green-500' />,
      });
      navigate('/dashboard/home');
    }
  }

  return (
    <div className='flex min-h-screen w-full flex-col justify-center items-center'>
      <Card className='space-between rounded-none mx-10 md:m-0'>
        <div className='w-full md:w-3/4 m-auto'>
          <CardHeader className='mb-6'>
            <CardTitle className='text-3xl mt-14'>
              {isRegisterPage ? 'Register' : 'Login'}
            </CardTitle>
            <CardDescription>
              Unlock the power of markets and start your trading adventure!
            </CardDescription>
          </CardHeader>
          <form onSubmit={onSubmit}>
            <CardContent className='pb-0'>
              <div className='grid w-full items-center gap-4'>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='name'>Email*</Label>
                  <Input
                    ref={nameRef}
                    className='rounded-full'
                    id='name'
                    placeholder='Enter Email'
                  />
                </div>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='password'>Password*</Label>
                  <Input
                    ref={passwordRef}
                    type='password'
                    className='rounded-full'
                    id='password'
                    placeholder='Enter Password'
                  />
                </div>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='confirm-password'>Confirm Password*</Label>
                  <Input
                    ref={confirmPasswordRef}
                    type='password'
                    className='rounded-full'
                    id='confirm-password'
                    placeholder='Enter Password Again'
                  />
                </div>
              </div>
            </CardContent>
            <Button type='submit' className='w-full rounded-full'>
              Register
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
