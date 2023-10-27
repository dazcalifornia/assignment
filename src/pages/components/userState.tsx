import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import useAuth from "../api/userAuth";
import { useRouter } from "next/router";

export const Signin = () => {
  const router = useRouter();
  const auth = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await auth.login(formData);
      console.log("Login successful:", res);
      router.push("/");
    } catch (err) {
      console.log("Login error:", err);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[400px] shadow-lg">
        <CardContent>
          <Typography variant="h4" component="div">
            Sign In
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export const Signup = () => {
  const router = useRouter();
  const auth = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await auth.register(formData);
      console.log("Register successful:", res);
      router.push("/signin");
    } catch (err) {
      console.log("Register error:", err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[400px] shadow-lg">
        <CardContent>
          <Typography variant="h4" component="div">
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export const Signout = () => {
  return (
    <div>
      <h1>Signout</h1>
    </div>
  );
};
