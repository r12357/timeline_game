"use client";

import React, { useState, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import Card from "@/app/_components/Card";

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

  const initialCards = [
    // { x: 0, y: 0, text: "Initial Card", fixed: true },
    {
      x: windowCenterX - 300,
      y: windowCenterY + 150,
      text: "Card 1",
      fixed: false,
    },
    {
      x: windowCenterX - 150,
      y: windowCenterY + 150,
      text: "Card 2",
      fixed: false,
    },
    {
      x: windowCenterX,
      y: windowCenterY + 150,
      text: "Card 3",
      fixed: false,
    },
    {
      x: windowCenterX + 150,
      y: windowCenterY + 150,
      text: "Card 4",
      fixed: false,
    },
  ];

  const cardplace: any[] = [false, false, false, false, false, false, false];

  const [cards, setCards] = useState(initialCards);
  const [highlight, setHighlight] = useState(cardplace);

  useEffect(() => {
    console.log(window.innerHeight, window.innerWidth);
  }, []);

  const moveCard = (fixed: boolean, index: number, x: number, y: number) => {
    const newCards = [...cards];
    newCards[index] = { ...newCards[index], x, y, fixed };
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

      const time = setTimeout(() => {
        console.log(
          _areaX,
          x,
          _areaX + cardWidth,
          windowCenterY - cardHeight / 2,
          y,
          windowCenterY + cardHeight / 2,
          isTouching
        );
      }, 10000);

      if (highlight[index] === null) continue;

      if (isTouching) {
        console.log("place", index, x, y, _areaX);
        console.log(highlight);
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

  return (
    <div className="flex h-screen items-center justify-center text-center">
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
              moveCard(false, index, x, y);
            }}
            onDrop={(x, y) => {
              [0, 1, 2, 3, 4, 5, 6].map((i) => {
                if (highlight[i] === true) {
                  moveCard(
                    true,
                    index,
                    windowCenterX - areaWidth / 2 + cardWidth * i,
                    windowCenterY - areaHeight / 2
                  );
                  _setHighlight(i, null);
                  console.log(highlight);
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
        {/* {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className={twMerge(
              highlight[i]
                ? `h-[${cardHeight}px] w-[${cardWidth}px] ml-[${cardWidth * i}px] bg-black-300 border-4 border-blue-500`
                : ""
            )}
          ></div>
        ))} */}

        {/*
        {highlight[1] && (
          <div className="ml-[130px] h-[182px] w-[130px] border-4 border-blue-500 bg-black"></div>
        )}
        {highlight[2] && (
          <div className="ml-[260px] h-[182px] w-[130px] border-4 border-blue-500 bg-black"></div>
        )}
        {highlight[3] && (
          <div className="ml-[390px] h-[182px] w-[130px] border-4 border-blue-500 bg-black"></div>
        )}
        {highlight[4] && (
          <div className="ml-[520px] h-[182px] w-[130px] border-4 border-blue-500 bg-black"></div>
        )} */}
      </div>
    </div>
  );
};

export default Playground;
