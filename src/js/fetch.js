// export default function fetchCountries(name) {
//   return fetch(`https://restcountries.eu/rest/v2/name/${name}`)
//     .then(response => {
//       if (name) {
//         return response.json();
//       } else {
//         return;
//       }
//     })
//     // .catch(error => console.log(error));
// }

export default function fetchCountries(name) {
  return fetch(`https://restcountries.eu/rest/v2/name/${name}`)
    .then(response => {
      if (name) {
        return response.text();
      } else {
        return;
      }
    })
    .then((name) => {
      return (name ? JSON.parse(name) : {})
    })
    .catch(error => console.log(error));
}