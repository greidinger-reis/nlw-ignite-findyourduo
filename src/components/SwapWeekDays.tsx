const SwapWeekDays = ({ text }: { text: string }) => {
  return (
    <>
      <div className="swap-off btn btn-square font-medium text-lg text-white">
        {text}
      </div>
      <div className="swap-on btn btn-square font-medium btn-primary text-lg text-white">
        {text}
      </div>
    </>
  );
};

export default SwapWeekDays;
