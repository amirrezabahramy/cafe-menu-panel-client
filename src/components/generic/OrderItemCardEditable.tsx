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
import { useCallback, useEffect, useState } from "react";
import Form from "../basic/Form";
import { LoadingButton } from "@mui/lab";
import {
  TRemoveOrderItemMutate,
  TUpdateOrderItemMutate,
} from "@/types/queries/order-item";
import { TOrderItem } from "@/types/models";
import {
  FileSizeValidator,
  FileTypeValidator,
} from "use-file-picker/validators";
import { useFilePicker } from "use-file-picker";
import { Close, UploadFile } from "@mui/icons-material";
import { zodValidator } from "@tanstack/zod-form-adapter";
import {
  descriptionValidator,
  nameValidator,
  required,
} from "@/utils/validators";
import { REQUIRED } from "@/utils/validators/messages";

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
  const [orderItemImage, setOrderItemImage] = useState(image);
  const [orderItemImageErrors, setOrderItemImageErrors] = useState<
    Array<string>
  >([]);

  const { Provider, Field, Subscribe, handleSubmit, reset } = useForm({
    defaultValues: {
      name,
      description,
      price: price.toString(),
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
      const updatedItem = {
        _id,
        ...value,
        image: orderItemImage,
        price: parseInt(value.price),
      };
      await onUpdate(updatedItem, {
        onSuccess: () => {
          setIsEditMode(false);
        },
      });
    },
  });

  const clearFields = () => {
    reset();
    setOrderItemImage(image);
    setOrderItemImageErrors([]);
    clear();
  };

  const NameField = useCallback(
    () => (
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
    ),
    [isEditMode]
  );

  const PriceField = useCallback(
    () => (
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
    ),
    [isEditMode]
  );

  const DescriptionField = useCallback(
    () => (
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
    ),
    [isEditMode]
  );

  const Buttons = useCallback(
    ({
      canSubmit,
      isSubmitting,
    }: {
      canSubmit?: boolean;
      isSubmitting?: boolean;
    }) => (
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
            disabled={isSubmitting || isRemoving}
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
            disabled={isSubmitting || isRemoving}
            variant="outlined"
            onClick={() => {
              setIsEditMode(false);
            }}
          >
            لغو
          </Button>
        )}
      </>
    ),
    [isEditMode, isRemoving]
  );

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

  // Side effects
  useEffect(() => {
    const cleanUp = () => {
      if (!isEditMode) {
        clearFields();
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
          justifyContent: "space-between",
          flexGrow: 1,
          minWidth: { lg: 300 },
          maxWidth: { lg: 500 },
        }}
        component={isEditMode ? Form : "div"}
        onSubmit={handleSubmit}
      >
        <Box>
          {orderItemImage && isEditMode ? (
            <Box position="relative">
              <CardMedia
                component="img"
                height={200}
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
          ) : image && !isEditMode ? (
            <CardMedia component="img" height={200} width={100} image={image} />
          ) : null}
          <CardContent component={Stack} spacing={isEditMode ? 0.75 : 0.25}>
            {isEditMode && (
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
