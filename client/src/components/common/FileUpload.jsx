import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { convertFileToUrl } from "@/helper";

import { UploadCloud, X } from "lucide-react";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = ({ fieldChange, setFiles, mediaUrl }) => {
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  useEffect(() => {
    if (mediaUrl) {
      setFileUrl(mediaUrl);
    }
  }, [mediaUrl]);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      const url = convertFileToUrl(file);
      setFiles([file]);
      setFileUrl(url);

      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUNDINARY_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        fieldChange(data.secure_url);
      } catch (error) {
        console.error("Upload to Cloudinary failed:", error);
      }
    },
    [fieldChange, setFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
  });

  const removeImage = () => {
    setFileUrl(null);
    setFiles([]);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-0 max-h-[80px] h-full overflow-hidden">
        <div
          {...getRootProps()}
          className={`p-4 border-2 border-dashed rounded-lg text-center cursor-pointer relative`}
        >
          <input {...getInputProps()} />
          {!fileUrl ? (
            <>
              <UploadCloud className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg">
                Drag &apos;n&apos; drop images here, or click to select files
              </p>
              <Button type="button" className="mt-4" variant="outline">
                Select Files
              </Button>
            </>
          ) : (
            <div className="relative">
              <img
                src={fileUrl}
                alt="avatar-user"
                className="object-cover w-full h-full rounded-lg"
                loading="lazy"
              />
              <X
                onClick={removeImage}
                className="absolute p-1 text-white bg-black rounded-full cursor-pointer top-2 right-2"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUpload;

FileUpload.propTypes = {
  mediaUrl: PropTypes.any,
  fieldChange: PropTypes.any,
  setFiles: PropTypes.func.isRequired,
};
