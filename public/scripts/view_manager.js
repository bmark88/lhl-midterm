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

      const newThumbnail = $('<img>')
        .addClass('category-thumbnail')
        .attr('src', category.thumbnail_url);

      newDiv
        .append(newTitle)
        .append(newThumbnail);
      $('#categories-container')
        .prepend(newDiv);
    });
  });

  // FOR PINS
  // $.ajax({
  //   type: 'GET',
  //   url: '/pins/display'
  // }).done(data => {
  //   $('.pin-container').detach();
  //   data.forEach(pin => {
  //     const newDiv = $('<div></div>')
  //       .addClass('pin-container');

  //     const newThumbnail = $('<img>')
  //       .attr('src', pin.thumbnail_url)
  //       .addClass('pin-thumbnail');

  //     const newTitle = $(`<h2>${pin.title}</h2>`)
  //       .addClass('pin-title');

  //     const newDescription = $(`<p>${pin.description}</p>`)
  //       .addClass('pin-description');

  //     const newTimestamp = $(`<p>Created at ${pin.created_at}</p>`)
  //       .addClass('pin-date');

  //     newDiv
  //       .append(newThumbnail)
  //       .append(newTitle)
  //       .append(newDescription)
  //       .append(newTimestamp)
  //       .mouseenter(e => {
  //         $(e.target)
  //           .children()
  //           .addClass('show');
  //       })
  //       .mouseleave(e => {
  //         $(e.target)
  //           .children()
  //           .removeClass('show');
  //       });
  //     $('#pins-container')
  //       .prepend(newDiv);
  //   });
  // });
});

