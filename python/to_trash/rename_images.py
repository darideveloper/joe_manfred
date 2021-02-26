#! python3

import os, csv, shutil

path = os.path.dirname (__file__)

csv_path = os.path.join (os.path.dirname(path), "data.csv")

images_path = os.path.join (os.path.dirname(os.path.dirname(csv_path)), "web", "imgs", "all")

reader_csv = csv.reader (open(csv_path, "r"))
data = list(reader_csv)

lines = []

for line in data: 
    url = line[3]

    name_file = line[0] + url[str(url).find ("."):]
    # print (name_file)
    
    # for file in os.listdir (images_path): 
    #     if url == file: 

    #         last_file = os.path.join (images_path, file)
    #         new_file = os.path.join (images_path, "reanamed", name_file)

    #         shutil.copy (last_file, new_file)
    
    csv_line =  [line[0], line[1], line[2], name_file, line[4], line[5], line[6]]
    lines.append (csv_line)

writer_csv = csv.writer (open(csv_path, "w"))

for line in lines: 
    writer_csv.writerow (line)
