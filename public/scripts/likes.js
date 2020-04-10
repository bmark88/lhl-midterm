$(() => {
  renderLikes();
});

function renderLikes() {
  $.ajax({
    type: 'GET',
    url: '/likes/display'
  })
    .done(data => {
      $('#pins-container').empty();
      data.forEach(pin => {
        console.log('a pin exists');
        $('#pins-container')
          .prepend(`
        <div class="pin-container">
        <!-- <input type="hidden" class="pin_id" name="pin_id" value="${pin.id}"> -->
          <div class="box">
            <img src="${pin.thumbnail_url}">
            <h2>${pin.title}</h2>
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
            <p>Rating: 
              <span class="rating-1">⭐</span>
              <span class="rating-2">⭐</span>
              <span class="rating-3">⭐</span>
              <span class="rating-4">⭐</span>
              <span class="rating-5">⭐</span>
            </p>
            <!-- <form action='/like' method='POST'>
              <input class="like-checkbox" type="checkbox">Like</input>
            </form> -->
            <!--
          <div class="comment-options">
          <button class="edit-comment">Edit</button>
          <form action="/pins/delete" method="POST">
            <input type="hidden" class="pin_id" name="pin_id" value="${pin.id}">
            <button class="delete-comment">Delete</button>
          </form>
          </div>
          -->
          <!-- Modal starts here -->
          <div id="simpleModal" class="modal">
            <div class="modal-content">
              <div class="box">
                <img src="${pin.thumbnail_url}">
                <h2>${pin.title}</h2>
                <p>${pin.description}</p>
                <p id="timestamp">Created at: ${pin.created_at.slice(0,10)}</p>
                <form id="new-comment-form">
                  <textarea placeholder= "Comment here" name="text" id="comment-text"></textarea>
                  <button type="submit">Add Comment</button>
                </form> 
                <p>Rating: 
                  <span class="rating-1">⭐</span>
                  <span class="rating-2">⭐</span>
                  <span class="rating-3">⭐</span>
                  <span class="rating-4">⭐</span>
                  <span class="rating-5">⭐</span>
                </p>
                <!-- <input type="checkbox">Like</input> -->
                <!--
                <span class="comment-options">
                  <button class="edit-comment">Edit</button>
                  <form action="/pins/delete" method="POST">
                    <input type="hidden" class="pin_id" name="pin_id" value="${pin.id}">
                    <button class="delete-comment">Delete</button>
                  </form>
                </span> 
                -->

                <section class="comments-list">
                </section>
              </div>
            </div>
          </div>
        `);
      });
    });
}