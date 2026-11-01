import { useState, useEffect, useCallback } from "react";

interface SpamProtectionResult {
  honeypotProps: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    autoComplete: string;
    tabIndex: number;
    "aria-hidden": boolean;
  };
  HoneypotField: React.FC;
  isSpam: () => boolean;
  formLoadTime: number;
}

const MIN_SUBMIT_TIME_MS = 3000; // Minimum 3 seconds before form can be submitted

export const useSpamProtection = (): SpamProtectionResult => {
  const [honeypotValue, setHoneypotValue] = useState("");
  const [formLoadTime] = useState(() => Date.now());

  const isSpam = useCallback(() => {
    // Check 1: Honeypot field should be empty (bots often fill all fields)
    if (honeypotValue.length > 0) {
      console.warn("Spam detected: Honeypot field was filled");
      return true;
    }

    // Check 2: Form should not be submitted too quickly (bots are fast)
    const timeSinceLoad = Date.now() - formLoadTime;
    if (timeSinceLoad < MIN_SUBMIT_TIME_MS) {
      console.warn("Spam detected: Form submitted too quickly", timeSinceLoad);
      return true;
    }

    return false;
  }, [honeypotValue, formLoadTime]);

  const honeypotProps = {
    value: honeypotValue,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setHoneypotValue(e.target.value),
    name: "website_url", // Common field name that bots target
    autoComplete: "off",
    tabIndex: -1,
    "aria-hidden": true as const,
  };

  // Hidden honeypot field component
  const HoneypotField: React.FC = () => (
    <div 
      style={{ 
        position: "absolute", 
        left: "-9999px", 
        top: "-9999px",
        opacity: 0,
        height: 0,
        overflow: "hidden",
        pointerEvents: "none"
      }}
      aria-hidden="true"
    >
      <label htmlFor="website_url">
        Website (leave empty)
        <input
          type="text"
          id="website_url"
          {...honeypotProps}
        />
      </label>
    </div>
  );

  return {
    honeypotProps,
    HoneypotField,
    isSpam,
    formLoadTime,
  };
};

export default useSpamProtection;
