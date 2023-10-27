import React, { useState } from "react";
import usePostsAPI from "@/pages/api/usePost"; // Import the custom hook
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  IconButton,
  Card,
  CardContent,
  Avatar,
  Alert,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ClearIcon from "@mui/icons-material/Clear";

const CreatePost = () => {
  const postsAPI = usePostsAPI();
  const [postContent, setPostContent] = useState({
    title: "",
    content: "",
    files: [],
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postContent.title || !postContent.content) {
      setError("Please fill in both the title and content fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", postContent.title);
    formData.append("content", postContent.content);
    for (let i = 0; i < postContent.files.length; i++) {
      formData.append("files", postContent.files[i]);
    }

    postsAPI
      .createPost(formData)
      .then(() => {
        console.log("Post created successfully");
        // Clear form and error message
        setPostContent({ title: "", content: "", files: [] });
        setError(null);
        // Refresh the list of posts or navigate to the posts page
      })
      .catch((error) => {
        setError("Error creating the post. Please try again.");
        console.error("Error creating post:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostContent({ ...postContent, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const newImages = [];

    for (let i = 0; i < files.length; i++) {
      newImages.push(files[i]);
    }
    setPostContent({ ...postContent, files: newImages });
  };

  const handleRemoveImage = (index) => {
    const newImages = [...postContent.files];
    newImages.splice(index, 1);
    setPostContent({ ...postContent, files: newImages });
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper elevation={3} className="p-4">
          <Typography variant="h5" component="div" className="mb-2">
            Create a New Post
          </Typography>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            id="post-form"
          >
            <TextField
              name="title"
              label="Title"
              variant="outlined"
              fullWidth
              className="mb-2"
              value={postContent.title}
              onChange={handleInputChange}
              error={error && !postContent.title}
            />
            <TextField
              name="content"
              label="Content"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              className="mb-2"
              value={postContent.content}
              onChange={handleInputChange}
              error={error && !postContent.content}
            />
            {postContent.files.map((image, index) => (
              <Card key={index} className="mb-2" elevation={0}>
                <CardContent>
                  <Grid container alignItems="center">
                    <Grid item xs={2}>
                      <Avatar
                        src={URL.createObjectURL(image)}
                        alt={`Image ${index + 1}`}
                        variant="square"
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body2">Image {index + 1}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton onClick={() => handleRemoveImage(index)}>
                        <ClearIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
            <input
              type="file"
              accept="image/*,video/*,document/*"
              id="image-input"
              style={{ display: "none" }}
              multiple
              onChange={handleImageChange}
              name="files"
            />
            <label htmlFor="image-input">
              <Button
                variant="outlined"
                color="primary"
                startIcon={<PhotoCameraIcon />}
                component="span"
                className="mb-2"
              >
                Add Images
              </Button>
            </label>
            {error && (
              <Alert severity="error" className="mb-2">
                {error}
              </Alert>
            )}
            <Button type="submit" variant="contained" color="primary">
              Create Post
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CreatePost;
