const webApiUrl = './js/Services/kittens.json';

class KittensService{
  get = async () => {
    const request = new Request(webApiUrl);
    return fetch(request)
    .then(res => res.json())
    .catch(err => console.error(err));
  }
}
export default KittensService;