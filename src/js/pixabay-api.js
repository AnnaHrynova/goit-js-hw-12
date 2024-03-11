import axios from "axios";

const apiKey = '42454859-ed417d87285a7db1b1c819d54';
const baseURL = 'https://pixabay.com/api/';

export async function searchImages(searchInput, page) {
    try {
        const searchParams = new URLSearchParams({
            key: apiKey,
            q: searchInput,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
            page: page,
            per_page: 15,
        });

        const { data } = await axios.get(`${baseURL}?${searchParams}`);

        if (!data || data.hits.length === 0) {
            throw new Error('No images found');
        }

        return data.hits;
    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
    }
}
