import { useTheme } from "@/contexts/ThemeProvider";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "@tanstack/react-form";
import Form from "../basic/Form";
import { LoadingButton } from "@mui/lab";
import { TAddOrderItemMutate } from "@/types/queries/order-item";
import { useState } from "react";
import { useFilePicker } from "use-file-picker";
import {
  FileSizeValidator,
  FileTypeValidator,
} from "use-file-picker/validators";
import { Close, UploadFile } from "@mui/icons-material";
import { zodValidator } from "@tanstack/zod-form-adapter";
import {
  descriptionValidator,
  nameValidator,
  required,
} from "@/utils/validators";
import { REQUIRED } from "@/utils/validators/messages";

type TProps = {
  onAdd: TAddOrderItemMutate;
};

function OrderItemCardAdder({ onAdd }: TProps) {
  const { colorByMode } = useTheme();

  const [orderItemImage, setOrderItemImage] = useState("");
  const [orderItemImageErrors, setOrderItemImageErrors] = useState<
    Array<string>
  >([]);

  // Form hook
  const { Provider, Field, Subscribe, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
    },
    validators: {
      //@ts-ignore
      onSubmit: () => {
        if (!orderItemImage) {
          setOrderItemImageErrors([REQUIRED]);
        }
      },
    },
    onSubmit: async ({ value }) => {
      if (!orderItemImage) {
        return;
      }
      !!orderItemImageErrors.length && setOrderItemImageErrors([]);
      const addedItem = {
        ...value,
        image: orderItemImage,
        price: parseInt(value.price),
      };
      await onAdd(addedItem, {
        onSuccess: clearFields,
      });
    },
  });

  // File picker hook
  const { loading, errors, clear, openFilePicker } = useFilePicker({
    readAs: "DataURL",
    accept: "image/png, image/jpg, image/jpeg",
    multiple: false,
    validators: [
      new FileTypeValidator(["png", "jpg", "jpeg"]),
      new FileSizeValidator({ maxFileSize: 3 * 1024 * 1024 }),
    ],
    onFilesSuccessfullySelected: (files) => {
      setOrderItemImage(files.filesContent[0].content);
    },
  });

  const clearFields = () => {
    reset();
    setOrderItemImage("");
    setOrderItemImageErrors([]);
    clear();
  };

  return (
    <Provider>
      <Card
        sx={{
          bgcolor: colorByMode(),
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flexGrow: 1,
          minWidth: { lg: 300 },
          maxWidth: { lg: 500 },
        }}
        component={Form}
        onSubmit={handleSubmit}
      >
        <Box>
          {orderItemImage && (
            <Box position="relative">
              <CardMedia
                component="img"
                height={125}
                width={100}
                image={orderItemImage}
              />
              <IconButton
                onClick={() => {
                  setOrderItemImage("");
                  clear();
                }}
                sx={{
                  bgcolor: colorByMode(),
                  position: "absolute",
                  top: 10,
                  right: 10,
                  ":hover": {
                    bgcolor: colorByMode(),
                  },
                }}
              >
                <Close />
              </IconButton>
            </Box>
          )}
          <CardContent component={Stack} spacing={0.75}>
            <Typography variant="h6">
              اطلاعات محصول جدید را وارد کنید.
            </Typography>
            <Divider sx={{ pt: 1 }} />
            {!orderItemImage && (
              <TextField
                label={loading ? "در حال بارگیری عکس..." : "عکس محصول"}
                disabled
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <IconButton disabled={loading} onClick={openFilePicker}>
                      <UploadFile />
                    </IconButton>
                  ),
                }}
                variant="standard"
                error={!!errors.length || !!orderItemImageErrors.length}
                helperText={
                  orderItemImageErrors.length
                    ? orderItemImageErrors.join(", ")
                    : "حداکثر حجم فایل: 2 مگابایت"
                }
              >
                انتخاب عکس
              </TextField>
            )}
            <Field
              name="name"
              validatorAdapter={zodValidator}
              validators={{
                onSubmit: nameValidator(),
              }}
              children={({
                name,
                state: {
                  value,
                  meta: { errors },
                },
                handleBlur,
                handleChange,
              }) => (
                <TextField
                  variant="standard"
                  label="نام"
                  name={name}
                  value={value}
                  onChange={(e) => {
                    handleChange(e.target.value);
                  }}
                  onBlur={handleBlur}
                  error={!!errors.length}
                  helperText={errors.join(", ")}
                />
              )}
            />
            <Field
              name="price"
              validatorAdapter={zodValidator}
              validators={{
                onSubmit: required(),
              }}
              children={({
                name,
                state: {
                  value,
                  meta: { errors },
                },
                handleChange,
                handleBlur,
              }) => (
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
                  error={!!errors.length}
                  helperText={errors.join(", ")}
                />
              )}
            />
            <Field
              name="description"
              validatorAdapter={zodValidator}
              validators={{
                onSubmit: descriptionValidator(),
              }}
              children={({
                name,
                state: {
                  value,
                  meta: { errors },
                },
                handleBlur,
                handleChange,
              }) => (
                <TextField
                  variant="standard"
                  label="توضیحات"
                  name={name}
                  value={value}
                  onChange={(e) => {
                    handleChange(e.target.value);
                  }}
                  onBlur={handleBlur}
                  error={!!errors.length}
                  helperText={errors.join(", ")}
                />
              )}
            />
          </CardContent>
        </Box>
        <CardActions>
          <Subscribe
            selector={({ canSubmit, isSubmitting }) => [
              canSubmit,
              isSubmitting,
            ]}
            children={([canSubmit, isSubmitting]) => (
              <>
                <LoadingButton
                  size="small"
                  disabled={!canSubmit || isSubmitting}
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  اضافه کردن
                </LoadingButton>
                <Button onClick={clearFields} size="small" variant="outlined">
                  پاک کردن
                </Button>
              </>
            )}
          />
        </CardActions>
      </Card>
    </Provider>
  );
}

export default OrderItemCardAdder;
