export const PostWithAuth = (url, body) => {
    var request = fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("tokenKey")
        },
        body: JSON.stringify(body),
        /*mode: "no-cors"*/

    })
    return request
}