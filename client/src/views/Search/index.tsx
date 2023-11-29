import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { useDispatch } from "react-redux";
import useTypedSelector from "../../hooks/useTypedSelector";
import {
  selectedSearchText,
  setSearchText,
} from "../../redux/global/globalSlice";
import { useSearchListingsQuery } from "../../redux/api/listingApiSlice";
import OverlayLoader from "../../components/Spinner/OverlayLoader";

const sortTypes = [
  {
    name: "Latest",
    value: "createdAt_desc",
  },
  {
    name: "Oldest",
    value: "createdAt_asc",
  },
  {
    name: "Price High to Low",
    value: "regularPrice_desc",
  },
  {
    name: "Price Low to High",
    value: "regularPrice_asc",
  },
];

const SearchPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchText = useTypedSelector(selectedSearchText);

  const [query, setQuery] = useState<any>("");
  const [filter, setFilter] = useState<any>({
    searchTerm: searchText,
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "createdAt_desc",
  });

  console.log("query", query);

  // Search API query
  const { data, isLoading } = useSearchListingsQuery(query || "");

  console.log("data", data);

  const handleSearch = (event: any) => {
    let value = event.target.value.toLowerCase();
    setFilter({ ...filter, searchTerm: value });
    dispatch(setSearchText(value));
  };

  const SearchHandler = async () => {
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", filter.searchTerm);
    urlParams.set("type", filter.type);
    urlParams.set("parking", filter.parking);
    urlParams.set("furnished", filter.furnished);
    urlParams.set("offer", filter.offer);
    urlParams.set("sort", filter.sort);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
    setQuery(searchQuery);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get("searchTerm");
    const type = urlParams.get("type");
    const parking = urlParams.get("parking");
    const furnished = urlParams.get("furnished");
    const offer = urlParams.get("offer");
    const sort = urlParams.get("sort");

    if (searchTerm || type || parking || furnished || offer || sort) {
      setFilter({
        searchTerm: searchTerm || "",
        type: type || "all",
        parking: parking || false,
        furnished: furnished || false,
        offer: offer || false,
        sort: sort || "createdAt_desc",
      });
    }
  }, []);

  return (
    <Box sx={{ margin: "50px 0 0 0" }}>
      {isLoading && <OverlayLoader />}
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
              placeholder="Search..."
              searchText={searchText}
              handleSearch={handleSearch}
              value={filter.searchTerm}
              onChange={handleSearch}
            />
            <Box sx={{ marginTop: "10px" }}>
              <RadioGroup
                name="type"
                value={filter.type}
                onChange={(event) => {
                  setFilter({ ...filter, type: event.target.value });
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
              value={filter.sort}
              onChange={(event: any) => {
                setFilter({ ...filter, sort: event.target.value });
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
                onClick={SearchHandler}
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
