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
  ratingScore();
  checkIfLiked();
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

function outsideClick() {
  $(this).on('click', (e) => {
    // const pin_id = $(e.target).parent().siblings('.comment-options').children('form')[0][0].value;
    // console.log($(e.target).parent().children('.comment-options').children('form')[0][0].value)

    // if($(e.target).parent().children('.comment-options').children('form')[0][0].value) {
    //   console.log('fail')
    //   const pin_id = $(e.target).parent().children('.comment-options').children('form')[0][0].value
    // } else {

    console.log(e.target);

    if ($('#simpleModal')[0] === $(e.target)[0]) {
      $('#simpleModal').css('display', 'none');
    }
  
  })
}

const displayModal = () => {
  console.log('hello from displayModal()')

  $(this).on('click', function (e) {
    $(e.target).find('#simpleModal').css('display', 'block')
  });

  // $('.box').on('click', function () {
  //   $(this).find('#simpleModal').css('display', 'block');
  // })
};

const checkIfLiked = () => {
  $('.like-checkbox').on('click', () => {
    let pinIsLiked;

    if ($(".like-checkbox").prop('checked') === true) {
      // console.log('this is checked')
      pinIsLiked = true;
    } 
    
    if ($(".like-checkbox").prop('checked') === false) {
      // console.log('this is unchecked')
      pinIsLiked = false;
    }
// console.log({pinIsLiked})

    const liked = { pinIsLiked };
    if($('.like-checkbox').is(':checked')){
      const queryString = `
        INSERT INTO likes (user_id, pin_id)
        VALUES (500, 600);
      `;
      
      console.log({pinIsLiked})
      $.ajax({
        url: '/pins',
        type: 'GET',
        // data: liked
        dataType: 'html'
      })
      .then(res => {
        // $('.pin-container').html('<h1>HELLO WORLD</h1>')
        // $('.pin-container').html(res)
        console.log(res);
      })
      .catch(e => console.error('ERROR ====>', e.stack));
    }
  })
};

// const deletePost = () => {

// };