const toCurrency = price => {
    return new Intl.NumberFormat('en-EN', {
        currency: 'EUR',
        style: 'currency'
    }).format(price)
}


document.querySelectorAll('.price').forEach(node => {
    node.textContent = toCurrency(parseFloat(node.textContent));
});

const $fav = document.querySelector('#fav')
if ($fav) {
    $fav.addEventListener('click', event => {
        if (event.target.classList.contains('js-remove')) { 
            const id = event.target.dataset.id;

            fetch('/fav/remove/' + id, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(fav => {
                if (fav.courses.length) {
                    const html = fav.courses.map(c => {
                        return `
                        <tr>
                            <td>${c.title}</td>
                            <td>${c.count}</td>
                            <td>
                                <button class="btn btm-small js-remove" data-id="${c.id}">Удалить</button>
                            </td>
                        </tr>
                        `
                    }).join('')
                    $fav.querySelector('tbody').innerHTML = html
                    $fav.querySelector('.price').textContent = toCurrency(fav.price)
                } else {
                    $fav.innerHTML = '<p>Гараж пуст</p>'
                }
            });
        }
    });
}
