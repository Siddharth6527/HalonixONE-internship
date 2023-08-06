import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { IconButton, Grid, Box, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { collection, addDoc, getDocs } from "firebase/firestore";
// import { db } from "../../firebase-config";

export default function AddForm({ closeEvent }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  // const createUser = async () => {
  //   await addDoc(empCollectionRef, {
  //     name: name,
  //     price: Number(price),
  //     category: category,
  //     date: String(new Date()),
  //   });
  //   getSuggestedQuery;
  // };

  const currencies = [
    {
      value: "Mobile",
      label: "Mobile",
    },
    {
      value: "Laptop",
      label: "Laptop",
    },
    {
      value: "Electronics",
      label: "Electronics",
    },
    {
      value: "Food",
      label: "Food",
    },
  ];

  return (
    <>
      <Box />
      <Typography variant="h5" align="center">
        Add Product
      </Typography>
      <IconButton
        style={{ position: "absolute", top: "0", right: "0" }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Box height={20} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            size="small"
            value={name}
            onChange={handleNameChange}
            sx={{ minWidth: 100 + "%" }}
          ></TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="Price"
            variant="outlined"
            size="small"
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CurrencyRupeeIcon />
                </InputAdornment>
              ),
            }}
            value={price}
            onChange={handlePriceChange}
            sx={{ minWidth: 100 + "%" }}
          ></TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="Category"
            select
            variant="outlined"
            size="small"
            onChange={handleCategoryChange}
            value={category}
            sx={{ minWidth: 100 + "%" }}
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            <Button variant="contained">Submit</Button>
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ m: 4 }} />
    </>
  );
}
