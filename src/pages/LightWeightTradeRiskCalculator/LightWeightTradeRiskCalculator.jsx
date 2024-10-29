 import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { login, register } from  '../../services/auth' // Import login and register functions

export function LightWeightTradeRiskCalculator() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup
  const [error, setError] = useState(''); // Error state

  async function onSubmit(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = isLogin ? null : confirmPasswordRef.current.value;

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all required fields');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError(''); // Reset error state before API call

    try {
      const requestData = { email, password };
      const response = isLogin ? await login(requestData) : await register(requestData);

      if (response?.token) {
        localStorage.setItem('token', response.token);
        navigate('/dashboard/home');
        alert(`${isLogin ? 'Login' : 'Registration'} successful!`);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred during submission');
    }
  }

  return (
    <>
      <Helmet>
        <title>{isLogin ? "Login" : "Register"} - Trade Risk Calculator</title>
      </Helmet>
      <div className="flex min-h-screen w-full flex-col justify-center items-center">
        <div className="w-full md:w-1/3">
          <Card className="mx-10 md:m-0">
            <CardHeader className="mb-6">
              <CardTitle className="text-3xl mt-14">{isLogin ? "Login" : "Register"}</CardTitle>
              <CardDescription>{isLogin ? "Login to your account" : "Create an account to start trading"}</CardDescription>
            </CardHeader>
            <form onSubmit={onSubmit}>
              <CardContent className="pb-0">
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col">
                    <Label htmlFor="email">Email*</Label>
                    <Input ref={emailRef} id="email" className="rounded-full" placeholder="Enter Email" />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="password">Password*</Label>
                    <Input ref={passwordRef} type="password" id="password" className="rounded-full" placeholder="Enter Password" />
                  </div>
                  {!isLogin && (
                    <div className="flex flex-col">
                      <Label htmlFor="confirmPassword">Confirm Password*</Label>
                      <Input ref={confirmPasswordRef} type="password" id="confirmPassword" className="rounded-full" placeholder="Confirm Password" />
                    </div>
                  )}
                </div>
              </CardContent>
              <div className="mt-6 flex justify-center">
                <Button type="submit" className="rounded-full w-full">
                  {isLogin ? "Login" : "Register"}
                </Button>
              </div>
              <div className="mt-4 text-center">
                <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-blue-600">
                  {isLogin ? "Need an account? Register" : "Already have an account? Login"}
                </button>
              </div>
              {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}

export default LightWeightTradeRiskCalculator;
