import mergeImages from "merge-images";
import { downloadImage } from "./download";

let arrayOfNumbers = [];
let imagesStylings = [];

export const getArrayOfNumbers = (number) => {
  if (number > 1000) {
    const remains = number % 1000;
    arrayOfNumbers = [...arrayOfNumbers, number - remains];
    getArrayOfNumbers(remains);
  } else if (number > 100) {
    const remains = number % 100;
    arrayOfNumbers = [...arrayOfNumbers, number - remains];
    getArrayOfNumbers(remains);
  } else if (number > 10) {
    const remains = number % 10;
    arrayOfNumbers = [...arrayOfNumbers, number - remains];
    getArrayOfNumbers(remains);
  } else if (number < 10 && number !== 0) {
    arrayOfNumbers = [...arrayOfNumbers, number];
  }

  return arrayOfNumbers;
};

export const getImageStylings = (arrayOfNumbers) => {
  arrayOfNumbers.forEach((number) => {
    if (number % 1000 === 0) {
      const imageNo = number.toString()[0];
      const imageStyle = { transform: "rotateZ(180deg)" };

      pushToImageStylings(imageNo, imageStyle);
    } else if (number % 100 === 0) {
      const imageNo = number.toString()[0];
      const imageStyle = { transform: "rotateX(180deg)" };

      pushToImageStylings(imageNo, imageStyle);
    } else if (number % 10 === 0) {
      const imageNo = number.toString()[0];
      const imageStyle = { transform: "rotateY(180deg)" };

      pushToImageStylings(imageNo, imageStyle);
    } else {
      const imageNo = number.toString()[0];
      const imageStyle = {};

      pushToImageStylings(imageNo, imageStyle);
    }
  });

  return imagesStylings;
};

export const handleDownloadImage = (imageStylingsData) => {
  const imageNames = imageStylingsData.map(
    (image) => `assets/${image.imageNo}.png`
  );

  mergeImages(imageNames).then((b64) => {
    downloadImage(b64, "image.png", "image/png");
  });
};

const pushToImageStylings = (imageNo, imageStyle) => {
  imagesStylings.push({
    imageNo,
    imageStyle,
  });
};
