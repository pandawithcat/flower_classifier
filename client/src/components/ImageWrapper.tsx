import React, { useState } from "react";
import { CustomPlaceholder } from "react-placeholder-image";
import axios from "axios";

const serverURL: string = "http://localhost:5000";

const Progress = ({ percentage }) => {
  return (
    <div className="progress">
      <div
        className="progress-bar progress-bar-striped bg-success"
        role="progressbar"
        style={{ width: `${percentage}%` }}
      >
        {percentage}%
      </div>
    </div>
  );
};

export function ImageWrapper() {
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [result, setResult] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [filePath, setFilePath] = useState("");
  const [message, setMessage] = useState("");

  const onChange = (event) => {
    setIsFileUploaded(true);
    setFile(event.target.files[0]);
    setFilename(event.target.files[0].name);
    setFilePath(URL.createObjectURL(event.target.files[0]));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(serverURL + "/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },

        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          );

          // Clear percentage
          setTimeout(() => setUploadPercentage(0), 10000);
        },
      });

      setResult(res.data);
      setMessage("File Uploaded");
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
            <input
              type="file"
              className="custom-file-input"
              id="customFile"
              onChange={onChange}
            />
            <label className="custom-file-label" htmlFor="customFile">
              {filename}
            </label>
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
          <Progress percentage={uploadPercentage} />
          <input
            type="submit"
            value="Upload"
            className="btn btn-primary btn-block mt-4"
          />
        </form>
      </div>
      <div>Upload Result: {message}</div>
      <div>Result: {result}</div>
    </div>
  );
}
