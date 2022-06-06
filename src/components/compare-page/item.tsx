import { Collapse, Spin } from 'antd';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import React, { useEffect, useState } from 'react';
import { axiosClient } from '../../access';
import { ItemCompare } from './item-compare';
import { ItemHeader } from './item-header';

export const Item = ({
    siteKey,
    currentCompareKey,
    onCompareDone,
}: {
    siteKey: string;
    currentCompareKey: string;
    onCompareDone: () => void;
}) => {
    const [image, setImage] = useState<any>();
    const [getImageStatusDone, setGetImageStatusDone] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isMismatch, setIsMismatch] = useState(false);

    const handleIsMismatch = (value: number) => {
        if (value > 0 && isMismatch !== true) {
            setIsMismatch(true);
        }
    };

    useEffect(() => {
        (async () => {
            if (currentCompareKey === siteKey) {
                try {
                    const res = await axiosClient.post('/capture', {
                        data: { key: siteKey },
                    });
                    setImage(res);
                    setGetImageStatusDone(true);
                    setIsError(false);
                    onCompareDone();
                } catch (error) {
                    setGetImageStatusDone(true);
                    setIsError(true);
                }
            }
        })();
    }, [currentCompareKey, siteKey]);

    return (
        <Collapse>
            <CollapsePanel
                key={siteKey}
                header={
                    <ItemHeader
                        data={{ siteKey, getImageStatusDone, isMismatch }}
                    />
                }
            >
                <>
                    {((isError) => {
                        switch (isError) {
                            case true:
                                return <p>Capture Image Error</p>;
                            case false:
                                return (
                                    !getImageStatusDone && (
                                        <Spin className="spin-center" />
                                    )
                                );
                        }
                    })(isError)}
                    <div className="compare-list-row">
                        {image?.stable &&
                            image.stable.map((_: any, idx: number) => {
                                return (
                                    <ItemCompare
                                        key={idx}
                                        data={{
                                            stable: image.stable[idx],
                                            current: image.current[idx],
                                        }}
                                        isMismatch={handleIsMismatch}
                                    />
                                );
                            })}
                    </div>
                </>
            </CollapsePanel>
        </Collapse>
    );
};
