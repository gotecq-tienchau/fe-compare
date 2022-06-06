import { Collapse } from 'antd';
import React, { useState } from 'react';
import { useAppSelector } from '../../app/hook';
import { Item } from './item';

export const CompareList = () => {
    const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
    const keyList = useAppSelector((state) => state.compareSite);

    const handleCompareDone = () => {
        setCurrentKeyIndex((state: number) => {
            return state + 1 > keyList.keys.length - 1
                ? keyList.keys.length - 1
                : state + 1;
        });
    };

    return (
        <div>
            {!!keyList.keys.length &&
                keyList.keys.map((key) => (
                    <Item
                        key={key}
                        siteKey={key}
                        currentCompareKey={keyList.keys[currentKeyIndex]}
                        onCompareDone={handleCompareDone}
                    />
                ))}
        </div>
    );
};
