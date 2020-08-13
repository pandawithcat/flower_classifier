from flask import Flask
from flask import request
from predictor import predict
from classifier import trainModel
from werkzeug.utils import secure_filename
import numpy
import os
import cv2

app = Flask(__name__)


@app.route("/")
def hello():
    return "Hello World!"


@app.route('/predict', methods=['POST'])
def upload():
    filestr = request.files['file'].read()
    npimg = numpy.fromstring(filestr, numpy.uint8)
    print("------------------")
    print(npimg.shape)
    img = cv2.imdecode(npimg, cv2.IMREAD_UNCHANGED)
    dim = (128, 128)
    resized = cv2.resize(img, dim)
    result = predict(resized)
    print(result)
    return result


@app.route('/add', methods=['POST'])
def addNewData():
    file = request.files['file']
    filename = secure_filename(file.filename)
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))


@app.route('/train', methods=['GET'])
def train():
    trainModel()


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
