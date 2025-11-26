declare module 'react-resizable-and-movable' {
  import * as React from 'react';

  export interface RndProps {
    size?: { width: number | string; height: number | string };
    position?: { x: number; y: number };
    onDragStop?: (e: MouseEvent | TouchEvent, d: { x: number; y: number }) => void;
    onResizeStop?: (
      e: MouseEvent | TouchEvent,
      direction: string,
      ref: HTMLElement,
      delta: { width: number; height: number },
      position: { x: number; y: number }
    ) => void;
    minWidth?: number;
    minHeight?: number;
    bounds?: string;
    className?: string;
    enableResizing?: object;
    resizeHandleClasses?: object;
    dragHandleClassName?: string;
    children?: React.ReactNode;
  }

  export class Rnd extends React.Component<RndProps>