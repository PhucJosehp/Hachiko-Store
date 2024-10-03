import React from "react";

export default function CancleDialog({
  isOpen,
  handleOpen,
  handleComfirm,
  title,
  body,
}) {
  return (
    isOpen && (
      <div className="bg-[#9fa3ab80] h-screen w-full absolute top-0 left-0 flex justify-center items-center">
        <div className="bg-white w-[410px] h-64 rounded-xl flex flex-col justify-between py-2 px-4">
          <div className="h-12 flex items-center font-medium text-xl text-[--secondary] ">
            {title}
          </div>
          <div className="flex grow-1 min-h-36 text-[--secondary]">{body}</div>
          <div className="h-14 flex justify-between">
            <button
              onClick={handleComfirm}
              className="text-center btn btn-sm w-40 text-lg font-medium border bg-[--primary] rounded-ms text-[--secondary] hover:text-[--secondary] hover:bg-[--hover-primary] border-[--hover-primary]"
            >
              Có
            </button>
            <button
              onClick={handleOpen}
              className="btn btn-sm w-40 text-lg font-medium border bg-white rounded-ms text-gray-500 hover:text-[--secondary] hover:bg-[#9fa3ab80] border-[#9fa3ab80]"
            >
              Không
            </button>
          </div>
        </div>
      </div>
    )
  );
}
