import { Spin, Tag, Typography } from 'antd';
import React from 'react';

export const ItemHeader = ({ data }: any) => {
    const { getImageStatusDone, siteKey, isMismatch } = data;

    return (
        <div className="item-header">
            {!getImageStatusDone ? (
                <Tag color={'geekblue'} className="item-header-status">
                    <Spin
                        size="small"
                        style={{ transform: 'translateY(3px)' }}
                    />
                    <Typography.Text style={{ fontWeight: 'bold' }}>
                        Processing
                    </Typography.Text>
                </Tag>
            ) : (
                <Tag color={'green'}>Capture Image Done</Tag>
            )}
            {isMismatch && <Tag color={'error'}>Mismatch</Tag>}
            <div className="header-content">
                <Typography.Text>{siteKey}</Typography.Text>
            </div>
        </div>
    );
};
