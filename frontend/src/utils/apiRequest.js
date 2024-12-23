export const   apiRequest = async (url, method = "GET", requestBody = null, token = "", headers = {}) => {
    const defaultHeaders = {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : "" 
    };
    const options = {
        method: method,
        headers: { ...defaultHeaders, ...headers },
        credentials: "include", 
    };
    if (requestBody && method !== "GET") {
        options.body = JSON.stringify(requestBody);
    }
    try {
        const response = await fetch(url, options);
        const data = await response.json(); // Wait for the JSON data to resolve
        return data;
    } catch (error) { // if internet and backend not responding
        console.error("Something went wrong:", error);
        return  {statusCode:503,success:false,message:"Internet connection weak"};
    }
};
