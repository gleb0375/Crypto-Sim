import React, { JSX } from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
//@ts-ignore
import { PieLabelRenderProps } from "recharts/types/component/Pie";
import { PieWalletChartProps } from "../../../types/wallet.types.ts";

const MIN_PERCENT_TO_LABEL = 1;

const renderLabel = (props: PieLabelRenderProps): JSX.Element | null => {
    const RADIAN = Math.PI / 180;
    const percent = (props.percent ?? 0) * 100;
    if (percent < MIN_PERCENT_TO_LABEL) return null;

    const baseRadius = (props.outerRadius ?? 0) + (percent < 3 ? 30 : 20);
    const x = (props.cx ?? 0) + baseRadius * Math.cos(-props.midAngle! * RADIAN);
    const y = (props.cy ?? 0) + baseRadius * Math.sin(-props.midAngle! * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill={props.fill ?? "#888"}
            textAnchor={x > (props.cx ?? 0) ? "start" : "end"}
            dominantBaseline="central"
            style={{ fontSize: "2vh", fontWeight: 500 }}
        >
            {`${props.name} ${percent.toFixed(0)}%`}
        </text>
    );
};

const renderLabelLine = (props: PieLabelRenderProps): JSX.Element => {
    const percent = (props.percent ?? 0) * 100;
    if (percent < MIN_PERCENT_TO_LABEL) return <></>;

    const RADIAN = Math.PI / 180;
    const outerRadius = props.outerRadius ?? 0;
    const midAngle = props.midAngle ?? 0;
    const cx = props.cx ?? 0;
    const cy = props.cy ?? 0;

    const startX = cx + outerRadius * Math.cos(-midAngle * RADIAN);
    const startY = cy + outerRadius * Math.sin(-midAngle * RADIAN);
    const endX = cx + (outerRadius + 20) * Math.cos(-midAngle * RADIAN);
    const endY = cy + (outerRadius + 20) * Math.sin(-midAngle * RADIAN);

    return (
        <path
            d={`M${startX},${startY}L${endX},${endY}`}
            stroke={props.stroke ?? "#ccc"}
            fill="none"
        />
    );
};

const PieWalletChart: React.FC<PieWalletChartProps > = ({ data, highlightedSymbol }) => (
    <ResponsiveContainer width="100%" aspect={1}>
        <PieChart>
            <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius="55%"
                outerRadius="70%"
                labelLine={renderLabelLine}
                label={renderLabel}
            >
                {data.map((entry, i) => (
                    <Cell
                        key={i}
                        fill={entry.color}
                        style={{
                            opacity:
                                highlightedSymbol && entry.symbol !== highlightedSymbol
                                    ? 0.35
                                    : 1,
                            transition: "opacity .3s ease",
                        }}
                    />
                ))}

            </Pie>
            <Tooltip formatter={(val: number) => `$${val.toLocaleString()}`} />
        </PieChart>
    </ResponsiveContainer>
);

export default React.memo(
    PieWalletChart,
    (prev, next) =>
        JSON.stringify(prev.data) === JSON.stringify(next.data) &&
        prev.highlightedSymbol === next.highlightedSymbol
);
