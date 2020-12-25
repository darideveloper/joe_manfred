#! python3

import os, bs4, pprint, csv, sys

class Generate (): 
    """
    Generate static html files for ther web page
    """

    def __init__ (self, path_web): 
        """
        Constructor of the class. Get path of all documents
        """

        self.path = path_web
        self.index_file  = open(os.path.join (self.path, "index-edited.html"), "r")
        self.to_file = open(os.path.join (self.path, "index2.html"), "w")

        csv_file = open (os.path.join (os.path.dirname (__file__), "data.csv"))
        self.data = self.__get_data (csv_file)

    
    def __get_data (self, file): 
        """
        Return dara from csv file
        """

        reader_csv = csv.reader (file)
        data = list(reader_csv)

        return data

    def index (self): 
        """
        Generate file "index.html", with the correct files and information
        """

        print ("Generating {} file...".format ("index.html"))


        # all lines of the template html file
        lines_html = []

        # get position for insert html code
        best_position = 0
        all_position = 0
        videos_position = 0

        counter_line = 0
        elements_counter = 0

        for line in self.index_file.readlines():
            
            lines_html.append (line)
            elemnt = '<img src="imgs/arrow.png" alt="">'

            if line.strip() == elemnt: 
                elements_counter += 1

                if elements_counter == 2:
                    best_position = counter_line + 4
                
                if elements_counter == 4:
                    all_position = counter_line + 4
                
                if elements_counter == 6:
                    videos_position = counter_line + 4
        
            counter_line += 1

        # Position of each section ¿value inside the data file
        index_section_best = 6
        index_section_all = 5
        index_section_videos = 4

        # Get all text and formated sections
        html_text = []
        # Header
        html_text += (lines_html [:best_position]) 
        # Section Best 
        html_text += (self.__get_index_articles_section(index_section_best))
        # Best - All intersection
        html_text += (lines_html [best_position:all_position])
        # Section All
        html_text += (self.__get_index_articles_section(index_section_all))
        # Alll - Videos intersection
        html_text += (lines_html [all_position:videos_position])
        # Section videos
        html_text += (self.__get_index_articles_section(index_section_videos))
        # footer
        html_text += (lines_html [videos_position:])


        for line in html_text: 
            self.to_file.write ("\n" + line.rstrip())


    def __get_index_articles_section (self, section): 
        """
        Return a list with html text lines, fromated and with information of each article of the section
        """

        articles_html = []

        # Extrat first 10 row of data
        max_articles = len(self.data) - 1
        article_counter = 0
        articles_section = 0
        while articles_section < 10 and article_counter <= max_articles:
                
            if self.data[article_counter][section].strip().lower() == 'true':
                data_article = self.data[article_counter]
                articles_section += 1

                # Save variables
                url = "imgs/small/" + data_article[3]
                name = data_article[0]

                # Generate article html
                articles_html.append ('                <div class="article-container button">')
                articles_html.append ('                    <article>')
                articles_html.append ('                        <figure>')
                articles_html.append ('                            <img src="{}"  alt="">'.format (url))
                articles_html.append ('                        </figure>')
                articles_html.append ('                        <h3>{}</h3>'.format(name))
                articles_html.append ('                   </article>')
                articles_html.append ('                </div>')

            article_counter +=1 

        return articles_html
                
                

        
    
