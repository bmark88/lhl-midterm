$(document).ready(() => {
  $('#content-container').detach();

  // FOR CATEGORIES
  $.ajax({
    type: 'GET',
    url: '/unregistered'
  }).done(data => {
    data.forEach((category) => {
      const newDiv = $('<div></div>')
        .addClass('category-container');

      const newTitle = $(`<span>${category.name}</span>`)
        .addClass('category-title');

      const newThumbnail = $(`<img data-name="${category.name}">`)
        .addClass('category-thumbnail')
        .attr('src', category.thumbnail_url);

      newDiv
        .append(newTitle)
        .append(newThumbnail);
      $('#categories-container')
        .prepend(newDiv);
    })
  }).catch(e => {
    console.log(e)
    return e.stack
  });
});

