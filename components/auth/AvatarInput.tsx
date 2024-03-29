"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { FaUserPlus } from "react-icons/fa6";

const AvatarInput = () => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const file = event.target.files[0];

    if (!file) {
      return setPreview(null);
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPreview(fileReader.result as string);
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <>
      <div className="avatar hover:cursor-pointer" onClick={() => imageInputRef.current?.click()}>
        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mx-auto">
          {!preview ? (
            <FaUserPlus className="w-full text-5xl mt-5 mx-1" />
          ) : (
            <img src={preview} alt="The image selected by the user." />
          )}
        </div>
      </div>
      <input
        ref={imageInputRef}
        onChange={handleImageChange}
        type="file"
        name="image"
        accept="image/png, image/jpeg"
        hidden
      />
    </>
  );
};

export default AvatarInput;
