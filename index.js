const map = new mapgl.Map('map', {
    key: '5b676d26-6bac-438e-9ec2-9616f83761d4',
    center: [33.074936, 68.97067],
    zoom: 11,
});

const apiUrl = "data.json";
let tg = window.Telegram.WebApp;
tg.expand()

async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const data = await response.json();

        // Отображение данных
        data.forEach(item => {
            new mapgl.Marker(map, {
                coordinates: [item.longitude, item.latitude],
                icon: 'https://docs.2gis.com/img/mapgl/marker.svg',
            }).on('click', (e) => {
                tg.sendData(String(item.id));
                tg.close();
            });
        });
    } catch (error) {
        tg.showAlert(`Произошла ошибка: ${error.message}`);
    }
}

fetchData();
