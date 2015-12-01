__author__ = 'mengleisun'
from subprocess import Popen
import os
import sys
import MixerTime
import DeepLearner2
def process(argv):
    print('preprocessing'+'\n'+'training')
    argv[1] = MixerTime.time_process(argv)
    print('training')
    DeepLearner2.lstm(argv)

def main(argv):
    process(argv)

if __name__ == '__main__':
    main(sys.argv[1:])