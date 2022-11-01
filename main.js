import Message from "./src/components/Message";
import Card from "./src/components/Card";

const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = `https://api.escuelajs.co/api/v1/products/`;

localStorage.setItem('page', 5)
let firstTime = true

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      if(products.length){
        let output = products.map(product => Card(product));
        let newItem = document.createElement('section');
        newItem.classList.add('Items');
        newItem.innerHTML = output.join("");
        $app.appendChild(newItem);
      } else {
        intersectionObserver.unobserve($observe)
        $observe.innerHTML = Message()
      }
    })
    .catch(error => console.log(error));
}

const loadData = () => {
  if(firstTime){
    firstTime = false
  } else {
    let pageNumber = localStorage.getItem('page')
    localStorage.setItem('page', `${Number(pageNumber) + 10}`)
  }
  getData(`${API}?limit=10&offset=${localStorage.getItem('page')}`);
}

const intersectionObserver = new IntersectionObserver(entries => {
  if(entries[0].isIntersecting){
    loadData()
  }
}, {
  root: null,
  rootMargin: '0px 0px 100% 0px',
  threshold: 0.9
});

intersectionObserver.observe($observe);
