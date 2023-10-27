import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useClassroomAPI from "@/pages/api/useClassroomsAPI";
import useProfileAPI from "@/pages/api/useUser";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper"; // Import Material-UI Paper
import Card from "@mui/material/Card";
import { Button, Divider, MenuItem, Select, TextField } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import {
  Skeleton,
  List,
  ListItem,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const ClassroomPage = () => {
  const classroomsAPI = useClassroomAPI();
  const profileAPI = useProfileAPI();
  const router = useRouter();
  const { classroomId } = router.query;
  const [classroomDetails, setClassroomDetails] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [feedName, setFeedName] = useState("");
  const [selectedFeed, setSelectedFeed] = useState([]);
  const [assignments, setAssignments] = useState({
    title: "",
    description: "",
    scheduled_submission: "",
    max_score: "",
  });
  const [announcement, setAnnouncement] = useState({
    title: "",
    description: "",
  });
  const [assignmentList, setAssignmentList] = useState([]);
  const [feedLists, setFeedList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isAssignmentModalOpen, setAssignmentModalOpen] = useState(false);

  const handleOpenAssignmentModal = () => {
    setAssignmentModalOpen(true);
  };

  const handleCloseAssignmentModal = () => {
    setAssignmentModalOpen(false);
  };

  const handleCreateAssignment = async () => {
    // Handle assignment creation logic here
    await classroomsAPI.createAssignment(classroomId, assignments);
    console.log("Creating assignment:", assignments);
    handleCloseAssignmentModal();
  };

  const getFeedList = async () => {
    const feedRes = await classroomsAPI.getClassroomFeeds(classroomId);
    console.log("Feed List:", feedRes);
    const feedItems = feedRes.results;

    feedItems.forEach((feedItem) => {
      setFeedList((feedLists) => [...feedLists, feedItem]);
    });
    setIsLoading(false);

    console.log("Feed List after:", feedLists);
  };

  useEffect(() => {
    const fetchClassroomDetails = async () => {
      if (classroomId) {
        const details = await classroomsAPI.getClassroomDetails(classroomId);
        setClassroomDetails(details);
      }
    };
    const getUserInfo = async () => {
      const userInfo = await profileAPI.getUserInfo();
      setUserInfo(userInfo);
    };

    const fetchClassRoomAssignments = async () => {
      const assignments = await classroomsAPI.getAssignments(classroomId);
      console.log("Assignments:", assignments);
      setAssignmentList(assignments);
    };

    fetchClassRoomAssignments();

    getFeedList();
    getUserInfo();
    fetchClassroomDetails();
  }, [classroomId]);

  console.log("Classroom Details:", classroomDetails);
  console.log("User Info:", userInfo);

  const isTeacher = userInfo?.role === "teacher";
  const isStudent = userInfo?.role === "student";
  const isOwner = classroomDetails?.classroom?.user_id === userInfo?.uid;

  if (!classroomDetails) {
    return (
      <div>
        <Skeleton variant="text" width={200} />
        <Skeleton variant="text" width={100} />
        <Skeleton variant="rectangular" width={400} height={200} />
      </div>
    );
  }

  const handleCreatefeed = async () => {
    await classroomsAPI
      .createClassroomFeed(classroomId, feedName)
      .then((res) => {
        console.log("Feed:", res);
        setFeedName("");
        alert("Feed Created");
        getFeedList();
        return res;
      });
  };

  return (
    <div>
      {/* Header */}
      <Paper elevation={1} style={{ padding: "20px", marginBottom: "20px" }}>
        <h1>{classroomDetails.classroom.name} - Classroom</h1>
        <p>Invite Code: {classroomDetails.classroom.invite_code}</p>
        {isTeacher && <p>this is teacher</p>}
        {isOwner && <p>this is your class</p>}
        {isOwner && (
          <CardContent>
            <TextField
              label="Feed Name"
              variant="outlined"
              value={feedName}
              onChange={(e) => setFeedName(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={handleCreatefeed}
              disabled={feedName === ""}
            >
              Create Feed
            </Button>
            <br />
          </CardContent>
        )}
      </Paper>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              {/* Left Column - Feed Content */}
              <Card style={{ height: "100%" }}>
                <CardContent>
                  <span style={{ fontSize: "20px" }}>Feed</span>
                  <div style={{ float: "right" }}>
                    {isLoading ? (
                      // Loading state
                      <Skeleton variant="rectangular" width={200} height={40} />
                    ) : feedLists && feedLists.length > 0 ? (
                      // Render the Select when feedList is not empty
                      <Select
                        labelId="Select Feed"
                        id="select"
                        value={selectedFeed}
                        onChange={(e) => {
                          console.log("Selected Feed:", e.target.value);
                          //searchfeedId in feedLists
                          setSelectedFeed(
                            feedLists[
                              feedLists.findIndex(
                                (feed) => feed.name === e.target.value
                              )
                            ].id
                          );
                          console.log("Selected Feed ID:", selectedFeed);
                          //setSelectedFeed(e.target.value);
                        }}
                      >
                        {feedLists.map((feed, key) => (
                          <MenuItem key={key} value={feed.name}>
                            {feed.name}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : (
                      // Handle when feedList is empty
                      <Typography variant="body1">
                        No feeds available
                      </Typography>
                    )}
                  </div>

                  <br />
                  <Divider />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {/* Right Column - Announcement */}
                  <Card>
                    <CardContent>Announcement Content</CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  {/* Right Column - Assignment */}
                  <Card>
                    <CardContent>
                      Assignment Content
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOpenAssignmentModal}
                      >
                        Create Assignment
                      </Button>
                      <List>
                        {assignmentList && assignmentList.length > 0 ? ( // Check if assignmentList is not empty
                          assignmentList.map((assignment, key) => (
                            <ListItem key={key}>
                              <ListItemText
                                primary={`Title: ${assignment.title}`}
                                secondary={`Description: ${assignment.description}`}
                              />
                              <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete">
                                  <DeleteIcon />
                                </IconButton>
                              </ListItemSecondaryAction>
                            </ListItem>
                          ))
                        ) : (
                          <Typography variant="body1">
                            No assignments available
                          </Typography>
                        )}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Dialog
        open={isAssignmentModalOpen}
        onClose={handleCloseAssignmentModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Create Assignment</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            value={assignments.title}
            onChange={(e) =>
              setAssignments({ ...assignments, title: e.target.value })
            }
          />
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            value={assignments.description}
            onChange={(e) =>
              setAssignments({ ...assignments, description: e.target.value })
            }
          />
          <TextField
            fullWidth
            label="Due Date"
            variant="outlined"
            type="date"
            value={assignments.scheduled_submission}
            onChange={(e) =>
              setAssignments({
                ...assignments,
                scheduled_submission: e.target.value,
              })
            }
          />
          <TextField
            fullWidth
            label="Max Points"
            variant="outlined"
            type="number"
            value={assignments.max_score}
            onChange={(e) =>
              setAssignments({ ...assignments, max_score: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAssignmentModal}>Cancel</Button>
          <Button onClick={handleCreateAssignment} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Footer */}
      <Paper elevation={1} style={{ padding: "10px", marginTop: "20px" }}>
        <p>&copy; {new Date().getFullYear()} Your School Name</p>
      </Paper>
    </div>
  );
};

export default ClassroomPage;
