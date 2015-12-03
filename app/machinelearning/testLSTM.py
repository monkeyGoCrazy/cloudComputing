import pandas as pd
import numpy as np
import sys
import json
import MixerTime
from keras.models import model_from_json
from sklearn.metrics import roc_curve, auc
import matplotlib.pyplot as plt
from pymongo import MongoClient
from bson.objectid import ObjectId


def labeling(x):
    if x >= 0.5:
        return 1
    return 0
def slidingWindow(data,windowSize,step,threshold):
    print("Loading...")
    data = (data-data.min()) / (data.max() - data.min()+1)
    data_label = data['label'].apply(lambda x: labeling(x))
    data_feature = data.drop('label',1)
    data_feature = data_feature.astype(np.float64)
    data_label = data_label.astype(np.float64)
    data_feature = data_feature.as_matrix()
    data_label = data_label.as_matrix()
    maxlen = int(windowSize)
    rate = threshold
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
    id = argv[0]
    data_file = argv[1]
    trainModelId = argv[3]
    windowSize = int(argv[4])
    step = int(argv[5])
    threshold = float(argv[6])
    batchSize = int(argv[7])

    #use_col = range(5, 17)
    use_col = range(0, 44)
    items = ['frame_time_relative', 'ip_id', 'ip_proto', 'frame_interface_id', 'frame_encap_type',
         'frame_offset_shift','frame_time_epoch', 'frame_time_delta', 'frame_len', 'frame_cap_len',
         'frame_marked', 'frame_ignored','ip_hdr_len', 'ip_dsfield', 'ip_dsfield_dscp', 'ip_dsfield_ecn',
         'ip_len', 'ip_flags_rb', 'ip_flags_df','ip_flags_mf', 'ip_frag_offset', 'ip_ttl', 'tcp_stream',
         'tcp_hdr_len', 'tcp_flags_res', 'tcp_flags_ns','tcp_flags_cwr', 'tcp_flags_ecn', 'tcp_flags_urg',
         'tcp_flags_ack', 'tcp_flags_push', 'tcp_flags_reset','tcp_flags_syn', 'tcp_flags_fin',
         'tcp_window_size_value', 'tcp_window_size', 'tcp_window_size_scalefactor','tcp.option_len',
         'tcp_options_timestamp_tsecr', 'tcp_analysis_bytes_in_flight', 'eth_lg', 'eth_ig', 'label']
    data = pd.read_csv(data_file, delimiter=',', error_bad_lines=False, header=None, names = items,usecols = use_col)
    X,Y = slidingWindow(data,windowSize,step,threshold)
    rate_label = 0.0
    for i in range(0,len(Y)):
        if Y[i] == 1:
            rate_label = rate_label+1.0
    print(rate_label/len(Y))
    data = data.as_matrix()
    print('loading model')
    json_path = 'trainModel/json' + trainModelId + '.json'
    weights_path = 'trainModel/weights'+ trainModelId + '.h5'
    with open(json_path, 'r') as f:
        data = json.load(f)
    model = model_from_json(data)
    model.load_weights(weights_path)
    score, acc = model.evaluate(X, Y, batch_size=batchSize, show_accuracy=True)
    # test_preds = model.predict_proba(X, verbose=0)
    # print(test_preds.shape)
    # test_preds = model.predict_proba(X, verbose = 0)
    # print(test_preds.shape)
    # preds_test = []
    # for i in range(len(test_preds)) :
    #     preds_test.append(test_preds[i,0])
    # print(preds_test)
    # false_positive_rate, true_positive_rate, thresholds = roc_curve(y_test, preds_test, pos_label=1)
    # roc_auc = auc(false_positive_rate, true_positive_rate)
    # print(roc_auc)
    # plt.title('Receiver Operating Characteristic')
    # plt.plot(false_positive_rate, true_positive_rate, 'b',
    # label='AUC = %0.2f'% roc_auc)
    # plt.legend(loc='lower right')
    # plt.plot([0,1],[0,1],'r--')
    # plt.xlim([0,1])
    # plt.ylim([0,1])
    # plt.ylabel('True Positive Rate')
    # plt.xlabel('False Positive Rate')
    # plt.show()
    # print('Test score:', score)
    # print('Test accuracy:', acc)
    client = MongoClient('mongodb://127.0.0.1:27017/')
    db = client['deepdefense']
    tests = db['tests']
    statistics = db['statistics']
    statistics.find_one_and_update(
        {"_id": ObjectId(id)},
        {"$set":{"status": "Success"}}
    )
    tests.find_one_and_update(
        {"_id": ObjectId(id)},
        {"$set":{"score": score, "accurary": acc, "auc": 0, "status": "Success"}}
    )
def main(argv):
    print('Successfully start running')

    argv[1] = MixerTime.time_process(argv)
    lstm(argv)

if __name__ == '__main__':
    main(sys.argv[1:])