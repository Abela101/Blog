import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Button, TextField, Container, Card, CardContent, Grid, Avatar, Box, IconButton, InputAdornment, CssBaseline, Switch } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import axios from 'axios';

// Dark Mode Theme
const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const MyBlog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [postsData, setPostsData] = useState([]);

  // Fetch posts data from the server
  useEffect(() => {
    axios.get('http://localhost:3001/posts')
      .then(response => setPostsData(response.data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <div>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className="flex-grow">
                My Blog
              </Typography>
              <Button color="inherit" startIcon={<HomeIcon />} component={Link} to="/">Home</Button>
              <Button color="inherit" startIcon={<DescriptionIcon />} component={Link} to="/blog">Blog</Button>
              <Button color="inherit" startIcon={<InfoIcon />} component={Link} to="/about">About</Button>
              <Button color="inherit" startIcon={<ContactMailIcon />} component={Link} to="/contact">Contact</Button>
              <TextField
                variant="outlined"
                placeholder="Search"
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <Switch checked={darkMode} onChange={toggleDarkMode} />
            </Toolbar>
          </AppBar>
          <Routes>
            <Route path="/" element={<HomePage postsData={postsData} />} />
            <Route path="/blog" element={<BlogListPage searchQuery={searchQuery} postsData={postsData} />} />
            <Route path="/post/:id" element={<BlogPostPage postsData={postsData} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

const HomePage = ({ postsData }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="hero-section text-center p-8">
        <h1 className="text-4xl font-bold">Welcome to My Blog</h1>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => navigate('/contact')}
        >
          Call to Action
        </button>
      </div>
      <Container>
        <h2 className="text-2xl font-semibold mt-8">Recent Posts</h2>
        <Grid container spacing={3}>
          {postsData.map((post, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h5">{post.title}</Typography>
                  <Typography variant="subtitle1">{post.author}</Typography>
                  <Typography variant="body2">{post.date}</Typography>
                  <Typography variant="body2">{post.summary}</Typography>
                  <Button variant="contained" color="primary" component={Link} to={`/post/${post.id}`}>
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <div className="categories mt-8">
          <h2 className="text-2xl font-semibold">Categories</h2>
          <ul>
            {['Category 1', 'Category 2', 'Category 3'].map(category => (
              <li key={category}>{category}</li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
};

const BlogListPage = ({ searchQuery, postsData }) => {
  const filteredPosts = postsData.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <h2 className="text-2xl font-semibold mt-8">Blog Posts</h2>
      <Grid container spacing={3}>
        {filteredPosts.map((post, index) => (
          <Grid item xs={12} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h5">{post.title}</Typography>
                <Typography variant="subtitle1">{post.author}</Typography>
                <Typography variant="body2">{post.date}</Typography>
                <Typography variant="body2">{post.summary}</Typography>
                <Button variant="contained" color="primary" component={Link} to={`/post/${post.id}`}>
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const BlogPostPage = ({ postsData }) => {
  const postId = parseInt(window.location.pathname.split("/").pop());
  const post = postsData.find(post => post.id === postId);

  return (
    <Container>
      <h2 className="text-2xl font-semibold mt-8">{post?.title}</h2>
      <Typography variant="subtitle1">{post?.author}</Typography>
      <Typography variant="body2">{post?.date}</Typography>
      <Typography variant="body1" className="mt-4">{post?.description}</Typography>
      <div className="comments-section mt-8">
        <h3 className="text-xl font-semibold">Comments</h3>
        <div className="comment mt-4">
          <Typography variant="body2"><strong>Commenter Name</strong></Typography>
          <Typography variant="body2">Comment text...</Typography>
        </div>
      </div>
      <div className="related-posts mt-8">
        <h3 className="text-xl font-semibold">Related Posts</h3>
        <Grid container spacing={3}>
          {postsData.slice(0, 2).map((relatedPost, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h5">{relatedPost.title}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  );
};

const AboutPage = () => (
  <Container>
    <h2 className="text-2xl font-semibold mt-8">About Us</h2>
    <div className="team mt-8">
      <Grid container spacing={3}>
      {['Member 1', 'Member 2', 'Member 3'].map((member, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card>
              <CardContent>
                <Avatar>{member.charAt(0)}</Avatar>
                <Typography variant="h6" className="mt-2">{member}</Typography>
                <Typography variant="body2">Short bio or role of {member} in the blog team.</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
    <div className="mission-statement mt-8">
      <h3 className="text-xl font-semibold">Our Mission</h3>
      <Typography variant="body1" className="mt-4">
        Our mission is to provide insightful and engaging content to our readers. We strive to create a community where knowledge is shared, and creativity is fostered.
      </Typography>
    </div>
  </Container>
);

const ContactPage = () => (
  <Container>
    <h2 className="text-2xl font-semibold mt-8">Contact Us</h2>
    <div className="contact-form mt-8">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Name" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Email" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Subject" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Message"
            variant="outlined"
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary">Send Message</Button>
        </Grid>
      </Grid>
    </div>
    <div className="contact-info mt-8">
      <h3 className="text-xl font-semibold">Our Contact Information</h3>
      <Typography variant="body1">
        Email: contact@myblog.com
      </Typography>
      <Typography variant="body1">
        Follow us on social media: 
      </Typography>
      <div className="social-media mt-2">
        <Button color="primary" href="https://facebook.com" target="_blank">Facebook</Button>
        <Button color="primary" href="https://twitter.com" target="_blank">Twitter</Button>
        <Button color="primary" href="https://instagram.com" target="_blank">Instagram</Button>
      </div>
    </div>
  </Container>
);

export default MyBlog;
