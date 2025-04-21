"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useLocale } from "next-intl";
import React, { JSX, useCallback, useEffect, useRef, useState } from "react";

type Card = {
  id: number;
  content: JSX.Element | React.ReactNode | string;
  className: string;
  thumbnail: string;
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null);
  const [lastSelected, setLastSelected] = useState<Card | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMounted = useRef(true);

  const locale = useLocale();

  const clearTimers = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const handleClick = useCallback(
    (card: Card) => {
      setLastSelected(selected);
      setSelected(card);
      clearTimers();
    },
    [selected, clearTimers],
  );

  const handleOutsideClick = useCallback(() => {
    setLastSelected(selected);
    setSelected(null);
  }, [selected]);

  useEffect(() => {
    if (cards.length === 0) return;

    isMounted.current = true;
    let index = 0;
    const ANIMATION_DURATION = 800;
    const CYCLE_INTERVAL = 4000;
    const INITIAL_DELAY = 1000;

    const cycleCards = () => {
      if (!isMounted.current) return;

      setSelected(null);

      timeoutRef.current = setTimeout(() => {
        if (!isMounted.current) return;

        const nextCard = cards[index];
        setLastSelected(selected);
        setSelected(nextCard);
        index = (index + 1) % cards.length;
      }, ANIMATION_DURATION);
    };

    timeoutRef.current = setTimeout(() => {
      if (!isMounted.current) return;

      cycleCards();
      intervalRef.current = setInterval(cycleCards, CYCLE_INTERVAL);
    }, INITIAL_DELAY);

    return () => {
      isMounted.current = false;
      clearTimers();
    };
  }, [cards, clearTimers]);

  const getCardZIndex = useCallback(
    (card: Card, index: number) => {
      if (selected?.id === card.id) return 50;
      if (lastSelected?.id === card.id) return 45;

      // Create a consistent stacking order based on position
      return index <= 4 ? 30 - index : 30 + index;
    },
    [selected, lastSelected],
  );

  return (
    <div
      className={cn(
        "relative -top-12 mx-auto grid h-[110vh] w-full max-w-7xl grid-cols-1 gap-2 md:grid-cols-3",
        locale === "ar" ? "-left-4" : "left-4",
      )}
    >
      {cards.map((card, i) => (
        <div key={card.id} className={cn(card.className, "")}>
          <motion.div
            onClick={() => handleClick(card)}
            className={cn(
              card.className,
              "relative overflow-hidden",
              selected?.id === card.id
                ? "absolute inset-0 z-50 m-auto flex h-1/2 w-full cursor-pointer flex-col flex-wrap items-center justify-center rounded-lg md:w-1/2"
                : lastSelected?.id === card.id
                  ? "z-40 h-full w-full rounded-xl bg-white"
                  : "h-full w-full rounded-xl bg-white",
            )}
            style={{
              zIndex: getCardZIndex(card, i),
            }}
            layoutId={`card-${card.id}`}
            role="button"
            tabIndex={0}
            aria-expanded={selected?.id === card.id}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleClick(card);
              }
            }}
            animate={{
              scale: selected?.id === card.id ? 1.05 : 1,
              boxShadow: selected?.id === card.id
                ? "0 8px 32px rgba(0,0,0,0.25)"
                : "0 2px 8px rgba(0,0,0,0.08)",
            }}
            transition={{
              layout: {
                duration: selected?.id === card.id ? 0.6 : 2.5,
                ease: [0.16, 1, 0.3, 1],
                type: "spring",
                stiffness: selected?.id === card.id ? 100 : 60,
                damping: selected?.id === card.id ? 20 : 30,
                restDelta: 0.001,
              },
              scale: { type: "spring", stiffness: 200, damping: 20 },
              boxShadow: { duration: 0.3 },
            }}
          >
            {selected?.id === card.id && <SelectedCard selected={selected} />}
            <ImageComponent
              card={card}
              selected={selected?.id === card.id}
              lastSelected={lastSelected?.id === card.id}
            />
          </motion.div>
        </div>
      ))}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "absolute top-0 left-0 z-10 h-full w-full bg-black opacity-0",
          selected?.id ? "pointer-events-auto" : "pointer-events-none",
        )}
        animate={{ opacity: selected?.id ? 0.3 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

const ImageComponent = ({
  card,
  selected,
}: {
  card: Card;
  selected?: boolean;
  lastSelected?: boolean;
}) => {
  return (
    <motion.img
      layoutId={`image-${card.id}-image`}
      src={card.thumbnail}
      height="500"
      width="500"
      className={cn(
        "absolute inset-0 h-full w-full object-cover object-top transition duration-200",
      )}
      alt={`Card ${card.id} thumbnail`}
      transition={{
        layout: {
          duration: selected ? 0.6 : 2.5,
          ease: [0.16, 1, 0.3, 1], // Matching ease curve
          type: "spring",
          stiffness: selected ? 100 : 60,
          damping: selected ? 20 : 30,
          restDelta: 0.001,
        },
      }}
    />
  );
};

const SelectedCard = ({ selected }: { selected: Card | null }) => {
  return (
    <div className="relative z-[60] flex h-full w-full flex-col justify-end rounded-lg bg-transparent shadow-2xl">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.6,
        }}
        className="absolute inset-0 z-10 h-full w-full bg-black opacity-60"
      />
      <motion.div
        layoutId={`content-${selected?.id}`}
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: 100,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="relative z-[70] px-8 pb-4"
      >
        {selected?.content}
      </motion.div>
    </div>
  );
};
