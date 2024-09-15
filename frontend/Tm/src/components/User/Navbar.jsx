import React, { useState, useEffect } from "react";
import { PiPathBold } from "react-icons/pi";
import { FaUser } from "react-icons/fa"; // Updated to a common user icon
import { Link } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import SignInPage from "./SigninPage"; // Import the SignInPage dialog
import { auth, signOut } from "../../firebase"; // Correct imports
import "../../styles/Navbar.css"; // Import your custom CSS

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignInClick = () => {
    setIsDialogOpen(true);
    setIsDropdownOpen(false); // Close dropdown when dialog opens
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null); // Update user state after sign-out
    } catch (error) {
      console.error("Sign Out Error:", error);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-start">
            <PiPathBold className="text-2xl mr-2" />
            <span className="text-2xl font-bold">Cours</span>
          </div>
          <div className="navbar-center">
            <Link to="/admin" className="nav-link">
              admin
            </Link>
            <Link to="/about" className="nav-link">
              About
            </Link>
            <Link to="/services" className="nav-link">
              Features
            </Link>
          </div>
          <div className="navbar-end">
            <div className="dropdown">
              <button className="user-icon-button" onClick={toggleDropdown}>
                <FaUser className="w-6 h-6 text-black" />
              </button>
              <div className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
                {!user ? (
                  <button onClick={handleSignInClick} className="dropdown-item">
                    Sign In
                  </button>
                ) : (
                  <button onClick={handleSignOut} className="dropdown-item">
                    Sign Out
                  </button>
                )}
                <button onClick={handleSignOut} className="dropdown-item">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sign In Dialog */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        {/* <DialogTitle>Sign In</DialogTitle> */}
        <DialogContent>
          <SignInPage onClose={handleCloseDialog} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
