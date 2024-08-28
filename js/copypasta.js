// Updates Dom with the photos their relevant information
const updateDOM = (arr) => {
    const dailyPhotosArea = document.querySelector('#daily-photos-grid');
    let card = document.createElement("div");
    card.className = "card";
    card.innerText = "hello"
    dailyPhotosArea.appendChild(card);
}

const clear = () => {
    //clears the area with the pictures from the DOM
}