import csv

f = open("sbxa.tsv", "r")
tsvin = csv.DictReader(f, delimiter="\t")

out = open("strengths.txt", "w")
outFormat = "{0} {0} {0} {0} {0} {1} {1} {1} {1} {2} {2} {2} {3} {3} {4}\n"

for row in tsvin:
    out.write(outFormat.format(row["Theme 1"], row["Theme 2"], row["Theme 3"], row["Theme 4"], row["Theme 5"]))
