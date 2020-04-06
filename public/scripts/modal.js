$(() => {
  modalButton.on('click', openModal);

  //clicking the x within the modal will close the modal
  closeButton.on('click', closeModal);

  //clicking outside of the modal will close the modal
  window.$(this).on('click', (e) => {
    outsideClick(e);
  });

  ratingScore();
});

const modal = $('#simpleModal');
const modalButton = $('#modal-button');
const closeButton = $('.close-button');

const ratingScore = () => {
  const rate5 = $('.rating-5');
  const rate4 = $('.rating-4');
  const rate3 = $('.rating-3');
  const rate2 = $('.rating-2');
  const rate1 = $('.rating-1');

  rate5.on('mouseenter', () => {
    for (let i = 0; i <= 5; i++) {
      $(`.rating-${i}`).css('background-color', 'black')
    }
  })

  rate4.on('mouseenter', () => {
    for (let i = 0; i <= 4; i++) {
      $(`.rating-${i}`).css('background-color', 'black')
    }
  })

  rate3.on('mouseenter', () => {
    for (let i = 0; i <= 3; i++) {
      $(`.rating-${i}`).css('background-color', 'black')
    }
  })

  rate2.on('mouseenter', () => {
    for (let i = 0; i <= 2; i++) {
      $(`.rating-${i}`).css('background-color', 'black')
    }
  })

  rate1.on('mouseenter', () => {
    $(`.rating-1`).css('background-color', 'black')
  })

  // only handles 5 star ratings, need to add others later
  rate5.on('mouseleave', () => {
    for (let i = 0; i <= 5; i++) {
      $(`.rating-${i}`).css('background-color', 'white')
    }
  })

  rate4.on('mouseleave', () => {
    for (let i = 0; i <= 4; i++) {
      $(`.rating-${i}`).css('background-color', 'white')
    }
  })

  rate3.on('mouseleave', () => {
    for (let i = 0; i <= 3; i++) {
      $(`.rating-${i}`).css('background-color', 'white')
    }
  })

  rate2.on('mouseleave', () => {
    for (let i = 0; i <= 2; i++) {
      $(`.rating-${i}`).css('background-color', 'white')
    }
  })

  rate1.on('mouseleave', () => {
    $(`.rating-1`).css('background-color', 'white')
  })
}

function openModal() {
  modal.css('display', 'block');
}

function closeModal() {
  modal.css('display', 'none');
}

function outsideClick(e) {
  if (e.target == modal[0]) {
    modal.css('display', 'none');
  }
}

$('.box').on('click', function () {
  // $(this).next().css('display', 'block');
  // console.log($(this).find('#simpleModal'));
  console.log($(this));
  console.log(this);


  $(this).find('#simpleModal').css('display', 'block');

  // $(this).siblings()[0].css('display', 'block');
})
