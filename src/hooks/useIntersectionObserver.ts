import React, { MutableRefObject, useCallback } from "react";

type Args = IntersectionObserverInit & {
  root?: MutableRefObject<IntersectionObserverInit["root"] | null>;
  target: MutableRefObject<IntersectionObserverEntry["target"] | null>;
  onIntersect?: () => void;
  enabled?: boolean;
}

function useIntersectionObserver(props: Args): void {
  const {
    root,
    target,
    onIntersect,
    threshold = 1.0,
    rootMargin = "0px",
    enabled = true
  } = props;

  const entries = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) =>  entry.isIntersecting && onIntersect?.());
  }, [ onIntersect ]);

  React.useEffect(() => {
    if (!enabled)
      return;

    const observerOptions = {
      root: root?.current,
      rootMargin,
      threshold
    };

    const observer = new IntersectionObserver(entries, observerOptions);

    const element = target?.current;

    if (!element)
      return;

    observer.observe(element);

    return () => observer.unobserve(element);
  }, [
    root,
    target,
    entries,
    threshold,
    rootMargin,
    enabled
  ]);
}

export default useIntersectionObserver;

