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

        self.path_web = path_web
        self.path_python = os.path.dirname (__file__)
        self.path_templates = os.path.join (self.path_python, "templates html")


        # Index files
        self.index_file_template  = open(os.path.join (self.path_templates, "index-template.html"), "r")
        self.index_file = open(os.path.join (self.path_web, "index.html"), "w")

        # Board files
        self.board_file_template  = open(os.path.join (self.path_templates, "board-template.html"), "r")
        self.board_best = open(os.path.join (self.path_web, "board-best.html"), "w")
        self.board_all = open(os.path.join (self.path_web, "board-all.html"), "w")
        self.board_videos = open(os.path.join (self.path_web, "board-videos.html"), "w")

        # Article files
        self.article_file_template  = open(os.path.join (self.path_templates, "article-template.html"), "r")
        self.articles_folder = os.path.join (self.path_web, "articles")

        # Data CSV
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

        print ("Generating index...")


        # all lines of the template html file
        lines_html = []

        # get position for insert html code
        best_position = 0
        all_position = 0
        videos_position = 0

        counter_line = 0
        elements_counter = 0

        # Read and save each line of html file
        for line in self.index_file_template.readlines():
            
            lines_html.append (line)

            # Identify speicic line in the text
            elemnt = '<img src="imgs/arrow.png" alt="">'

            # Get position of each line for each section
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
        html_text += (self.__get_articles_section(index_section_best, max_10 = True))
        # Best - All intersection
        html_text += (lines_html [best_position:all_position])
        # Section All
        html_text += (self.__get_articles_section(index_section_all, max_10 = True))
        # Alll - Videos intersection
        html_text += (lines_html [all_position:videos_position])
        # Section videos
        html_text += (self.__get_articles_section(index_section_videos, max_10 = True))
        # footer
        html_text += (lines_html [videos_position:])

        # Write information in file
        for line in html_text: 
            self.index_file.write ("\n" + line.rstrip())


    def __get_articles_section (self, section, max_10 = False): 
        """
        Return a list with html text lines, fromated and with information of each article of the section
        """

        articles_html = []

        # Extrat first 10 row of data
        max_articles = len(self.data) - 1
        article_counter = 0
        articles_section = 0
        while article_counter <= max_articles:

            # Stop program if it request only ten articles
            if max_10 and articles_section >= 10:
                break

                
            if self.data[article_counter][section].strip().lower() == 'true':
                data_article = self.data[article_counter]
                articles_section += 1

                # Save variables
                src = "imgs/small/" + data_article[3]
                name = data_article[0]
                link = "articles/" + str(data_article[0]).replace (" ", "-") + ".html"
    

                # Generate article html
                articles_html.append ('                <div class="article-container button">')
                articles_html.append ('                    <article>')
                articles_html.append ('                        <a href="{}">'.format (link))
                articles_html.append ('                            <figure>')
                articles_html.append ('                                <img src="{}"  alt="">'.format (src))
                articles_html.append ('                            </figure>')
                articles_html.append ('                            <h3>{}</h3>'.format(name))
                articles_html.append ('                        </a>')
                articles_html.append ('                   </article>')
                articles_html.append ('                </div>')

            article_counter +=1 

        return articles_html
    
    def boards (self): 
        """
        Generate ALL boards html files
        """

        print ("Generating boards...")

        # Position of each section value inside the data file
        data_index_board_best = 6
        data_index_board_all = 5
        data_index_board_videos = 4

        # Generate each board
        self.__board (data_index_board_best, self.board_best)
        self.__board (data_index_board_all, self.board_all)
        self.__board (data_index_board_videos, self.board_videos)

    def __board (self, data_index, board_file):
        """
        Generate a board html file, with the correct format and information
        """

        # to_file = os.path.basename (board)
        # print ("Generating {} file...".format (to_file))

        # all lines of the template html file
        lines_html = []

        # Line of the board in the html file
        position_board = 0

        counter_line = 0
        for line in self.board_file_template.readlines():

            lines_html.append (line)

            # Identify speicic line in the text
            elemnt = '<main>'

            if line.strip() == elemnt: 
                position_board = counter_line + 1
            
            counter_line+=1

        # Move the pointer to the start of the file
        self.board_file_template.seek (0)

        # Get all text and format sections
        html_text = []

        # Header
        html_text += (lines_html [:position_board]) 

        # Board
        html_text += (self.__get_board (data_index))

        # Footer
        html_text += (lines_html [position_board:]) 

        # Write information in file
        for line in html_text: 
            board_file.write ("\n" + line.rstrip())


    def __get_board (self, data_index): 
        """
        Reurn a list with html text lines, formated and with image of the boards
        """

        articles_html = []

        # get articles of the specificv section
        artiles_section =  self.__get_articles_section (data_index, max_10 = False)

        # Calculate the number of articles in each column
        articles_num = len (artiles_section) / 10

        articles_in_column =  round (articles_num/4) * 10

        # List of list of articles in each column
        articles_columns = []

        # Generate each column with subarticles
        articles_columns.append(artiles_section[:articles_in_column])
        articles_columns.append(artiles_section[articles_in_column:articles_in_column*2])
        articles_columns.append(artiles_section[articles_in_column*2:articles_in_column*3])
        articles_columns.append(artiles_section[articles_in_column*3:])

        
        # Add title and grid open
        articles_html.append ('        <h1>My Best Draws</h1>')
        articles_html.append ('        <div class="board">')
        

        # Add open and close tag to each section
        for articles_column in articles_columns:

            # Add open tag of suboard
            articles_html.append ('            <section class="sub-board">')

            # Save articles of the column
            for article in articles_column: 
                # print (article)
                articles_html.append (article)

            # Add closed tag of suboard
            articles_html.append ('            </section>')

        # Add gir close

        articles_html.append ('        </div>')

        return articles_html

    def articles (self): 
        """
        Generate each article of the data base
        """

        print ("Generating articles...")

        for article in self.data: 

            name = article [0]
            date = article [1]
            size = article [2]
            link = "../imgs/all/" + article [3]
            description = article [7]

            # all lines of the template html file
            lines_html = []

            # get position for insert html code
            position = 0

            counter_line = 0

            # Read and save each line of html file
            for line in self.article_file_template.readlines():
            
                lines_html.append (line)

                # Identify speicic line in the text
                elemnt = '<main>'

                # Get position of each line for main section
                if line.strip() == elemnt: 
                    position = counter_line
                
                counter_line += 1
            
            # Retornar puntero al comienzo del documento
            self.article_file_template.seek (0)
            
            # Get all text and formated sections
            html_text = []

            # Header
            html_text += (lines_html [:position]) 
            
            # Article
            article_lines = self.__article (name, date, size, description, link)
            html_text += article_lines

            # Footer
            html_text += (lines_html [position:]) 

            # Write data in file
            article_name = name.replace (" ", "-") + ".html"
            article_file = open (os.path.join (self.articles_folder, article_name), "w")
            for line in html_text: 
                article_file.write ("\n" + line.rstrip())


    def __article (self, name, date, size, description, link):
        """
        Generate article html text with specific information
        """

        article_html = []

        article_html.append ('        <h1>{}</h1>'.format (name.title()))
        article_html.append ('        <h3>Date: {}</h3>'.format(date))
        article_html.append ('        <h3>Size: {}</h3>'.format(size))
        article_html.append ('        <p>{}</p>'.format(description))
        article_html.append ('        <div class="main-image-wrapper">')
        article_html.append ('            <figure class="main-image max-height">')
        article_html.append ('                <img src="{}" alt="">'.format(link))
        article_html.append ('            </figure>')
        article_html.append ('        </div>')

        return article_html




        
