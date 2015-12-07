from pyspark.mllib.classification import SVMWithSGD
from pyspark.mllib.regression import LabeledPoint
from numpy import array
from pyspark import SparkContext, SparkConf
import sys
import timeit

appName = "DDE"

# Setup Spark configuration
conf = SparkConf().setAppName(appName).setMaster("local")
sc = SparkContext(conf=conf)


def parsePoint(line):
    values = [float(x) for x in line.split(',')]
    return LabeledPoint(values[0], values[1:])


start = timeit.timeit()

# Read the input data file
data = sc.textFile("../Data/"+sys.argv[1])

# Parse the data to construct a classification dataset
parsedData = data.map(parsePoint)

# Build the classification model
model = SVMWithSGD.train(parsedData)

end = timeit.timeit()

print "Training Time = " +str(end - start)

start = timeit.timeit()

# Evaluating the model on training data
labelsAndPreds = parsedData.map(lambda p: (p.label, model.predict(p.features)))
trainErr = labelsAndPreds.filter(lambda (v, p): v != p).count() / float(parsedData.count())

end = timeit.timeit()

print("Training Error = " + str(trainErr))

print "Testing Time = " + str(end - start)
