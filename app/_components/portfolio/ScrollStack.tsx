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
    const stackCompletedRef = useRef(false);
    const animationFrameRef = useRef<number>();
    const cardsRef = useRef<HTMLElement[]>([]);
    const lastTransformsRef = useRef<Map<number, CardTransform>>(new Map());
    const isUpdatingRef = useRef(false);

    const isAtEnd = useCallback(() => {
      const scroller = scrollerRef.current;
      if (!scroller) return false;
      const maxScroll = scroller.scrollHeight - scroller.clientHeight;
      return scroller.scrollTop >= maxScroll - 4;
    }, []);

    useImperativeHandle(ref, () => ({
      get scroller() {
        return scrollerRef.current;
      },
      isAtEnd,
    }));

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

    const updateCardTransforms = useCallback(() => {
      const scroller = scrollerRef.current;
      if (!scroller || !cardsRef.current.length || isUpdatingRef.current) return;

      isUpdatingRef.current = true;

      const scrollTop = scroller.scrollTop;
      const containerHeight = scroller.clientHeight;
      const stackPositionPx = parsePercentage(stackPosition, containerHeight);
      const scaleEndPositionPx = parsePercentage(
        scaleEndPosition,
        containerHeight,
      );

      const endElement = endRef.current;
      const endElementTop = endElement?.offsetTop ?? 0;

      cardsRef.current.forEach((card, i) => {
        const cardTop = card.offsetTop;
        const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
        const triggerEnd = cardTop - scaleEndPositionPx;
        const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
        const pinEnd = endElementTop - containerHeight / 2;

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
    ]);

    useLayoutEffect(() => {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      const cards = Array.from(
        scroller.querySelectorAll<HTMLElement>(".scroll-stack-card"),
      );

      cardsRef.current = cards;
      const transformsCache = lastTransformsRef.current;

      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          card.style.marginBottom = `${itemDistance}px`;
        }
        card.style.willChange = "transform, filter";
        card.style.transformOrigin = "top center";
        card.style.backfaceVisibility = "hidden";
        card.style.transform = "translateZ(0)";
      });

      const onScroll = () => updateCardTransforms();

      if (!frozen) {
        scroller.addEventListener("scroll", onScroll, { passive: true });
      }

      const tick = () => {
        updateCardTransforms();
        animationFrameRef.current = requestAnimationFrame(tick);
      };

      animationFrameRef.current = requestAnimationFrame(tick);
      updateCardTransforms();

      return () => {
        scroller.removeEventListener("scroll", onScroll);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        if (!frozen) {
          stackCompletedRef.current = false;
          cardsRef.current = [];
          transformsCache.clear();
        }
        isUpdatingRef.current = false;
      };
    }, [
      itemDistance,
      frozen,
      updateCardTransforms,
    ]);

    return (
      <div
        ref={scrollerRef}
        className={`scroll-stack-scroller ${frozen ? "scroll-stack-scroller--locked" : ""} ${className}`.trim()}
      >
        <div className="scroll-stack-inner">
          {children}
          <div ref={endRef} className="scroll-stack-end" aria-hidden="true" />
        </div>
      </div>
    );
  },
);

export default ScrollStack;
