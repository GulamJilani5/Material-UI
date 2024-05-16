import { AppBar, Toolbar, Tabs, Tab } from "@mui/material";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { useState } from "react";

const linkArray = ["Home", "Diaries", "Auth"];
function Header() {
  const [value, setValue] = useState();

  return (
    <AppBar sx={{ bgcolor: "transparent" }}>
      <Toolbar>
        <TravelExploreIcon sx={{ color: "black" }} />
        <Tabs
          value={value}
          onChange={(e, val) => setValue(val)}
          sx={{ ml: "auto", textDecoration: "none" }}
        >
          {linkArray.map((link, index) => (
            <Tab
              sx={{
                textDecoration: "none",
                ":hover": {
                  textDecoration: "none",
                  textUnderlineOffset: "7px",
                },
              }}
              key={index}
              label={link}
            />
          ))}
        </Tabs>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
