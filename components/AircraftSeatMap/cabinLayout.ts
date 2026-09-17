import { Seat } from "@/interfaces/Seat";

export const SEAT_WIDTH = 42;
export const SEAT_HEIGHT = 44;
export const SEAT_GAP = 6;
export const AISLE_WIDTH = 40;
export const ROW_GAP = 8;
export const CABIN_PADDING = 22;
export const NOSE_HEIGHT = 92;
export const TAIL_HEIGHT = 104;
export const SECTION_GAP = 24;
export const SECTION_HEADER_HEIGHT = 28;

const WING_SPAN_RATIO = 1.5;
const CLASS_ORDER = ["FirstClass", "Executive", "Economic"];

export interface CabinRow {
    number: number;
    left: (Seat | null)[];
    right: (Seat | null)[];
}

export interface CabinSection {
    seatClass: string;
    rows: CabinRow[];
}

export interface CabinLayout {
    sections: CabinSection[];
    aisleWidth: number;
    fuselageWidth: number;
    planeWidth: number;
    planeHeight: number;
}

function classRank(seatClass: string): number {
    const rank = CLASS_ORDER.indexOf(seatClass);

    return rank === -1 ? CLASS_ORDER.length : rank;
}

function groupByClass(seats: Seat[]): Map<string, Seat[]> {
    return seats.reduce(function (groups: Map<string, Seat[]>, seat: Seat) {
        const group = groups.get(seat.seatClass);

        if (group) {
            group.push(seat);
        } else {
            groups.set(seat.seatClass, [seat]);
        }

        return groups;
    }, new Map());
}

function buildSection(seatClass: string, seats: Seat[]): CabinSection {
    const columns = Array.from(new Set(seats.map(seat => seat.column))).sort();
    const rowNumbers = Array.from(new Set(seats.map(seat => seat.row))).sort((a, b) => a - b);

    const aisleIndex = Math.ceil(columns.length / 2);
    const leftColumns = columns.slice(0, aisleIndex);
    const rightColumns = columns.slice(aisleIndex);

    // Seeded cabins can repeat a position, and a seat can only be drawn once, so
    // the first one returned owns the spot.
    const seatsByPosition = new Map<string, Seat>();

    seats.forEach(function (seat) {
        const position = `${seat.row}${seat.column}`;

        if (!seatsByPosition.has(position)) {
            seatsByPosition.set(position, seat);
        }
    });

    function seatsOfRow(rowNumber: number, rowColumns: string[]): (Seat | null)[] {
        return rowColumns.map(column => seatsByPosition.get(`${rowNumber}${column}`) ?? null);
    }

    return {
        seatClass,
        rows: rowNumbers.map(function (rowNumber) {
            return {
                number: rowNumber,
                left: seatsOfRow(rowNumber, leftColumns),
                right: seatsOfRow(rowNumber, rightColumns)
            };
        })
    };
}

function sectionHeight(section: CabinSection): number {
    return SECTION_HEADER_HEIGHT + section.rows.length * (SEAT_HEIGHT + ROW_GAP);
}

export function buildCabinLayout(seats: Seat[]): CabinLayout {
    const sections = Array.from(groupByClass(seats))
        .sort(([a], [b]) => classRank(a) - classRank(b) || a.localeCompare(b))
        .map(([seatClass, classSeats]) => buildSection(seatClass, classSeats));

    const widestSection = sections.reduce(function (widest: number, section: CabinSection) {
        const columns = section.rows[0] ? section.rows[0].left.length + section.rows[0].right.length : 0;

        return Math.max(widest, columns);
    }, 0);

    const cabinWidth = widestSection * (SEAT_WIDTH + SEAT_GAP) + AISLE_WIDTH - 2 * SEAT_GAP;
    const cabinHeight = sections.reduce((total, section) => total + sectionHeight(section), 0)
        + Math.max(sections.length - 1, 0) * SECTION_GAP;
    const fuselageWidth = cabinWidth + CABIN_PADDING * 2;

    return {
        sections,
        aisleWidth: AISLE_WIDTH - 2 * SEAT_GAP,
        fuselageWidth,
        planeWidth: Math.round(fuselageWidth * WING_SPAN_RATIO),
        planeHeight: NOSE_HEIGHT + cabinHeight + TAIL_HEIGHT
    };
}
