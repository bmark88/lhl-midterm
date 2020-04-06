$(document).ready(() => {
  $.ajax({
    type: 'GET',
    url: '/unregistered'
  }).done((data) => {
    $('.content-container').detach();
    console.log(data);
    data.forEach((category) => {
      const newDiv = $('<div></div>')
        .addClass('category-container');

      console.log('CAT NAME: ', category.name);
      const newTitle = $(`<span>${category.name}</span>`)
        .addClass('category-title');

      const newThumbnail = $('<img>')
        .addClass('category-thumbnail')
        .attr('src', category.thumbnail_url);

      newDiv
        .append(newTitle)
        .append(newThumbnail);
      $('#content-container')
        .append(newDiv);
    });
  });
});

