import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Success from '../../components/Scuccess/Scuccess';
export function Auth() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(''); // Add success state
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (!email || !password) {
      setError('Please fill in all required fields');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const url = isLogin
        ? 'http://localhost:5000/users/login'
        : 'http://localhost:5000/users/';

      const response = await axios.post(url, {
        email,
        password,
      });

      if (response?.data) {
        localStorage.setItem('token', response.data.token);
        setSuccess(isLogin ? 'Login successful' : 'Registration successful'); // Set success message
        setTimeout(() => {
          navigate('/dashboard/');
        }, 2000); // Navigate after a delay
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>{isLogin ? 'Login' : 'Register'} - RiskCalculator</title>
      </Helmet>
      <div className='flex min-h-screen w-full flex-col justify-center items-center'>
        <div className='w-full md:w-1/3'>
          <Card className='mx-10 md:m-0'>
            <CardHeader className='mb-6'>
              <CardTitle className='text-3xl mt-14'>{isLogin ? 'Login' : 'Register'}</CardTitle>
              <CardDescription>{isLogin ? 'Login to your account' : 'Create an account to start trading'}</CardDescription>
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
                  {!isLogin && (
                    <div className='flex flex-col'>
                      <Label htmlFor='confirmPassword'>Confirm Password*</Label>
                      <Input ref={confirmPasswordRef} type='password' id='confirmPassword' className='rounded-full' placeholder='Confirm Password' />
                    </div>
                  )}
                </div>
              </CardContent>
              <div className='mt-6 flex justify-center'>
                <Button type='submit' className='rounded-full w-full' disabled={loading}>
                  {loading ? 'Loading...' : (isLogin ? 'Login' : 'Register')}
                </Button>
              </div>
              {error && <div className='mt-4 text-red-500 text-center'>{error}</div>}
              {success && <Success message={success} />} {/* Display the Success component */}
              <div className='mt-4 text-center'>
                <button type='button' onClick={() => setIsLogin(!isLogin)} className='text-blue-600'>
                  {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
                </button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Auth;
