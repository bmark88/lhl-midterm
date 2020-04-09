$(document).ready(() => {
  $('#categories-container').on('click', '*', (e) => {
    console.log($(e.target).data('name'))
    const catName = $(e.target).data('name');

    $.ajax({
      type: 'GET',
      url: '/testinglol',
      data: catName
    }).done(data => {
      console.log(data);
      data.forEach(pin => {
        renderData(pin);
      })
    });
  });
});

function renderData(pin) {
  $('#pins-container')
        .prepend(`
        <div class="pin-container">
         <div class="box">
          <img src="${pin.thumbnail_url}" alt="${[pin.title]}">
            <h2>${pin.title}</h2>
             <p>${pin.description}</p>
             <p id="timestamp">Created at: ${pin.created_at.slice(0,10)}</p>
           <form id="new-comment-form">
            <textarea placeholder= "Comment here" name="text" id="comment-text"></textarea>
            <button type="submit">Add Comment</button>
           </form>
         <p>Rating: <span class="rating-1">⭐</span><span class="rating-2">⭐</span><span class="rating-3">⭐</span><span class="rating-4">⭐</span><span class="rating-5">⭐</span></p>
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




      <div id="simpleModal" class="modal">
    <div class="modal-content">
      <div class="box">
      <img src="${pin.thumbnail_url}">
      <h2>${pin.title}</h2>
      <p>${pin.description}</p>
      <p id="timestamp">Created at: ${pin.created_at.slice(0,10)}</p>
          <p>Rating: <span class="rating-1">⭐</span><span class="rating-2">⭐</span><span class="rating-3">⭐</span><span class="rating-4">⭐</span><span class="rating-5">⭐</span></p>
          <input type="checkbox">Like</input>
          <span class="comment-options">
          <button class="edit-comment">Edit</button>
          <form action="/pins/delete" method="POST">
          <input type="hidden" class="pin_id" name="pin_id" value="${pin.id}">
          <button class="delete-comment">Delete</button>
          </form>
        </span>
          <p class="user-comment">Sample user commented:</p>
          <p class="comment">cerebro. De carne lumbering animata corpora
            quaeritis.Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora
            quaeritis.Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora
            quaeritis.Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora
            quaeritis.Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora
            quaeritis.Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora
            q </p>
            <p class="user-comment">Sample user commented:</p>
          <p class="comment">cerebro. De carne lumbering animata corpora
            quaeritis.Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora
            quaeritis.Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora
            quaeritis.Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora
            quaeritis.Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora
            quaeritis.Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora
            q </p>
            <p class="user-comment">Sample user commented:</p>
          <p class="comment">cerebro. De carne lumbering animata corpora
            quaeritis.Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora
            quaeritis.Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora
            quaeritis.Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora
            quaeritis.Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora
            quaeritis.Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora
            q </p>
      </div>

    </div>
  </div>
        `);
}
