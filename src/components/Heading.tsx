interface Props {
  type: "h1" | "h2" | "h3" | "h4";
  children: string;
}

const Heading = ({ type, children }: Props) => {
  switch (type) {
    case "h1":
      return (
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl w-fit">
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 w-fit">
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight w-fit">
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight w-fit">
          {children}
        </h4>
      );
  }
};

export default Heading;
