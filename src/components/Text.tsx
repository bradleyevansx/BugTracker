interface Props {
  type: "p" | "lead" | "large" | "small" | "muted";
  children: string;
}

const Text = ({ type, children }: Props) => {
  switch (type) {
    case "p":
      return <p className="leading-7">{children}</p>;
    case "lead":
      return <p className="text-xl text-muted-foreground">{children}</p>;
    case "large":
      return <div className="text-lg font-semibold">{children}</div>;
    case "small":
      return (
        <small className="text-sm font-medium leading-none">{children}</small>
      );
    case "muted":
      return <p className="text-sm text-muted-foreground">{children}</p>;
  }
};

export default Text;
