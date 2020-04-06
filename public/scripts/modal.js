const modal = $('#simpleModal');
const modalButton = $('#modal-button');
const closeButton = $('.close-button');
const rate5 = $('.rating-5');

modalButton.on('click', openModal);

//clicking the x within the modal will close the modal
closeButton.on('click', closeModal);

//clicking outside of the modal will close the modal
window.$(this).on('click', (e) => {
  outsideClick(e);
  });

// only handles 5 star ratings, need to add others later
rate5.on('mouseenter', () => {
  console.log($(this))
  for (let i = 0; i <= 5; i++) {
    $(`.rating-${i}`).css('background-color', 'black')
  }
})

// only handles 5 star ratings, need to add others later
rate5.on('mouseleave', () => {
  console.log($(this))
  for (let i = 0; i <= 5; i++) {
    $(`.rating-${i}`).css('background-color', 'white')
  }
})

function openModal() {
  modal.css('display', 'block');
}

function closeModal() {
  modal.css('display', 'none');
}

function outsideClick(e) {
  if(e.target == modal[0]){
    modal.css('display', 'none');
  }
}

$('.box').on('click', function() {
  // $(this).next().css('display', 'block');
  // console.log($(this).find('#simpleModal'));
  console.log($(this));
  console.log(this);

  
  $(this).find('#simpleModal').css('display', 'block');

  // $(this).siblings()[0].css('display', 'block');
})