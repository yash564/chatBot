import React from "react";
import "./Messages.css";


const Messages = ({ user, message, property, question, info, answer }) => {
  if (user) {
    return (
      <>
        <div className={`message-container ${property}`}>{message}</div>
        <>
          {question ? (
            <div className={`message-container left`}>
              <div style={{ marginBottom: "10px" }}>{question.ques}</div>
              <div className="options">
                {question.options.map((option, i) => {
                  return <button key={i}>{option}</button>;
                })}
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
      </>
    );
  } else {
    return (
      <>
        <div className="message-container right">{message}</div>
        {info.length > 0 ? (
          <div className={`message-container ${property}`}>{info}</div>
        ) : (
          <>
            {answer==message?(
              <div className={`message-container left`}>Right Answer</div>
            ):(
              <div className={`message-container left`}>Wrong Answer</div>
            )}
          </>
        )}
      </>
    );
  }
};

export default Messages;
