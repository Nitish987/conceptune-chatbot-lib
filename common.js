class Credentials {
    static baseUrl = 'http://127.0.0.1:8800'
    static projectId = null;
    static apiId = null;
    static apiKey = null;
}

const container = document.getElementById('conceptuneChatbot');
Credentials.projectId = container.getAttribute('projectId');
Credentials.apiId = container.getAttribute('apiId');
Credentials.apiKey = container.getAttribute('apiKey');

class HttpClient {

    constructor() {}

    static async post(path, headers, data) {
        const url = Credentials.baseUrl + path
        console.log(url)
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            credentials: 'include',
            body: JSON.stringify(data)
        });
        return response.json();
    }
}