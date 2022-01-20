// export const BASE_URL = "http://localhost:5000";
export const BASE_URL = "https://wordle-clone-api.herokuapp.com";

export const get = async (endpoint) => {
    let response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return JSON.parse(await response.text());
};

export const post = async (values, endpoint) => {
    let response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values }),
    });
    return JSON.parse(await response.text());
};
