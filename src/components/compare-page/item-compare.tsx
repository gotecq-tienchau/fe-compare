import { Spin, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import resemble from 'resemblejs';

export const ItemCompare = ({ data, isMismatch }: any) => {
    const [isProcessing, setIsProcessing] = useState(true);
    const [compareData, setCompareData] = useState<any>();
    console.log(
        '🚀 ~ file: item-compare.tsx ~ line 8 ~ ItemCompare ~ compareData',
        compareData
    );

    useEffect(() => {
        resemble(data.stable.url)
            .compareTo(data.current.url)
            .ignoreLess()
            .onComplete((data) => {
                setCompareData(data);
                setIsProcessing(false);
                isMismatch(Number(data.misMatchPercentage));
            });
    }, [data.stable.url]);

    return (
        <div className="compare-item">
            {isProcessing && <Spin className="spin-center" />}
            {!isProcessing && (
                <div className="compare-item-content">
                    <div className="compare-item-header">
                        <Typography.Paragraph>
                            Breakpoint: {data.stable.breakPoint}px
                        </Typography.Paragraph>
                        <Typography.Paragraph>
                            Mismatch: {compareData.misMatchPercentage}%
                        </Typography.Paragraph>
                        <Typography.Paragraph>
                            Analysis Time: {compareData.analysisTime}ms
                        </Typography.Paragraph>
                    </div>
                    <img
                        className="compare-image"
                        src={compareData.getImageDataUrl()}
                    />
                </div>
            )}
        </div>
    );
};
