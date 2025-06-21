"use client";

import React, { useState, useEffect } from 'react';
import { Textarea } from '../../components/ui/textarea'; // Assuming path
import { Button } from '../../components/ui/button'; // Assuming path
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Menu, X, ArrowLeftRight, Minimize } from 'lucide-react';
import { DndContext, closestCenter, DragOverlay, useDroppable, useDraggable } from '@dnd-kit/core';
import { SortableContext, useSortable, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Sidebar, SidebarBody, SidebarLink } from '../../components/ui/sidebar'; // Assuming path
import { cn } from "../../../lib/utils"; // Assuming path (e.g., for conditional class joining)
import {
    IconClipboardList,
    IconNotes,
    IconCode,
    IconAlarm,
    IconHourglassHigh,
    IconLayoutGrid,
} from "@tabler/icons-react";


// --- STATE & TYPE DEFINITIONS ---
const ElementTypes = {
    TODO: 'todo',
    NOTES: 'notes',
    CODE: 'code',
    TIMER: 'timer',
    ALARM: 'alarm',
};

type Element = {
    id: string;
    type: string;
    colSpan: number;
};

export default function VirtualStudyRoom() {
    // --- STATE HOOKS ---
    const [elements, setElements] = useState<Element[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // State for individual widgets' content
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState<string[]>([]);
    const [notes, setNotes] = useState('');
    const [code, setCode] = useState('');
    const [timer, setTimer] = useState(25 * 60); // 25 minutes for Pomodoro
    const [isRunning, setIsRunning] = useState(false);

    // --- CORE LOGIC ---
    const handleAddTodo = () => {
        if (todo.trim()) {
            setTodos([...todos, todo]);
            setTodo('');
        }
    };

    const handleTimerToggle = () => setIsRunning(!isRunning);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | undefined;
        if (isRunning && timer > 0) {
            interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        } else if (timer === 0) {
            setIsRunning(false);
            // Optionally, add a notification or sound when timer finishes
        }
        return () => clearInterval(interval);
    }, [isRunning, timer]);

    const handleDragEnd = (event: any) => {
        const { over, active } = event;

        // Determine if the dragged item originated from the sidebar (i.e., a new widget type)
        const isDraggingFromSidebar = Object.values(ElementTypes).includes(active.id as string);

        if (isDraggingFromSidebar && over && over.id === 'main-area') {
            // Case 1: Dragging from sidebar to main area (adding new element)
            const newElement: Element = {
                id: `${active.id}-${Date.now()}`, // Unique ID for each instance
                type: active.id as string,
                colSpan: 1, // Default size
            };
            setElements((prev) => [...prev, newElement]);
        }
        // Case 2: Reordering an existing element within the main area
        // Ensure both active and over IDs correspond to elements already in the `elements` state
        else if (
            over &&
            active.id !== over.id &&
            elements.some(el => el.id === active.id) &&
            elements.some(el => el.id === over.id)
        ) {
            setElements((elements) => {
                const oldIndex = elements.findIndex((el) => el.id === active.id);
                const newIndex = elements.findIndex((el) => el.id === over.id);

                if (oldIndex !== -1 && newIndex !== -1) {
                    return arrayMove(elements, oldIndex, newIndex);
                }
                return elements;
            });
        }
        setActiveId(null);
    };

    const removeElement = (id: string) => {
        setElements((prev) => prev.filter((el) => el.id !== id));
    };

    const resizeElement = (id: string, newSpan: number) => {
        setElements((prev) =>
            prev.map((el) =>
                el.id === id ? { ...el, colSpan: Math.max(1, Math.min(3, newSpan)) } : el
            )
        );
    };

    // --- COMPONENT MAPPING ---
    const elementComponents = {
        [ElementTypes.TODO]: {
            title: "Todo List",
            icon: <IconClipboardList size={20} />,
            component: (
                <div className="space-y-3">
                    <div className="flex gap-2">
                        <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} className="flex-1 p-2 rounded-md bg-black/20 border border-white/10 focus:ring-1 focus:ring-cyan-400 focus:outline-none text-sm" placeholder="New task..."/>
                        <Button onClick={handleAddTodo} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-md px-3 text-sm">Add</Button>
                    </div>
                    <ul className="space-y-2 max-h-48 overflow-y-auto pr-2">
                        {todos.map((t, i) => ( <li key={i} className="flex items-center gap-2 text-neutral-100 p-2 bg-black/20 rounded-md text-sm"><CheckCircle className="text-green-400" size={16} /><span>{t}</span></li>))}
                    </ul>
                </div>
            )
        },
        [ElementTypes.NOTES]: {
            title: "Notes",
            icon: <IconNotes size={20} />,
            component: (
                   <Textarea className="w-full flex-grow min-h-[150px] bg-black/20 border border-white/10 p-3 rounded-md shadow-inner focus:ring-1 focus:ring-purple-400 focus:outline-none text-sm" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Jot down your thoughts..."/>
            )
        },
        [ElementTypes.CODE]: {
            title: "Code Scratchpad",
            icon: <IconCode size={20} />,
            component: (
                <Textarea className="w-full flex-grow min-h-[150px] font-mono text-xs bg-black/20 border border-white/10 p-3 rounded-md shadow-inner focus:ring-1 focus:ring-amber-400 focus:outline-none" value={code} onChange={(e) => setCode(e.target.value)} placeholder=">_ your code snippet here..."/>
            )
        },
        [ElementTypes.TIMER]: {
            title: "Pomodoro Timer",
            icon: <IconHourglassHigh size={20} />,
            component: (
                <div className="text-center space-y-3 flex flex-col items-center justify-center h-full">
                    <div className="text-5xl font-bold text-white bg-black/20 p-2 rounded-full w-32 h-32 flex items-center justify-center border-4 border-white/20 shadow-md">
                        {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                    </div>
                    <Button onClick={handleTimerToggle} className="bg-rose-500 hover:bg-rose-600 px-8 py-2 rounded-full text-white font-semibold text-base transition-all shadow-lg">
                        {isRunning ? 'Pause' : 'Start'}
                    </Button>
                </div>
            )
        },
        [ElementTypes.ALARM]: {
            title: "Alarm",
            icon: <IconAlarm size={20} />,
            component: (
                   <div className="space-y-3 text-center h-full flex flex-col items-center justify-center">
                    <p className="text-xs text-gray-300">(Feature in development)</p>
                    <label className="sr-only" htmlFor="alarm-time">Set Alarm Time</label>
                    <input id="alarm-time" type="time" className="p-2 rounded-lg bg-black/20 border border-white/10 focus:ring-1 focus:ring-lime-400 focus:outline-none text-white text-base w-32" placeholder="HH:MM"/>
                </div>
            )
        },
    };

    const sidebarLinks = Object.values(ElementTypes).map(type => ({
        id: type,
        label: elementComponents[type].title,
        icon: React.cloneElement(elementComponents[type].icon, {className: "h-5 w-5 shrink-0"}),
    }));

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} onDragStart={({ active }) => setActiveId(active.id as string)}>
           <div className="min-h-screen w-full flex bg-neutral-900 text-white overflow-hidden">
                {/* --- AURORA BACKGROUND --- */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute w-[400px] h-[400px] bg-purple-600 rounded-full -top-40 -left-40 filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute w-[400px] h-[400px] bg-cyan-600 rounded-full -bottom-40 -right-40 filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute w-[300px] h-[300px] bg-rose-600 rounded-full bottom-20 left-20 filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>

                {/* --- RESPONSIVE SIDEBAR --- */}
                <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}>
                    <SidebarBody>
                        <div className="flex flex-1 flex-col">
                            <div className="flex items-center gap-2 py-1 z-20"><IconLayoutGrid className="h-7 w-7 text-cyan-400" /><motion.span initial={{ opacity: 0 }} animate={{ opacity: sidebarOpen ? 1 : 0 }} className="font-bold text-lg whitespace-pre text-white">Study Room</motion.span></div>
                            <div className="mt-8 flex flex-col gap-2"><h2 className={cn("text-sm font-semibold text-neutral-400 mb-2 transition-opacity", !sidebarOpen && "opacity-0")}>Widgets</h2>
                                {sidebarLinks.map((link) => (<DraggableSidebarLink key={link.id} link={link} sidebarOpen={sidebarOpen} />))}
                            </div>
                        </div>
                    </SidebarBody>
                </Sidebar>

                {/* --- MAIN CONTENT AREA --- */}
                <main className="flex-1 transition-all duration-300 ease-in-out p-4 md:p-6 flex flex-col">
                       <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden p-2 rounded-full bg-black/10 backdrop-blur-sm fixed top-4 right-4 z-50" title="Toggle Sidebar"><Menu size={24}/></button>
                    <DroppableArea id="main-area">
                        {elements.length === 0 ? (
                               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-neutral-400 text-center text-lg m-auto">Drag widgets from the sidebar to build your space!</motion.div>
                        ) : (
                            // SortableContext for reordering elements
                            <SortableContext items={elements.map(el => el.id)} strategy={rectSortingStrategy}>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full h-full">
                                    <AnimatePresence>
                                        {elements.map((element) => {
                                            const { title, icon, component } = elementComponents[element.type];
                                            return (
                                                <SortableElementCard key={element.id} element={element} title={title} icon={icon} onRemove={removeElement} onResize={resizeElement}>
                                                    {component}
                                                </SortableElementCard>
                                            );
                                        })}
                                    </AnimatePresence>
                                </div>
                            </SortableContext>
                        )}
                    </DroppableArea>
                </main>

                <DragOverlay>
                    {activeId && (
                        // Render a simplified version of the dragged element for the overlay
                        <div className="p-3 rounded-lg bg-cyan-600/80 backdrop-blur-md cursor-grabbing text-sm text-white text-center font-semibold shadow-lg flex items-center justify-center gap-2">
                            {sidebarLinks.find(link => link.id === activeId)?.icon || elementComponents[elements.find(el => el.id === activeId)?.type || '']?.icon}
                            {sidebarLinks.find(link => link.id === activeId)?.label || elementComponents[elements.find(el => el.id === activeId)?.type || '']?.title || activeId}
                        </div>
                    )}
                </DragOverlay>
            </div>
        </DndContext>
    );
}


// --- WIDGET WRAPPER COMPONENT (SORTABLE) ---
function SortableElementCard({ title, icon, element, onRemove, onResize, children }: { title: string; icon: JSX.Element; element: Element; onRemove: (id: string) => void; onResize: (id: string, newSpan: number) => void; children: React.ReactNode; }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: element.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        // Add a slight opacity reduction when dragging to make it clear it's being moved
        opacity: isDragging ? 0.8 : 1,
        zIndex: isDragging ? 100 : 'auto', // Bring dragged item to front
        // Disable pointer events on the dragged item itself so events pass through to underlying elements
        // This can sometimes help with dropping on empty spaces or other targets
        pointerEvents: isDragging ? 'none' : 'auto',
    };

    const colSpanClass = {
        1: 'md:col-span-1',
        2: 'md:col-span-2',
        3: 'md:col-span-3',
    };

    return (
        <motion.div
            ref={setNodeRef}
            style={style} // Apply sortable styles
            layout // Enable Framer Motion layout animations for smooth reordering
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}
            className={cn(
                "p-4 rounded-2xl border border-white/10 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 bg-gray-500/10 shadow-lg flex flex-col h-full",
                colSpanClass[element.colSpan as keyof typeof colSpanClass]
            )}
            // {...attributes} // Attributes for the main draggable element (can be placed on handle too)
        >
            <div className="flex items-center justify-between mb-3 text-neutral-300">
                <div
                    className="flex items-center gap-2 font-semibold text-sm cursor-grab"
                    {...listeners} // Listeners for the drag handle (title/icon area)
                    {...attributes} // Attributes for the drag handle
                >
                    {icon}
                    <span>{title}</span>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => onResize(element.id, element.colSpan + 1)} className="p-1 hover:text-white transition-colors disabled:opacity-50" disabled={element.colSpan >= 3} title="Increase column span"><ArrowLeftRight size={14}/></button>
                    <button onClick={() => onResize(element.id, element.colSpan - 1)} className="p-1 hover:text-white transition-colors disabled:opacity-50" disabled={element.colSpan <= 1} title="Decrease column span"><Minimize size={14}/></button>
                    <button onClick={() => onRemove(element.id)} className="p-1 hover:text-rose-400 transition-colors" title="Remove element"><X size={16}/></button>
                </div>
            </div>  
            <div className="flex-grow h-full flex flex-col">
                {children}
            </div>
        </motion.div>
    );
}

// --- Draggable Sidebar Link Component ---
function DraggableSidebarLink({ link, sidebarOpen }: { link: any; sidebarOpen: boolean }) {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: link.id });
    return (
        <div ref={setNodeRef} {...listeners} {...attributes} className={cn("cursor-grab transition-opacity", isDragging && "opacity-50")}>
            <SidebarLink link={link} open={sidebarOpen} />
        </div>
    );
}

// --- Droppable Area Component ---
function DroppableArea({ id, children }: { id: string; children: React.ReactNode }) {
    const { setNodeRef, isOver } = useDroppable({ id });

    // Helper to determine if children exist (to center placeholder text)
    const hasChildren = React.Children.count(children) > 0;

    return (
        <div
            ref={setNodeRef}
            className={cn(
                "h-full w-full space-y-6 p-4 rounded-2xl bg-black/10 border border-dashed border-white/10 flex flex-col overflow-auto transition-colors",
                isOver && "border-cyan-400 bg-cyan-500/5",
                !hasChildren && "items-center justify-center" // Center content if no children
            )}
        >
            {children}
        </div>
    );
}