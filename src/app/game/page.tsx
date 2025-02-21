"use client";

import React, { useState, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import Card from "@/app/_components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

type CardProps = {
  x: number;
  y: number;
  text: string;
  year: number;
  fixed: boolean;
  fixedPosition: number;
};

const Playground: React.FC = () => {
  const [windowCenterX, setWindowCenterX] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth / 2 : 0
  );
  const [windowCenterY, setWindowCenterY] = useState(() =>
    typeof window !== "undefined" ? window.innerHeight / 2 : 0
  );

  const cardWidth = 100;
  const cardHeight = 140;
  const areaWidth = cardWidth * 7;
  const areaHeight = cardHeight;

  const [cards, setCards] = useState<CardProps[]>([]);
  const [highlight, setHighlight] = useState<(boolean | null)[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch("/api/getCard");
        if (!response.ok) {
          throw new Error("Failed to fetch cards");
        }
        const data = await response.json();
        const initialCards = data.map((card: CardProps, index: number) => ({
          x: windowCenterX - 300 + 150 * index - cardWidth / 2,
          y: windowCenterY + 150,
          text: card.text,
          year: card.year,
          fixed: false,
          fixedPosition: -1,
        }));
        setCards(initialCards);
      } catch (error) {
        setFetchError(
          error instanceof Error
            ? error.message
            : "予期せぬエラーが発生しました"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCards();
  }, [windowCenterX, windowCenterY]);

  const moveCard = (
    fixed: boolean,
    index: number,
    x: number,
    y: number,
    fixedPosition: number
  ) => {
    const newCards = [...cards];
    newCards[index] = { ...newCards[index], x, y, fixed, fixedPosition };
    setCards(newCards);
  };

  const _setHighlight = (index: number, value: boolean | null) => {
    setHighlight((prev) => {
      const newHighlight = [...prev];
      newHighlight[index] = value;
      return newHighlight;
    });
  };

  const checkHighlight = (x: number, y: number) => {
    const areaLeftEdge = windowCenterX - areaWidth / 2;

    for (let index = 0; index < 7; index++) {
      const _areaX = cardWidth * index + areaLeftEdge;

      const isTouching =
        x + cardWidth / 2 > _areaX &&
        x + cardWidth / 2 < _areaX + cardWidth &&
        y + cardHeight / 2 < windowCenterY + cardHeight / 2 &&
        y + cardHeight / 2 > windowCenterY - cardHeight / 2;

      if (highlight[index] === null) continue;

      if (isTouching) {
        setHighlight((prev) => {
          const newHighlight = [...prev];
          newHighlight[index] = true;
          return newHighlight;
        });
      } else {
        setHighlight((prev) => {
          const newHighlight = [...prev];
          newHighlight[index] = false;
          return newHighlight;
        });
      }
    }
  };

  const fixAllCards = () => {
    const newCards = cards.map((card) => ({ ...card, fixed: true }));
    setCards(newCards);
    checkResult(newCards);
  };

  const checkResult = (cards: CardProps[]) => {
    const sortedCards = [...cards].sort(
      (a, b) => a.fixedPosition - b.fixedPosition
    );
    for (let i = 0; i < sortedCards.length - 1; i++) {
      if (sortedCards[i].year > sortedCards[i + 1].year) {
        setResult("誤答です");
        return;
      }
    }
    setResult("正解です");
  };

  if (isLoading) {
    return (
      <div className="text-gray-500">
        <FontAwesomeIcon icon={faSpinner} className="mr-1 animate-spin" />
        Loading...
      </div>
    );
  }

  if (fetchError) {
    return <div>{fetchError}</div>;
  }

  return (
    <div className="flex h-screen items-center justify-center text-center">
      <div>
        <div
          className={twMerge(
            `flex h-[140px] w-[700px] flex-row items-center justify-start bg-gray-200`
          )}
        >
          {cards.map((card, index) => (
            <Card
              key={index}
              x={card.x}
              y={card.y}
              text={card.text}
              fixed={card.fixed}
              fixedPosition={-1}
              mapList={[]}
              onMove={(x, y) => {
                moveCard(false, index, x, y, -1);
              }}
              onDrop={(x, y) => {
                [0, 1, 2, 3, 4, 5, 6].map((i) => {
                  if (highlight[i] === true) {
                    moveCard(
                      false,
                      index,
                      windowCenterX - areaWidth / 2 + cardWidth * i,
                      windowCenterY - areaHeight / 2,
                      i
                    );
                    _setHighlight(i, null);
                  }
                });
              }}
              onPlaceInMove={(x, y) => {
                checkHighlight(x, y);
              }}
            />
          ))}
          {highlight[0] && (
            <div
              className={`h-[140px] w-[100px] border-4 border-blue-500 bg-black`}
            ></div>
          )}
          {highlight[1] && (
            <div
              className={`ml-[100px] h-[140px] w-[100px] border-4 border-blue-500 bg-black`}
            ></div>
          )}
          {highlight[2] && (
            <div
              className={`ml-[200px] h-[140px] w-[100px] border-4 border-blue-500 bg-black`}
            ></div>
          )}
          {highlight[3] && (
            <div
              className={`ml-[300px] h-[140px] w-[100px] border-4 border-blue-500 bg-black`}
            ></div>
          )}
          {highlight[4] && (
            <div
              className={`ml-[400px] h-[140px] w-[100px] border-4 border-blue-500 bg-black`}
            ></div>
          )}
          {highlight[5] && (
            <div
              className={`ml-[500px] h-[140px] w-[100px] border-4 border-blue-500 bg-black`}
            ></div>
          )}
          {highlight[6] && (
            <div
              className={`ml-[600px] h-[140px] w-[100px] border-4 border-blue-500 bg-black`}
            ></div>
          )}
        </div>
        <div className=" flex justify-center">
          <button
            onClick={fixAllCards}
            className="absolute mt-4 rounded bg-blue-500 px-4 py-2 text-white"
          >
            すべて固定
          </button>
          {result && <div className="absolute mt-16 text-xl">{result}</div>}
        </div>
      </div>
    </div>
  );
};

export default Playground;
