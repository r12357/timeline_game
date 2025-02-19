"use client";

import React, { useState, useEffect, useRef } from "react";
import { PassThrough } from "stream";
import { twMerge } from "tailwind-merge";

type Props = {
  x: number;
  y: number;
  text: string;
  fixed: boolean;
  fixedPosition: number;
  mapList: any[];
  onMove: (x: number, y: number) => void;
  onDrop: (x: number, y: number) => void;
  onPlaceInMove: (x: number, y: number) => void;
};

const Card: React.FC<Props> = (props) => {
  const [position, setPosition] = useState({ x: props.x, y: props.y });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    props.fixed && setFlag(true);
  }, []);

  useEffect(() => {
    setPosition({ x: props.x, y: props.y });
  }, [props.x, props.y]);

  useEffect(() => {
    if (!flag) {
    }
  });

  const startDrag = (x: number, y: number) => {
    setOffset({ x: x - position.x, y: y - position.y });
    setIsDragging(true);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (props.fixed) return;
    e.preventDefault();
    startDrag(e.clientX, e.clientY);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (props.fixed) return;
    e.preventDefault();
    const touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY);
  };

  const onMove = (x: number, y: number) => {
    if (isDragging) {
      setPosition({ x: x - offset.x, y: y - offset.y });
      props.onMove(x - offset.x, y - offset.y);
      props.onPlaceInMove(position.x, position.y);
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    onMove(e.clientX, e.clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    onMove(touch.clientX, touch.clientY);
  };

  const stopDrag = () => {
    setIsDragging(false);
    console.log("stop");
    props.onDrop(position.x, position.y);
  };

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      onTouchMove={onTouchMove}
      onTouchEnd={stopDrag}
      style={{ left: position.x, top: position.y }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      className={twMerge(
        "absolute flex h-[140px] w-[100px] cursor-pointer items-end justify-center rounded-lg",
        "pb-4 text-center text-sm font-bold text-white",
        "bg-gradient-to-br from-[#3a3dff] to-[#1e1fb3]",
        isDragging
          ? "shadow-lg shadow-black/30"
          : "shadow-md shadow-black/20 transition-shadow duration-200 ease-in-out"
      )}
    >
      {props.text}
    </div>
  );
};

export default Card;
