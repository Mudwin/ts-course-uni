import Cropper from "cropperjs";

const uploadButton = document.querySelector("#upload");
const cropButton = document.querySelector("#crop");
const downloadButton = document.querySelector("#download");

const fileInput = document.querySelector("#fileinput");

const newImageContainer = document.querySelector(".new-image-container");
const croppedImageContainer = document.querySelector(
  ".cropped-image-container",
);

let cropper;
let currentImageUrl;

let originalWidth = 0;
let originalHeight = 0;

const destroyCropper = () => {
  if (cropper) {
    cropper.destroy();
    cropper = null;
  }
  if (currentImageUrl) {
    URL.revokeObjectURL(currentImageUrl);
    currentImageUrl = null;
  }
};

const getCroppedCanvas = async () => {
  const selection = cropper.getCropperSelection();
  if (!selection) return null;

  return await selection.$toCanvas();
};

const handleUpload = () => {
  fileInput.click();
};

const uploadImage = () => {
  const file = fileInput.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Выберите изображение.");
    return;
  }

  destroyCropper();
  croppedImageContainer.innerHTML = "";
  croppedImageContainer.removeAttribute("style");

  currentImageUrl = URL.createObjectURL(file);

  const tempImg = new Image();

  tempImg.onload = () => {
    const scaleX = Math.min(1, 900 / tempImg.naturalWidth); // max-width: 900px;
    const scaleY = Math.min(1, 500 / tempImg.naturalHeight); // max-height: 500px;
    const scale = Math.min(scaleX, scaleY);

    originalWidth = Math.round(tempImg.naturalWidth * scale);
    originalHeight = Math.round(tempImg.naturalHeight * scale);

    newImageContainer.style.width = `${originalWidth}px`;
    newImageContainer.style.height = `${originalHeight}px`;
    newImageContainer.innerHTML = "";

    const img = document.createElement("img");
    newImageContainer.appendChild(img);

    img.onload = () => {
      cropper = new Cropper(img, {
        container: newImageContainer,
      });

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const selection = cropper.getCropperSelection();
          if (selection) {
            selection.$change(0, 0, originalWidth, originalHeight);
          }
        });
      });
    };

    img.src = currentImageUrl;
  };
  tempImg.src = currentImageUrl;
};

const cropImage = async () => {
  const canvas = await getCroppedCanvas();
  if (!canvas) return alert("Не удалось обрезать.");

  const selection = cropper.getCropperSelection();
  const x = parseFloat(selection.x) || 0;
  const y = parseFloat(selection.y) || 0;

  croppedImageContainer.innerHTML = "";

  croppedImageContainer.style.width = `${originalWidth}px`;
  croppedImageContainer.style.height = `${originalHeight}px`;
  croppedImageContainer.style.position = "relative";

  const resultImg = document.createElement("img");
  resultImg.src = canvas.toDataURL("image/png");

  resultImg.style.position = "absolute";
  resultImg.style.left = x + "px";
  resultImg.style.top = y + "px";
  resultImg.style.width = canvas.width + "px";
  resultImg.style.height = canvas.height + "px";
  resultImg.style.display = "block";

  croppedImageContainer.appendChild(resultImg);
};

const downloadImage = async () => {
  const canvas = await getCroppedCanvas();
  const link = document.createElement("a");
  link.download = "cropped_image.png";
  link.href = canvas.toDataURL("image/png");
  document.body.appendChild(link);

  link.click();
  link.remove();
};

uploadButton.addEventListener("click", handleUpload);
fileInput.addEventListener("change", uploadImage);
cropButton.addEventListener("click", cropImage);
downloadButton.addEventListener("click", downloadImage);
