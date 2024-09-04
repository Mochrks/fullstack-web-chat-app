import React, { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "@/App.css";
import LoadingProcess from "@/components/demo/loading-process";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        onLogin(data.username);
        toast.success("Login berhasil!");
      } else {
        toast.error("gagal login!")
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* content login */}
      {loading ? (
        <>
          <ToastContainer />
          <LoadingProcess />
        </>
      ) : (
        <>
          <ToastContainer />
          <div className="flex items-center justify-center h-screen">
            <Card className="p-[70px] bg-gradient-to-r from-blue-300 to-blue-200">
              <div className="flex text-center justify-center mb-10 ">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-white lg:text-5xl">
                  Welcome to ChatApps!
                </h1>
              </div>
              <div className="flex space-x-4">
                <div>
                  <div className="flex pt-2 md:mr-5">
                    <img
                      src="../src/assets/login.png"
                      alt=""
                      className="w-[250px]"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <Card className="w-[300px]">
                    <CardHeader className="text-center">
                      <CardTitle>Login</CardTitle>
                      <CardDescription>
                        Silahkan memasukan username dan password
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form>
                        <div className="grid w-full  gap-4">
                          <div className="flex flex-col space-y-1.5">
                            <Label>Username</Label>
                            <Input
                              type="text"
                              placeholder="Username"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                            />
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <Label>Password</Label>
                            <Input
                              type="password"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                        </div>
                      </form>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                      <Button
                        className="w-full rounded-xl"
                        onClick={handleLogin}
                      >
                        Login
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </Card>
          </div>
        </>
      )}
    </>
  );
}

export default Login;
