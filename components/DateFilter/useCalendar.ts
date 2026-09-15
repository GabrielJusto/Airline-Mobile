import { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";

const WIDE_SCREEN_BREAKPOINT = 768;

export const WEEKDAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const MONTH_LABELS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

function startOfDay(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function startOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function isSameDay(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear()
        && a.getMonth() === b.getMonth()
        && a.getDate() === b.getDate();
}

/**
 * The month laid out as calendar cells, padded with nulls so that the first day
 * falls on its weekday column and every row holds seven cells.
 */
export function buildMonthCells(month: Date): (Date | null)[] {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const leadingBlanks = new Date(year, monthIndex, 1).getDay();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

    const cells: (Date | null)[] = new Array(leadingBlanks).fill(null);

    for (let day = 1; day <= daysInMonth; day++) {
        cells.push(new Date(year, monthIndex, day));
    }

    while (cells.length % 7 !== 0) {
        cells.push(null);
    }

    return cells;
}

export function useCalendar(value: Date, onChange: (date: Date) => void) {
    const [isOpen, setIsOpen] = useState(false);
    const [visibleMonth, setVisibleMonth] = useState(startOfMonth(value));

    const { width } = useWindowDimensions();
    const isWideScreen = width >= WIDE_SCREEN_BREAKPOINT;

    const today = startOfDay(new Date());
    const cells = buildMonthCells(visibleMonth);
    const monthLabel = `${MONTH_LABELS[visibleMonth.getMonth()]} ${visibleMonth.getFullYear()}`;
    const isAtCurrentMonth = isSameDay(startOfMonth(today), visibleMonth);

    useEffect(() => {
        if (isOpen) {
            setVisibleMonth(startOfMonth(value));
        }
    }, [isOpen, value]);

    function open() {
        setIsOpen(true);
    }

    function close() {
        setIsOpen(false);
    }

    function goToPreviousMonth() {
        setVisibleMonth(function (current) {
            return new Date(current.getFullYear(), current.getMonth() - 1, 1);
        });
    }

    function goToNextMonth() {
        setVisibleMonth(function (current) {
            return new Date(current.getFullYear(), current.getMonth() + 1, 1);
        });
    }

    function isDisabled(date: Date): boolean {
        return date.getTime() < today.getTime();
    }

    function selectDate(date: Date) {
        if (isDisabled(date)) {
            return;
        }

        onChange(date);
        close();
    }

    return {
        isOpen,
        isWideScreen,
        open,
        close,
        cells,
        monthLabel,
        isAtCurrentMonth,
        goToPreviousMonth,
        goToNextMonth,
        isDisabled,
        selectDate,
        today
    };
}
