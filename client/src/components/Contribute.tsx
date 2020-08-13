import React, { useState } from "react";
import axios from "axios";
import { CustomPlaceholder } from "react-placeholder-image";

export function Contribute() {
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("File name goes here");
  const [filePath, setFilePath] = useState("");
  const [message, setMessage] = useState("");
  const [trainResult, setTrainResult] = useState("");

  const onRetrigger = async (event) => {
    console.log("triggered");
    try {
      const res = await axios.get("/api/train");
      setTrainResult(res.data);
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("There was a problem with the server");
      } else {
        setMessage(err.message);
      }
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", filename);

    try {
      const res = await axios.post("/api/label", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(res.data);
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("There was a problem with the server");
      } else {
        setMessage(err.message);
      }
    }
  };
  return (
    <div>
      <div>
        <form onSubmit={onSubmit}>
          <div className="custom-file mb-4">
            <input type="file" className="custom-file-input" id="customFile" />
            <label className="custom-file-label" htmlFor="customFile">
              {filename}
            </label>
          </div>
          <div>
            <label className="fname">Flower Type:</label>
            <input type="text" id="fname" name="fname" />
          </div>
          <div>
            {isFileUploaded ? (
              <img width="200" height="200" src={filePath} alt="temporary" />
            ) : (
              <CustomPlaceholder
                width={200}
                height={200}
                backgroundColor="#8A2BE2"
              />
            )}
          </div>
          <input
            type="submit"
            value="Upload"
            className="btn btn-primary btn-block mt-4"
          />
        </form>
        <div>Server Response: {message}</div>
      </div>
      <div>
        <input
          type="submit"
          value="Re train the model"
          className="btn btn-secondary btn-block mt-4"
          onClick={onRetrigger}
        />
        <div>Server Response: {trainResult}</div>
      </div>
    </div>
  );
}
