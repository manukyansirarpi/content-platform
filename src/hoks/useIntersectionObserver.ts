import { useEffect, useRef } from "react";

interface Options {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

const useIntersectionObserver = (
  callback: () => void,
  options?: Options,
  loading: boolean = false
) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (loading) return; // Don't create a new observer if we're already loading

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          callback();
        }
      },
      {
        root: options?.root || null,
        rootMargin: options?.rootMargin || "0px",
        threshold: options?.threshold || 1.0,
      }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [callback, options, loading]);

  return targetRef;
};

export default useIntersectionObserver;
