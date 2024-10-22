import React from "react";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-lg">404</h1>
      <p className="text-sm">Page Not Found</p>
    </div>
  );
};

export default NotFoundPage;