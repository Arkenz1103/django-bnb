import { getAccessToken } from "../lib/actions";

const apiService = {
    get: async function (url: string): Promise<any> {
        console.log('get', url);

        const token = await getAccessToken();

        return new Promise((resolve, reject) => {
            const fetchUrl = `${process.env.NEXT_PUBLIC_API_HOST}${url}`.replace(/([^:]\/)\/+/g, '$1');

            fetch(fetchUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then((json) => {
                    console.log('Response:', json);

                    resolve(json);
                })
                .catch((error => {
                    reject(error);
                }))
        })
    },

    post: async function(url: string, data: any, isFormData: boolean = false): Promise<any> {
        console.log('post', url, data);

        const token = await getAccessToken();
        
        const headers: HeadersInit = {
            'Authorization': `Bearer ${token}`
        };
        
        // Don't set Content-Type for FormData, let the browser set it with the correct boundary
        if (!isFormData) {
            headers['Content-Type'] = 'application/json';
        }

        return new Promise((resolve, reject) => {
            const fetchUrl = `${process.env.NEXT_PUBLIC_API_HOST}${url}`.replace(/([^:]\/)\/+/g, '$1');

            fetch(fetchUrl, {
                method: 'POST',
                body: isFormData ? data : JSON.stringify(data),
                headers,
                credentials: 'include' // Important for cookies, authorization headers with HTTPS
            })
            .then(async (response) => {
                const data = await response.json().catch(() => ({}));
                
                if (!response.ok) {
                    // If the server returned an error, reject with the error data
                    const error = new Error(response.statusText);
                    Object.assign(error, { response: { data, status: response.status } });
                    throw error;
                }
                
                console.log('Response:', data);
                resolve(data);
            })
            .catch(error => {
                console.error('API call failed:', error);
                reject(error);
            });
        });
    },

    postWithoutToken: async function(url: string, data: any): Promise<any> {
        console.log('post', url, data);

        return new Promise((resolve, reject) => {
            const fetchUrl = `${process.env.NEXT_PUBLIC_API_HOST}${url}`.replace(/([^:]\/)\/+/g, '$1');

            fetch(fetchUrl, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then((json) => {
                    console.log('Response:', json);

                    resolve(json);
                })
                .catch((error => {
                    reject(error);
                }))
        })
    }
}

export default apiService;