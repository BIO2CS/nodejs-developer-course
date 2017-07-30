var asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    if (typeof a === "number" && typeof b === "number") {
      setTimeout(() => {
        resolve(a + b);
      }, 2000);
    } else {
      reject("Arguments must be numbers");
    }
  });
}

asyncAdd(1, 7).then(res => {
  console.log(res);
  return asyncAdd(res, 33);
}).then(res => {
  console.log(res);
}).catch(errorMessage => {
  console.log(errorMessage);
});
