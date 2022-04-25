import React from "react";

const ModalWindow = ({ handler, settings }) => {
  return (
    <>
      <div>
        <div className="modal-window">
          <div className="modal-text">
            <p>{settings.message}</p>
          </div>
          <div className="modal-button ">
            <button
              className={`medium-width ${settings.buttonStyle}`}
              onClick={() => handler(false)}
            >
              {settings.buttonText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalWindow;
