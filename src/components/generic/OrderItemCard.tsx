import { useTheme } from "@/contexts/ThemeProvider";
import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

type TProps = {
  name: string;
  image: string;
  description: string;
  price: number;
};

function OrderItemCard({ name, image, description, price }: TProps) {
  const { colorByMode } = useTheme();

  return (
    <Card
      sx={{
        bgcolor: colorByMode(),
        flex: { xs: "50%", sm: "33%", lg: "25%", xl: "20%" },
      }}
    >
      <CardMedia component="img" height={100} width={100} image={image} />
      <CardContent component={Stack} spacing={0.25}>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="subtitle1">{`${price} تومان`}</Typography>
        <Divider sx={{ pt: 0.33 }} />
        <Typography sx={{ pt: 1 }} variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default OrderItemCard;
