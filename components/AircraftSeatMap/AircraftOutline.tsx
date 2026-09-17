import Svg, { Path } from "react-native-svg";
import { colors } from "@/styles/global.styles";

interface Props {
    width: number;
    height: number;
    fuselageWidth: number;
    noseHeight: number;
    tailHeight: number;
}

const WING_CHORD = 126;
const WING_TIP_SWEEP = 78;
const WING_TIP_CHORD = 26;
const FIN_CHORD = 52;
const FIN_TIP_SWEEP = 30;
const FIN_TIP_CHORD = 14;

export const AircraftOutline = ({ width, height, fuselageWidth, noseHeight, tailHeight }: Props) => {
    const centerX = width / 2;
    const halfBody = fuselageWidth / 2;
    const leftBody = centerX - halfBody;
    const rightBody = centerX + halfBody;

    const fuselage = [
        `M ${leftBody} ${noseHeight}`,
        `C ${leftBody} ${noseHeight * 0.5}, ${centerX - halfBody * 0.34} 0, ${centerX} 0`,
        `C ${centerX + halfBody * 0.34} 0, ${rightBody} ${noseHeight * 0.5}, ${rightBody} ${noseHeight}`,
        `L ${rightBody} ${height - tailHeight}`,
        `C ${rightBody} ${height - tailHeight * 0.3}, ${centerX + halfBody * 0.62} ${height}, ${centerX + halfBody * 0.3} ${height}`,
        `L ${centerX - halfBody * 0.3} ${height}`,
        `C ${centerX - halfBody * 0.62} ${height}, ${leftBody} ${height - tailHeight * 0.3}, ${leftBody} ${height - tailHeight}`,
        "Z"
    ].join(" ");

    const wingTop = noseHeight + (height - noseHeight - tailHeight) * 0.2;
    const finTop = height - tailHeight + 12;
    const finSpan = halfBody * 0.72;

    const leftWing = `M ${leftBody} ${wingTop} L 2 ${wingTop + WING_TIP_SWEEP} L 2 ${wingTop + WING_TIP_SWEEP + WING_TIP_CHORD} L ${leftBody} ${wingTop + WING_CHORD} Z`;
    const rightWing = `M ${rightBody} ${wingTop} L ${width - 2} ${wingTop + WING_TIP_SWEEP} L ${width - 2} ${wingTop + WING_TIP_SWEEP + WING_TIP_CHORD} L ${rightBody} ${wingTop + WING_CHORD} Z`;

    const leftFin = `M ${leftBody} ${finTop} L ${leftBody - finSpan} ${finTop + FIN_TIP_SWEEP} L ${leftBody - finSpan} ${finTop + FIN_TIP_SWEEP + FIN_TIP_CHORD} L ${leftBody} ${finTop + FIN_CHORD} Z`;
    const rightFin = `M ${rightBody} ${finTop} L ${rightBody + finSpan} ${finTop + FIN_TIP_SWEEP} L ${rightBody + finSpan} ${finTop + FIN_TIP_SWEEP + FIN_TIP_CHORD} L ${rightBody} ${finTop + FIN_CHORD} Z`;

    const cockpit = `M ${centerX - halfBody * 0.52} ${noseHeight * 0.62} C ${centerX - halfBody * 0.3} ${noseHeight * 0.3}, ${centerX + halfBody * 0.3} ${noseHeight * 0.3}, ${centerX + halfBody * 0.52} ${noseHeight * 0.62}`;

    return (
        <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            <Path d={leftWing} fill="#DCE9E7" stroke={colors.gray} strokeWidth={1} strokeLinejoin="round" />
            <Path d={rightWing} fill="#DCE9E7" stroke={colors.gray} strokeWidth={1} strokeLinejoin="round" />
            <Path d={leftFin} fill="#DCE9E7" stroke={colors.gray} strokeWidth={1} strokeLinejoin="round" />
            <Path d={rightFin} fill="#DCE9E7" stroke={colors.gray} strokeWidth={1} strokeLinejoin="round" />
            <Path d={fuselage} fill="#FFFFFF" stroke={colors.gray} strokeWidth={1.5} />
            <Path d={cockpit} fill="none" stroke={colors.gray} strokeWidth={1.5} strokeLinecap="round" />
        </Svg>
    );
};
