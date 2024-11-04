import React from "react";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen">
      <h1 className="text-2xl">404</h1>
      <p>Page Not Found</p>
    </div>
  );
};

export default NotFoundPage;
