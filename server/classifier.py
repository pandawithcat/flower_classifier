from keras.preprocessing.image import ImageDataGenerator
import os
from keras.layers import Dense
from keras.layers import Flatten
from keras.layers.core import Activation
from keras.models import Sequential
from keras.layers import MaxPooling2D
from keras.layers import Conv2D
from util import OneHotConverterResult


def trainModel():
    classifier = Sequential()

    classifier.add(Conv2D(32, (3, 3), input_shape=(
        128, 128, 3), activation='relu'))
    classifier.add(MaxPooling2D(pool_size=(2, 2)))

    classifier.add(Flatten())

    classifier.add(Dense(units=256, activation='relu'))

    classifier.add(Dense(units=99, activation='softmax'))

    classifier.compile(
        optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

    # using imageDataGenerator to preprocess our data

    train_datagen = ImageDataGenerator(
        rescale=1./255, shear_range=0.2, zoom_range=0.2, horizontal_flip=True)
    test_datagen = ImageDataGenerator(rescale=1./255)

    train_generator = train_datagen.flow_from_directory(
        'dataset/training', target_size=(128, 128), batch_size=32, class_mode='categorical')
    test_generator = test_datagen.flow_from_directory(
        'dataset/test', target_size=(128, 128), batch_size=32, class_mode='categorical')

    # fit generate our model
    classifier.fit_generator(train_generator, steps_per_epoch=200,
                             epochs=10, validation_data=test_generator, validation_steps=100)

    print("Train generator indices : ", train_generator.class_indices)

    classifier.save("model.h5")

    # print("================================================================================================================")

    # for img in sorted(os.listdir("dataset/test")):
    #     test_image = image.load_img(
    #         "dataset/test/" + img, target_size=(128, 128))
    #     test_image = image.img_to_array(test_image)
    #     test_image = np.expand_dims(test_image, axis=0)
    #     result = classifier.predict(test_image)

    #     label = OneHotConverterResult(result)

    #     print(sn, " -- ", img, " -- ", label[0])
