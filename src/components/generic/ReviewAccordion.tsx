import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";

type TProps = { title: string; description: string };

function ReviewAccordion({ title, description }: TProps) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{description}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}

export default ReviewAccordion;
