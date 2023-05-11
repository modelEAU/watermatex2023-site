const photosSlider = document.querySelector('.photos');
const photosBtns= document.querySelectorAll('.slider-btn');
const photos = [...document.querySelectorAll('.photo')];
const indicators = [...document.querySelectorAll('.indicator')];

let isMoving;
let currentIndex = 1;

function showActiveIndicator(){
    indicators.forEach(ind => ind.classList.remove('active'));
    let activeIndicator;
    if(currentIndex === 0 || currentIndex === photos.length - 2){
      activeIndicator = indicators.length - 1;
    } else if (currentIndex === photos.length - 1 || currentIndex === 1){
      activeIndicator = 0;
    } else {
      activeIndicator = currentIndex - 1;
    }
    indicators[activeIndicator].classList.add('active');
  }

function moveSlider(){
    photosSlider.style.transform = `translateX(-${currentIndex * 100}%)`;
    showActiveIndicator();
}

function handlePhotoBtnClick(e){
    if(isMoving){ return };
    isMoving = true;
    e.currentTarget.id === 'next'
        ? currentIndex++
        : currentIndex--;
    moveSlider();
}

function handleIndicatorClick(e){
    if(isMoving){ return };
    isMoving = true;
    currentIndex = indicators.indexOf(e.target) + 1;
    moveSlider();
}

photosBtns.forEach(btn => {
    btn.addEventListener('click', handlePhotoBtnClick)
})

indicators.forEach(ind => {
    ind.addEventListener('click', handleIndicatorClick)
})

photosSlider.addEventListener('transitionend', () => {
    isMoving = false;
    if(currentIndex === 0){
      currentIndex = photos.length - 2;
      photosSlider.style.transitionDuration = '1ms';
      return moveSlider();
    }
    if(currentIndex === photos.length - 1){
      currentIndex = 1;
      photosSlider.style.transitionDuration = '1ms';
      return moveSlider();
    }
    photosSlider.style.transitionDuration = '300ms';
  })