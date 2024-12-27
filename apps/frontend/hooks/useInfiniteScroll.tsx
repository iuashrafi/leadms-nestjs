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
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 border-[3px] border-red-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </>
  );
};
