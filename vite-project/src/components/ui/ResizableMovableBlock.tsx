import React from 'react';
import { Rnd } from 'react-resizable-and-movable';
import { X, Move } from 'lucide-react';

interface ResizableMovableBlockProps {
    id: string;
    title: string;
    x: number;
    y: number;
    width: number;
    height: number;
    onMove: (id: string, x: number, y: number) => void;
    onResize: (id: string, width: number, height: number) => void;
    onRemove: (id: string) => void;
    children: React.ReactNode;
    color: string; // Add color prop
}

const ResizableMovableBlock: React.FC<ResizableMovableBlockProps> = ({
    id,
    title,
    x,
    y,
    width,
    height,
    onMove,
    onResize,
    onRemove,
    children,
    color
}) => {
    return (
        <Rnd
            size={{ width, height }}
            position={{ x, y }}
            onDragStop={(e: MouseEvent | TouchEvent, d: { x: number; y: number }) => onMove(id, d.x, d.y)}
            onResizeStop={(
            e: MouseEvent | TouchEvent,
            direction: string,
            ref: HTMLElement,
            delta: { width: number; height: number },
            position: { x: number; y: number }
            ) => {
            onResize(id, parseInt(ref.style.width), parseInt(ref.style.height));
            onMove(id, position.x, position.y); // Update position after resize if it moved
            }}
            minWidth={150}
            minHeight={150}
            bounds="parent" // Confine to parent (WorkspaceCanvas)
            className={`absolute z-20 rounded-lg shadow-xl bg-gray-800/80 backdrop-blur-md border-2 ${color}`}
            enableResizing={{
            top:true, right:true, bottom:true, left:true,
            topRight:true, bottomRight:true, bottomLeft:true, topLeft:true
            } as {
            top: boolean;
            right: boolean;
            bottom: boolean;
            left: boolean;
            topRight: boolean;
            bottomRight: boolean;
            bottomLeft: boolean;
            topLeft: boolean;
            }}
            resizeHandleClasses={{
            bottomRight: "w-4 h-4 bg-purple-500 rounded-full cursor-nwse-resize absolute -bottom-2 -right-2",
            // Add classes for other handles if you want visual indicators
            } as Partial<Record<
            "top" | "right" | "bottom" | "left" | "topRight" | "bottomRight" | "bottomLeft" | "topLeft",
            string
            >>}
            dragHandleClassName=".drag-handle" // Element to drag by
        >
            <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-3 bg-gray-900/70 border-b border-white/10 rounded-t-lg drag-handle cursor-grab">
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <Move size={16} className="text-gray-400" />
                <span>{title}</span>
                </div>
                <button
                onClick={() => onRemove(id)}
                className="p-1 rounded-full text-gray-400 hover:text-red-400 transition-colors"
                title="Remove block"
                >
                <X size={16} />
                </button>
            </div>
            <div className="flex-grow p-4 overflow-auto custom-scrollbar">
                {children}
            </div>
            </div>
        </Rnd>
    );
};

export default ResizableMovableBlock;