import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const formInput = document.querySelector('input');

form.addEventListener('submit', onFormSubmit);

formInput.min = '1000';

function onFormSubmit(event) {
  event.preventDefault();
  const delay = event.target.elements.delay.value;
  const state = event.target.elements.state.value;

  const settledPromice = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'rejected') {
        reject(`❌ Rejected promise in ${delay}ms`);
      } else {
          resolve(`✅ Fulfilled promise in ${delay}ms`);
      }
    }, delay);
  });
    
  settledPromice
      .then(value => {
          console.log(value);
                iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,
        backgroundColor: '#59a10d',
        messageColor: '#fff',
        position: 'topRight',
      });
      })
      .catch(error => {
        console.log(error);
      iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
        backgroundColor: '#ef4040',
        messageColor: '#fff',
        position: 'topRight',
      });
    });
    form.reset();
}
