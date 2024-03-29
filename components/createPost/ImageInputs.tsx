"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";

const ImageInputs = () => {
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
      {preview && (
        <Image
          width={1000}
          height={1000}
          src={preview}
          alt="Selected image by the use"
          className="rounded-xl"
        />
      )}
      <input
        ref={imageInputRef}
        onChange={handleImageChange}
        type="file"
        name="image"
        accept="image/png, image/jpeg"
        hidden
      />
      <button type="button" className="btn" onClick={() => imageInputRef.current?.click()}>
        Choose an image
      </button>
    </>
  );
};

export default ImageInputs;
