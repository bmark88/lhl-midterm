$(() => {
  renderPins();
  scrollToTop();
  addNewPin();
  addNewCategory();
  addComment();

  // $('#add-pin-button').on('click', (e) => {
  //   e.preventDefault();
  //   // renderPins();
  // });

  updateNightMode();
});

// scrolls to the top of the page
const scrollToTop = () => {
  $('.scroll-top').on('click', (e) => {
    e.preventDefault();
    $('html, body').animate({scrollTop : 0}, 800);
    return;
  });
};


//change nightmode preference
const updateNightMode = () => {
  $(".night-mode").on('click', (e) => {
    e.preventDefault();
    // console.log($("input[type='checkbox']").val());
    $.ajax({
      url: '/nightmode',
      method: 'POST',
    })
    // .done(res => {
    //   console.log("Night Mode Changed!")
    //   res.render('settings');
    // })
  })
}
// adds a new pin
const addNewPin = () => {
  let pin = {};
  $('#add-pin-button').on('click', (e) => {
    e.preventDefault();

    pin.name = $('#new-pin-name').val();
    pin.description = $('#new-pin-description').val();
    pin.image = $('#new-pin-image').val();
    pin.created_at = new Date(Date.now()).toString().slice(0,25)
    renderPins();
    $.ajax({
      url: '/pins',
        method: 'POST',
        dataType: 'json',
        data: pin
      })
      // .done(res => {
      //   // $('pin-container').prepend()
      //   console.log('Succesfully added pin to DB!');
      //   renderPins();
      // });
  })
};

// adds a new post
const addNewCategory = () => {
  let category = {};
  $('#add-category-button').on('submit', (e) => {
    // e.preventDefault();

    category.name = $('#new-category-name').val();
    category.description = $('#new-category-description').val();
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
    $('section.comments-list').append(markup)
    })
  }


function renderPins() {
  console.log('Calling pins fuction...')
  $.ajax({
    type: 'GET',
    url: '/pins/display'
  }).done(data => {
    $('#pins-container').empty();
    data.forEach(pin => {
      $('#pins-container')
        .prepend(`
        <div class="pin-container">
         <div class="box">
          <img src="${pin.thumbnail_url}">
            <h2>${pin.title}</h2>
             <p>${pin.description}</p>
             <p id="timestamp">Created at: ${pin.created_at.slice(0,10)}</p>
           <form id="new-comment-form">
            <textarea placeholder= "Comment here" name="text" id="comment-text"></textarea>
            <button type="submit">Add Comment</button>
           </form>
         <p>Rating: <span class="rating-1">⭐</span><span class="rating-2">⭐</span><span class="rating-3">⭐</span><span class="rating-4">⭐</span><span class="rating-5">⭐</span></p>
         <form action='/pins' method='POST'>
          <input class="like-checkbox" type="checkbox">Like</input>
         </form>
        <span class="comment-options">
        <button class="edit-comment">Edit</button>
        <form action="/pins/delete" method="POST">
        <input type="hidden" class="pin_id" name="pin_id" value="${pin.id}">
        <button class="delete-comment">Delete</button>
        </form>
      </span>
        `);
    });
  });
}

