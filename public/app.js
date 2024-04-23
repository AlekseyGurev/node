document.addEventListener('click', (event) => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id;
    noteDelete(id).then(() => {
      event.target.closest('li').remove();
    });
  } else if (event.target.dataset.type === 'edit') {
    edit(event);
  } else if (event.target.dataset.type === 'cancel') {
    edit(event);
  } else if (event.target.dataset.type === 'save') {
    edit(event, true);
  }
});

async function noteDelete(id) {
  await fetch(`/${id}`, {
    method: 'DELETE',
  });
}

async function notePatch(data) {
  await fetch(`/${data.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

function edit(event, save) {
  const parent = event.target.closest('li');
  const itemEdit = parent.querySelector('.edit-item');
  const item = parent.querySelector('.item');
  item.classList.toggle('visually-hidden');
  itemEdit.classList.toggle('visually-hidden');

  if (save) {
    const id = event.target.dataset.id;
    const oldTitle = parent.getElementsByTagName('span')[0].innerText;
    const newTitle = parent.getElementsByTagName('input')[0].value;

    if (newTitle && oldTitle != newTitle) {
      const data = { id, title: newTitle };
      notePatch(data).then(() => {
        parent.getElementsByTagName('span')[0].innerText = data.title;
      });
    }
  }
}
