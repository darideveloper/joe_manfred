#! python3

import cv2, os, shutil
import moviepy.editor as mp

class Video_master ():
    """
    Extract frames for videos an select only 6 frames for generate the animations
    """ 

    def __init__ (self, path_videos): 
        """
        Constructor of the class. Set videos folder
        """

        self.path_videos = path_videos

        print ("Processing videos...")
        

    def resize_videos (self, video_height):
        """
        Change the resolution of the videos
        """
        
        os.chdir (self.path_videos)

        for video in os.listdir (self.path_videos):

            if video.endswith (".mp4"):  

                # New folder file
                video_new = os.path.join ("original", video)

                # Verify if video exist in original folder / is video has been resized
                if os.path.isfile(video_new): 
                    continue

                # Backup original video
                shutil.move (video, video_new)

                # Resize video and save
                clip = mp.VideoFileClip(video_new)
                clip_resized = clip.resize (height=video_height) 
                clip_resized.write_videofile(video)



    def generate_ss (self, num_frame, auto_replace = False): 
        """
        Extract all frames from each video, and save in specific folder
        """

        os.chdir (os.path.join (self.path_videos, "original"))

        for video in os.listdir (self.path_videos):

            if video.endswith (".mp4"): 

                # Generate name of file
                file_name = os.path.basename (video)[:video.find (".")] + '.jpg'

                # Verify repolice file
                if os.path.isfile (file_name) and auto_replace == False: 
                    continue
                else: 

                    # video captured
                    cap= cv2.cv2.VideoCapture(video)

                    # Get the total frames number
                    total_frames = 0
                    while(cap.isOpened()):
                        ret, frame = cap.read()
                        if ret == False:
                            break
                        total_frames+=1


                    # Extract screenshot of the video+
                    cap= cv2.cv2.VideoCapture(video)
                    i=0

                    while(cap.isOpened()):
                        ret, frame = cap.read()
                        if ret == False:
                            break

                        # Verify positive and negative frame
                        if num_frame >= 0: 
                            frame_ss = frame
                        else: 
                            frame_ss = total_frames + num_frame

                        # Save ss of the correct frame
                        if i == frame_ss: 
                            cv2.cv2.imwrite(file_name,frame)
                            print ("Screenshot {} generated".format (file_name))
                        i+=1

                    cap.release()
                    cv2.cv2.destroyAllWindows()

    def move_ss (self, auto_replace = False): 
        """
        Move screenshots to the all images folder
        """

        ss_folder = os.path.join (self.path_videos, "original")
        all_img_folder = os.path.join (os.path.dirname (self.path_videos), "imgs", "all")

        for image in os.listdir (ss_folder):

            if image.endswith(".jpg"):
                
                from_path = os.path.join (ss_folder, image)
                to_path = os.path.join (all_img_folder, image)

                # Verify if file exist 
                if os.path.isfile (to_path) and auto_replace == False: 
                    continue

                shutil.copy (from_path, to_path)

                print ("Image copied to {}".format (to_path))
