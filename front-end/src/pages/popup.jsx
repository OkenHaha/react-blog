document.addEventListener('DOMContentLoaded', function () {
  const popup = document.getElementById('popup');
  const closeBtn = document.querySelector('.close-btn');
  

  closeBtn.addEventListener('click', function () {
    popup.style.display = 'none';
  });

  
});