/*
* Pure view handlers, no data envolved i.e. no KO.js
*/

// utils
const hideSidebar = e => {
  e.preventDefault();
  sidebar.classList.toggle('hide');
}

// adding sidebar listner 
const filterButton = document.getElementById('filter');
const sidebar = document.getElementsByClassName('sidebar')[0];
const closeButton = document.getElementsByClassName('closeButton')[0]


filterButton.addEventListener('click', hideSidebar);
closeButton.addEventListener('click', hideSidebar);









