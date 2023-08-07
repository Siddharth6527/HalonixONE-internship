import React from "react";
import Sidenav from "../../components/Dashboard/Sidenav";
import { Box, Typography } from "@mui/material";
import Navbar from "../../components/Dashboard/Navbar";
import { Grid, Card, CardContent, Stack } from "@mui/material";
import "../../Dash.css";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AccordionDash from "../../components/Dashboard/AccordionDash";
import BarChart from "../../charts/Barcharts";
import CountUp from "react-countup";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const Home = () => {
  return (
    <>
      <div className="bgcolor">
        <Navbar />
        <Box height={70} />
        <Box sx={{ display: "flex" }}>
          <Sidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Stack spacing={2} direction="row">
                  <Card
                    sx={{
                      minWidth: 49 + "%",
                      height: 150,
                      borderRadius: 5,
                    }}
                    className="gradient"
                  >
                    <CardContent>
                      <div className="iconstyle">
                        <AccessTimeIcon />
                      </div>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ color: "#ffffff" }}
                      >
                        <CountUp
                          delay={0.4}
                          end={5.2}
                          duration={0.6}
                          decimals={2}
                          decimal="."
                        />
                        Hrs Used
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body2"
                        component="div"
                        sx={{ color: "#ccd1d1" }}
                      >
                        Halonix Prism Bulb 12W
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card
                    sx={{
                      minWidth: 49 + "%",
                      height: 150,
                      borderRadius: 5,
                    }}
                    className="gradientlight"
                  >
                    <CardContent>
                      <div className="iconstyle">
                        {/* <ShoppingBagIcon /> */}
                        <AccessTimeIcon />
                      </div>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ color: "#ffffff" }}
                      >
                        <CountUp
                          delay={0.4}
                          end={1.5}
                          duration={0.6}
                          decimals={2}
                          decimal="."
                        />
                        Hrs Used
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body2"
                        component="div"
                        sx={{ color: "#ccd1d1" }}
                      >
                        Halonix Strip Light 9W
                      </Typography>
                    </CardContent>
                  </Card>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack spacing={2}>
                  <Card
                    sx={{ minWidth: 345, borderRadius: 5 }}
                    className="gradientlight"
                  >
                    <Stack spacing={2} direction="row">
                      <div className="iconstyle">
                        <StorefrontIcon />
                      </div>
                      <div className="paddingall">
                        <span className="pricetitle white">Prism Bulb 9W</span>
                        <br />
                        <span className="pricesubtitle white">Online</span>
                      </div>
                    </Stack>
                  </Card>
                  <Card sx={{ minWidth: 345, borderRadius: 5 }}>
                    <Stack spacing={2} direction="row">
                      <div className="iconstyleblack">
                        <StorefrontIcon />
                      </div>
                      <div className="paddingall">
                        <span className="pricetitle">Halonix CCTV Camera</span>
                        <br />
                        <span className="pricesubtitle">Offline</span>
                      </div>
                    </Stack>
                  </Card>
                </Stack>
              </Grid>
            </Grid>
            <Box height={20} />
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Card sx={{ height: 60 + "vh" }}>
                  <CardContent>
                    <BarChart />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card sx={{ height: 60 + "vh" }}>
                  <CardContent>
                    <div className="paddingall">
                      <span className="pricetitle">FAQs</span>
                    </div>
                    <AccordionDash />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Home;
