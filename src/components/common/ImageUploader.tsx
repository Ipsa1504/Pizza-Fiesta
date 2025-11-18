import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { Button, Input } from "@nextui-org/react";

interface ImageUploaderProps {
  setImageLink: (imageLink: string) => void;
  children?: React.ReactNode
}

const ImageUploader = ({ setImageLink, children }: ImageUploaderProps) => {
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  function handleUrlSubmit() {
    if (imageUrl.trim()) {
      // Validate URL
      try {
        new URL(imageUrl);
        setImageLink(imageUrl.trim());
        setImageUrl('');
        setShowUrlInput(false);
        toast.success("Image URL set successfully");
      } catch (error) {
        toast.error("Please enter a valid URL");
      }
    }
  }

  return (
    <div>
      {!showUrlInput ? (
        <>
          <label className="cursor-pointer">
            {children && children}
          </label>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowUrlInput(true);
            }}
            className="mt-2 text-sm text-blue-400 hover:text-blue-300 underline block w-full"
          >
            Or paste image URL
          </button>
        </>
      ) : (
        <div className="mt-2 flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
          <Input
            type="url"
            placeholder="Paste image URL here (e.g., https://example.com/image.jpg)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            size="sm"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleUrlSubmit();
              }
            }}
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              color="primary"
              onPress={handleUrlSubmit}
              className="flex-1"
            >
              Use URL
            </Button>
            <Button
              size="sm"
              variant="flat"
              onPress={() => {
                setShowUrlInput(false);
                setImageUrl('');
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageUploader