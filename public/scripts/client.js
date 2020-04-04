$(() => {
  scrollToTop();
  addNewPin();
});

// scrolls to the top of the page
const scrollToTop = () => {
  $('.scroll-top').on('click', (e) => {
    e.preventDefault();
    $('html, body').animate({scrollTop : 0}, 800);
    return;
  });
};

// adds a new post
const addNewPin = () => {
  // need to add category id and user id

// title
// description
// thumbnail_url
// category_id - NOT COMPLETE, NEED TO UPDATE DATABASE
// user_id - NOT COMPLETE, NEED TO UPDATE DATABASE
// created_at
  let pin = {};
  $('#add-pin-button').on('mouseover', () => {
    pin.name = $('#new-pin-name').val();
    pin.description = $('#new-pin-description').val();
    pin.image = $('#new-pin-image').val();
    pin.created_at = new Date(Date.now()).toString().slice(0,25)

    $('.flex-container').html(`<div>
    <h1>${pin.name}</h1>
    <p>${pin.description}</p>
    <img src='https://www.google.com/logos/doodles/2020/stay-home-save-lives-6753651837108752-law.gif'>
    <img src='${pin.image}'>
    <div>Created at: ${pin.created_at}</div>
    </div>`)
  })


}