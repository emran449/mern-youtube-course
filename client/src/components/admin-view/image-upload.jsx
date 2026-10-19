import { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { UploadCloudIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

const ProductImageUpload = ({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  imageLoadingState,
  isEditMode
}) => {
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      setImageFile(files[0]);
    }
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      "http://localhost:5000/api/admin/products/upload-image",
      data,
    );
    console.log(response, "response");
    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.url);
    }
    setImageLoadingState(false);
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary(imageFile);
  }, [imageFile]);

  return (
    <div className="w-full max-w-md mx-auto">
      <Label className="text-lg font-semibold mb-2 block">
        Upload Product Image
      </Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${isEditMode ? 'opacity-60' : ''} border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-32 cursor-pointer"
          >
            <UploadCloudIcon className="w-8 h-8 mb-2 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Drag & drop or click to upload an image
            </span>
          </Label>
        ) : (
          imageLoadingState ?
          <Skeleton className='h-10 bg-gray-100'/>:
          <div className="mt-4">
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Preview"
              className="max-h-48 max-w-full rounded-lg border border-gray-300"
            />
            <p className="text-sm text-muted-foreground mt-2">
              {imageFile.name}
            </p>
            <Button>
              <span onClick={handleRemoveImage}>Remove</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;
