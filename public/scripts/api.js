$(() => {
  // this is currently linked to the search button, but needs to be switched over to the submit category button --> only done this to show how search function would work (but would instead fetch data from db rather than API)
  $('#search-button').on('click', function(e) {
    e.preventDefault();

    const searchValue = $(this).siblings().val();
    imageAPI(searchValue);
    imageAPI(searchValue);
    imageAPI(searchValue);
    imageAPI(searchValue);
    imageAPI(searchValue);
    imageAPI(searchValue);
    imageAPI(searchValue);
    imageAPI(searchValue);
    imageAPI(searchValue);
    imageAPI(searchValue);
  });
});

// randomInt should go into helpers folder
const randomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const imageAPI = (search) => {
  const API_KEY = '15882418-eb2d4329ee8c6bbbbc2d87a8c';
  const URL = "https://pixabay.com/api/?key=" + API_KEY + "&q=" + encodeURIComponent(search);
  $.getJSON(URL, function(data,) {
    if (parseInt(data.totalHits) > 0) {
    // makes an ajax request, and adds the image to the new category submission
      $("<div>", {
        "class": "new-pin-container",
        html: `<div class="box">
      <img src=${data.hits[randomInt(20)].previewURL}>
      <h2>Name of Pin</h2>
      <p>Sample pin description ipsum</p>
      <p id="timestamp">Created at: Today's date</p>
      </div>`
      }).appendTo(".pin-container");
    } else
      console.log('No hits');
  });
};

// module.exports = { imageAPI };