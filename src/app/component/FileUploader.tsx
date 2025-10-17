import { Upload } from "lucide-react";
import React, { useState } from "react";
import { AppState } from "../types/types";

interface FileUploadProp {
  onfileUpload: (state: AppState) => void;
  setLoad: (state: boolean) => void;
}

const FileUploader: React.FC<FileUploadProp> = ({ onfileUpload, setLoad }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setSuccess(null);
    const f = e.target.files && e.target.files[0];
    if (f) {
      // Optional client-side size check (50MB)
      const maxSize = 10 * 1024 * 1024;
      if (f.size > maxSize) {
        setFile(null);
        setError("File is too large. Max size is 50MB.");
        return;
      }
      setFile(f);
    } else {
      setFile(null);
    }
  };

  const uploadFile = async () => {
    setError(null);
    setSuccess(null);
    if (!file) {
      console.log("no file selected");

      setError("No file selected.");
      return;
    }

    const formData = new FormData();
    // key 'file' - adjust server-side if needed
    formData.append("file_upload", file);
    // add any additional fields here, e.g. metadata
    //  formData.append("uploadedAt", new Date().toISOString());

    try {
      const endpoint = "http://127.0.0.1:8000/upload";
      setUploading(true);
      setLoad(true);
      const res = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Upload failed with ${res.status}`);
      }

      const json = await res.json().catch(() => null);
      setSuccess(json?.message || "Upload successful");
      setFile(null);
      onfileUpload(AppState.CHATTING);
      // reset input value so same file can be selected again
      const input = document.getElementById(
        "file-upload"
      ) as HTMLInputElement | null;
      if (input) input.value = "";
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || "Upload failed");
    } finally {
      setUploading(false);
      setLoad(false);
    }
  };

  return (
    <div>
      <form
        className="flex flex-col items-center justify-center h-full p-8"
        onSubmit={(e) => e.preventDefault()}
      >
        <div
          className={`relative w-full max-w-2xl h-80 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all duration-300 `}
        >
          <input
            type="file"
            id="file-upload"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={onFileChange}
          />
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />

            <p className="mt-5 text-lg font-medium text-white">
              <span className="text-indigo-400">Click to select</span> or drag
              and drop
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Any file type. Max 50MB.
            </p>

            {file && (
              <p className="mt-3 text-sm text-gray-200">
                Selected: {file.name}
              </p>
            )}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={uploadFile}
            disabled={!file || uploading}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>

        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
        {success && <p className="mt-2 text-sm text-green-400">{success}</p>}
      </form>
    </div>
  );
};

export default FileUploader;
