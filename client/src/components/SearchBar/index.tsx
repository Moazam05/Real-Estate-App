// React Imports
import React from "react";
// Material UI Imports
import { InputAdornment, TextField } from "@mui/material";
// React Icon
import { IoIosSearch } from "react-icons/io";

interface searchBarProps {
  searchText?: any;
  placeholder?: any;
  handleSearch?: any;
  onChange?: any;
  value?: any;
  color?: any;
}

export default function SearchBar({
  handleSearch,
  placeholder,
  searchText,
  onChange,
  value,
  color,
}: searchBarProps) {
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      handleSearch(event);
    }
  };

  React.useEffect(() => {
    if (searchText) {
      const input: any = document.getElementById("outlined-basic");
      if (input) {
        input.value = searchText;
      }
    }
  }, [searchText]);

  return (
    <TextField
      sx={{
        width: "100%",
        borderRadius: "5px",
      }}
      fullWidth
      onKeyDown={handleKeyDown}
      onChange={onChange}
      value={searchText}
      id="outlined-basic"
      variant="outlined"
      placeholder={
        placeholder
          ? placeholder
          : `Search Patient by Name, Mobile, MR No. or ID No.`
      }
      InputProps={{
        sx: {
          borderRadius: "5px",
          background: color ? color : "#f1f5f9",
          height: "45px",
          border: "none",
        },
        endAdornment: (
          <InputAdornment position="start">
            <IoIosSearch
              style={{
                color: "#334155",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            />
          </InputAdornment>
        ),
      }}
    />
  );
}
