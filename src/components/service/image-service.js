import axios from "axios";

export async function getImages(query, page) {
  const BASE_URL = `https://pixabay.com/api/`;
  const KEY = '35833245-87af2506e90926e341a869925';
  const options = `image_type=photo&orientation=horizontal&per_page=12`;
  try {
    const answer = await axios.get(
      `${BASE_URL}?key=${KEY}&q=${query}&${options}&page=${page}`
    );
    return answer.data;
  } catch (error) {
    console.log(error);
  }
}
