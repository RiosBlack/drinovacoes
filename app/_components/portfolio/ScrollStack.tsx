"use client";

import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import "./ScrollStack.css";

export type ScrollStackHandle = {
  scroller: HTMLDivElement | null;
  isAtEnd: () => boolean;
  getMaxScroll: () => number;
};

type ScrollStackProps = {
  children: ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  rotationAmount?: number;
  blurAmount?: number;
  frozen?: boolean;
  onStackEnd?: () => void;
};

type CardTransform = {
  translateY: number;
  scale: number;
  rotation: number;
  blur: number;
};

export function ScrollStackItem({
  children,
  itemClassName = "",
}: {
  children: ReactNode;
  itemClassName?: string;
}) {
  return (
    <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
  );
}

const ScrollStack = forwardRef<ScrollStackHandle, ScrollStackProps>(
  function ScrollStack(
    {
      children,
      className = "",
      itemDistance = 100,
      itemScale = 0.03,
      itemStackDistance = 30,
      stackPosition = "20%",
      scaleEndPosition = "10%",
      baseScale = 0.85,
      rotationAmount = 0,
      blurAmount = 0,
      frozen = false,
      onStackEnd,
    },
    ref,
  ) {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const endRef = useRef<HTMLDivElement>(null);
    const frozenRef = useRef(frozen);
    const stackCompletedRef = useRef(false);
    const animationFrameRef = useRef<number>();
    const cardsRef = useRef<HTMLElement[]>([]);
    const lastTransformsRef = useRef<Map<number, CardTransform>>(new Map());
    const isUpdatingRef = useRef(false);

    frozenRef.current = frozen;

    const stackCompleteScrollRef = useRef(0);

    const calculateProgress = useCallback(
      (scrollTop: number, start: number, end: number) => {
        if (scrollTop < start) return 0;
        if (scrollTop > end) return 1;
        return (scrollTop - start) / (end - start);
      },
      [],
    );

    const parsePercentage = useCallback(
      (value: string | number, containerHeight: number) => {
        if (typeof value === "string" && value.includes("%")) {
          return (parseFloat(value) / 100) * containerHeight;
        }
        return parseFloat(String(value));
      },
      [],
    );

    const getStackCompleteScrollTop = useCallback(() => {
      const cards = cardsRef.current;
      const scroller = scrollerRef.current;
      if (!cards.length || !scroller) return 0;

      const containerHeight = scroller.clientHeight;
      if (containerHeight === 0) return 0;

      const lastIndex = cards.length - 1;
      const lastCardTop = cards[lastIndex].offsetTop;
      const scaleEndPositionPx = parsePercentage(
        scaleEndPosition,
        containerHeight,
      );

      return Math.max(0, lastCardTop - scaleEndPositionPx);
    }, [parsePercentage, scaleEndPosition]);

    const isAtEnd = useCallback(() => {
      const scroller = scrollerRef.current;
      if (!scroller) return false;

      const maxNativeScroll = Math.max(
        0,
        scroller.scrollHeight - scroller.clientHeight,
      );
      const targetScroll = Math.min(
        stackCompleteScrollRef.current,
        maxNativeScroll,
      );

      return scroller.scrollTop >= targetScroll - 4;
    }, []);

    const getMaxScroll = useCallback(
      () => stackCompleteScrollRef.current,
      [],
    );

    useImperativeHandle(ref, () => ({
      get scroller() {
        return scrollerRef.current;
      },
      isAtEnd,
      getMaxScroll,
    }));

    const updateCardTransforms = useCallback(() => {
      const scroller = scrollerRef.current;
      if (!scroller || !cardsRef.current.length || isUpdatingRef.current) return;

      const containerHeight = scroller.clientHeight;
      if (containerHeight === 0) return;

      isUpdatingRef.current = true;

      const scrollTop = scroller.scrollTop;
      const stackPositionPx = parsePercentage(stackPosition, containerHeight);
      const scaleEndPositionPx = parsePercentage(
        scaleEndPosition,
        containerHeight,
      );

      const stackCompleteScrollTop = getStackCompleteScrollTop();
      stackCompleteScrollRef.current = stackCompleteScrollTop;

      const endEl = endRef.current;
      if (endEl && stackCompleteScrollTop > 0) {
        const inner = endEl.parentElement;
        if (inner) {
          const innerHeightWithoutEnd = inner.scrollHeight - endEl.offsetHeight;
          const minEndHeight = Math.max(
            1,
            stackCompleteScrollTop + containerHeight - innerHeightWithoutEnd,
          );

          if (endEl.offsetHeight < minEndHeight - 0.5) {
            endEl.style.height = `${minEndHeight}px`;
          }
        }
      }

      cardsRef.current.forEach((card, i) => {
        const cardTop = card.offsetTop;
        const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
        const triggerEnd = cardTop - scaleEndPositionPx;
        const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
        const pinEnd = stackCompleteScrollTop;

        const scaleProgress = calculateProgress(
          scrollTop,
          triggerStart,
          triggerEnd,
        );
        const targetScale = baseScale + i * itemScale;
        const scale = 1 - scaleProgress * (1 - targetScale);
        const rotation = rotationAmount
          ? i * rotationAmount * scaleProgress
          : 0;

        let blur = 0;
        if (blurAmount) {
          let topCardIndex = 0;
          for (let j = 0; j < cardsRef.current.length; j++) {
            const jCardTop = cardsRef.current[j].offsetTop;
            const jTriggerStart =
              jCardTop - stackPositionPx - itemStackDistance * j;
            if (scrollTop >= jTriggerStart) {
              topCardIndex = j;
            }
          }

          if (i < topCardIndex) {
            const depthInStack = topCardIndex - i;
            blur = Math.max(0, depthInStack * blurAmount);
          }
        }

        let translateY = 0;
        const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

        if (isPinned) {
          translateY =
            scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
        } else if (scrollTop > pinEnd) {
          translateY =
            pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
        }

        const newTransform: CardTransform = {
          translateY: Math.round(translateY * 100) / 100,
          scale: Math.round(scale * 1000) / 1000,
          rotation: Math.round(rotation * 100) / 100,
          blur: Math.round(blur * 100) / 100,
        };

        const lastTransform = lastTransformsRef.current.get(i);
        const hasChanged =
          !lastTransform ||
          Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
          Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
          Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
          Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

        if (hasChanged) {
          card.style.transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
          card.style.filter =
            newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : "";

          lastTransformsRef.current.set(i, newTransform);
        }
      });

      scroller.classList.add("is-initialized");

      if (!stackCompletedRef.current && isAtEnd()) {
        stackCompletedRef.current = true;
        onStackEnd?.();
      }

      isUpdatingRef.current = false;
    }, [
      itemScale,
      itemStackDistance,
      stackPosition,
      scaleEndPosition,
      baseScale,
      rotationAmount,
      blurAmount,
      onStackEnd,
      calculateProgress,
      parsePercentage,
      isAtEnd,
      getStackCompleteScrollTop,
    ]);

    const lockStackAtEnd = useCallback(() => {
      const scroller = scrollerRef.current;
      if (!scroller || !cardsRef.current.length) return;

      const endScrollTop = getStackCompleteScrollTop();
      stackCompleteScrollRef.current = endScrollTop;
      if (endScrollTop > 0) {
        scroller.scrollTop = endScrollTop;
      }

      updateCardTransforms();
    }, [updateCardTransforms, getStackCompleteScrollTop]);

    useLayoutEffect(() => {
      if (!frozen) return;
      lockStackAtEnd();
    }, [frozen, lockStackAtEnd]);

    useLayoutEffect(() => {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      const cards = Array.from(
        scroller.querySelectorAll<HTMLElement>(".scroll-stack-card"),
      );

      cardsRef.current = cards;
      const transformsCache = lastTransformsRef.current;

      scroller.style.setProperty("--stack-item-distance", `${itemDistance}px`);

      cards.forEach((card) => {
        card.style.willChange = "transform, filter";
        card.style.transformOrigin = "top center";
        card.style.backfaceVisibility = "hidden";
      });

      const onScroll = () => {
        if (!frozenRef.current) {
          updateCardTransforms();
        }
      };

      scroller.addEventListener("scroll", onScroll, { passive: true });

      const resizeObserver = new ResizeObserver(() => {
        if (frozenRef.current) {
          lockStackAtEnd();
          return;
        }
        updateCardTransforms();
      });
      resizeObserver.observe(scroller);

      const tick = () => {
        if (!frozenRef.current) {
          updateCardTransforms();
        }
        animationFrameRef.current = requestAnimationFrame(tick);
      };

      animationFrameRef.current = requestAnimationFrame(tick);
      updateCardTransforms();

      return () => {
        scroller.removeEventListener("scroll", onScroll);
        resizeObserver.disconnect();
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        if (!frozenRef.current) {
          scroller.classList.remove("is-initialized");
          stackCompletedRef.current = false;
          cardsRef.current = [];
          transformsCache.clear();
        }
        isUpdatingRef.current = false;
      };
    }, [
      itemDistance,
      updateCardTransforms,
      lockStackAtEnd,
    ]);

    return (
      <div
        ref={scrollerRef}
        className={`scroll-stack-scroller ${frozen ? "scroll-stack-scroller--locked" : ""} ${className}`.trim()}
        style={
          {
            "--stack-position-pct": parseFloat(String(stackPosition)),
            "--stack-base-scale": baseScale,
          } as React.CSSProperties
        }
      >
        <div
          className="scroll-stack-inner"
          style={
            { "--stack-item-distance": `${itemDistance}px` } as React.CSSProperties
          }
        >
          {children}
          <div ref={endRef} className="scroll-stack-end" aria-hidden="true" />
        </div>
      </div>
    );
  },
);

export default ScrollStack;
