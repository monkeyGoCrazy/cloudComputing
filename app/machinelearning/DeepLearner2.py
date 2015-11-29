
import pandas as pd
import numpy as np
import sys
from keras.models import Sequential
from keras.layers.core import Dense, Dropout, Activation
from keras.layers.embeddings import Embedding
from keras.layers.recurrent import LSTM

from sklearn.metrics import roc_curve, auc
import matplotlib.pyplot as plt

def labeling(x):
    if x >= 0.5:
        return 1
    return 0
def slidingWindow(data):
    print("Loading...")
    data = (data-data.min()) / (data.max() - data.min()+1)
    data_label = data['label'].apply(lambda x: labeling(x))
    data_feature = data.drop('label',1)
    data_feature = data_feature.astype(np.float64)
    data_label = data_label.astype(np.float64)
    data_feature = data_feature.as_matrix()
    data_label = data_label.as_matrix()
    maxlen = 150
    step = 1
    rate = 0.35
    print('Vectorization...')
    X = np.zeros((len(data)-maxlen+1, maxlen, len(data_feature[0])))
    Y = np.zeros((len(data)-maxlen+1))
    for i in range(0,len(data)-maxlen+1,step):
        label = 0
        for j in range(0,maxlen):
            label += data_label[i+j]
            X[i,j] = data_feature[i+j]
        if label/maxlen > rate:
            Y[i] = 1
    return X,Y


# LSTM MODEL
def labeling(x):
    if x >= 0.5:
        return 1
    return 0


def lstm(argv):
    print("Loading...")
    data_file = argv[1]
    sequence = argv[3]
    percentage = argv[4]
    validation = argv[5]
    innerActivation = argv[6]
    activation = argv[7]
    dropOut = argv[8]
    lossFunction = argv[9]
    classMode = argv[10]
    finalActivationFunction = argv[11]

    #use_col = range(5, 17)
    use_col = range(1, 43)
    # items = ['ip_proto', 'frame.encap_type',
    #              'frame.len', 'http.content_length', 'tcp.ack', 'tcp.analysis.ack_rtt', 'tcp.analysis.bytes_in_flight', 'tcp.len',
    #              'tcp.analysis.duplicate_ack_num', 'tcp.window_size', 'udp.length','label']
    # items = ['duration', 'protocol_type', 'service', 'flag', 'src_bytes', 'dst_bytes', 'land', 'wrong_fragment', 'urgent', 'hot', 'num_failed_logins',
    #          'logged_in','num_compromised', 'root_shell', 'su_attempted', 'num_root', 'num_file_creations', 'num_shells','num_access_files', 'num_outbound_cmds',
    #          'is_host_login','is_guest_login', 'count', 'srv_count', 'serror_rate', 'srv_serror_rate','rerror_rate','srv_rerror_rate', 'same_srv_rate', 'diff_srv_rate', 'srv_diff_host_rate',
    #          'dst_host_count', 'dst_host_srv_count', 'dst_host_same_src_rate', 'dst_host_diff_srv_rate','dst_host_same_src_port_rate', 'dst_host_srv_diff_host_rate',
    #          'dst_host_serror_rate', 'dst_host_srv_serror_rate','dst_host_rerror_rate','dst_host_srv_rerror_rate','label']
    items = ['frame_time_relative', 'ip_id', 'ip_proto', 'frame_interface_id', 'frame_encap_type',
         'frame_offset_shift','frame_time_epoch', 'frame_time_delta', 'frame_len', 'frame_cap_len',
         'frame_marked', 'frame_ignored','ip_hdr_len', 'ip_dsfield', 'ip_dsfield_dscp', 'ip_dsfield_ecn',
         'ip_len', 'ip_flags_rb', 'ip_flags_df','ip_flags_mf', 'ip_frag_offset', 'ip_ttl', 'tcp_stream',
         'tcp_hdr_len', 'tcp_flags_res', 'tcp_flags_ns','tcp_flags_cwr', 'tcp_flags_ecn', 'tcp_flags_urg',
         'tcp_flags_ack', 'tcp_flags_push', 'tcp_flags_reset','tcp_flags_syn', 'tcp_flags_fin',
         'tcp_window_size_value', 'tcp_window_size', 'tcp_window_size_scalefactor','tcp.option_len',
         'tcp_options_timestamp_tsecr', 'tcp_analysis_bytes_in_flight', 'eth_lg', 'eth_ig', ]
    data = pd.read_csv(data_file, delimiter=',', error_bad_lines=False, header=None, names = items,usecols = use_col)
    X,Y = slidingWindow(data)
    rate_label = 0.0
    for i in range(0,len(Y)):
        if Y[i] == 1:
            rate_label = rate_label+1.0
    print(rate_label/len(Y))
    data = data.as_matrix()
    print("sequencing...")

    data_size = X.shape[0]
    seperate_index = data_size*percentage
    X_train = X[:seperate_index]
    y_train = Y[:seperate_index]
    X_test = X[seperate_index:]
    y_test = Y[seperate_index:]

    batch_size = 128

    print('Build model...')
    model = Sequential()
    #model.add(Embedding(max_features, 256, input_length=max_len))
    model.add(LSTM(output_dim = 128, activation=activation, inner_activation = innerActivation, input_shape=(150, 42)))
    model.add(Dropout(dropOut))
    model.add(Dense(1))
    model.add(Activation(finalActivationFunction))

    model.compile(loss=lossFunction, optimizer='sgd',class_mode=classMode)

    print("Train...")
    model.fit(X_train, y_train, batch_size=batch_size, nb_epoch=4, validation_split=validation, show_accuracy=True)
    score, acc = model.evaluate(X_test, y_test, batch_size=batch_size, show_accuracy=True)
    test_preds = model.predict_proba(X_test, verbose=0)
    print(test_preds.shape)
    test_preds = model.predict_proba(X_test, verbose = 0)
    print(test_preds.shape)
    preds_test = []
    for i in range(len(test_preds)) :
        preds_test.append(test_preds[i,0])
    print(preds_test)
    false_positive_rate, true_positive_rate, thresholds = roc_curve(y_test, preds_test, pos_label=1)
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
def main(argv):
    lstm(argv)

if __name__ == '__main__':
    main(sys.argv[1:])