import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';  // Ensure the Input component is imported
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';

export function Auth() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup

  async function onSubmit(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = isLogin ? null : confirmPasswordRef.current.value; // Get value only if not logging in

    // Basic validation
    if (!email || !password) {
      alert('Please fill in all required fields');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const url = isLogin
        ? 'https://ec5a-150-107-42-249.ngrok-free.app/users/login' // Login API
        : 'https://ec5a-150-107-42-249.ngrok-free.app/users/'; // Signup API

      const response = await axios.post(url, {
        email,
        password,
      });

      if (response?.data) {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
        alert(`${isLogin ? "Login" : "Registration"} successful!`);
      }
    } catch (error) {
      alert(error.response?.data?.message || 'An error occurred during submission');
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
              <CardDescription>{isLogin ? 'Log in to your account' : 'Create an account to start using TradeCalculator to optimize risk.'}</CardDescription>
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
                <Button type='submit' className='rounded-full w-full'>
                  {isLogin ? 'Login' : 'Register'}
                </Button>
              </div>
            </form>
            <div className='mt-4 text-center'>
              <button onClick={() => setIsLogin(!isLogin)} className='text-blue-500 hover:underline'>
                {isLogin ? 'Create an account' : 'Already have an account? Log in'}
              </button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Auth;
