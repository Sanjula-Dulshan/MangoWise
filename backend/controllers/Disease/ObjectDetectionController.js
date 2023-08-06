import axios from "axios";
import { createCanvas, loadImage } from "canvas";

export const detectDiseases = async (req, res) => {
  // Get the base64 image from the request body
  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ error: "Image is required" });
  }
  try {
    //Call the Roboflow API
    const response = await axios({
      method: "POST",
      url: "https://outline.roboflow.com/mangowise_i/1",
      params: {
        api_key: "PHTl0IU7cyIPQkfsPvcl",
      },
      data: image,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const imageData = response.data;
    console.log(imageData);

    // Load the image using the canvas library
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const bufferImage = Buffer.from(base64Data, "base64");
    const canvasImage = await loadImage(bufferImage);
    console.log("canvasImage", canvasImage);
    const canvas = createCanvas(canvasImage.width, canvasImage.height);
    const ctx = canvas.getContext("2d");

    // Draw the original image on the canvas
    ctx.drawImage(canvasImage, 0, 0);

    // Mapping of class names to colors, sizes, and label background widths
    const classStyles = [
      {
        backgroundColor: "#00F9C9", //PowderyMildew
        labelColor: "black",
        fontSize: 40,
        fillStyle: "rgba(0, 249, 201, 0.5)",
        labelWidth: 250,
        labelHeight: 40,
        borderColor: "#00F9C9",
      },
      {
        backgroundColor: "#8622FF", //Anthracnose
        labelColor: "#000000",
        fontSize: 16,
        fillStyle: "rgba(134, 34, 255, 0.5)",
        labelWidth: 250,
        labelHeight: 20,
        borderColor: "#8622FF",
      },
      {
        backgroundColor: "#FE0056", //SootyMould
        labelColor: "black",
        fontSize: 45,
        fillStyle: "rgba(254, 0, 86, 0.5)",
        labelWidth: 420,
        labelHeight: 50,
        borderColor: "#FE0056",
      },
      {
        backgroundColor: "gray", // Default background color if class not found
        labelColor: "white", // Default label color if class not found
        fontSize: 14, // Default font size if class not found
        fillStyle: "rgba(255, 0, 0, 0.3)", // Default fill style color if class not found
        labelWidth: 100, // Default label background width if class not found
        borderColor: "black", // Default border color if class not found
      }, //
    ];

    // Draw instance segmentation on the canvas based on the received response data
    for (const prediction of imageData["predictions"]) {
      const { class: className, points, confidence } = prediction;

      // Calculate the center point of the identified object
      const centerX =
        points.reduce((sum, point) => sum + point.x, 0) / points.length;
      const centerY =
        points.reduce((sum, point) => sum + point.y, 0) / points.length;
      // Get the style for the current class

      let classStyle;
      if (className === "Powdery mildew") {
        classStyle = classStyles[0];
      } else if (className === "Anthracnose") {
        classStyle = classStyles[1];
      } else if (className === "Sooty mould") {
        classStyle = classStyles[2];
      } else {
        classStyle = classStyles[3];
      }

      // Draw the mask as a closed polygon with the class-specific fill style color
      ctx.fillStyle = classStyle.fillStyle;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.closePath();
      ctx.fill();

      // Add border around the instance segmented object with the class-specific border color
      ctx.strokeStyle = classStyle.borderColor;
      ctx.lineWidth = 3;
      ctx.stroke();

      // Label background rectangle with class-specific background color and width
      const textWidth =
        ctx.measureText(className).width + classStyle.labelWidth;
      const textHeight = classStyle.labelHeight; // Increase the height for a larger label
      const labelBgX = centerX - textWidth / 2;
      const labelBgY = centerY - textHeight / 2; // Center the label on the identified object
      ctx.fillStyle = classStyle.backgroundColor; // Use the specified background color
      ctx.fillRect(labelBgX, labelBgY, textWidth, textHeight);

      // Draw the class name label at the center of the identified object with class-specific label color and font size
      ctx.fillStyle = classStyle.labelColor; // Use the specified label color
      ctx.font = `${classStyle.fontSize}px Arial`; // Use the specified font size for the label
      ctx.textAlign = "center"; // Center the label text horizontally
      ctx.textBaseline = "middle"; // Center the label text vertically
      ctx.fillText(
        `${className}  ${confidence.toFixed(2) * 100}%`,
        centerX,
        centerY
      ); // Display the class name and confidence at the center of the identified object
    }

    // Convert the canvas to a Buffer (PNG image data)
    const buffer = canvas.toBuffer();

    // Convert the buffer to a base64 string
    const base64Image = buffer.toString("base64");

    //get the classes
    const classes = imageData["predictions"].map((prediction) => {
      return prediction["class"];
    });

    // Send the base64 image, classes and the full response from the API in the response
    res.json({
      image: base64Image,
      apiResponse: imageData,
      classes: classes,
    });
  } catch (error) {
    console.log("error ", error);
  }
};
