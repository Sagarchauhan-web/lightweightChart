 import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { login, register, saveToken } from "@/services/authService"; // Import functions from authService.js
import Success from "@/components/Success/Success"; // Import Success component

export function Auth() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Collect values from the input fields
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    // Validate required fields
    if (!email || !password) {
      setError("Please fill in all required fields");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError(""); // Clear previous errors
    setLoading(true); // Start loading state

    try {
      // Prepare request data
      const requestData = { email, password };
      const response = isLogin ? await login(requestData) : await register(requestData);

      // Handle successful response
      if (response?.token) {
        console.log("Token:", response.token); // Log the token
        saveToken(response.token); // Save token
        setSuccess(isLogin ? "Login successful" : "Registration successful");

        // Redirect based on the action
        setTimeout(() => {
          navigate(isLogin ? "/dashboard/" : "/login"); // Redirect appropriately
        }, 1000);
      }
    } catch (err) {
      // Handle errors
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <>
      <Helmet>
        <title>{isLogin ? "Login" : "Register"} - RiskCalculator</title>
      </Helmet>
      <div className="flex min-h-screen w-full flex-col justify-center items-center">
        {success ? (
          <Success />
        ) : (
          <div className="w-full md:w-1/3">
            <Card className="mx-10 md:m-0">
              <CardHeader className="mb-6">
                <CardTitle className="text-3xl mt-14">{isLogin ? "Login" : "Register"}</CardTitle>
                <CardDescription>{isLogin ? "Login to your account" : "Create an account to start trading"}</CardDescription>
              </CardHeader>
              <form onSubmit={handleFormSubmit}>
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
                  <Button type="submit" className="rounded-full w-full" disabled={loading}>
                    {loading ? "Loading..." : isLogin ? "Login" : "Register"}
                  </Button>
                </div>
                <div className="mt-4 text-center">
                  <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-blue-600">
                    {isLogin ? "Need an account? Register" : "Already have an account? Login"}
                  </button>
                </div>
              </form>
            </Card>
          </div>
        )}

        {/* Error Dialog */}
        {error && (
          <Dialog open={Boolean(error)} onOpenChange={() => setError("")}>
            <DialogTrigger asChild>
              <button />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Error</DialogTitle>
                <DialogDescription>{error}</DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </>
  );
}

export default Auth;
