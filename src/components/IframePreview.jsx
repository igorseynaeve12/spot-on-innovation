import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // belangrijk voor toegankelijkheid

export default function IframePreview({ url }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="cursor-pointer w-64 h-36 border overflow-hidden"
      >
        <iframe src={url} className="w-full h-full" />
      </div>

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className="bg-white w-11/12 h-5/6 mx-auto my-10 rounded-xl overflow-hidden"
        overlayClassName="fixed inset-0 bg-black/70 flex justify-center items-center"
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-50 bg-black text-white px-3 py-1 rounded"
        >
          ✕
        </button>
        <iframe src={url} className="w-full h-full border-0" />
      </Modal>
    </>
  );
}
