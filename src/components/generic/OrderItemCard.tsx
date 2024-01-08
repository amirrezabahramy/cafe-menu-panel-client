import { useTheme } from "@/contexts/ThemeProvider";
import { TOrderItem } from "@/types/models";
import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

type TProps = Omit<TOrderItem, "_id" | "type">;

function OrderItemCard({ name, description, price, image }: TProps) {
  const { colorByMode } = useTheme();
  return (
    <Card
      sx={{
        bgcolor: colorByMode(),
        display: "flex",
        flexDirection: "column",
        justifyContent: { sm: "space-between", lg: "flex-start" },
        flexGrow: 1,
        minWidth: { lg: 300 },
        maxWidth: { lg: 500 },
      }}
    >
      <CardMedia component="img" height={200} width={100} image={image} />
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
