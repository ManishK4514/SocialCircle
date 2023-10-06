import React from 'react'
import { useMediaQuery } from "@mui/material";
import SearchListWidget from 'scenes/widgets/SearchListWidget';
import Navbar from 'scenes/navbar';

const SearchPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (    
    <div>
      <Navbar />
      <div
        className="profile-container"        
        style={{
          display: isNonMobileScreens ? "flex" : "block"
        }}
      >
        <SearchListWidget />
      </div>
    </div>    
  )
}

export default SearchPage;