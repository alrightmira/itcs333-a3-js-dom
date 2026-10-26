document.addEventListener('DOMContentLoaded', () => {
 
  const form = document.querySelector('#todo-form');
  const input = document.querySelector('#todo-input');
  const errorMsg = document.querySelector('#error-msg');
  const list = document.querySelector('#todo-list');
  const counter = document.querySelector('#counter');
  const filterAll = document.querySelector('#filter-all');
  const filterActive = document.querySelector('#filter-active');
  const filterDone = document.querySelector('#filter-done');

  let currentFilter = 'all';

  
  function updateCounter() {
    const left = list.querySelectorAll('li:not(.completed)').length;
    counter.textContent = `${left} item(s) left`;
  }

  function applyFilter() {
    list.querySelectorAll('li').forEach((li) => {
      const done = li.classList.contains('completed');
      const show =
        currentFilter === 'all' ||
        (currentFilter === 'active' && !done) ||
        (currentFilter === 'done' && done);
      li.style.display = show ? '' : 'none';
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const text = input.value.trim();
    if (text === '') {
      errorMsg.classList.remove('hidden');
      return;
    }
    errorMsg.classList.add('hidden');

    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = text;

    const delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.className = 'delete-btn';
    delBtn.textContent = 'Delete';

    li.append(span, delBtn);
    list.append(li);

    input.value = '';
    applyFilter();
    updateCounter();
  });


  list.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;

    if (e.target.classList.contains('delete-btn')) {
      li.remove();
    } else {
      li.classList.toggle('completed');
    }
    applyFilter();
    updateCounter();
  });

  filterAll.addEventListener('click', () => {
    currentFilter = 'all';
    applyFilter();
  });
  filterActive.addEventListener('click', () => {
    currentFilter = 'active';
    applyFilter();
  });
  filterDone.addEventListener('click', () => {
    currentFilter = 'done';
    applyFilter();
  });


  updateCounter();
});
