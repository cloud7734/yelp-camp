mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v11', 
  center: campground.geometry.coordinates, 
  zoom: 10
});

map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

const marker1 = new mapboxgl.Marker()
  .setLngLat(campground.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({offset: 25})
    .setHTML(
      `<h4>${campground.title}</h4><p>${campground.location}</p>`
    )
  )
  .addTo(map);