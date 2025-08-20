import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-4 rounded-full shadow-lg">
            <AlertTriangle className="w-12 h-12 text-red-600" />
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-2">404</h1>
        <h2 className="text-xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-block px-6 py-3 rounded-2xl bg-primary text-white font-medium shadow-md hover:bg-primary/90 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
