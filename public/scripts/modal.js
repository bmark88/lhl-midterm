$(() => {
  modalButton.on('click', openModal);

  //clicking the x within the modal will close the modal
  closeButton.on('click', closeModal);
  outsideClick();
  //clicking outside of the modal will close the modal
  // window.$(this).on('click', (e) => {
  //   outsideClick(e);
  // });
  displayModal();
});

const modal = $('#simpleModal');
const modalButton = $('#modal-button');
const closeButton = $('.close-button');

function openModal() {
  modal.css('display', 'block');
}

function closeModal() {
  modal.css('display', 'none');
}

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


    // $(e.target).find('#simpleModal').css('display', 'block');
  });
};