import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import api from "@/services/api";
import { AxiosResponse } from "axios";
import Form from "@/components/basic/Form";
import AuthFormContainer from "../../containers/AuthFormContainer";
import { useClient } from "@/contexts/ClientProvider";

type TFormData = {
  username: string;
  password: string;
};

type TLoginResponse = AxiosResponse<{ accessToken: string }>;

function LoginForm() {
  const { loginUser } = useClient();

  const { mutateAsync: submitLogin } = useMutation({
    mutationKey: ["login-user"],
    mutationFn: (data: TFormData) =>
      api.post<TFormData, TLoginResponse>("auth/login", data),
    onSuccess: (data) => {
      loginUser(data.data.accessToken);
    },
  });

  const { Provider, Field, Subscribe, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      await submitLogin(value);
    },
  });

  return (
    <Provider>
      <Form onSubmit={handleSubmit}>
        <AuthFormContainer>
          <Field
            name="username"
            children={({
              name,
              state: { value },
              handleBlur,
              handleChange,
            }) => (
              <TextField
                label="نام کاربری"
                name={name}
                value={value}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
              />
            )}
          />
          <Field
            name="password"
            children={({
              name,
              state: { value },
              handleBlur,
              handleChange,
            }) => (
              <TextField
                label="نام کاربری"
                type="password"
                name={name}
                value={value}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
              />
            )}
          />
          <Subscribe
            selector={({ canSubmit, isSubmitting }) => [
              canSubmit,
              isSubmitting,
            ]}
            children={([canSubmit, isSubmitting]) => (
              <LoadingButton
                disabled={!canSubmit}
                loading={isSubmitting}
                type="submit"
                variant="contained"
              >
                ورود
              </LoadingButton>
            )}
          />
        </AuthFormContainer>
      </Form>
    </Provider>
  );
}

export default LoginForm;
