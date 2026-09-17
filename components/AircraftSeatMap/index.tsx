import { useEffect, useRef, useState } from "react";
import { LayoutChangeEvent, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Seat } from "@/interfaces/Seat";
import { colors } from "@/styles/global.styles";
import { AircraftOutline } from "./AircraftOutline";
import { aircraftSeatMapStyles as style } from "./aircraftSeatMap.styles";
import { buildCabinLayout, CabinRow, CabinSection, NOSE_HEIGHT, TAIL_HEIGHT } from "./cabinLayout";

interface Props {
    seats: Seat[];
    selectedSeat: Seat | null;
    onSeatSelect: (seat: Seat) => void;
}

export function formatSeatClass(seatClass: string): string {
    return seatClass.replace(/([a-z])([A-Z])/g, "$1 $2");
}

function formatSeatPrice(price: number): string {
    return price.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function SeatTile({ seat, isSelected, onSelect }: { seat: Seat | null, isSelected: boolean, onSelect: (seat: Seat) => void }) {
    if (!seat) {
        return <View style={style.seat} />;
    }

    const stateStyle = isSelected
        ? style.selectedSeat
        : seat.isAvailable ? style.availableSeat : style.unavailableSeat;

    const textStyle = isSelected
        ? style.selectedSeatText
        : seat.isAvailable ? null : style.unavailableSeatText;

    return (
        <Pressable
            style={[style.seat, stateStyle]}
            disabled={!seat.isAvailable}
            onPress={() => onSelect(seat)}
        >
            <Text style={[style.seatLabelText, textStyle]}>
                {seat.row}{seat.column}
            </Text>
            <Text style={[style.seatPriceText, textStyle]} numberOfLines={1}>
                {seat.isAvailable ? formatSeatPrice(seat.price) : "sold"}
            </Text>
        </Pressable>
    );
}

function SeatRow({ row, aisleWidth, selectedSeatId, onSeatSelect }: { row: CabinRow, aisleWidth: number, selectedSeatId?: number, onSeatSelect: (seat: Seat) => void }) {
    function renderSeat(seat: Seat | null, index: number) {
        return (
            <SeatTile
                key={seat ? seat.id : `empty-${row.number}-${index}`}
                seat={seat}
                isSelected={seat?.id === selectedSeatId}
                onSelect={onSeatSelect}
            />
        );
    }

    return (
        <View style={style.row}>
            {row.left.map(renderSeat)}
            <View style={[style.aisle, { width: aisleWidth }]}>
                <Text style={style.rowNumberText}>
                    {row.number}
                </Text>
            </View>
            {row.right.map(renderSeat)}
        </View>
    );
}

function LegendItem({ color, borderColor, label }: { color: string, borderColor: string, label: string }) {
    return (
        <View style={style.legendItem}>
            <View style={[style.legendSwatch, { backgroundColor: color, borderWidth: 1.5, borderColor }]} />
            <Text style={style.legendText}>
                {label}
            </Text>
        </View>
    );
}

export const AircraftSeatMap = ({ seats, selectedSeat, onSeatSelect }: Props) => {
    const layout = buildCabinLayout(seats);
    const scroll = useRef<ScrollView>(null);
    const [viewportWidth, setViewportWidth] = useState(0);

    // Centering a scrollable row makes the overflowing side unreachable, so the
    // plane only centers while it fits.
    const fitsOnScreen = viewportWidth >= layout.planeWidth;

    // A wingtip is the last thing the traveller wants to look at first, so on a
    // narrow screen the cabin starts under the viewport instead of the left edge.
    function centerCabin() {
        if (viewportWidth > 0 && !fitsOnScreen) {
            scroll.current?.scrollTo({ x: (layout.planeWidth - viewportWidth) / 2, animated: false });
        }
    }

    function measureViewport(event: LayoutChangeEvent) {
        setViewportWidth(event.nativeEvent.layout.width);
    }

    useEffect(centerCabin, [viewportWidth, layout.planeWidth]);

    return (
        <View>
            <View style={style.legend}>
                <LegendItem color="#F1F8F6" borderColor={colors.primary} label="Available" />
                <LegendItem color={colors.orange} borderColor={colors.orange} label="Selected" />
                <LegendItem color="#E7EDEC" borderColor={colors.gray} label="Unavailable" />
            </View>
            <ScrollView
                ref={scroll}
                horizontal={true}
                onLayout={measureViewport}
                onContentSizeChange={centerCabin}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={[style.scrollContent, fitsOnScreen && style.centeredContent]}
            >
                <View style={{ width: layout.planeWidth, height: layout.planeHeight }}>
                    <View style={StyleSheet.absoluteFill}>
                        <AircraftOutline
                            width={layout.planeWidth}
                            height={layout.planeHeight}
                            fuselageWidth={layout.fuselageWidth}
                            noseHeight={NOSE_HEIGHT}
                            tailHeight={TAIL_HEIGHT}
                        />
                    </View>
                    <View style={[style.cabin, { paddingTop: NOSE_HEIGHT }]}>
                        {layout.sections.map(function (section: CabinSection) {
                            return (
                                <View key={section.seatClass} style={style.section}>
                                    <Text style={style.sectionTitleText}>
                                        {formatSeatClass(section.seatClass)}
                                    </Text>
                                    {section.rows.map(function (row) {
                                        return (
                                            <SeatRow
                                                key={row.number}
                                                row={row}
                                                aisleWidth={layout.aisleWidth}
                                                selectedSeatId={selectedSeat?.id}
                                                onSeatSelect={onSeatSelect}
                                            />
                                        );
                                    })}
                                </View>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};
