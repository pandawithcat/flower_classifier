from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import OneHotEncoder
from numpy import array, argmax
from flowerType import data


def OneHotConverterResult(oneHotData):

    values = array(data)

    # integer encode
    label_encoder = LabelEncoder()
    integer_encoded = label_encoder.fit_transform(values)
    # print(integer_encoded)

    # binary encode
    onehot_encoder = OneHotEncoder(sparse=False)
    integer_encoded = integer_encoded.reshape(len(integer_encoded), 1)
    onehot_encoded = onehot_encoder.fit_transform(integer_encoded)

    # print("encoded")
    # print(onehot_encoded)
    # invert first example
    #inverted = label_encoder.inverse_transform([argmax(onehot_encoded[1, :])])
    inverted = label_encoder.inverse_transform([argmax(oneHotData)])

    # print("Inverted")
    # print(inverted)
    # sys.exit(0)

    return inverted
