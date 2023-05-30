import axios from "axios";

const BASE_URL = "https://youtube138.p.rapidapi.com";

const options = {
    params: { hl: "en", gl: "US" },
    headers: {
        "X-RapidAPI-Key": 'YGLSgpT6iUmshP8crFHYR2IK8gG5p1yn0CzjsnP6wclM6Vzcqt',
        "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
    },
};

export const fetchDataFromApi = async (url) => {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    return data;
};

// import.meta.env.REACT_APP_YOUTUBE_API_KEY