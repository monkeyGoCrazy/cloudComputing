__author__ = 'mengleisun'
import numpy as np
import pandas as pd
import string
import random as rm
import sys

def time_process(argv):
    normal_data = 'data/normal/'+argv[1]
    ddos_data = 'data/attack/'+argv[2]
    rate = 1
    result_out = 'data/preporcess/'+argv[0]+'preprocessed.csv'
    data_type = {}
    #should change the use_col to meet different dataset
    use_col = range(1, 43)
    items = ['frame_time_relative', 'ip_id', 'ip_proto', 'frame_interface_id', 'frame_encap_type',
         'frame_offset_shift','frame_time_epoch', 'frame_time_delta', 'frame_len', 'frame_cap_len',
         'frame_marked', 'frame_ignored','ip_hdr_len', 'ip_dsfield', 'ip_dsfield_dscp', 'ip_dsfield_ecn',
         'ip_len', 'ip_flags_rb', 'ip_flags_df','ip_flags_mf', 'ip_frag_offset', 'ip_ttl', 'tcp_stream',
         'tcp_hdr_len', 'tcp_flags_res', 'tcp_flags_ns','tcp_flags_cwr', 'tcp_flags_ecn', 'tcp_flags_urg',
         'tcp_flags_ack', 'tcp_flags_push', 'tcp_flags_reset','tcp_flags_syn', 'tcp_flags_fin',
         'tcp_window_size_value', 'tcp_window_size', 'tcp_window_size_scalefactor','tcp.option_len',
         'tcp_options_timestamp_tsecr', 'tcp_analysis_bytes_in_flight', 'eth_lg', 'eth_ig', ]

    normal_frame = pd.read_csv(normal_data, delimiter=',', error_bad_lines=False, header=None, names = items, usecols = use_col)
    ddos_frame = pd.read_csv(ddos_data, delimiter=',', error_bad_lines=False, header=None, names = items, usecols = use_col)
    normal_frame = normal_frame.loc[normal_frame['ip_proto'].isin([1,6])]

    normal_frame['frame_time_relative'] = normal_frame['frame_time_relative'] - normal_frame['frame_time_relative'].min()
    ddos_frame['frame_time_relative'] = ddos_frame['frame_time_relative'] - ddos_frame['frame_time_relative'].min()

    #multiply a rate
    normal_frame['frame_time_relative'] = rate * normal_frame['frame_time_relative']
    #add label on it
    normal_frame.loc[:,'label'] = pd.Series(np.ones(len(normal_frame.index)))
    ddos_frame.loc[:,'label'] = pd.Series(np.zeros(len(ddos_frame.index)))
    frames = [normal_frame, ddos_frame]
    result = pd.concat(frames)
    result = result.sort('frame_time_relative', ascending=True)
    result = 100*(result-result.min()) / (result.max() - result.min()+1)
    result['label'] = (result['label']) / (result['label'].max() - result['label'].min())
#   ddos_norm = 255*(ddos_frame-ddos_frame.min()) / (ddos_frame.max() - ddos_frame.min()+1)
#   print(result)
#   select part of rows
    row_num = list(range(0,2*len(ddos_frame.index)))
#   result = result.iloc[row_num]
    result.to_csv(result_out, header=False, index = False)
    return result_out
#
def main(argv):
        time_process(argv)

if __name__ == '__main__':
        main(sys.argv[1:])
