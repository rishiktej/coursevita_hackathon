import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase"; // Correct import

const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 400,
  margin: "auto",
}));

const TabPanel = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
}));

const SignInPage = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("signIn");
  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
    expertised_skills: "",
  });

  const handleSignIn = async () => {
    try {
      const response = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signInData),
      });

      if (!response.ok) {
        throw new Error("Sign-In failed");
      }

      const result = await response.json();
      console.log("Signed in successfully:", result.user);
      onClose(); // Close dialog after successful sign-in
    } catch (error) {
      console.error("Sign-In Error:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User Info:", user);
      onClose(); // Close dialog after successful sign-in
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch("http://localhost:8000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      });

      if (!response.ok) {
        throw new Error("Sign-Up failed");
      }

      const result = await response.json();
      console.log("Sign-Up Result:", result);
      onClose(); // Close dialog after successful sign-up
    } catch (error) {
      console.error("Sign-Up Error:", error);
    }
  };

  return (
    <StyledContainer component="main">
      <Typography variant="h5" gutterBottom align="center">
        Please Login To Continue
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="Sign In and Sign Up Tabs"
        >
          <Tab label="Sign In" value="signIn" />
          <Tab label="Sign Up" value="signUp" />
        </Tabs>
      </Box>
      <TabPanel>
        {activeTab === "signIn" && (
          <div>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              autoComplete="on"
              onChange={(e) =>
                setSignInData({ ...signInData, email: e.target.value })
              }
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              autoComplete="on"
              onChange={(e) =>
                setSignInData({ ...signInData, password: e.target.value })
              }
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginY: 2,
              }}
            >
              <div>
                <input type="checkbox" id="rememberMe" />
                <label
                  htmlFor="rememberMe"
                  style={{ fontSize: "12px", lineHeight: "normal" }}
                >
                  Remember me
                </label>
              </div>
              <Button variant="text" color="primary">
                Forgot password
              </Button>
            </Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSignIn}
              sx={{ marginTop: 2 }}
            >
              Sign In
            </Button>
          </div>
        )}
        {activeTab === "signUp" && (
          <div>
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              autoComplete="on"
              onChange={(e) =>
                setSignUpData({ ...signUpData, username: e.target.value })
              }
            />
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              autoComplete="on"
              onChange={(e) =>
                setSignUpData({ ...signUpData, email: e.target.value })
              }
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              autoComplete="on"
              onChange={(e) =>
                setSignUpData({ ...signUpData, password: e.target.value })
              }
            />
            <TextField
              label="Expertised Skills"
              fullWidth
              margin="normal"
              autoComplete="on"
              onChange={(e) =>
                setSignUpData({
                  ...signUpData,
                  expertised_skills: e.target.value,
                })
              }
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
          </div>
        )}
        <Divider sx={{ my: 2 }}>or</Divider>
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            variant="contained"
            color="secondary"
            sx={{ flex: 1, mr: 1 }}
            onClick={handleGoogleSignIn}
          >
            <i className="gfg-icon gfg-icon-white-google" /> Google
          </Button>
        </Box>
      </TabPanel>
    </StyledContainer>
  );
};

export default SignInPage;
