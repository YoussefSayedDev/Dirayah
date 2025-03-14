"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
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

  const handleClick = useCallback(
    (card: Card) => {
      setLastSelected(selected);
      setSelected(card);

      // Clear any existing timers when user interacts
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    },
    [selected],
  );

  const handleOutsideClick = useCallback(() => {
    setLastSelected(selected);
    setSelected(null);
  }, [selected]);

  useEffect(() => {
    if (cards.length === 0) return;
    isMounted.current = true;

    let index = 0;

    const cycleCards = () => {
      if (!isMounted.current) return;

      setSelected(null); // Start fade out

      timeoutRef.current = setTimeout(() => {
        if (!isMounted.current) return;

        const nextCard = cards[index];
        setLastSelected(selected);
        setSelected(nextCard);
        index = (index + 1) % cards.length;
      }, 800);
    };

    timeoutRef.current = setTimeout(() => {
      if (!isMounted.current) return;

      cycleCards();
      intervalRef.current = setInterval(cycleCards, 4000);
    }, 1000);

    return () => {
      isMounted.current = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [cards]);

  return (
    <div className="relative -top-12 left-4 mx-auto grid h-[110vh] w-full max-w-7xl grid-cols-1 gap-2 md:grid-cols-3">
      {cards.map((card, i) => (
        <div key={i} className={cn(card.className, "")}>
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
              // Add a fixed position in the stack for consistent layering
              zIndex:
                selected?.id === card.id
                  ? 50
                  : lastSelected?.id === card.id
                    ? 45
                    : i <= 4
                      ? 30 - i
                      : 30 + i, // Use index to ensure consistent stacking order
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
            transition={{
              layout: { duration: 0.6, ease: "easeInOut" },
            }}
          >
            {selected?.id === card.id && <SelectedCard selected={selected} />}
            <ImageComponent card={card} />
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

const ImageComponent = ({ card }: { card: Card }) => {
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
        layout: { duration: 0.6, ease: "easeInOut" },
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
