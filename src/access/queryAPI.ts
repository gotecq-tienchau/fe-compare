import { axiosClient } from '.';

const queryAPI = {
    sites: {
        getList: async (payload: { stable: string, current: string }) => {
            const dataResponse = await axiosClient.post('/', payload);
            return dataResponse;
        },
    },
    capture: {
        getImage: async (key: string) => {
            const config = {
                data: { key },
            };
            const dataResponse = await axiosClient.post('/capture', config);
            return dataResponse;
        },
    },
};

export { queryAPI };
