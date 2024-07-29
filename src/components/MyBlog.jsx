import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, TextField, Container, Card, CardContent, Grid, Avatar, Box, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';

const postsData = [
  { title: 'Post 1', author: 'Author 1', date: '2023-07-01', summary: 'Summary of Post 1', description: 'Full description of Post 1...' },
  { title: 'Post 2', author: 'Author 2', date: '2023-07-02', summary: 'Summary of Post 2', description: 'Full description of Post 2...' },
  { title: 'Post 3', author: 'Author 3', date: '2023-07-03', summary: 'Summary of Post 3', description: 'Full description of Post 3...' },
];

const HomePage = () => {
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
                  <Button variant="contained" color="primary" component={Link} to={`/post/${index}`}>
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

const BlogListPage = ({ searchQuery }) => {
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
                <Button variant="contained" color="primary" component={Link} to={`/post/${index}`}>
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

const BlogPostPage = ({ postId }) => {
  const post = postsData[postId];

  return (
    <Container>
      <h2 className="text-2xl font-semibold mt-8">{post.title}</h2>
      <Typography variant="subtitle1">{post.author}</Typography>
      <Typography variant="body2">{post.date}</Typography>
      <Typography variant="body1" className="mt-4">{post.description}</Typography>
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
        {['Member 1', 'Member 2', 'Member 3'].map(member => (
          <Grid item xs={12} sm={4} key={member}>
            <Card>
              <CardContent className="text-center">
                <Avatar className="mx-auto mb-4">M</Avatar>
                <Typography variant="h6">{member}</Typography>
                <Typography variant="body2">Short bio...</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
    <div className="mission-statement mt-8">
      <h3 className="text-xl font-semibold">Mission Statement</h3>
      <Typography variant="body1">Our mission is...</Typography>
    </div>
  </Container>
);

const ContactPage = () => (
  <Container>
    <h2 className="text-2xl font-semibold mt-8">Contact Us</h2>
    <form className="mt-8">
      <TextField label="Name" variant="outlined" fullWidth margin="normal" />
      <TextField label="Email" variant="outlined" fullWidth margin="normal" />
      <TextField label="Subject" variant="outlined" fullWidth margin="normal" />
      <TextField label="Message" variant="outlined" fullWidth margin="normal" multiline rows={4} />
      <Button variant="contained" color="primary" className="mt-4">Send Message</Button>
    </form>
    <div className="contact-info mt-8">
      <Typography variant="h6">Contact Information</Typography>
      <Typography variant="body1">Email: contact@myblog.com</Typography>
      <Typography variant="body1">Phone: +1234567890</Typography>
      <div className="social-media mt-4">
        <Typography variant="body1">Follow us on social media:</Typography>
        {/* Add social media icons/links here */}
      </div>
    </div>
  </Container>
);

const MyBlog = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
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
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<HomePage />} />
                    <Route path="/blog" element={<BlogListPage searchQuery={searchQuery} />} />
          <Route path="/post/:id" element={<BlogPostPage postId={0} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default MyBlog;
