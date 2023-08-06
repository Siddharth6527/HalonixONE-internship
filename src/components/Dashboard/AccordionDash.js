import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function AccordionDash() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Who is the CEO of Halonix?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Rakesh Zutshi is the Managing Director & CEO at Halonix .
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Is Halonix a good brand?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Today, Halonix is one of the top 5 lighting brands in the lighting
            industry.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>What is the net worth of Halonix?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The company is being valued at Rs 1,500 crore, said three people
            with knowledge of the development.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
