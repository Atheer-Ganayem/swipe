"use client";

import React from "react";
import Inputs from "./Inputs";
import { useFormState } from "react-dom";
import { createPost } from "@/libs/actions/createPost";
import SubmitBtn from "../auth/SubmitBtn";
import ErrorAlert from "../auth/ErrorAlert";

const Modal = () => {
  const [state, formAction] = useFormState(createPost, { message: "", error: false });

  if (!state) {
    closeModal();
  }

  function closeModal() {
    (document.getElementById("my_modal_1") as HTMLDialogElement)!.close();
  }

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
          Create A new Post
        </h3>
        <div className="modal-action">
          <form className="w-full flex flex-col gap-4" action={formAction}>
            <Inputs />
            {state?.error && <ErrorAlert message={state.message} />}
            <div className="flex gap-4 justify-end">
              <SubmitBtn text="Create Post" />
              <button className="btn btn-neutral" type="button" onClick={closeModal}>
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
