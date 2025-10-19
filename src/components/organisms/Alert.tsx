type Props = {
  message: string;
};

export function Alert({ message }: Props) {
  return <div>{message}</div>;
}
