export const apiRequest = async (url, method = "GET", requestBody = null, token = "", headers = {}) => {
    const defaultHeaders = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    const options = {
        method: method,
        headers: { ...defaultHeaders, ...headers },
    };
    if (requestBody && method !== "GET") {
        options.body = JSON.stringify(requestBody);
    }
    try {
        const response = await fetch(url, options);
        const data = await response.json(); // Wait for the JSON data to resolve
        return { response:data, error: null };
    } catch (error) {
        console.error("Something went wrong:", error);
        return { response: null, error: error.message };
    }
};
