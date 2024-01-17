type TProps = Omit<
  React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  >,
  "onSubmit"
> & {
  onSubmit: () => void;
};

function Form({ onSubmit, ...rest }: TProps) {
  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onSubmit();
      }}
      {...rest}
    />
  );
}

export default Form;
