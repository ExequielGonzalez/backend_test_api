async function fetchText() {
  let response = await fetch("http://localhost:3000/photo/camera1");

  console.log(response.status); // 200
  console.log(response.statusText); // OK

  if (response.status === 200) {
    console.log(response);
    let data = await response.json();
    console.log(data);
    let image = document.createElement("img");
    image.id = "theImg";
    image.style = "width:100%";
    image.src = `data:image/png;base64,${toBase64(data.photo.data)}`;
    document.querySelector(".container").append(image);
  }
}

function toBase64(arr) {
  //arr = new Uint8Array(arr) if it's an ArrayBuffer
  return btoa(arr.reduce((data, byte) => data + String.fromCharCode(byte), ""));
}

fetchText();

// function toBase64(arr) {
//   //arr = new Uint8Array(arr) if it's an ArrayBuffer
//   return btoa(arr.reduce((data, byte) => data + String.fromCharCode(byte), ""));
// }

// $("#two").prepend(
//   $("<img>", {
//     id: "theImg2",
//     src: `data:image/png;base64,${toBase64(selected[0].image2.data)}`,
//   })
// );
