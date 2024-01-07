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
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onSubmit();
      }}
      {...rest}
    ></form>
  );
}

export default Form;
