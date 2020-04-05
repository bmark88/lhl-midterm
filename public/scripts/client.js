$(() => {
  scrollToTop();
  addNewPin();
  addNewCategory();
});

// scrolls to the top of the page
const scrollToTop = () => {
  $('.scroll-top').on('click', (e) => {
    e.preventDefault();
    $('html, body').animate({scrollTop : 0}, 800);
    return;
  });
};

// adds a new pin
const addNewPin = () => {
  // need to add pin id and user id

// title
// description
// thumbnail_url
// pin_id - NOT COMPLETE, NEED TO UPDATE DATABASE
// user_id - NOT COMPLETE, NEED TO UPDATE DATABASE
// created_at
  let pin = {};
  $('#add-pin-button').on('mouseover', () => {
    pin.name = $('#new-pin-name').val();
    pin.description = $('#new-pin-description').val();
    pin.image = $('#new-pin-image').val();
    pin.created_at = new Date(Date.now()).toString().slice(0,25)

    $('.pin-container').html(`<div class="box">
    <img src='https://www.google.com/logos/doodles/2020/stay-home-save-lives-6753651837108752-law.gif'>
    <img src='${pin.image}'>
    <h2>${pin.name}</h2>
    <p>${pin.description}</p>
    <p id="timestamp">Created at: ${pin.created_at}</p>
    </div>`)
  })
};

// adds a new post
const addNewCategory = () => {
  // need to add category id and user id

// title
// description
// thumbnail_url
// category_id - NOT COMPLETE, NEED TO UPDATE DATABASE
// user_id - NOT COMPLETE, NEED TO UPDATE DATABASE
// created_at
  let category = {};
  $('#add-category-button').on('mouseover', () => {
    category.name = $('#new-category-name').val();
    category.description = $('#new-category-description').val();
    category.image = $('#new-category-image').val();
    category.created_at = new Date(Date.now()).toString().slice(0,25)

      $('.pin-container').html(`<div class="box">
      <img src='https://www.google.com/logos/doodles/2020/stay-home-save-lives-6753651837108752-law.gif'>
      <img src='${category.image}'>
      <h2>${category.name}</h2>
      <p>${category.description}</p>
      <p id="timestamp">Created at: ${category.created_at}</p>
      </div>`)
  })
};