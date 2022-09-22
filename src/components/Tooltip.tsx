import { ReactNode } from "react";

const Tooltip = ({
  message,
  children,
}: {
  message: string;
  children: ReactNode;
}) => {
  return (
    <div className="relative flex flex-col items-center group">
      {children}
      <div className="absolute -bottom-5 right-12 flex-col items-center hidden mb-6 group-hover:flex">
        <span className="relative z-10 p-2 text-xs leading-none whitespace-no-wrap w-max bg-neutral shadow-lg rounded-md">
          {message}
        </span>
        <span className="absolute w-0 h-0 border-t-8 border-l-8 border-b-8 border-t-transparent border-b-transparent border-l-neutral  top-[6px] -right-[5px]" />
      </div>
    </div>
  );
};

export default Tooltip;
