$(document).ready(() => {
  $('.burger').on('click', () => {
    $('.nav-container')
      .toggleClass('show');
    $('.burger-line')
      .toggleClass('show');
  });
});
