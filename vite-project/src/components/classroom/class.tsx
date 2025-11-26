"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Textarea } from '../../components/ui/textarea'; // Adjust path
import { Button } from '../../components/ui/button';     // Adjust path
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, CornerDownRight } from 'lucide-react';
import { DndContext, DragOverlay, useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { cn } from "../../../lib/utils"; // Adjust path
import { IconClipboardList, IconNotes, IconCode, IconAlarm, IconHourglassHigh, IconLayoutGrid } from "@tabler/icons-react";
import { FaSpotify, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import YouTubePlayerWidget from './YouTubePlayer';

// --- TYPES AND CONSTANTS ---
const ElementTypes = {
    TODO: 'todo',
    NOTES: 'notes',
    CODE: 'code',
    TIMER: 'timer',
    ALARM: 'alarm',
    SPOTIFY: 'spotify',
    YOUTUBE: 'youtube',
};

type ElementData = {
    [ElementTypes.TODO]: { items: { id: number; text: string; completed: boolean }[]; inputValue: string };
    [ElementTypes.NOTES]: { content: string };
    [ElementTypes.CODE]: { content: string };
    [ElementTypes.TIMER]: { time: number; isRunning: boolean };
    [ElementTypes.ALARM]: { time: string };
    [ElementTypes.SPOTIFY]: {};
    [ElementTypes.YOUTUBE]: {};
};

type Element<T extends keyof typeof ElementTypes = any> = {
    id: string;
    type: T;
    x: number;
    y: number;
    width: number;
    height: number;
    zIndex: number;
    data: ElementData[T];
};

// --- WIDGET COMPONENTS ---

type TodoListProps = {
    data: ElementData['todo'];
    onDataChange: (d: Partial<ElementData['todo']>) => void;
};
const TodoList: React.FC<TodoListProps> = function TodoList({ data, onDataChange }: TodoListProps) {
    const todoData = data as ElementData['todo'];
    const handleAddTodo = () => {
        const inputValue = 'inputValue' in todoData ? String(todoData.inputValue) : '';
        if (inputValue && inputValue.trim()) {
            const items = 'items' in todoData && Array.isArray(todoData.items) ? todoData.items : [];
            onDataChange({
                items: [...items, { id: Date.now(), text: inputValue, completed: false }],
                inputValue: '',
            });
        }
    };
    const toggleTodo = (id: number) => {
        const items = 'items' in todoData && Array.isArray(todoData.items) ? todoData.items : [];
        onDataChange({ items: items.map((t: { id: number; text: string; completed: boolean }) => t.id === id ? { ...t, completed: !t.completed } : t) });
    };
    const inputValue = 'inputValue' in todoData ? String(todoData.inputValue || '') : '';
    const items = 'items' in todoData && Array.isArray(todoData.items) ? todoData.items : [];
    
    return (
        <div className="space-y-2">
            <div className="flex gap-2">
                <input type="text" value={inputValue} onChange={(e) => onDataChange({ inputValue: e.target.value })} onKeyPress={e => e.key === 'Enter' && handleAddTodo()} className="flex-1 p-2 rounded-lg bg-white border border-[#C5C7BC] focus:ring-2 focus:ring-[#B6AE9F] focus:outline-none text-sm text-[#5a5348]" placeholder="New task..."/>
                <Button onClick={handleAddTodo} className="bg-[#B6AE9F] hover:bg-[#a0988a] text-white font-bold rounded-lg px-3 text-sm">Add</Button>
            </div>
            <ul className="space-y-1.5 max-h-48 overflow-y-auto pr-1">{items.map((t: { id: number; text: string; completed: boolean }) => ( <li key={t.id} onClick={() => toggleTodo(t.id)} className={cn("flex items-center gap-2 text-[#5a5348] p-2 bg-white/50 rounded-md text-sm cursor-pointer border border-[#C5C7BC]", t.completed && "line-through text-[#7a7368]")}> <CheckCircle className={t.completed ? "text-[#B6AE9F]" : "text-[#7a7368]"} size={14} /> <span>{t.text}</span></li>))}</ul>
        </div>
    );
};

type NotesWidgetProps = { data: ElementData['notes']; onDataChange: (d: Partial<ElementData['notes']>) => void; };
const NotesWidget: React.FC<NotesWidgetProps> = function NotesWidget({ data, onDataChange }: NotesWidgetProps) {
    const notesData = data as ElementData['notes'];
    const content = 'content' in notesData ? String(notesData.content || '') : '';
    return (
        <Textarea className="w-full flex-grow min-h-[150px] bg-white border-[#C5C7BC] p-2 rounded-md shadow-inner focus:ring-2 focus:ring-[#B6AE9F] focus:outline-none text-sm text-[#5a5348]" value={content} onChange={(e) => onDataChange({ content: e.target.value })} placeholder="Jot down your thoughts..."/>
    );
};

type CodeWidgetProps = { data: ElementData['code']; onDataChange: (d: Partial<ElementData['code']>) => void; };
const CodeWidget: React.FC<CodeWidgetProps> = function CodeWidget({ data, onDataChange }: CodeWidgetProps) {
    const codeData = data as ElementData['code'];
    const content = 'content' in codeData ? String(codeData.content || '') : '';
    return (
        <Textarea className="w-full flex-grow min-h-[150px] font-mono text-sm bg-white border-[#C5C7BC] p-2 rounded-md shadow-inner focus:ring-2 focus:ring-[#B6AE9F] focus:outline-none text-[#5a5348]" value={content} onChange={(e) => onDataChange({ content: e.target.value })} placeholder="> your code snippet here..."/>
    );
};

type TimerWidgetProps = { data: ElementData['timer']; onDataChange: (d: Partial<ElementData['timer']>) => void; };
const TimerWidget: React.FC<TimerWidgetProps> = function TimerWidget({ data, onDataChange }: TimerWidgetProps) {
    const timerData = data as ElementData['timer'];
    const isRunning = 'isRunning' in timerData ? Boolean(timerData.isRunning) : false;
    const time = 'time' in timerData ? Number(timerData.time) : 0;
    
    useEffect(() => {
        let intervalId: number;
        if (isRunning && time > 0) {
            intervalId = window.setInterval(() => onDataChange({ time: time - 1 }), 1000);
        } else if (time === 0 && isRunning) {
            onDataChange({ isRunning: false });
        }
        return () => window.clearInterval(intervalId);
    }, [isRunning, time, onDataChange]);

    return (
        <div className="text-center space-y-3 flex flex-col items-center justify-center h-full">
            <div className="text-5xl font-bold text-[#5a5348] bg-[#FBF3D1] p-4 rounded-full w-36 h-36 flex items-center justify-center border-4 border-[#B6AE9F] shadow-lg">
                {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}
            </div>
            <Button onClick={() => onDataChange({ isRunning: !isRunning })} className="bg-[#B6AE9F] hover:bg-[#a0988a] px-6 py-2 rounded-full text-white font-semibold text-base transition-all shadow-lg">{isRunning ? 'Pause' : 'Start'}</Button>
        </div>
    );
};

type AlarmWidgetProps = { data: ElementData['alarm']; onDataChange: (d: Partial<ElementData['alarm']>) => void; };
const AlarmWidget: React.FC<AlarmWidgetProps> = function AlarmWidget({ data, onDataChange }: AlarmWidgetProps) {
    const time = 'time' in data ? String(data.time || '') : '';
    return (
        <div className="space-y-3 text-center h-full flex flex-col items-center justify-center">
            <p className="text-sm text-[#7a7368]">(Feature in development)</p>
            <input type="time" value={time} onChange={(e) => onDataChange({ time: e.target.value })} className="p-2 rounded-lg bg-white border border-[#C5C7BC] focus:ring-2 focus:ring-[#B6AE9F] focus:outline-none text-[#5a5348] text-lg w-32"/>
        </div>
    );
};

const SpotifyWidget: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full gap-4">
        <FaSpotify size={48} color="#1DB954" />
        <button className="px-5 py-2.5 rounded-full bg-[#B6AE9F] hover:bg-[#a0988a] text-white font-bold shadow-lg">Connect Spotify</button>
        <p className="text-xs text-[#7a7368]">Spotify integration coming soon!</p>
    </div>
);

const YouTubeWidget: React.FC = () => (
    <YouTubePlayerWidget />
);

const ELEMENT_COMPONENTS = {
    [ElementTypes.TODO]: { title: "Todo List", icon: <IconClipboardList size={18} />, component: TodoList, defaultData: { items: [], inputValue: '' } },
    [ElementTypes.NOTES]: { title: "Notes", icon: <IconNotes size={18} />, component: NotesWidget, defaultData: { content: '' } },
    [ElementTypes.CODE]: { title: "Code Scratchpad", icon: <IconCode size={18} />, component: CodeWidget, defaultData: { content: '' } },
    [ElementTypes.TIMER]: { title: "Pomodoro Timer", icon: <IconHourglassHigh size={18} />, component: TimerWidget, defaultData: { time: 25 * 60, isRunning: false } },
    [ElementTypes.ALARM]: { title: "Alarm", icon: <IconAlarm size={18} />, component: AlarmWidget, defaultData: { time: '09:00' } },
    [ElementTypes.SPOTIFY]: { title: "Spotify Player", icon: <FaSpotify size={18} color="#1DB954" />, component: SpotifyWidget, defaultData: {} },
    [ElementTypes.YOUTUBE]: { title: "YouTube Player", icon: <FaYoutube size={18} color="#FF0000" />, component: YouTubeWidget, defaultData: {} },
};

const SIDEBAR_LINKS = Object.entries(ELEMENT_COMPONENTS).map(([type, { title, icon }]) => ({
    id: type,
    label: title,
    icon: icon,
}));

// --- MAIN COMPONENT ---
export default function VirtualStudyRoom() {
    const [elements, setElements] = useState<Element[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);
    const mainWorkspaceRef = useRef<HTMLDivElement>(null);
    
    // ***** FIX: Added state to track the drag's starting position *****
    const [dragStartPosition, setDragStartPosition] = useState<{x: number, y: number} | null>(null);

    const updateElementData = useCallback((elementId: string, newData: object) => {
        setElements(prev =>
            prev.map(el =>
                el.id === elementId ? { ...el, data: { ...el.data, ...newData } } : el
            )
        );
    }, []);

    const bringToFront = (elementId: string) => {
        setElements(prev => {
            const maxZIndex = Math.max(0, ...prev.map(el => el.zIndex)) || 10;
            return prev.map(el => ({
                ...el,
                zIndex: el.id === elementId ? maxZIndex + 1 : el.zIndex,
            }));
        });
    };
    
    const handleDragEnd = (event: any) => {
        const { active, over, delta } = event;
        setActiveId(null);
        setDragStartPosition(null); // Reset start position

        if (!active) return;

        const isNewWidget = SIDEBAR_LINKS.some(link => link.id === active.id);
        if (isNewWidget && over && over.id === 'main-area') {
            const workspaceRect = mainWorkspaceRef.current?.getBoundingClientRect();
            // ***** FIX: Use stored start position and delta for accuracy *****
            if (!workspaceRect || !dragStartPosition) return;

            const finalCursorX = dragStartPosition.x + delta.x;
            const finalCursorY = dragStartPosition.y + delta.y;

            const dropX = finalCursorX - workspaceRect.left;
            const dropY = finalCursorY - workspaceRect.top;
            
            const type = active.id as keyof typeof ELEMENT_COMPONENTS;
            const newElement: Element = {
                id: `${type}-${Date.now()}`,
                type: type,
                x: Math.max(0, dropX),
                y: Math.max(0, dropY),
                width: 1.25,
                height: 1.25,
                zIndex: (Math.max(0, ...elements.map(el => el.zIndex)) || 10) + 1,
                data: ELEMENT_COMPONENTS[type].defaultData as any,
            };
            setElements(prev => [...prev, newElement]);
        }
        else if (elements.some(el => el.id === active.id)) {
            setElements(prev => prev.map(el => 
                el.id === active.id ? { ...el, x: el.x + delta.x, y: el.y + delta.y } : el
            ));
        }
    };

    const removeElement = (id: string) => setElements(prev => prev.filter(el => el.id !== id));
    
    const resizeElement = (id: string, newWidth: number, newHeight: number) => {
        setElements(prev => prev.map(el =>
            el.id === id ? { ...el, width: newWidth, height: newHeight } : el
        ));
    };

    return (
        <DndContext 
            onDragStart={({ active, activatorEvent }) => {
                setActiveId(active.id as string);
                // ***** FIX: Record the drag's starting client coordinates *****
                if (
                    activatorEvent &&
                    typeof (activatorEvent as any).clientX === "number" &&
                    typeof (activatorEvent as any).clientY === "number"
                ) {
                    setDragStartPosition({
                        x: (activatorEvent as MouseEvent).clientX,
                        y: (activatorEvent as MouseEvent).clientY,
                    });
                }
            }} 
            onDragEnd={handleDragEnd}
        >
            <div className="w-full h-screen flex flex-col md:flex-row bg-[#DEDED1] text-[#5a5348] overflow-hidden relative">

                {/* Apple Dock Style Sidebar */}
                <div className="flex-shrink-0 z-40 px-3 py-6">
                    <div className="h-full w-16 flex flex-col items-center bg-[#F8F8F3]/80 backdrop-blur-xl rounded-3xl border border-[#C5C7BC]/50 shadow-xl relative overflow-hidden">
                        {/* Dock background glow */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent pointer-events-none"></div>
                        
                        {/* Dock content */}
                        <div className="relative z-10 flex flex-col items-center gap-3 w-full px-2 py-4">
                            {/* Study Room Icon */}
                            <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.1 }}
                                className="w-11 h-11 rounded-2xl bg-[#B6AE9F] flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform duration-200 mb-2"
                            >
                                <IconLayoutGrid className="h-5 w-5 text-white" />
                            </motion.div>
                            
                            {/* Divider */}
                            <div className="w-8 h-px bg-[#C5C7BC]/20 my-1"></div>
                            
                            {/* Widget Icons */}
                            <div className="flex flex-col gap-3 flex-1 items-center justify-start mt-2">
                                {SIDEBAR_LINKS.map((link) => (
                                    <DraggableSidebarLink key={link.id} link={link} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden">
                    <main className="flex-1 min-h-0 min-w-0 flex flex-col p-2 md:p-4 relative">
                        <motion.div 
                            initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            className="flex items-center justify-between mb-4 p-2 bg-[#F8F8F3] backdrop-blur-md rounded-2xl border border-[#C5C7BC] z-30 shadow-lg"
                        >
                            <div className="flex items-center gap-2">
                                <Link to="/" className="p-2 rounded-lg bg-[#B6AE9F] hover:bg-[#a0988a] text-white font-semibold shadow hover:opacity-90 transition-all duration-200 flex items-center gap-1">
                                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
                                    Home
                                </Link>
                            </div>
                            <div className="text-center">
                                <h1 className="text-xl font-bold text-[#5a5348]">My Workspace</h1>
                                <p className="text-xs text-[#7a7368]">Drag & Drop Your Tools</p>
                            </div>
                            <div></div>
                        </motion.div>

                        <DroppableArea id="main-area" ref={mainWorkspaceRef}>
                            <AnimatePresence>
                                {elements.length === 0 && (
                                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="flex items-center justify-center h-full text-center text-[#7a7368]">
                                        <div>
                                            <div className="text-6xl mb-4">🎯</div>
                                            <h2 className="text-xl font-semibold text-[#5a5348] mb-2">Workspace is Empty</h2>
                                            <p className="text-[#7a7368]">Drag widgets from the sidebar to begin!</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            
                            {elements.map(element => {
                                const { title, icon, component: WidgetComponent } = ELEMENT_COMPONENTS[element.type];
                                return (
                                    <DraggableElementCard
                                        key={element.id}
                                        element={element}
                                        title={title}
                                        icon={icon}
                                        onRemove={removeElement}
                                        onResize={resizeElement}
                                        onActivate={() => bringToFront(element.id)}
                                    >
                                        {/* Type assertion to ensure correct data type for each widget */}
                                        <WidgetComponent
                                            data={element.data as ElementData[keyof typeof ElementTypes]}
                                            onDataChange={(newData: any) => updateElementData(element.id, newData)}
                                        />
                                    </DraggableElementCard>
                                );
                            })}
                            
                            {elements.length > 0 && (
                                <motion.button initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={() => setElements([])} className="absolute bottom-4 right-4 p-3 rounded-full bg-[#B6AE9F] hover:bg-[#a0988a] text-white shadow-lg transition-all duration-200 border border-[#C5C7BC] z-30" title="Clear all widgets">
                                    <X size={24} />
                                </motion.button>
                            )}
                        </DroppableArea>
                    </main>

                </div>

                <DragOverlay>
                    {activeId && (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                            className="p-4 rounded-2xl bg-[#F8F8F3] backdrop-blur-xl cursor-grabbing text-sm text-[#5a5348] text-center font-semibold shadow-2xl flex items-center justify-center gap-3 z-50 border border-[#C5C7BC]"
                            style={{ boxShadow: '0 20px 40px rgba(90,83,72,0.2)' }}
                        >
                            <div className="p-2 rounded-lg bg-[#DEDED1]">
                                {SIDEBAR_LINKS.find(link => link.id === activeId)?.icon || ELEMENT_COMPONENTS[elements.find(el => el.id === activeId)?.type || '' as any]?.icon}
                            </div>
                            <span>
                                {SIDEBAR_LINKS.find(link => link.id === activeId)?.label || ELEMENT_COMPONENTS[elements.find(el => el.id === activeId)?.type || '' as any]?.title || 'Dragging...'}
                            </span>
                        </motion.div>
                    )}
                </DragOverlay>
            </div>
        </DndContext>
    );
}

// --- SUB-COMPONENTS ---
function DraggableElementCard({ title, icon, element, onRemove, onResize, children, onActivate }: { 
    title: string; icon: React.ReactElement; element: Element; onRemove: (id: string) => void; 
    onResize: (id: string, w: number, h: number) => void; children: React.ReactNode; onActivate: () => void; 
}) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: element.id });
    
    const style = {
        position: 'absolute' as const,
        left: `${element.x}px`,
        top: `${element.y}px`,
        width: `${element.width * 200}px`,
        height: `${element.height * 150}px`,
        minWidth: '200px',
        minHeight: '150px',
        zIndex: isDragging ? 9999 : element.zIndex,
        transform: transform ? CSS.Translate.toString(transform) : undefined,
    };

    function onResizeDrag(e: React.MouseEvent) {
        e.stopPropagation();
        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = element.width;
        const startHeight = element.height;
        function onMouseMove(ev: MouseEvent) {
            const dx = ev.clientX - startX;
            const dy = ev.clientY - startY;
            const newWidth = Math.max(1, startWidth + dx / 200);
            const newHeight = Math.max(1, startHeight + dy / 150);
            onResize(element.id, newWidth, newHeight);
        }
        function onMouseUp() {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        }
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    }
    
    return (
        <motion.div
            ref={setNodeRef}
            style={style}
            layout
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onMouseDownCapture={onActivate}
            className={cn('p-1 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-xl bg-[#F8F8F3] border border-[#C5C7BC] flex flex-col group transition-all duration-300 shadow-lg')}
        >
            <div className="flex items-center justify-between p-3 text-[#5a5348] select-none">
                <div {...listeners} {...attributes} className="flex items-center gap-2 font-semibold text-sm cursor-grab w-full">
                    {icon}<span>{title}</span>
                </div>
                <motion.button whileTap={{scale: 0.8}} onClick={(e) => { e.stopPropagation(); onRemove(element.id); }} className="p-1.5 hover:bg-[#B6AE9F]/20 text-[#7a7368] hover:text-[#5a5348] rounded-full transition-colors" title="Remove element">
                    <X size={16}/>
                </motion.button>
            </div>
            <div className="flex-grow h-full overflow-auto p-3 pt-0">
                {children}
            </div>
            <div onMouseDown={onResizeDrag} className="absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize z-50 flex items-center justify-center text-[#7a7368] opacity-50 group-hover:opacity-100 transition-opacity" title="Resize">
                <CornerDownRight size={16} />
            </div>
        </motion.div>
    );
}

function DraggableSidebarLink({ link }: { link: {id: string; label: string; icon: React.ReactElement;} }) {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: link.id });
    return (
        <motion.div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className={cn("cursor-grab", isDragging && "opacity-50")}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
        >
            <div className="group relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 hover:bg-[#FBF3D1]/80">
                <div className="flex items-center justify-center text-[#B6AE9F] group-hover:scale-110 transition-transform duration-200">
                    {link.icon}
                </div>
                {/* Tooltip */}
                <div className="absolute left-16 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#5a5348] text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap shadow-lg z-50">
                    {link.label}
                    <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 border-4 border-transparent border-r-[#5a5348]"></div>
                </div>
            </div>
        </motion.div>
    );
}

const DroppableArea = React.forwardRef<HTMLDivElement, { id: string; children: React.ReactNode }>(({ id, children }, ref) => {
    const { setNodeRef, isOver } = useDroppable({ id });
    return (
        <div ref={setNodeRef} className="h-full w-full relative">
             <div ref={ref} className={cn("absolute inset-0 rounded-2xl transition-all duration-300", isOver ? "bg-[#FBF3D1]/20 border-2 border-dashed border-[#B6AE9F]" : "bg-[#DEDED1]/50 border-[#C5C7BC]/30")}>
                {isOver && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-[#5a5348] text-lg font-medium bg-[#F8F8F3] px-6 py-3 rounded-full backdrop-blur-sm border border-[#B6AE9F]">
                            ✨ Drop to Add Widget ✨
                        </div>
                    </motion.div>
                )}
             </div>
             {children}
        </div>
    );
});
DroppableArea.displayName = 'DroppableArea';

