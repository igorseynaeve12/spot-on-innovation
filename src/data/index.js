const fetchdata = () => {
  fetch(
    "https://script.google.com/macros/s/AKfycbw4S3DN4SYoLVbPpUD5ZLn9brhZyRYMEKrcJ7G6N8HMYrD_ThGuvaSogS9oV8qdpaRS/exec"
  )
    .then((res) => res.json())
    .then((json) => console.log(json.data));
};

export default fetchdata;
