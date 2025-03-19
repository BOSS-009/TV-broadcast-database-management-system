document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('.form');
    forms.forEach(form => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const container = document.querySelector('.container');
            container.classList.add('fade-out');
            setTimeout(() => {
                form.submit();
            }, 300);
        });
    });
});

function csubscribe(providerName) {
    const serviceProviders = document.querySelectorAll('.service-provider');
    let totalPrice = 0;

    serviceProviders.forEach(provider => {
        if (provider.getAttribute('data-provider') === providerName) {
            totalPrice += parseFloat(provider.getAttribute('data-price'));
        }
    });

    const url = new URL('payment.html', window.location.origin);
    url.searchParams.set('provider', providerName);
    url.searchParams.set('price', totalPrice);
    window.location.href = url;
}

function searchProviders() {
    const searchBar = document.getElementById('searchBar');
    const filter = searchBar.value.toLowerCase();
    const serviceProvidersContainer = document.getElementById('serviceProvidersContainer');
    const serviceProviders = serviceProvidersContainer.getElementsByClassName('service-provider');

    for (let i = 0; i < serviceProviders.length; i++) {
        const providerInfo = serviceProviders[i].getElementsByClassName('provider-info')[0];
        const providerName = providerInfo.getElementsByTagName('h2')[0].innerText;

        if (providerName.toLowerCase().indexOf(filter) > -1) {
            serviceProviders[i].style.display = "";
        } else {
            serviceProviders[i].style.display = "none";
        }
    }
}
function subscribe(providerName, price) {
    const url = new URL('payment.html', window.location.origin);
    url.searchParams.set('provider', providerName);
    url.searchParams.set('price', price);
    window.location.href = url;
}
function searchProviders() {
    const searchBar = document.getElementById('searchBar');
    const filter = searchBar.value.toLowerCase();
    const serviceProvidersContainer = document.getElementById('serviceProvidersContainer');
    const serviceProviders = serviceProvidersContainer.getElementsByClassName('service-provider');

    for (let i = 0; i < serviceProviders.length; i++) {
        const providerInfo = serviceProviders[i].getElementsByClassName('provider-info')[0];
        const providerName = providerInfo.getElementsByTagName('h2')[0].innerText;

        if (providerName.toLowerCase().indexOf(filter) > -1) {
            serviceProviders[i].style.display = "";
        } else {
            serviceProviders[i].style.display = "none";
        }
    }
}

