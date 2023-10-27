import React, { useState } from "react";
import {
  Grid,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import PostList from "./PostList";
import CreatePost from "./CreatePost";
import JoinedClassrooms from "./JoinedClassrooms";
import useClassroomAPI from "../api/useClassroomsAPI";

const HomePage = () => {
  const [isJoinClassModalOpen, setJoinClassModalOpen] = useState(false);
  const [inviteCode, setInviteCode] = useState("");

  const classRoomAPI = useClassroomAPI();

  const openJoinClassModal = () => {
    setJoinClassModalOpen(true);
  };

  const closeJoinClassModal = () => {
    setJoinClassModalOpen(false);
  };

  const handleInviteCodeChange = (event) => {
    setInviteCode(event.target.value);
  };

  const handleJoinClass = () => {
    // Handle the join class logic here
    classRoomAPI.joinClassroom(inviteCode);

    console.log("Joining class with invite code: ", inviteCode);
    closeJoinClassModal();
  };

  return (
    <div>
      <main className="bg-gray-100 py-8">
        <Container
          style={{
            backgroundColor: "#363636",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={8}>
              {/* Featured Content */}
              <div
                style={{
                  position: "sticky",
                  bottom: "20px",
                  marginBottom: "10px",
                }}
              >
                <CreatePost />
              </div>
              <Card>
                <CardContent>
                  <div style={{ maxHeight: "900px", overflowY: "auto" }}>
                    <PostList />
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              {/* Sidebar */}
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Classroom
                  </Typography>
                  <div style={{ maxHeight: "250px", overflowY: "auto" }}>
                    <JoinedClassrooms />
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={openJoinClassModal}
                  >
                    Join a Class
                  </Button>
                </CardContent>
              </Card>
              <Card style={{ marginTop: "10px" }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Assignments
                  </Typography>
                  {/* Add assignment content here */}
                  {/* You can display a list of assignments or any assignment-related content */}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </main>

      {/* Join Class Modal */}
      <Dialog open={isJoinClassModalOpen} onClose={closeJoinClassModal}>
        <DialogTitle>Join a Class</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Enter Invite Code"
            variant="outlined"
            value={inviteCode}
            onChange={handleInviteCodeChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeJoinClassModal}>Cancel</Button>
          <Button onClick={handleJoinClass} color="primary">
            Join
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HomePage;
