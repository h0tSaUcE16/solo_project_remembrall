console.log(path.resolve(__dirname, '/tasks'));
const response = await fetch(path.resolve(__dirname, '/tasks'));
const jsonObj = await response.json();
console.log(JSON.stringify(jsonObj));