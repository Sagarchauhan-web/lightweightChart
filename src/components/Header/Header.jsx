import React, { useState } from "react"
import {
  AppBar,
  Toolbar,
  TextField,
  Button,
  Typography,
  Box,
  Chip,
  MenuItem,
  Paper,
  Modal,
  InputAdornment,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

// Mock data for demonstration
const mockData = [
    { symbol: "AAPL", name: "Apple Inc.", type: "stocks" },
    { symbol: "MSFT", name: "Microsoft Corporation", type: "stocks" },
    { symbol: "GOOGL", name: "Alphabet Inc. (Class A)", type: "stocks" },
    { symbol: "AMZN", name: "Amazon.com Inc.", type: "stocks" },
    { symbol: "TSLA", name: "Tesla Inc.", type: "stocks" },
    { symbol: "FB", name: "Meta Platforms Inc.", type: "stocks" },
    { symbol: "NFLX", name: "Netflix Inc.", type: "stocks" },
    { symbol: "NVDA", name: "NVIDIA Corporation", type: "stocks" },
    { symbol: "JPM", name: "JPMorgan Chase & Co.", type: "stocks" },
    { symbol: "V", name: "Visa Inc.", type: "stocks" },
    { symbol: "PYPL", name: "PayPal Holdings Inc.", type: "stocks" },
    { symbol: "NFLX", name: "Netflix Inc.", type: "stocks" },
    { symbol: "BTC", name: "Bitcoin", type: "crypto" },
    { symbol: "ETH", name: "Ethereum", type: "crypto" },
    { symbol: "XRP", name: "XRP (Ripple)", type: "crypto" },
    { symbol: "LTC", name: "Litecoin", type: "crypto" },
    { symbol: "ADA", name: "Cardano", type: "crypto" },
    { symbol: "DOGE", name: "Dogecoin", type: "crypto" },
    { symbol: "DOT", name: "Polkadot", type: "crypto" },
    { symbol: "SOL", name: "Solana", type: "crypto" },
    { symbol: "LINK", name: "Chainlink", type: "crypto" },
    { symbol: "MATIC", name: "Polygon", type: "crypto" },
    { symbol: "BNB", name: "Binance Coin", type: "crypto" },
    { symbol: "USDT", name: "Tether", type: "crypto" },
    { symbol: "SPY", name: "SPDR S&P 500 ETF Trust", type: "etf" },
    { symbol: "IVV", name: "iShares Core S&P 500 ETF", type: "etf" },
    { symbol: "VOO", name: "Vanguard S&P 500 ETF", type: "etf" },
    { symbol: "GLD", name: "SPDR Gold Shares", type: "etf" },
    { symbol: "SLV", name: "iShares Silver Trust", type: "etf" },
    { symbol: "VTI", name: "Vanguard Total Stock Market ETF", type: "etf" },
    { symbol: "XLF", name: "Financial Select Sector SPDR Fund", type: "etf" },
    { symbol: "XLY", name: "Consumer Discretionary Select Sector SPDR Fund", type: "etf" },
    { symbol: "XLC", name: "Communication Services Select Sector SPDR Fund", type: "etf" },
    { symbol: "XLB", name: "Materials Select Sector SPDR Fund", type: "etf" },
    { symbol: "XLI", name: "Industrial Select Sector SPDR Fund", type: "etf" },
    { symbol: "XLC", name: "Consumer Staples Select Sector SPDR Fund", type: "etf" },
  ]
  

// Modal styling
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 5,
  borderRadius: 2,
  boxShadow: 24,
  maxHeight: "80vh",
  overflowY: "auto",
}

const Header = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [filter, setFilter] = useState("All")
  const [openModal, setOpenModal] = useState(false)

  const handleSearchChange = (event) => {
    const { value } = event.target
    setSearchTerm(value)

    const filteredResults = mockData.filter(
      (item) =>
        item.symbol.toLowerCase().includes(value.toLowerCase()) &&
        (filter === "All" || item.type === filter.toLowerCase())
    )
    setSearchResults(filteredResults)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    onSearch(searchTerm)
    setOpenModal(false)
  }

  const handleFilterChange = (newFilter) => setFilter(newFilter)

  const handleResultClick = (symbol) => {
    setSearchTerm(symbol) // Update the search term with the selected symbol
    setOpenModal(false)
    onSearch(symbol) // Call the onSearch function with the selected symbol
  }

  const handleCloseModal = () => setOpenModal(false)

  const handleFieldClick = () => {
    setOpenModal(true)
  }

  return (
    <>
      {/* AppBar with sticky behavior */}
      <AppBar position="sticky" sx={{ backgroundColor: "#ffffff", paddingY: 1 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start" }}>
          {/* Left-aligned Search Box */}
          <Box sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
            <Box sx={{ position: "relative", width: 200 }}>
              <TextField
                variant="outlined"
                placeholder="Search Symbol"
                value={searchTerm}
                onChange={handleSearchChange}
                fullWidth
                size="small"
                sx={{ backgroundColor: "#fff", borderRadius: 1 }}
                onClick={handleFieldClick} // Open modal on click
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    sx: { paddingRight: "20px" },
                  },
                }}
              />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
   
      {/* Modal for detailed search */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
              {/* Modal Title */}
          <Typography variant="h6" sx={{ marginBottom: 2, textAlign: "center" }}>
            Symbol Search
          </Typography>
          {/* Filter Chips */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 1, marginBottom: 3 }}>
            {["All", "Stocks", "Crypto"].map((filterOption) => (
              <Chip
                key={filterOption}
                label={filterOption}
                onClick={() => handleFilterChange(filterOption)}
                variant={filter === filterOption ? "filled" : "outlined"}
                clickable
              />
            ))}
          </Box>

          {/* Search Input in Modal */}
          <form onSubmit={handleSearchSubmit}>
            <TextField
              variant="outlined"
              placeholder="Enter Symbol"
              value={searchTerm} // Keep showing the selected symbol
              onChange={handleSearchChange}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            {/* <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ backgroundColor: "#1976d2", fontWeight: "bold", paddingY: 1.5 }}
            >
              Search
            </Button> */}
          </form>

          {/* Search Results in Modal */}
          
  
          <Box sx={{ marginTop: 3, maxHeight: 200, overflowY: "auto" }}>
         
   
  
            {searchResults.length > 0 ? (
              searchResults.map((result) => (
                <Box
                  key={result.symbol}
                  sx={{ display: "flex", justifyContent: "space-between", paddingY: 1.5, cursor: "pointer" }}
                  onClick={() => handleResultClick(result.symbol)}
                >
                  <Typography>{result.symbol}</Typography>
                  <Typography>{result.name}</Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2" sx={{ textAlign: "center", fontStyle: "italic" }}>
                No results found
              </Typography>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default Header
