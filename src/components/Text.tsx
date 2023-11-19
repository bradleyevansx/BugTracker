import { ReactNode } from "react";

interface Props {
  type: "p" | "lead" | "large" | "small" | "muted";
  children: ReactNode;
}

const Text = ({ type, children }: Props) => {
  switch (type) {
    case "p":
      return <p className="leading-7 w-fit">{children}</p>;
    case "lead":
      return <p className="text-xl text-muted-foreground w-fit">{children}</p>;
    case "large":
      return <div className="text-lg font-semibold w-fit">{children}</div>;
    case "small":
      return (
        <small className="text-sm font-medium leading-none w-fit">
          {children}
        </small>
      );
    case "muted":
      return <p className="text-sm text-muted-foreground w-fit">{children}</p>;
  }
};

export default Text;
