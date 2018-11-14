export function WITH_BODY(url, method, headers, body) {
    return fetch(url,
        {
            method: method,
            headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "Autorization": headers
                     },
            body: body,
            mode: "cors"
        })
}

export function WITHOUT_BODY(url , method) {
    return fetch(url, 
            {
                method: method,
                headers: {"Content-type": "application/json; charset=UTF-8"},
                mode: "cors"
            })
}