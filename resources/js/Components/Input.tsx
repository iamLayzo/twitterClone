import React, { useState, useEffect, useRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  as?: "input" | "textarea";
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  as?: "input" | "textarea";
}

type CombinedProps = (InputProps | TextareaProps) & { className?: string };

export const Input: React.FC<CombinedProps> = ({ as = "textarea", className, ...props }) => {
  if (as === "input") {
    return (
      <input
        className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white ${className}`}
        {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
      />
    );
  }

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [height, setHeight] = useState("auto");

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      setHeight(textareaRef.current.style.height);
    }
  }, [props.value]);

  return (
    <textarea
      ref={textareaRef}
      className={`w-full px-4 py-2 border border-gray-300 rounded-md resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white ${className}`}
      style={{ height }}
      {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
    />
  );
};
