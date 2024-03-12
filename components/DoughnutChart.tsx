import React from 'react'

type DoughnutChartProps = {
    progress: number;
}

export default function DoughnutChart({progress}: DoughnutChartProps) {
    const percentage = (progress / 10) * 100;

    const chartStyle = {
        background: `conic-gradient(rgb(246,175,68) ${percentage}%, rgba(57,35,20,255) ${percentage}% 100%)`,
    };

    return (
        <div className='doughnutChart'>
            <div className='chartContainer' style={chartStyle}>
                <div className='chartInner' />
                <div className="chartText">{`${progress.toFixed(0)}/10`}</div>
            </div>
        </div>
    )
}
