$(() => {
  renderPins();
  scrollToTop();
  addNewPin();
  addNewCategory();
  addComment();
  addLike();
  updateNightMode();
  addRating();
});

const addRating = () => {
  $(this).on('click', function(e) {
    if ($(e.target).attr('type') === 'radio') {
      const pin_id = $(e.target).parents('form').siblings('form').data('pin_id');
      console.log('pin_id is: ===> ', pin_id)
      $.ajax({
        url: '/rating',
        method: 'POST',
        data: {
          value: e.target.value,
          pin: pin_id
        }
      })
    }
  })
}
// scrolls to the top of the page
const scrollToTop = () => {
  $('.scroll-top').on('click', (e) => {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, 800);
    return;
  });
};

//change nightmode preference
const updateNightMode = () => {
  $(".night-mode").on('click', (e) => {
    $.ajax({
      url: '/nightmode',
      method: 'POST',
    })
  })
};

// adds a new pin
const addNewPin = () => {
  let pin = {};
  $('#add-pin-button').on('click', (e) => {
    e.preventDefault();

    pin.url = $('#new-pin-url').val();
    pin.name = $('#new-pin-name').val();
    pin.description = $('#new-pin-description').val();
    pin.image = $('#new-pin-image').val();
    pin.created_at = new Date(Date.now()).toString().slice(0, 25);

    $.ajax({
      url: '/pins',
      method: 'POST',
      dataType: 'json',
      data: pin
    });
    $('#new-pin-url').val('');
    $('#new-pin-name').val('');
    $('#new-pin-description').val('');
    $('#new-pin-image').val('');
    renderPins();
  });
};

// adds a new post
const addNewCategory = () => {
  let category = {};
  $('#add-category-button').on('submit', () => {

    category.name = $('#new-category-name').val();
    category.description = $('#new-category-description').val();
    category.image = $('#new-category-image').val();
    category.created_at = new Date(Date.now()).toString().slice(0, 25)

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
  $(this).on('submit', (e) => {

    if ($(e.target).attr('class') === 'new-comment-form') {
      // only prevent default if the target is the new-comment-form class
      // this allows other functions to still be called
      e.preventDefault();

      const content = $(e.target).children('.new-comment-form textarea').val();
      const pin_id = $(e.target).data("pin_id");

      $.ajax({
        // url: `/pins/${pin_id}comments`, ==> this is the same as e.target.action (just for reference)
        url: e.target.action,
        method: 'POST',
        dataType: 'json',
        data: {
          content,
          pin_id,
        }
      });

      //append comments to comment-list
      //safeguard agains XSS, escape userEnteredText
      const escape = function (str) {
        let p = document.createElement('p');
        p.appendChild(document.createTextNode(str));
        return p.innerHTML;
      };
      //framework for each comment in comments
      const markup = `
        <div class='comment'>
          <span>${escape(content)}</span>
          <!-- <span>$(commenter)</span> -->
        <div>
        `;
      $('section.comments-list').append(markup);

      $(e.target).children('.new-comment-form textarea').val('');
    }
  });
};

function renderPins() {
  $.ajax({
      type: 'GET',
      url: '/pins/display'
    })
    .done(data => {
      $('#pins-container').empty();
      data.forEach(pin => {
        $('#pins-container')
          .prepend(`
        <div class="pin-container">
        <!-- <input type="hidden" class="pin_id" name="pin_id" value="${pin.id}"> -->
          <div class="box">
            <img src="${pin.thumbnail_url}">
            <a href=${pin.pin_url} target="_blank"><h2>${pin.title}</h2></a>
             <p>${pin.description}</p>
             <p id="timestamp">Created at: ${pin.created_at.slice(0,10)}</p>
            <form
              action="/pins/${pin.id}/comments"
              method="POST"
              class="new-comment-form"
              data-pin_id="${pin.id}"
              >
                <textarea placeholder= "Comment here" name="content" id="comment-text"></textarea>
              <button class="new-comment" type="submit">Add Comment</button>
            </form>
            <form class="rating">
              <label>
                <input type="radio" name="stars" value="1" />
                <span class="icon">★</span>
              </label>
              <label>
                <input type="radio" name="stars" value="2" />
                <span class="icon">★</span>
                <span class="icon">★</span>
              </label>
              <label>
                <input type="radio" name="stars" value="3" />
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
              </label>
              <label>
                <input type="radio" name="stars" value="4" />
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
              </label>
              <label>
                <input type="radio" name="stars" value="5" />
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
              </label>
            </form>
            <form action='/like' method='POST'>
              <input class="like-checkbox" type="checkbox">Like</input>
            </form>
          <div class="comment-options">
          <button class="edit-comment">Edit</button>
          <form action="/pins/delete" method="POST">
            <input type="hidden" class="pin_id" name="pin_id" value="${pin.id}">
            <button class="delete-comment">Delete</button>
          </form>
          </div>
          <!-- Modal starts here -->
          <div id="simpleModal" class="modal">
            <div class="modal-content">
              <div class="box">
                <img src="${pin.thumbnail_url}">
                <a href=${pin.pin_url} target="_blank"><h2>${pin.title}</h2></a>
                <p>${pin.description}</p>

                <p id="timestamp">Created at: ${pin.created_at.slice(0,10)}</p>
                <form id="new-comment-form">
                  <textarea placeholder= "Comment here" name="text" id="comment-text"></textarea>
                  <button type="submit">Add Comment</button>
                </form>
                <form class="rating">
                  <label>
                    <input type="radio" name="stars" value="1" />
                    <span class="icon">★</span>
                  </label>
                  <label>
                    <input type="radio" name="stars" value="2" />
                    <span class="icon">★</span>
                    <span class="icon">★</span>
                  </label>
                  <label>
                    <input type="radio" name="stars" value="3" />
                    <span class="icon">★</span>
                    <span class="icon">★</span>
                    <span class="icon">★</span>
                  </label>
                  <label>
                    <input type="radio" name="stars" value="4" />
                    <span class="icon">★</span>
                    <span class="icon">★</span>
                    <span class="icon">★</span>
                    <span class="icon">★</span>
                  </label>
                  <label>
                    <input type="radio" name="stars" value="5" />
                    <span class="icon">★</span>
                    <span class="icon">★</span>
                    <span class="icon">★</span>
                    <span class="icon">★</span>
                    <span class="icon">★</span>
                  </label>
                </form>
                <input type="checkbox">Like</input>
                <span class="comment-options">
                  <button class="edit-comment">Edit</button>
                  <form action="/pins/delete" method="POST">
                    <input type="hidden" class="pin_id" name="pin_id" value="${pin.id}">
                    <button class="delete-comment">Delete</button>
                  </form>
                </span>

                <section class="comments-list">
                </section>
              </div>
            </div>
          </div>
        `);
      });
    });
};

//change nightmode preference
const addLike = () => {
  $(this).on('click', (e) => {
    if ($(e.target)[0] === $('.like-checkbox')[0]) {
      const pin_id = $(e.target).parent().siblings('.comment-options').children('form')[0][0].value;

      $.ajax({
        url: '/like',
        method: 'POST',
        data: {
          pin_id: pin_id
        }
      });
    }
  });
}
