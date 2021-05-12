"use strict"
console.log('js runz');

const qs = (s) => document.querySelector(s);
const qsA = (s) => document.querySelectorAll(s);

function run() { // Sets the interval of the data refresh

}

function getAll() {
    fetch("https://foobearz.herokuapp.com/", {
        method: "get",
        // headers: {
        //     "Content-Type": "application/json; charset=utf-8",
        //     "cache-control": "no-cache"
        // }
    })
        .then(res => res.json())
        .then((data) => {
            console.log('All data:', data);
            updateQueue(data.queue);
            updateServing(data.serving);
            updateBartenders(data.bartenders);
            updateTaps(data.taps);
            updateStorage(data.storage);
            //translateDates(data);
        });
};

function updateQueue(queue) {
    // console.log('queue updated');
    // console.log(queue);
    qs('#order_display').innerHTML = '';
    queue.forEach(order => {
        //console.log(order);
        const clone = qs('.order').content.cloneNode(true);

        const id = order.id;
        const time = new Date(order.startTime);
        const hour = time.getHours();
        const mins = time.getMinutes();
        const content = order.order;
        //console.log(id, hour, mins, content);

        clone.querySelector('.id').textContent = `#${id.toString()}  `;
        clone.querySelector('.time').textContent = `${hour}:${mins}  `;
        clone.querySelector('.beers').textContent = content;
        qs("#order_display").appendChild(clone);
    });
}
function updateServing(serving) {
    console.log('serving updated');
    console.log(serving);
    qs('#serving_display').innerHTML = '';
    serving.forEach(order => {
        console.log(order);
        const clone = qs('.serving').content.cloneNode(true);

        const id = order.id;
        const time = new Date(order.startTime);
        const hour = time.getHours();
        const mins = time.getMinutes();
        const content = order.order;
        console.log(id, hour, mins, content);

        clone.querySelector('.id').textContent = `#${id.toString()}  `;
        clone.querySelector('.time').textContent = `${hour}:${mins}  `;
        clone.querySelector('.beers').textContent = content;
        qs("#serving_display").appendChild(clone);
    });
}
function updateBartenders(bartenders) {
    // console.log('bartenders updated');
    // console.log(bartenders);
}
function updateTaps(taps) {
    // console.log('taps updated');
    // console.log(taps);
}
function updateStorage(storage) {
    // console.log('storage updated');
    // console.log(storage);
}


function getBeers() {
    fetch("https://foobearz.herokuapp.com/beertypes", {
        method: "get",
        // headers: {
        //     "Content-Type": "application/json; charset=utf-8",
        //     "cache-control": "no-cache"
        // }
    })
        .then(res => res.json())
        .then((data) => {
            console.log(data.timestamp);
            console.log(data);
        });
};

function postOrder() {
    const data = [
        { name: "Hoppily Ever After", amount: 10 }
    ];

    const postData = JSON.stringify(data); // The data is converted to a JSON string (because the content type we send should be JSON)
    fetch("https://foobearz.herokuapp.com/order", {
        method: "post",
        body: postData,
        headers: {
            "Content-Type": "application/json; charset=utf-8"
            // "cache-control": "no-cache",
        },
    })
        .then(res => res.json())
        .then((dataPost) => {
            console.log(dataPost)
            getAll();
        });
}

function translateDates(data) {


    const realTime = new Date(data.timestamp); // Translate timestamp to normal date and time
    //console.log('Overall time (realtime): ' + realTime);
    const toStamp = realTime.getTime(realTime); // Translates normal date to timestamp
    //console.log(toStamp);
    // Get only the time from a date string:
    const hours = realTime.getHours();
    const minutes = realTime.getMinutes();
    console.log('time is ' + hours, minutes);

    // Get q numbers and timestamps
    const queue = data.queue;
    console.log(queue[0].startTime);

    const orderStamp = new Date(queue[0].startTime)
    const h = orderStamp.getHours();
    const m = orderStamp.getMinutes();
    console.log('Orders time is ' + h, m);
    // Get serve numbers and timestamps

}