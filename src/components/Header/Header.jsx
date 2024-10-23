import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CircularProgress from '@mui/material/CircularProgress';

const SymbolSearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setQuery('');
    setResults([]);
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '8px',
    p: 4,
  };

  // Function to fetch data from the API (Replace the API URL with an actual symbol search API)
  const fetchData = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.example.com/search?q=${searchTerm}`);
      const data = await response.json();
      setResults(data.results); // Assume `results` is the array returned by the API
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  // Handle input change and call fetch function
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length >= 2) { // Start searching after 2 characters
      fetchData(value);
    } else {
      setResults([]);
    }
  };

  return (
    <div>
      {/* Input field that opens the modal */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search symbol..."
        size="small"
        value={query}
        onClick={handleOpen} // Open the modal when input is clicked
        onChange={handleInputChange} // Update query and fetch data
      />

      <Modal open={open} onClose={handleClose} aria-labelledby="symbol-search-modal">
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" mb={2}>
            Search for a Symbol
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search symbol..."
            size="small"
            value={query}
            onChange={handleInputChange}
          />
          
          {/* Show loading spinner while fetching */}
          {loading && <CircularProgress size={24} sx={{ mt: 2 }} />}

          {/* Show search results */}
          <List sx={{ mt: 2, maxHeight: 200, overflow: 'auto' }}>
            {results.map((result, index) => (
              <ListItem key={index}>
                {result.symbol} - {result.name}
              </ListItem>
            ))}
          </List>
        </Box>
      </Modal>
    </div>
  );
};

export default SymbolSearch;
