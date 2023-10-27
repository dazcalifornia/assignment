import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useState } from "react";
import useAuth from "@/pages/api/userAuth";
import { useRouter } from "next/router";

const NavBar = ({ loggedIn }: any) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await auth.logout();
      console.log("Logout successful:", response);
      router.push("/signin");
    } catch (error) {
      console.error("Logout error:", error);
      // Handle logout error
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Class room System
          </Typography>
          <Box sx={{ marginLeft: "auto" }}>
            {loggedIn ? (
              <div>
                <Link href="/user-details" passHref>
                  <Button color="inherit">User Details</Button>
                </Link>
                <Button color="inherit" onClick={handleLogout}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <div>
                <Link href="/signup" passHref>
                  <Button color="inherit">Sign Up</Button>
                </Link>
                <Link href="/signin" passHref>
                  <Button color="inherit">Sign In</Button>
                </Link>
              </div>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
