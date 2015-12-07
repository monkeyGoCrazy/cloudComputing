import subprocess
import sys
def remoteCall(argv):

    ret = subprocess.call(["ssh", "worker@10.227.119.204", "./run.sh", argv[0], argv[1],argv[2]]);


def main(argv):
    print('successfully start')
    remoteCall(argv)

if __name__ == '__main__':
    main(sys.argv[1:])
