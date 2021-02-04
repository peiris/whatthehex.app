import Button from "components/button/button";
import React, { useEffect, useContext, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Context } from "store";
import "./navigation.scss";
import { useToasts } from "react-toast-notifications";

const Navigation = () => {
  const { addToast } = useToasts();
  const dropdownRef = useRef(null);
  const dropdownButtonRef = useRef(null);
  const [showFeedBackForm, setShowFeedBackForm] = useState(false);
  const [message, setMessage] = useState();
  const [sending, setSending] = useState(false);
  const [state, dispatch] = useContext(Context);
  const isMobile = useMediaQuery({
    query: "(max-width: 480px)",
  });

  const onSidebarToggleButtonClick = () => {
    dispatch({ type: "SET_SIDEBAR_VISIBILITY", payload: !state.isSidebarOpen });
  };

  let classNames = `navigation`;
  if (isMobile) {
    classNames += ` is-mobile`;
  }
  if (state.isSidebarOpen) {
    classNames += ` is-fixed`;
  }

  let toggleButtonText = `Get Code`;
  if (state.isSidebarOpen) {
    toggleButtonText = `Close Code`;
  }

  const submitFeedback = async (e) => {
    e.preventDefault();
    setSending(true);

    const response = await fetch("https://whatthehex.app/api/access", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const resData = await response.json();

    if (resData.status === "success") {
      setMessage("");
      addToast(`😍 Thanks, Feedback received.`, {
        appearance: "info",
        autoDismiss: true,
      });
    } else if (resData.status === "fail") {
      addToast(`Something went wrong dude, Probably a bug. Will fix soon.`, {
        appearance: "info",
        autoDismiss: true,
      });
    }

    setSending(false);
    setShowFeedBackForm(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowFeedBackForm(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className={classNames}>
      <Button
        className="sidebar__toggle"
        isHover={false}
        isSmall={true}
        isPin={true}
        icon={"ri-code-line"}
        text={toggleButtonText}
        onClick={(e) => onSidebarToggleButtonClick()}
      />

      {isMobile && showFeedBackForm && (
        <span className="feedback__backdrop"></span>
      )}

      <div
        className="feedback-wrapper"
        style={{
          right: state.isSidebarOpen
            ? "calc(var(--sidebar-width) + 20px)"
            : 120,
        }}
      >
        <div ref={dropdownRef}>
          <Button
            className="feedback-wrapper__button"
            isSmall={true}
            text="Feedback"
            icon={"ri-send-plane-fill"}
            onClick={() => setShowFeedBackForm(!showFeedBackForm)}
            ref={dropdownButtonRef}
            style={{
              display: isMobile && state.isSidebarOpen ? "none" : "inline-flex",
            }}
          />

          {showFeedBackForm && (
            <div className="feedback__form">
              <label>Feature requests, bugs, or Just say anything...</label>
              <textarea
                onChange={(e) => setMessage(e.target.value)}
                autoFocus
                placeholder="Your feedback..."
                value={message}
              />

              <Button
                text={sending ? "Sending..." : "Send Feedback"}
                icon={"ri-send-plane-fill"}
                onClick={submitFeedback}
                disabled={sending || !message || message.length < 1}
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
