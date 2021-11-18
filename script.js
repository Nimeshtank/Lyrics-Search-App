const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const back = document.getElementById('back');

const apiURL = "https://api.lyrics.ovh";

// Get Search Value
form.addEventListener("submit", e => {
    e.preventDefault();
    searchValue = search.value.trim();

    if (!searchValue) {
        alert("Nothing to search");
    } else {
        beginSearch(searchValue);
    }
})

// Search function
// async returns a promise
async function beginSearch(searchValue) {
    const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`);
    const data = await searchResult.json(); // response.json() also returns a promise

    displayData(data);
}

// Display Search Result
function displayData(data) {
    result.innerHTML = `
    <ul class="songs">
      ${data.data
            .map(song => `<li>
                    <div>
                        <strong>${song.artist.name}</strong> - ${song.title} 
                    </div>
                    <span data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</span>
                </li>`
            )
            .join('')}
    </ul>
  `;
}

//event listener in get lyrics button
result.addEventListener('click', e => {
    const clickedElement = e.target;

    //checking clicked elemet is button or not
    if (clickedElement.tagName === 'SPAN') {
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');

        getLyrics(artist, songTitle)
    }
})

// Get lyrics for song
async function getLyrics(artist, songTitle) {

    try {
        const response = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
        const data = await response.json();

        const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

        result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
    <p class="lyrics">${lyrics}</p>`;
    }
    catch{
        result.innerHTML = "Sorry! <br>Lyrics You Are Searching For Is Not Found.</br>";
    }
   
  
  }

  //functioning of back button
//   back.addEventListener('click', e=>{


//   })
