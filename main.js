// // codigo magico
// window.setVariableInterval = function (callbackFunc, timing) {
//   var variableInterval = {
//     interval: timing,
//     callback: callbackFunc,
//     stopped: false,
//     runLoop: function () {
//       if (variableInterval.stopped) return;
//       var result = variableInterval.callback.call(variableInterval);
//       if (typeof result == "number") {
//         if (result === 0) return;
//         variableInterval.interval = result;
//       }
//       variableInterval.loop();
//     },
//     stop: function () {
//       this.stopped = true;
//       window.clearTimeout(this.timeout);
//     },
//     start: function () {
//       this.stopped = false;
//       return this.loop();
//     },
//     loop: function () {
//       this.timeout = window.setTimeout(this.runLoop, this.interval);
//       return this;
//     },
//   };

//   return variableInterval.start();
// };
// // codigo magico

let timeoutDelay = 350;

const fetchPhoto = async function () {
  const response = await fetch("http://localhost:3000/photo/last/camera1");

  if (response.status === 200) {
    timeoutDelay = 350;
    const data = await response.json();

    let image = document.querySelector("#theImg");
    if (image !== null) {
      image.src = `data:image/png;base64,${toBase64(data.photo.data)}`;
    } else {
      image = document.createElement("img");
      image.id = "theImg";
      image.style = "width:100%";
      image.src = `data:image/png;base64,${toBase64(data.photo.data)}`;
    }

    document.querySelector(".container").append(image);
  } else {
    console.log(timeoutDelay);
    timeoutDelay = 5000;
  }
  setTimeout(fetchPhoto, timeoutDelay);
};

function toBase64(arr) {
  return btoa(arr.reduce((data, byte) => data + String.fromCharCode(byte), ""));
}

window.onload = function () {
  setTimeout(fetchPhoto, timeoutDelay);
};
