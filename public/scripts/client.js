$(() => {
  scrollToTop();
  addNewPin();
  addNewCategory();
  addComment();

  $('#add-pin-button').on('click', (e) => {
    e.preventDefault();
    renderPins();
  });
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
  let pin = {};
  $('#add-pin-button').on('click', (e) => {
    e.preventDefault();

    pin.name = $('#new-pin-name').val();
    pin.description = $('#new-pin-description').val();
    pin.image = $('#new-pin-image').val();
    pin.created_at = new Date(Date.now()).toString().slice(0,25)

    console.log('this is the pin object ====>', pin);

    // const { name, description, image, created_at } = pin
    // console.log(name, description, image, created_at);

    $.ajax({
      url: '/pins',
        method: 'POST',
        dataType: 'json',
        data: pin
      })
      .done(res => {
        // $('pin-container').prepend()
        console.log('Succesfully added pin to DB!');
        renderPins();
      });

    // $('.pin-container').html(`<div class="box">
    // <img src='https://www.google.com/logos/doodles/2020/stay-home-save-lives-6753651837108752-law.gif'>
    // <img src='${pin.image}'>
    // <h2>${pin.name}</h2>
    // <p>${pin.description}</p>
    // <p id="timestamp">Created at: ${pin.created_at}</p>
    // </div>`)
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
  $('#add-category-button').on('click', (e) => {
    // e.preventDefault();

    category.name = $('#new-category-name').val();
    category.description = $('#new-category-description').val();
    // console.log('new cat image .val ====> ', $('#new-category-description').val())
    category.image = $('#new-category-image').val();
    category.created_at = new Date(Date.now()).toString().slice(0,25)

    console.log(category);

      $('.pin-container').html(`<div class="box">
      <img src='https://images.hgmsites.net/hug/2018-mclaren-720s_100652805_h.jpg'>
      <img src= './public/images/default_category_thumbnail_url.jpg'>
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
    // const user_id = 'test'
    const content = $('#new-comment-form textarea').val();
    const pin_id = '2'
    $.ajax({
        url: '/comments',
        method: 'POST',
        dataType: 'json',
        data: {
          // user_id,
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
        // return $markup;
    $('section.comments-list').append(markup)
    })
  }




// RENDER HELPERS
function renderPins() {
  console.log('Calling pins fuction...')
  $.ajax({
    type: 'GET',
    url: '/pins/display'
  }).done(data => {
    $('.pin-container').detach();
    data.forEach(pin => {
      console.log('Rendering all pins...')
      const newDiv = $('<div></div>')
        .addClass('pin-container');

      const newThumbnail = $('<img>')
        .attr('src', pin.thumbnail_url)
        .addClass('pin-thumbnail');

      const newTitle = $(`<h2>${pin.title}</h2>`)
        .addClass('pin-title');

      const newDescription = $(`<p>${pin.description}</p>`)
        .addClass('pin-description');

      const newTimestamp = $(`<p>Created at ${pin.created_at}</p>`)
        .addClass('pin-date');

      newDiv
        .append(newThumbnail)
        .append(newTitle)
        .append(newDescription)
        .append(newTimestamp)
        .mouseenter(e => {
          $(e.target)
            .children()
            .addClass('show');
        })
        .mouseleave(e => {
          $(e.target)
            .children()
            .removeClass('show');
        });
      $('#pins-container')
        .prepend(newDiv);
    });
  });
}


