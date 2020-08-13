from keras.models import load_model
from keras.preprocessing.image import img_to_array
from keras.preprocessing import image as KerasImage
import numpy as np
from util import OneHotConverterResult
global model


def loadModel():
    model = load_model("model.h5")
    return model


def predict(img):
    test_image = KerasImage.img_to_array(img)
    test_image = np.expand_dims(test_image, axis=0)
    flower_class = ""
    myModel = loadModel()
    pred = myModel.predict(test_image)
    className = OneHotConverterResult(pred)
    flower_class = className[0]

    return flower_class
