import { CgSpinner } from "react-icons/cg";

const Spinner = ({ size }: { size: number }) => {
  return <CgSpinner size={size} className="animate-spin text-blue-500" />;
};

export default Spinner;
