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

//clears the area with the pictures from the DOM
const clear = () => {
    const resetButtonArea = document.getElementById("reset-button-wrapper");
    const dailyPhotosTitle = document.getElementById("daily-photos-title");
    const dailyPhotosGrid = document.querySelector('#daily-photos-grid');
    resetButtonArea.innerHTML = "";
    dailyPhotosTitle.innerHTML = "";
    dailyPhotosGrid.innerHTML = ""
}

// updates DOM with API Data
const updateDOM = (arr) => {
    // Title
    const dailyPhotosTitle = document.getElementById("daily-photos-title");
    let photosOfTheDayTitle = document.createElement('h2');
    photosOfTheDayTitle.innerText = "NASA Photos of the Day";
    dailyPhotosTitle.appendChild(photosOfTheDayTitle);

    // Cards with images and descriptions
    const dailyPhotosGrid = document.querySelector('#daily-photos-grid');
    for (item of arr) {
        let card = document.createElement("div");
        card.className = "card";
        if (item.media_type === "image") {
            card.innerHTML = `
            <h3>${item.title}</h3>
            <img src="${item.url}">
            <p>${item.explanation}</p>
            <p>Date:${item.date}</p>
            `
        } else {
            card.innerHTML = `
            <h3>${item.title}</h3>
            <iframe src="${item.url}"></iframe>
            <p>${item.explanation}</p>
            <p>Date:${item.date}</p>
            `
        }
        if (item.copyright != null) {
            card.innerHTML += `<p>Photographer:${item.copyright}</p>`
        }
        dailyPhotosGrid.appendChild(card);
    }

    // Reset button
    const resetButtonArea = document.getElementById("reset-button-wrapper");
    let resetButton = document.createElement("button");
    resetButton.innerText = "RESET";
    resetButton.addEventListener("click", clear);
    resetButtonArea.appendChild(resetButton);

}



// this is the onclick function that runs the other functions
function doEverything() {
    getDates();
    getPicsFromNASA(dates);
}