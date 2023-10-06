import React, { useEffect, useState } from 'react';
import { useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import "./SearchListWidget.css";

const SearchListWidget = () => {
  const { palette } = useTheme();
  const isDarkTheme = palette.mode === 'dark';

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const storedResults = JSON.parse(localStorage.getItem('searchResults'));
    setSearchResults(storedResults || []);
  }, [searchResults]); // <-- Added searchResults to the dependency array

  return (
    <WidgetWrapper className='searchList-container'>
      <div className={`friend-heading ${isDarkTheme ? 'dark-mode' : 'light-mode'}`}>
        Search List
      </div>
      <div className="friend-list">
        {searchResults.map((user) => (
          <Friend
            key={user._id}
            friendId={user._id}
            name={`${user.firstName} ${user.lastName}`}
            subtitle={user.occupation}
            userPicturePath={user.picturePath}
          />
        ))}
      </div>
    </WidgetWrapper>
  );
};

export default SearchListWidget;
