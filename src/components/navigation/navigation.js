import Button from "components/button/button";
import React, { useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Context } from "store";
import "./navigation.scss";

const Navigation = () => {
  const [showFeedBackForm, setShowFeedBackForm] = useState(false);
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

      {/* <div
        className="feedback-wrapper"
        style={{
          right: state.isSidebarOpen
            ? "calc(var(--sidebar-width) + 20px)"
            : 120,
        }}
      >
        <Button
          className="feedback-wrapper__button"
          isSmall={true}
          text="Feedback"
          icon={"ri-hand-heart-fill"}
          onClick={() => setShowFeedBackForm(!showFeedBackForm)}
        />

        {showFeedBackForm && (
          <div className="feedback__form">
            <label>FeedBack</label>
            <textarea autoFocus placeholder="Your feedback..."></textarea>
            <button type="button">Send</button>
          </div>
        )}
      </div> */}
    </nav>
  );
};

export default Navigation;
