"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { XIcon } from "lucide-react";
import { useState } from "react";

interface ImageUploadProps {
  onChange: (url: string) => void;
  value: string;
  endpoint: "postImage";
}

function ImageUpload({ endpoint, onChange, value }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  if (value) {
    return (
      <div className="relative size-40 group">
        <img src={value} alt="Upload" className="rounded-md size-20 object-cover border border-muted shadow" />
        <button
          onClick={() => onChange("")}
          className="absolute top-1 right-1 p-1 bg-destructive text-white rounded-full shadow-md opacity-80 hover:opacity-100 transition-opacity"
          type="button"
          aria-label="Remove image"
        >
          <XIcon className="h-4 w-4" />
        </button>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-2">
      <UploadDropzone
        endpoint={endpoint}
        className="w-full max-w-xs border-2 border-dashed border-muted rounded-lg p-6 bg-background hover:bg-muted/50 transition-colors flex flex-col items-center justify-center cursor-pointer"
        onUploadBegin={() => {
          setUploading(true);
          setError("");
          console.log("Upload started");
        }}
        onClientUploadComplete={(res) => {
          setUploading(false);
          setError("");
          console.log("Upload complete response:", res);
          if (!res || !res[0] || !res[0].url) {
            setError("Upload completed but no file URL returned.");
            return;
          }
          onChange(res[0].url);
        }}
        onUploadError={(error: Error) => {
          setUploading(false);
          setError(error.message || "Upload failed");
          console.error("Upload error:", error);
        }}
      />
      {uploading && <span className="text-xs text-muted-foreground animate-pulse">Uploading...</span>}
      {error && (
        <span className="text-xs text-destructive">
          {error}
          <br />
          <span className="font-mono text-xs">Check the browser console for more details.</span>
        </span>
      )}
    </div>
  );
}
export default ImageUpload;
