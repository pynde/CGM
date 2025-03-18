import * as ContextMenu from "@radix-ui/react-context-menu";
import Konva from "konva";
import React, { useRef, useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import ActionEffectMenu from "../ContextMenu/ActionEffectMenu";


const GRID_SIZE = 16;
const CELL_SIZE = Math.floor(window.innerWidth / GRID_SIZE);
const WIDTH = GRID_SIZE * CELL_SIZE;
const HEIGHT = GRID_SIZE * CELL_SIZE;

interface SelectionBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

const GridSelection: React.FC = () => {
  const [selectedCells, setSelectedCells] = useState<Set<number>>(new Set());
  const [selectionBox, setSelectionBox] = useState<SelectionBox | null>(null);
  const stageRef = useRef<any>(null);
  const isSelecting = useRef<boolean>(false);
  const selectionStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const getCellIndex = (x: number, y: number): number => {
    const row = Math.floor(y / CELL_SIZE);
    const col = Math.floor(x / CELL_SIZE);
    return row * GRID_SIZE + col;
  };

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();
    if(!stage || e.evt.button == 2) return;
    isSelecting.current = true;
    const vector2d = stage.getPointerPosition();
    if(!vector2d) return;
    const { x, y } = vector2d;
    selectionStart.current = { x, y };
    setSelectionBox({ x, y, width: 0, height: 0 });
  };

  const handleMouseMove = (e: any) => {
    if (!isSelecting.current) return;
    const { x, y } = e.target.getStage().getPointerPosition();
    const startX = selectionStart.current.x;
    const startY = selectionStart.current.y;
    setSelectionBox({
      x: Math.min(startX, x),
      y: Math.min(startY, y),
      width: Math.abs(x - startX),
      height: Math.abs(y - startY),
    });
  };

  const handleMouseUp = () => {
    if (!selectionBox) return;
    const { x, y, width, height } = selectionBox;
    let newSelectedCells = new Set(selectedCells);
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        const cellX = col * CELL_SIZE;
        const cellY = row * CELL_SIZE;
        if (
          cellX + CELL_SIZE > x &&
          cellX < x + width &&
          cellY + CELL_SIZE > y &&
          cellY < y + height
        ) {
          newSelectedCells.add(row * GRID_SIZE + col);
        }
      }
    }
    setSelectedCells(newSelectedCells);
    setSelectionBox(null);
    isSelecting.current = false;
  };

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
      <Stage
        width={WIDTH}
        height={HEIGHT}
        ref={stageRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
        {[...Array(GRID_SIZE * (Math.floor(GRID_SIZE / 1.3)))].map((_, index) => {
          const row = Math.floor(index / GRID_SIZE);
          const col = index % GRID_SIZE;
          return (
          <Rect
            key={index}
            x={col * CELL_SIZE}
            y={row * CELL_SIZE}
            width={CELL_SIZE}
            height={CELL_SIZE}
            fill={selectedCells.has(index) ? "lightblue" : "dimgray"}
            stroke="white"
            strokeWidth={0.2}
          />
          );
        })}
        {selectionBox && (
          <Rect
          x={selectionBox.x}
          y={selectionBox.y}
          width={selectionBox.width}
          height={selectionBox.height}
          fill="rgba(0, 0, 255, 0.3)"
          />
        )}
        </Layer>
      </Stage>
      </ContextMenu.Trigger>
      <ActionEffectMenu/>
    </ContextMenu.Root>
  );
};

export default GridSelection;
