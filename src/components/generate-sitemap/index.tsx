import { Button, Layout, Spin, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { queryAPI } from '../../access/queryAPI';
import { useAppDispatch } from '../../app/hook';
import { addKeys } from '../../features';

export const GenerateSitemap = () => {
    const { isLoading, isError, data } = useQuery<any>(
        'sites',
        () =>
            queryAPI.sites.getList({
                stable: 'https://next.vanlangipa.com',
                current: 'https://dev-vanlangipa-com.netlify.app',
            }) as any
    );
    const [rowDataSelect, setRowDataSelect] = useState<any>([]);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const tableCol = [
        { title: 'ID', dataIndex: 'id' },
        { title: 'URL', dataIndex: 'url' },
    ];
    const tableRow = data?.map((entity: any) => ({
        key: entity.id,
        id: entity.id,
        url: entity.url,
    }));

    const handleCompareClick = () => {
        dispatch(addKeys(rowDataSelect));
        navigate('compare');
    };

    return (
        <Layout className="layout-wrap">
            <Layout.Content>
                {isLoading && (
                    <div className="loading-wrap">
                        <Spin size="large" />
                    </div>
                )}
                {!isLoading && tableRow && (
                    <Table
                        className="sitemap-table"
                        rowSelection={{
                            selectedRowKeys: rowDataSelect,
                            onChange: (data) => {
                                setRowDataSelect(data);
                            },
                        }}
                        dataSource={tableRow}
                        columns={tableCol}
                    />
                )}
                {!isLoading && (
                    <Button
                        disabled={isLoading || !!!rowDataSelect.length}
                        type="primary"
                        onClick={handleCompareClick}
                        className="sitemap-btn"
                    >
                        COMPARE
                    </Button>
                )}
            </Layout.Content>
        </Layout>
    );
};
