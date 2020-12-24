#! python3

import os, bs4

class Generate (): 
    """
    Generate static html files for ther web page
    """

    def __init__ (self, path): 
        """
        Constructor of the class. Get path of all documents
        """

        self.path = path
        self.index_file  = open(os.path.join (path, "index.html"), "r")
    
    def index (self): 
        """
        Generate file "index.html", with the correct files and information
        """


        text = self.index_file.read()
        soup = bs4.BeautifulSoup (text, "html.parser")
        elem = soup.select ("#logo")

        print (len(elem))

        
    
parent_path = os.path.dirname (os.path.dirname (__file__))
path = os.path.join (parent_path, "web")

my_generate = Generate (path)
my_generate.index()