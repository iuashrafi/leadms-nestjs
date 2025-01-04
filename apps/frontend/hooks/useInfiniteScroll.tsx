import { LoaderCircle } from "lucide-react";
import { useEffect, useRef } from "react";

export const useInfiniteScroll = (
  loading: boolean,
  onListLoadMore: boolean,
  onLoadMore: () => any,
  triggerObserver: boolean = false
) => {
  const observerRef = useRef(null);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    function init() {
      const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      };

      observer = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !loading && onListLoadMore) {
          onLoadMore();
        }
      }, observerOptions);

      if (observerRef.current && observer) {
        observer.observe(observerRef.current);
      }
    }

    setTimeout(() => {
      init();
    }, 0);

    return () => {
      if (observerRef.current && observer) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loading, onLoadMore, triggerObserver]);

  return (
    <>
      <div ref={observerRef} />
      {loading && (
        <div className="pt-4 w-full flex items-center justify-center">
          <LoaderCircle className="animate-spin" size={30} />
        </div>
      )}
    </>
  );
};
