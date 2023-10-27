import React, { useEffect, useState } from "react";
import usePostsAPI from "@/pages/api/usePost"; // Import the custom hook
import useUserAPI from "@/pages/api/useUser";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogContent,
  Slide,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Divider,
  Box,
} from "@mui/material";
import PhotoIcon from "@mui/icons-material/Photo";
import CloseIcon from "@mui/icons-material/Close";

const PostList = () => {
  const postsAPI = usePostsAPI();
  const userAPI = useUserAPI();
  const [posts, setPosts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await postsAPI.getPosts();
      setPosts(posts);
      console.log("Posts:", posts);
    };

    fetchPosts();
  }, []);

  const fetchUserdetails = async (id) => {
    const user = await userAPI.getUserProfile(id);
    return user;
  };

  const handleOpenImage = (image) => {
    setSelectedImage(image);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      {posts
        .slice()
        .reverse()
        .map((post, key) => (
          <Card variant="outlined" className="mb-4" key={key}>
            <CardContent>
              <div className="flex items-center mb-2">
                <Typography variant="h6" component="div">
                  {post.user_id}
                </Typography>
              </div>
              <Divider className="mb-2" />
              <Typography variant="h5" component="div" className="mb-2">
                {post.title}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                className="mb-2"
              >
                {post.content}
              </Typography>
              <Divider className="mb-2" />
              {post.files.length > 0 && (
                <Box>
                  <Typography variant="subtitle1" component="div">
                    Attached Files:
                  </Typography>
                  <List>
                    {post.files.map((file, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <PhotoIcon />
                        </ListItemIcon>
                        <ListItemText primary={file} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
              {post.files.map((image, index) => {
                //check if the file is an Image
                if (image.match(/.(jpg|jpeg|png|gif)$/i)) {
                  return (
                    <div key={index} className="mb-2">
                      <CardMedia
                        sx={{ height: 200, width: 200 }}
                        component="img"
                        alt={`Image ${index + 1}`}
                        image={`http://localhost:3000/uploads/posts/${post.user_id}/${image}`}
                        onClick={() => handleOpenImage(image)}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  );
                  //check if the file is a Video
                } else if (image.match(/.(mp4|ogg|webm)$/i)) {
                  return (
                    <div key={index} className="mb-2">
                      <CardMedia
                        sx={{ height: 400, width: 500 }}
                        component="video"
                        alt={`Video ${index + 1}`}
                        src={`http://localhost:3000/uploads/posts/${post.user_id}/${image}`}
                        controls
                      />
                    </div>
                  );
                  //check if the file is a Document
                }
              })}
              <Typography variant="caption" color="textSecondary">
                {formatTimestamp(post.created_at)}
              </Typography>
            </CardContent>
          </Card>
        ))}
      <Dialog
        fullScreen
        open={Boolean(selectedImage)}
        onClose={handleCloseImage}
      >
        <AppBar position="sticky">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseImage}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Image Preview
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          {selectedImage && (
            <img
              src={`http://localhost:3000/uploads/posts/${posts[0].user_id}/${selectedImage}`}
              alt="Selected Image"
              style={{
                width: "auto",
                height: "100%",
                alignSelf: "center",
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

export default PostList;
