import { useState } from "react";
import "./App.css";
import {
  getArrayOfNumbers,
  getImageStylings,
  handleDownloadImage,
} from "./utils/functions";

const App = () => {
  const [number, setNumber] = useState(null);
  const [imageStylingsData, setImageStylingsData] = useState([]);
  const [formError, setFormError] = useState(null);

  const handleInputNumber = (event) => {
    setNumber(+event.target.value);
  };

  const handleGetImage = (event) => {
    event.preventDefault();
    setFormError(null);
    setImageStylingsData(null);

    if (number > 9999 || 0 >= number) {
      setFormError("Please enter a no between 1-9999");
      return;
    }

    const arrayOfNumbers = getArrayOfNumbers(number);

    const imageStylings = getImageStylings(arrayOfNumbers);

    setImageStylingsData(imageStylings);
  };

  return (
    <div className="container">
      <div>
        <input
          type="number"
          placeholder="enter a no between 1-9999"
          onChange={handleInputNumber}
        />
        <button type="submit" onClick={handleGetImage}>
          Submit
        </button>
        {formError && <p>{formError}</p>}
      </div>
      <div className="imageWrapper">
        <div onClick={() => handleDownloadImage(imageStylingsData)}>
          {imageStylingsData.length > 0 &&
            imageStylingsData.map((imageStyling, key) => {
              const { imageNo, imageStyle } = imageStyling;

              return (
                <img
                  className="overlayImage"
                  src={`assets/${imageNo}.png`}
                  alt={imageNo}
                  style={imageStyle}
                  key={key}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default App;
