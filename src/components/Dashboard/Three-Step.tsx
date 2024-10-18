import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashboardSteps = () => {
  const [activeStep, setActiveStep] = useState(1);
  const navigate = useNavigate();

  const handleDepositClick = () => {
    navigate("/dashboard/deposit");
  };
  const handleTransferClick = () => {
    navigate("/dashboard/transfer");
  };

  const steps = [
    {
      title: "Make your first deposit",
      description:
        "Making your first deposit is a crucial step toward unlocking world of opportunities. With our seamless and secure process, you can feel confident that your funds are in safe hands.",
      buttonText: "Deposit",
      onClick: handleDepositClick,
    },
    {
      title: "Transfer to same bank",
      description:
        " Seamlessly transfer funds to other accounts within our network. Enjoy swift and secure transactions, with instant access to your recipient's account, all while maintaining complete peace of mind.",
      buttonText: "Transfer",
      onClick: handleTransferClick,
    },
    {
      title: "Transfer to other bank",
      description:
        "Move your money effortlessly to accounts outside our network. Our inter-bank transfer system ensures your funds are securely routed and delivered on time, no matter where the destination may be.",
      buttonText: "Transfer",
      onClick: handleTransferClick,
    },
  ];

  // Automatically switch steps every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prevStep) => (prevStep === 3 ? 1 : prevStep + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Step content */}
      <div className=" transition-colors duration-500">
        <h3 className="font-semibold">{steps[activeStep - 1].title}</h3>
        <p className="pt-2 pb-5 text-sm leading-6">
          {steps[activeStep - 1].description}
        </p>
        <button
          onClick={steps[activeStep - 1].onClick}
          className="bg-secondary text-white text-sm px-6 py-[6px] rounded hover:bg-active transition-colors duration-500 ease-in-out"
        >
          {steps[activeStep - 1].buttonText}
        </button>
      </div>

      {/* Step Circles */}
      <div className="flex justify-center items-center gap-4 mt-2">
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className={`w-3 h-3 border-2 rounded-full ${
              step === activeStep ? "bg-gray-400" : "bg-secondary"
            } transition-colors duration-300`}
          />
        ))}
      </div>
    </>
  );
};

export default DashboardSteps;