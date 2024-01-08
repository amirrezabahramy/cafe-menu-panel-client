import { useTheme } from "@/contexts/ThemeProvider";
import {
  Box,
  Button,
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
import { useEffect, useState } from "react";
import Form from "../basic/Form";
import { LoadingButton } from "@mui/lab";
import {
  TRemoveOrderItemMutate,
  TUpdateOrderItemMutate,
} from "@/types/queries/order-item";
import { TOrderItem } from "@/types/models";

type TProps = Omit<TOrderItem, "type"> & {
  onUpdate: TUpdateOrderItemMutate;
  onRemove: TRemoveOrderItemMutate;
  isRemoving: boolean;
};

function OrderItemCardEditable({
  _id,
  name,
  image,
  description,
  price,
  onUpdate,
  onRemove,
  isRemoving,
}: TProps) {
  const { colorByMode } = useTheme();

  const [isEditMode, setIsEditMode] = useState(false);

  const { Provider, Field, Subscribe, handleSubmit, reset } = useForm({
    defaultValues: {
      name,
      description,
      price: price.toString(),
    },
    onSubmit: async ({ value }) => {
      const updatedItem = {
        _id,
        ...value,
        price: parseFloat(value.price),
      };
      await onUpdate(updatedItem, {
        onSuccess: () => {
          setIsEditMode(false);
        },
      });
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

  const Buttons = ({ canSubmit, isSubmitting }: any) => (
    <>
      <LoadingButton
        size="small"
        disabled={isEditMode && (!canSubmit || isRemoving)}
        type={isEditMode ? "submit" : "button"}
        variant={isEditMode ? "contained" : "outlined"}
        loading={isSubmitting}
        onClick={() => {
          setIsEditMode(true);
        }}
      >
        {isEditMode ? "ثبت" : "ویرایش"}
      </LoadingButton>
      {isEditMode && (
        <LoadingButton
          size="small"
          disabled={!canSubmit || isRemoving}
          variant="outlined"
          color="error"
          onClick={async () => {
            await onRemove(_id);
          }}
          loading={isRemoving}
        >
          حذف
        </LoadingButton>
      )}
      {isEditMode && (
        <Button
          size="small"
          disabled={!canSubmit || isRemoving}
          variant="outlined"
          onClick={() => {
            setIsEditMode(false);
          }}
        >
          لغو
        </Button>
      )}
    </>
  );

  useEffect(() => {
    const cleanUp = () => {
      if (!isEditMode) {
        reset();
      }
    };
    cleanUp();
    return cleanUp;
  }, [isEditMode]);

  return (
    <Provider>
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
        component={isEditMode ? Form : "div"}
        onSubmit={handleSubmit}
      >
        <Box>
          <CardMedia component="img" height={200} width={100} image={image} />
          <CardContent component={Stack} spacing={isEditMode ? 0.75 : 0.25}>
            {isEditMode ? (
              <NameField />
            ) : (
              <Typography variant="h5">{name}</Typography>
            )}
            {isEditMode ? (
              <PriceField />
            ) : (
              <Typography variant="subtitle1">{`${price} تومان`}</Typography>
            )}
            {!isEditMode && <Divider sx={{ pt: 0.33 }} />}
            {isEditMode ? (
              <DescriptionField />
            ) : (
              <Typography sx={{ pt: 1 }} variant="body2" color="text.secondary">
                {description}
              </Typography>
            )}
          </CardContent>
        </Box>
        <CardActions>
          {isEditMode ? (
            <Subscribe
              selector={({ canSubmit, isSubmitting }) => [
                canSubmit,
                isSubmitting,
              ]}
              children={([canSubmit, isSubmitting]) => (
                <Buttons canSubmit={canSubmit} isSubmitting={isSubmitting} />
              )}
            />
          ) : (
            <Buttons />
          )}
        </CardActions>
      </Card>
    </Provider>
  );
}

export default OrderItemCardEditable;
