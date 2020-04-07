
$(() => {
  scrollToTop();
  addNewPin();
  addNewCategory();
  addComment();
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
      <form class="new-comment-form">
        <textarea placeholder= "Comment here" name="text" id="comment-text"></textarea>
        <button type="submit">Add Comment</button>
      </form>
      </div>`)
  })
};

//show comments on a pin
const addComment = () => {
  $('#new-comment-form').on('submit', function(evt) {
    evt.preventDefault();

    console.log($('#new-comment-form textarea').val());
    const user_id = 'test'
    const content = $('#new-comment-form textarea').val();
    const pin_id = '2'
    $.ajax({
        url: '/comments',
        method: 'POST',
        dataType: 'json',
        data: {
          user_id,
          content,
          pin_id,
        }
      })
      //append comments to comment-list
        //safeguard agains XSS, escape userEnteredText
        const escape =  function(str) {
          let p = document.createElement('p');
          p.appendChild(document.createTextNode(str));
          return p.innerHTML;
        };
        //framework for each comment in comments
        const markup = `
        <div class='comment'>
        <span>${escape(content)}</span>
        <span>$(commenter)</span>
        <div>
        `;
        return $markup;
    $('section.comments-list').append(markup)
    })
  }
