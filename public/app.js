// If you are using CommonJS modules:
const { Dropzone } = require("dropzone");

/*  */

let myDropzone = new Dropzone("#my-form");
myDropzone.on("addedfile", file => {
  console.log(`File added: ${file.name}`);
});

window.addEventListener('load', function () {
  // document.querySelector('input[type="file"]').addEventListener('change', function() {
  //     if (this.files && this.files[0]) {
  //         var img = document.querySelector('img');
  //         img.onload = () => {
  //             URL.revokeObjectURL(img.src);  // no longer needed, free memory
  //         }

  //         img.src = URL.createObjectURL(this.files[0]); // set src to blob url
  //     }
  // });
})