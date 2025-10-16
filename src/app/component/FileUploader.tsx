import { Upload } from "lucide-react";
import React from "react";

const FileUploader = () => {
  return (
    <div>
      <div className="flex items-center justify-center h-full p-8">
        <div
          className={`relative w-full max-w-2xl h-80 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all duration-300 `}
        >
          <input
            type="file"
            id="file-upload"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />

            <p className="mt-5 text-lg font-medium text-white">
              <span className="text-indigo-400">Click to upload</span> or drag
              and drop
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Any file type. Max 50MB.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
