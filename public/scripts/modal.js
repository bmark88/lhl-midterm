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
    // const pin_id = $(e.target).parent().siblings('.comment-options').children('form')[0][0].value;
    // console.log($(e.target).parent().children('.comment-options').children('form')[0][0].value)

    // if($(e.target).parent().children('.comment-options').children('form')[0][0].value) {
    //   console.log('fail')
    //   const pin_id = $(e.target).parent().children('.comment-options').children('form')[0][0].value
    // } else {

    // console.log(e.target);

    if ($('#simpleModal')[0] === $(e.target)[0]) {
      $('#simpleModal').css('display', 'none');
    }
  
  });
}

const displayModal = () => {
  // console.log('hello from displayModal()')

  $(this).on('click', function(e) {
    $(e.target).find('#simpleModal').css('display', 'block');
  });

  // $('.box').on('click', function () {
  //   $(this).find('#simpleModal').css('display', 'block');
  // })
};