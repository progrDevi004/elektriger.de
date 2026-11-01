import { useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";

export const useCountUp = (end: number, duration: number = 2000, suffix: string = "") => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isInView || hasAnimated) return;
    
    setHasAnimated(true);
    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (end - startValue) * easeOutQuart);
      
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration, hasAnimated]);

  return { count, ref, suffix };
};

export const parseStatValue = (value: string): { number: number; suffix: string; prefix: string } => {
  const match = value.match(/^([^\d]*)(\d+)(.*)$/);
  if (match) {
    return {
      prefix: match[1] || "",
      number: parseInt(match[2], 10),
      suffix: match[3] || ""
    };
  }
  return { prefix: "", number: 0, suffix: value };
};
