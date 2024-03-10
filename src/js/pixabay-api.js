const apiKey = '42454859-ed417d87285a7db1b1c819d54';

export function searchImages(searchInput) {
    return fetch(`https://pixabay.com/api/?key=${apiKey}&q=${searchInput}&image_type=photo&orientation=horizontal&safesearch=true`)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Failed to fetch images');
            }
            return response.json();
        })
        .then(function (data) {
            return data.hits;
        })
        .catch(function (error) {
            throw new Error(`Error fetching data: ${error.message}`);
        });
}
