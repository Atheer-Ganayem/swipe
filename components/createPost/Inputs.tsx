import React from "react";
import ImageInputs from "./ImageInputs";

const Inputs = () => {
  return (
    <>
      <label className="input input-bordered flex items-center gap-2">
        <input type="text" placeholder="Post title" name="title" className="w-full" />
      </label>
      <textarea
        className="textarea textarea-bordered"
        placeholder="Post description"
        name="description"
        rows={4}
      ></textarea>
      <ImageInputs />
    </>
  );
};

export default Inputs;
