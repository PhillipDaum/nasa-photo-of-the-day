// GLOBAL VARIABLES
// Start and end dates for API call
const dates = [];

// gets todays date and 3 days ago's date, formats correctly, pushes to date array
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

// fetches information from NASA pushes to fourDailyPhotos array
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
            updateDOM(data)
        })
}

const updateDOM = (arr) => {
    console.log(arr);
    const dailyPhotosArea = document.querySelector('#daily-photos-grid');
    for (item of arr) {
        let card = document.createElement("div");
        card.className = "card";
        if (item.media_type === "image") {
            card.innerHTML = `
            <h2>${item.title}</h2>
            <img src="${item.url}">
            <p>${item.explanation}</p>
            <p>Date:${item.date}</p>
    
            
            
            `
        } else {
            card.innerHTML = `
            <h2>${item.title}</h2>
            <iframe src="${item.url}"></iframe>
            `

        }

        dailyPhotosArea.appendChild(card);
    }

}

function doEverything() {
    getDates();
    getPicsFromNASA(dates);
}