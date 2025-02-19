"use client";

import { useState, useEffect } from "react";

export default function DraggableBox() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const centerX = window.innerWidth / 2 - 50;
    const centerY = window.innerHeight / 2 - 50;
    setPosition({ x: centerX, y: centerY });
  }, [!isDragging]);

  const startDrag = (x: number, y: number) => {
    setOffset({ x: x - position.x, y: y - position.y });
    setIsDragging(true);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    startDrag(e.clientX, e.clientY);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY);
  };

  const onMove = (x: number, y: number) => {
    if (isDragging) {
      setPosition({ x: x - offset.x, y: y - offset.y });
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    onMove(e.clientX, e.clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    onMove(touch.clientX, touch.clientY);
  };

  const stopDrag = () => setIsDragging(false);

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      onTouchMove={onTouchMove}
      onTouchEnd={stopDrag}
      className="absolute size-[100px] cursor-pointer rounded-lg bg-blue-500"
      style={{ left: position.x, top: position.y }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    />
  );
}
