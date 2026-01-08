"use client";

import Button from "@/components/button/button";
import { useEffect, useContext, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Context } from "@/store";
import toast from "react-hot-toast";

const Navigation = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showFeedBackForm, setShowFeedBackForm] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [state, dispatch] = useContext(Context);
  const isMobile = useMediaQuery("(max-width: 480px)");

  const onSidebarToggleButtonClick = () => {
    dispatch({
      type: "SET_SIDEBAR_VISIBILITY",
      payload: !state.isSidebarOpen,
    });
  };

  const toggleButtonText = state.isSidebarOpen ? "Close Code" : "Get Code";

  const submitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const resData = await response.json();

      if (resData.status === "success") {
        setMessage("");
        toast.success("Thanks, Feedback received.");
      } else {
        toast.error("Something went wrong. Will fix soon.");
      }
    } catch {
      toast.error("Something went wrong. Will fix soon.");
    }

    setSending(false);
    setShowFeedBackForm(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowFeedBackForm(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const navClasses = state.isSidebarOpen ? "fixed" : "";

  return (
    <nav className={`${navClasses} top-5 right-5 z-50 flex items-center gap-2`}>
      <Button
        isHover={false}
        isSmall={true}
        isPin={true}
        icon="ri-code-line"
        text={toggleButtonText}
        onClick={onSidebarToggleButtonClick}
      />

      {isMobile && showFeedBackForm && (
        <span className="fixed inset-0 bg-black/50 z-40"></span>
      )}

      <div
        className="fixed top-5 z-50"
        style={{
          right: state.isSidebarOpen ? "calc(320px + 20px)" : "120px",
        }}
      >
        <div ref={dropdownRef}>
          <Button
            isSmall={true}
            text="Feedback"
            icon="ri-send-plane-fill"
            onClick={() => setShowFeedBackForm(!showFeedBackForm)}
            style={{
              display: isMobile && state.isSidebarOpen ? "none" : "inline-flex",
            }}
          />

          {showFeedBackForm && (
            <div className="absolute top-full mt-2 right-0 w-72 p-4 bg-white rounded-xl shadow-2xl z-50">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Feature requests, bugs, or Just say anything.
              </label>
              <textarea
                onChange={(e) => setMessage(e.target.value)}
                autoFocus
                placeholder="Your feedback..."
                value={message}
                className="w-full h-24 p-3 text-sm border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#0d51ff]/20 focus:border-[#0d51ff]"
              />

              <Button
                text={sending ? "Sending..." : "Send Feedback"}
                icon="ri-send-plane-fill"
                onClick={submitFeedback}
                disabled={sending || !message || message.length < 1}
                className="mt-2 w-full"
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
