import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Button,
} from "@mui/material";
import SearchBar from "../../components/SearchBar";
import { Heading, SubHeading } from "../../components/Heading";
import SelectInput from "../../components/SelectInput";

const sortTypes = [
  {
    name: "Latest",
    value: "latest",
  },
  {
    name: "Oldest",
    value: "oldest",
  },
  {
    name: "Price High to Low",
    value: "priceHighToLow",
  },
  {
    name: "Price Low to High",
    value: "priceLowToHigh",
  },
];

const SearchPage = () => {
  // const navigate = useNavigate();

  const [filter, setFilter] = useState<any>({
    searchText: "",
    searchType: "all",
    parking: false,
    furnished: false,
    offer: false,
    sortBy: "latest",
  });

  const handleSearch = (event: any) => {
    let value = event.target.value.toLowerCase();
    setFilter({ ...filter, searchText: value });
  };

  return (
    <Box sx={{ margin: "50px 0 0 0" }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Box
            sx={{
              margin: "0 0 0 20px",
              background: "#fff",
              borderRadius: "5px",
              padding: "15px 20px 20px 20px",
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px",
            }}
          >
            <SubHeading sx={{ marginBottom: "5px" }}>Search</SubHeading>
            <SearchBar
              handleSearch={handleSearch}
              searchText={filter.searchText}
              placeholder="Search..."
            />
            <Box sx={{ marginTop: "10px" }}>
              <RadioGroup
                name="type"
                value={filter.searchType}
                onChange={(event) => {
                  setFilter({ ...filter, searchType: event.target.value });
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <FormControlLabel
                    value="all"
                    control={<Radio />}
                    label="Rent & Sell"
                  />
                  <FormControlLabel
                    value="rent"
                    control={<Radio />}
                    label="Rent"
                  />
                  <FormControlLabel
                    value="sell"
                    control={<Radio />}
                    label="Sell"
                  />
                </Box>
              </RadioGroup>
            </Box>
            <Box sx={{ margin: "0 0 5px 0" }}>
              <FormControlLabel
                control={<Checkbox />}
                label="Offer"
                name="offer"
                checked={filter.offer}
                onChange={() => {
                  setFilter({ ...filter, offer: !filter.offer });
                }}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Parking"
                name="parking"
                checked={filter.parking}
                onChange={() => {
                  setFilter({ ...filter, parking: !filter.parking });
                }}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Furnished"
                name="furnished"
                checked={filter.furnished}
                onChange={() => {
                  setFilter({ ...filter, furnished: !filter.furnished });
                }}
              />
            </Box>
            <SubHeading sx={{ margin: "5px 0" }}>Sort</SubHeading>
            <SelectInput
              styles={{ width: "100%" }}
              name="sort"
              value={filter.sortBy}
              onChange={(event: any) => {
                setFilter({ ...filter, sortBy: event.target.value });
              }}
              label=""
              data={sortTypes}
              options={sortTypes?.map((copyType: any, index: number) => ({
                ...copyType,
                value: copyType.value,
                label: copyType.name,
              }))}
            ></SelectInput>
            <Box>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  padding: "5px 30px",
                  textTransform: "capitalize",
                  margin: "20px 0 5px 0",
                  background: "#334155",
                  height: "40px",
                  color: "#fff",
                  lineHeight: "0",
                  "&:hover": {
                    background: "#334155",
                  },
                }}
              >
                Search
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Box
            sx={{
              paddingLeft: "20px",
              // borderLeft: "5px solid orange",
              // height: "100vh",
            }}
          >
            <Heading sx={{ margin: "0 0 20px 0" }}>Listing Results</Heading>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Grid item xs={4}>
                <Box sx={{ background: "#fff", borderRadius: "5px" }}>
                  <Box sx={{ height: "200px" }}>
                    <img
                      src="https://images.unsplash.com/photo-1617098650990-217c7cf9de26?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="listing"
                      height="100%"
                      width="100%"
                      style={{ objectFit: "cover", borderRadius: "5px" }}
                    />
                  </Box>
                  <Box sx={{ padding: "20px 15px" }}>
                    <Box>Name</Box>
                    <Box>Description</Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={4}>
                Card 2
              </Grid>
              <Grid item xs={4}>
                Card 3
              </Grid>
            </Box>
          </Box>
        </Grid>
        {/* <Grid item xs={2}></Grid> */}
      </Grid>
    </Box>
  );
};

export default SearchPage;
