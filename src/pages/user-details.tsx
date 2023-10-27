import userProfileAPI from "@/pages/api/useUser";
import {
  AppBar,
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  Input,
  Paper,
  Toolbar,
  Typography,
  TextField,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const UserProfile = () => {
  const userProfile = userProfileAPI();
  const [userDetails, setUserDetails] = useState({});
  const [userRole, setUserRole] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedBio, setEditedBio] = useState("");
  const [editedPicture, setEditedPicture] = useState(null);
  const [selectedPicture, setSelectedPicture] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const details = await userProfile.getUserProfile();
      setUserDetails(details);
      setEditedName(details.full_name);
      setEditedBio(details.bio);
      const role = await userProfile.getUserInfo();
      setUserRole(role);
    };

    fetchUserDetails();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    // Send edited data to the server (e.g., using an API call)
    const formData = new FormData();
    formData.append("profile_picture", selectedPicture);
    formData.append("full_name", editedName);
    formData.append("bio", editedBio);

    try {
      await userProfile.createOrUpdateProfile(
        editedBio,
        editedName,
        selectedPicture
      );
      // Handle successful update
      const updatedDetails = {
        ...userDetails,
        full_name: editedName,
        bio: editedBio,
      };
      setUserDetails(updatedDetails);
      setIsEditing(false);
    } catch (error) {
      // Handle error
    }
  };

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedPicture(file);
      setEditedPicture(URL.createObjectURL(file));
    }
  };

  return (
    <Container>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            User Profile
          </Typography>
          <Link href="/" passHref>
            <Button color="inherit">Home</Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={3} className="p-4">
            <label htmlFor="profile-picture">
              <input
                type="file"
                id="profile-picture"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handlePictureChange}
              />
              <Avatar
                alt={userDetails.full_name}
                src={
                  editedPicture ||
                  `http://localhost:3000/uploads/profiles/${userRole.uid}/${userDetails.profile_picture}`
                }
                sx={{
                  width: 100,
                  height: 100,
                  marginBottom: 2,
                  cursor: "pointer",
                }}
              />
            </label>
            {isEditing && (
              <Button variant="contained" onClick={handleSave}>
                Save
              </Button>
            )}
            {!isEditing && (
              <Button variant="contained" onClick={handleEdit}>
                Edit
              </Button>
            )}
            <Typography variant="h5" gutterBottom>
              {isEditing ? (
                <TextField
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
              ) : (
                userDetails.full_name
              )}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {userRole.role}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {isEditing ? (
                <TextField
                  multiline
                  rows={4}
                  value={editedBio}
                  onChange={(e) => setEditedBio(e.target.value)}
                />
              ) : (
                userDetails.bio
              )}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfile;
