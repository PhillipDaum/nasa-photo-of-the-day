// Global Variables

// Array for daily photos 
const fourDailyPhotos = [];
// Start and end dates for API call
const dates = [];

const getDates = () => {
    // Today in YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0];
    // 3 days ago in YYYY-MM-DD
    let threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    threeDaysAgo = threeDaysAgo.toISOString().split("T")[0];
    // push them to the date array
    dates.push(today, threeDaysAgo);
}
getDates();



const getPicsFromNASA = (arr) => {
    // API call components
    const baseURL = "https://api.nasa.gov/";
    const endPoint = "planetary/apod";
    const myKey = "YFd2rMGO2R7KJipZ2lXdYqMP2dsmq3pWKEOz9NXQ";
    // API call URL
    const callURL = `${baseURL}${endPoint}?start_date=${arr[1]}&end_date=${arr[0]}&api_key=${myKey}`;
    //fetching stuff from NASA, change format, push to fourDailyPhotos array
    fetch(callURL)
    .then((response) => response.json())
    .then((data) => {
        data.map((x) => fourDailyPhotos.push(x));
    }
    )
}
getPicsFromNASA(dates);

const updateDOM = (arr) => {
    //uses array to update dom
    // title
    // image
    // description
    // date
    // photographer
}

const clear = () => {
    //clears the area with the pictures from the DOM
}
