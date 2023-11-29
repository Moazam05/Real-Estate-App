// React Imports
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// MUI Imports
import {
  Box,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Button,
} from "@mui/material";
// Custom Imports
import SearchBar from "../../components/SearchBar";
import { Heading, SubHeading } from "../../components/Heading";
import SelectInput from "../../components/SelectInput";
import OverlayLoader from "../../components/Spinner/OverlayLoader";
// Hooks Imports
import useTypedSelector from "../../hooks/useTypedSelector";
// Redux Imports
import {
  selectedSearchText,
  setSearchText,
} from "../../redux/global/globalSlice";
import { useSearchListingsQuery } from "../../redux/api/listingApiSlice";
// React Icons
import { FaLocationDot } from "react-icons/fa6";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
// Utils Imports
import { thousandSeparatorNumber } from "../../utils";

const iconStyle = {
  display: "flex",
  alignItems: "center",
  gap: "5px",
  color: "#334155",
  fontWeight: "bold",
  fontSize: "13px",
};

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
  // Search API query
  const { data, isLoading } = useSearchListingsQuery(query);

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
    <Box sx={{ margin: "35px 0 0 0" }}>
      {isLoading && <OverlayLoader />}
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Heading sx={{ margin: "0 0 5px 20px" }}>Filters</Heading>
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
              color="#fff"
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
                    value="sale"
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
              padding: "0 20px",
            }}
          >
            <Heading sx={{ margin: "0 0 5px 0" }}>Listing Results</Heading>
            <Grid container spacing={2}>
              {data?.data?.length === 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "20px 15px 20px",
                    borderRadius: "5px",
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    border: "1px solid #ccc",
                    margin: "16px 0",
                    justifyContent: "center",
                    flexDirection: "column",
                    width: "300px",
                    background: "#fff",
                  }}
                >
                  No results found
                </Box>
              ) : (
                <>
                  {data?.data?.map((item: any) => (
                    <Grid item xs={4} key={item._id}>
                      <Box
                        sx={{
                          background: "#fff",
                          borderRadius: "5px",
                          width: "340px",
                          marginBottom: "20px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          navigate(`/listing/${item._id}`);
                        }}
                      >
                        <Box
                          sx={{
                            height: "200px",
                            overflow: "hidden",
                            position: "relative",
                            "&:hover img": {
                              transform: "scale(1.1)",
                            },
                          }}
                        >
                          <img
                            src={item?.imageUrls[0]}
                            alt="listing"
                            height="100%"
                            width="100%"
                            style={{
                              objectFit: "cover",
                              borderRadius: "5px",
                              transition: "transform 0.3s ease",
                            }}
                          />
                        </Box>
                        <Box sx={{ padding: "20px 15px" }}>
                          <SubHeading
                            sx={{
                              fontWeight: 600,
                              fontSize: "18px",
                              color: "#334155",
                            }}
                          >
                            {item?.name?.length > 30
                              ? item?.name?.substring(0, 30) + "..."
                              : item?.name}
                          </SubHeading>
                          <Box
                            sx={{
                              marginTop: "5px",
                              color: "#4b5563",
                              fontSize: "13px",
                              fontWeight: 500,
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            <FaLocationDot style={{ color: "#15803d" }} />
                            {item?.address}
                          </Box>
                          <Box
                            sx={{
                              marginTop: "5px",
                              color: "#4b5563",
                              fontSize: "13px",
                              height: "55px",
                            }}
                          >
                            {item?.description?.length > 150
                              ? item?.description?.substring(0, 150) + "..."
                              : item?.description}
                          </Box>
                          <Box
                            sx={{
                              color: "#64748b",
                              fontWeight: 600,
                              fontSize: "16px",
                              marginTop: "10px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: "5px",
                            }}
                          >
                            Rs. {thousandSeparatorNumber(item?.regularPrice)}{" "}
                            {item?.type === "rent" ? "/ month" : ""}
                            <Box>
                              {item?.type === "rent" ? (
                                <Box
                                  sx={{
                                    background: "#0078a5",
                                    fontSize: "12px",
                                    color: "#fff",
                                    borderRadius: "50%",
                                    padding: "5px 10px",
                                    display: "inline-block",
                                  }}
                                >
                                  Rent
                                </Box>
                              ) : (
                                <Box
                                  sx={{
                                    background: "#7fb742",
                                    fontSize: "12px",
                                    color: "#fff",
                                    borderRadius: "50%",
                                    padding: "5px 10px",
                                    display: "inline-block",
                                  }}
                                >
                                  Sale
                                </Box>
                              )}
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              marginTop: "7px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box sx={{ display: "flex", gap: 1 }}>
                              <Box sx={iconStyle}>
                                <FaBed
                                  style={{ color: "#334155", marginTop: "3px" }}
                                />
                                {item?.bedrooms} Beds
                              </Box>
                              <Box sx={iconStyle}>
                                <FaBath
                                  style={{ color: "#334155", marginTop: "3px" }}
                                />
                                {item?.bathrooms} Baths
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </>
              )}
            </Grid>
          </Box>
        </Grid>
        {/* <Grid item xs={2}></Grid> */}
      </Grid>
    </Box>
  );
};

export default SearchPage;
