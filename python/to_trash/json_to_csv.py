#! python3

from rwJson import readJsonFile
import os, csv, pprint

path = os.path.dirname (__file__)
file_json = os.path.join (path, "data.json") 
file_csv = os.path.join (path, "data.csv")

data_json = readJsonFile (file_json)

header = ['name', 'date', 'size', 'url', 'video', 'all', 'best']

writer_csv = csv.writer (open (file_csv, 'w'))

writer_csv.writerow (header)

for line_data in data_json: 
    row = []
    row.append (line_data['name'])

    year = line_data['date'][:4] 
    month = line_data['date'][4:6] 
    day = line_data['date'][6:] 

    date = year + ' - ' + month + ' - ' + day
    row.append (date)

    row.append (line_data['size'])
    row.append (line_data['url'])
    row.append (line_data['video'])
    row.append (line_data['all'])
    row.append (line_data['best'])

    writer_csv.writerow (row)
