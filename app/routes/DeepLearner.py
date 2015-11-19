import sys
import time
def main(argv):
    #      print(argv[0])
    print(argv[0])
    sys.stdout.flush()
    time.sleep(5)
    print(argv[1])
    sys.stdout.flush()
    time.sleep(5)
    print(argv[2])
    sys.stdout.flush()
    time.sleep(5)
    print(argv[3])
    sys.stdout.flush()
    print(argv[4])
    sys.stdout.flush()

if __name__ == '__main__':
    main(sys.argv[1:])