import axios from "axios";

const BASE_URL = "https://youtube138.p.rapidapi.com";
// const YOUTUBE_API_KEY = import.meta.env.REACT_APP_YOUTUBE_API_KEY;

const options = {
    params: { hl: "en", gl: "US" },
    headers: {
        "X-RapidAPI-Key": 'b49ce7b1a6msh078d226af2350e9p1e2c7ejsnff7253f47f1e',
        "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
    },
};

export const fetchDataFromApi = async (url) => {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    return data;
};