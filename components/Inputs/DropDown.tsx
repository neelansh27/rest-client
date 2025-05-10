// components/Dropdown.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';

interface DropdownProps<T> {
    options: T[];
    selected: T;
    onSelectAction: (value: T) => void;
}

export function Dropdown<T extends string>({
                                               options,
                                               selected,
                                               onSelectAction,
                                           }: DropdownProps<T>) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (!containerRef.current?.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        window.addEventListener('mousedown', handleClick);
        return () => window.removeEventListener('mousedown', handleClick);
    }, []);

    return (
        <div ref={containerRef} className="relative inline-block text-left">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="px-3 py-2 border rounded flex items-center justify-between w-32"
            >
                <span>{selected}</span>
                <svg
                    className={`h-4 w-4 transform transition-transform ${open ? 'rotate-180' : 'rotate-0'}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                </svg>
            </button>

            {open && (
                <ul className="absolute mt-1 w-full bg-white border overflow-hidden rounded shadow-lg z-10">
                    {options.map((opt) => {
                        const isSelected = opt === selected;
                        return (
                            <li
                                key={opt}
                                onClick={() => {
                                    onSelectAction(opt);
                                    setOpen(false);
                                }}
                                className={`px-3 text-white py-2 cursor-pointer flex justify-between items-center ${
                                    isSelected ? 'bg-gray-800' : 'bg-black hover:bg-gray-700'
                                }`}
                            >
                                <span>{opt}</span>
                        </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
