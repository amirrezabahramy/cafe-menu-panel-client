import { useTheme } from "@/contexts/ThemeProvider";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "@tanstack/react-form";
import Form from "../basic/Form";
import { LoadingButton } from "@mui/lab";
import { TAddOrderItemMutate } from "@/types/queries/order-item";

type TProps = {
  onAdd: TAddOrderItemMutate;
};

function OrderItemCardAdder({ onAdd }: TProps) {
  const { colorByMode } = useTheme();

  const { Provider, Field, Subscribe, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
    },
    onSubmit: async ({ value }) => {
      const addedItem = {
        ...value,
        price: parseFloat(value.price),
      };
      // await onAdd(addedItem, {
      //   onSuccess: () => {
      //     reset();
      //   },
      // });
    },
  });

  const NameField = () => (
    <Field
      name="name"
      children={({ name, state: { value }, handleBlur, handleChange }) => (
        <TextField
          variant="standard"
          label="نام"
          name={name}
          value={value}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
          onBlur={handleBlur}
        />
      )}
    />
  );

  const PriceField = () => (
    <Field
      name="price"
      children={({ name, state: { value }, handleChange, handleBlur }) => (
        <TextField
          variant="standard"
          label="قیمت (تومان)"
          type="number"
          name={name}
          value={value}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
          onBlur={handleBlur}
        />
      )}
    />
  );

  const DescriptionField = () => (
    <Field
      name="description"
      children={({ name, state: { value }, handleBlur, handleChange }) => (
        <TextField
          variant="standard"
          label="توضیحات"
          name={name}
          value={value}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
          onBlur={handleBlur}
        />
      )}
    />
  );

  return (
    <Provider>
      <Card
        sx={{
          bgcolor: colorByMode(),
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flex: { xs: "50%", sm: "33%", lg: "25%", xl: "20%" },
        }}
        component={Form}
        onSubmit={handleSubmit}
      >
        <Box>
          {/* <CardMedia component="img" height={125} width={100} image={image} /> */}
          <CardContent component={Stack} spacing={0.75}>
            <Typography variant="h6">
              اطلاعات محصول جدید را وارد کنید.
            </Typography>
            <Divider sx={{ pt: 1 }} />
            <NameField />
            <PriceField />
            <DescriptionField />
          </CardContent>
        </Box>
        <CardActions>
          <Subscribe
            selector={({ canSubmit, isSubmitting }) => [
              canSubmit,
              isSubmitting,
            ]}
            children={([canSubmit, isSubmitting]) => (
              <LoadingButton
                size="small"
                disabled={!canSubmit}
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                اضافه کردن
              </LoadingButton>
            )}
          />
        </CardActions>
      </Card>
    </Provider>
  );
}

export default OrderItemCardAdder;
