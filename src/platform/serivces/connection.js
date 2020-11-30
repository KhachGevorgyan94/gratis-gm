import * as nodeFetch from 'node-fetch';



class Connection {

    static BASE_URL = 'https://api.gratisgm.com/dashboard';

    // static getToken = (() => {
    //     const cookies = new Cookies();
    //     return cookies.get('token')
    // })();

    static queryFromObject = obj => {
        var str = [];

        for (var p in obj)
            if (obj.hasOwnProperty(p) && (obj[p])) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return str.join("&");
    }

    static createHeaders = (isUpload) => {
        const HEADERS = new Headers();
        const token = window.localStorage.getItem('token');
        token && HEADERS.append('Auth',`Gratis ${localStorage.getItem('token')}`);
        if(!isUpload){
            HEADERS.append('Content-Type', 'application/json')
            HEADERS.append('Accept', 'application/json')
        }
        return HEADERS;
    }

    static responseRestructure = response => {
        if (response.status === 401) {
            // TODO: Logout
            window.location.reload();
        }

        return response.ok ? response.json() : {};
    }

    static stringifyUrlEncoded = obj => {
        let urlEncoded = '';
        for (let key in obj) {
            urlEncoded += `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}&`;
        }
        return urlEncoded;
    }

    static POST = async (controllerName, actionName, body, queryConfig, isUpload) => {
        const onlyQuery = !actionName && queryConfig;
      window.pendingRequest = true;
      const HEADERS = Connection.createHeaders(isUpload)
      const response = await fetch(`${Connection.BASE_URL}/${controllerName}${!onlyQuery ? '/' : ''}${actionName}${queryConfig ? `?${Connection.queryFromObject(queryConfig)}` : ''}`, {
        body: isUpload ? body : JSON.stringify(body),
        method: 'POST',
        headers: HEADERS,
        // credentials: 'include',
      });

      window.pendingRequest = false;
      return Connection.responseRestructure(response);
    }

    static PUT = async (controllerName, actionName, body, queryConfig) => {
        const onlyQuery = !actionName && queryConfig;
        const HEADERS = Connection.createHeaders();
        window.pendingRequest = true;
        const response = await fetch(`${Connection.BASE_URL}/${controllerName}${!onlyQuery ? '/' : ''}${actionName}${queryConfig ? `?${Connection.queryFromObject(queryConfig)}` : ''}`, {
            body: JSON.stringify(body),
            method: 'PUT',
            headers: HEADERS,
            // credentials: 'include',
        })

        window.pendingRequest = false;
        return Connection.responseRestructure(response);
    }

    static DELETE = async (controllerName, actionName, queryConfig) => {
        const onlyQuery = !actionName && queryConfig;
        const HEADERS = Connection.createHeaders();
        window.pendingRequest = true;
        const response = await fetch(`${Connection.BASE_URL}/${controllerName}${!onlyQuery ? '/' : ''}${actionName}${queryConfig ? `?${Connection.queryFromObject(queryConfig)}` : ''}`, {
            method: 'DELETE',
            headers: HEADERS,
            // credentials: 'include',
        });

        window.pendingRequest = false;
        return Connection.responseRestructure(response);
    }

    static GET = async (controllerName, actionName, queryConfig) => {
        const onlyQuery = !actionName && queryConfig;
        const HEADERS = Connection.createHeaders();
        window.pendingRequest = true;
        const response = await fetch(`${Connection.BASE_URL}/${controllerName}${!onlyQuery ? '/' : ''}${actionName}${queryConfig ? `?${Connection.queryFromObject(queryConfig)}` : ''}`, {
            method: 'GET',
            headers: HEADERS,
            // credentials: 'include',
        });

        window.pendingRequest = false;
        return Connection.responseRestructure(response);
    }

    static UPLOAD = async (controllerName, actionName, body, queryConfig) => {
        const onlyQuery = !actionName && queryConfig;
        const HEADERS = Connection.createHeaders(true);
        const response = await fetch(`${Connection.BASE_URL}/${controllerName}${!onlyQuery ? '/' : ''}${actionName}${queryConfig ? `?${Connection.queryFromObject(queryConfig)}` : ''}`, {
            body,
            method: 'POST',
            headers: HEADERS,
            credentials: 'include',
        });

        return Connection.responseRestructure(response);
    }

    static ServerRequest = async ({method, controllerName, actionName, body, queryConfig}) => {
        const onlyQuery = !actionName && queryConfig;
        const response = await nodeFetch(`${Connection.BASE_URL}/${controllerName}${!onlyQuery ? '/' : ''}${actionName}${queryConfig ? `?${Connection.queryFromObject(queryConfig)}` : ''}`, {
            body,
            method,
        });

        return response.ok ? response.json() : {};
    }
}

export default Connection;
