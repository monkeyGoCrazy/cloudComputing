# import csv
# import ImageGenerator
# import Mixer
import pandas as pd
import numpy as np
# from keras.layers.core import Dense, Dropout, Activation, Flatten
# from keras.layers.convolutional import Convolution2D, MaxPooling2D
# from keras.optimizers import SGD
from keras.preprocessing import sequence
from keras.models import Sequential
from keras.layers.core import Dense, Dropout, Activation
from keras.layers.embeddings import Embedding
from keras.layers.recurrent import LSTM
import pandas as pd
from sklearn.metrics import roc_curve, auc
import matplotlib.pyplot as plt
from sklearn.cross_validation import train_test_split



# CONVNET MODEL

# ddos_final_matrix, normal_final_matrix = ImageGenerator.generate_image(ddos_file, normal_file)
#
# # final_matrix_list shape: [[m*m],[m*m],...]
#
# image_shape = ddos_final_matrix[0].shape
# print(image_shape)
# model = Sequential()
# model.add(Convolution2D(32, 3, 3, 3, border_mode='full'))
# model.add(Activation('relu'))
# model.add(Convolution2D(32, 32, 3, 3))
# model.add(Activation('relu'))
# model.add(MaxPooling2D(poolsize=(2, 2)))
# model.add(Dropout(0.25))
#
# model.add(Convolution2D(64, 32, 3, 3, border_mode='full'))
# model.add(Activation('relu'))
# model.add(Convolution2D(64, 64, 3, 3))
# model.add(Activation('relu'))
# model.add(MaxPooling2D(poolsize=(2, 2)))
# model.add(Dropout(0.25))
#
# model.add(Flatten())
# model.add(Dense(64*8*8, 256))
# model.add(Activation('relu'))
# model.add(Dropout(0.5))
#
# model.add(Dense(256, 10))
# model.add(Activation('softmax'))
#
# sgd = SGD(lr=0.1, decay=1e-6, momentum=0.9, nesterov=True)
# model.compile(loss='categorical_crossentropy', optimizer=sgd)
#
# model.fit(X_train, Y_train, batch_size=32, nb_epoch=1)
#
# objective_score = model.evaluate(X_test, Y_test, batch_size=32)


# LSTM MODEL
print("Loading...")
data_file = "output2"
use_col = range(5, 17)
items = ['ip_proto', 'frame.encap_type',
         'frame.len', 'http.content_length', 'tcp.ack', 'tcp.analysis.ack_rtt', 'tcp.analysis.bytes_in_flight', 'tcp.len',
         'tcp.analysis.duplicate_ack_num', 'tcp.window_size', 'udp.length','label']
data = pd.read_csv(data_file, delimiter=',', error_bad_lines=False, header=None, names = items, usecols = use_col)
data = (data-data.min()) / (data.max() - data.min()+1)
print(data.head(100))
data = data.as_matrix()
print("Splitting...")
maxlen = 500
data_size = data.shape[0]
seperate_index = data_size*2/3
X_train = data[:seperate_index, :-1]

X_train = sequence.pad_sequences(X_train, maxlen)
y_train = data[:seperate_index, -1]
X_test = data[seperate_index:, :-1]
X_test = sequence.pad_sequences(X_test, maxlen)
y_test = data[seperate_index:, -1]
print(X_train.shape)
print(y_train.shape)
print(X_test.shape)
print(y_test.shape)
max_features = X_train.shape[1]
batch_size = 32

print('Build model...')
model = Sequential()
model.add(Embedding(max_features, 32))
model.add(LSTM(32, 32, activation='sigmoid'))
model.add(Dropout(0.5))
model.add(Dense(32, 1))
model.add(Activation('sigmoid'))

model.compile(loss='mean_squared_error', optimizer='sgd',class_mode='binary')

print("Train...")
model.fit(X_train, y_train, batch_size=batch_size, nb_epoch=4, validation_data=(X_test, y_test), show_accuracy=True)
score, acc = model.evaluate(X_test, y_test, batch_size=batch_size, show_accuracy=True)
test_preds = model.predict_proba(X_test, verbose=0)
test_preds = test_preds[:,1]
false_positive_rate, true_positive_rate, thresholds = roc_curve(y_test, test_preds)
roc_auc = auc(false_positive_rate, true_positive_rate)
print(roc_auc)
plt.title('Receiver Operating Characteristic')
plt.plot(false_positive_rate, true_positive_rate, 'b',
         label='AUC = %0.2f'% roc_auc)
plt.legend(loc='lower right')
plt.plot([0,1],[0,1],'r--')
plt.xlim([-0.1,1.2])
plt.ylim([-0.1,1.2])
plt.ylabel('True Positive Rate')
plt.xlabel('False Positive Rate')
plt.show()
print('Test score:', score)
print('Test accuracy:', acc)