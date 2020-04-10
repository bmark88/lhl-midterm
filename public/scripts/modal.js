$(() => {
  outsideClick();
  displayModal();
});

const modal = $('#simpleModal');
const modalButton = $('#modal-button');
const closeButton = $('.close-button');

function outsideClick() {
  $(this).on('click', (e) => {

    if($(e.target).attr('id') === 'simpleModal') {
      $(e.target).css('display', 'none');
    }  
  });
}

const displayModal = () => {
  $(this).on('click', function(e) {

    if ($(e.target).attr('class') === 'box'){
      $(e.target).find('#simpleModal').css('display', 'block');
    }    
  });
};