# Research App 

### TODO LIST 

##### Backend 
**Models**
- Validator 
- Test (unit)
- Seeding script 
- Additional Config 

**Routes** 
- Unit test

**Record data (Update Study/Create Responses)** 
- Write 

**Export data to CSV** 
- Write 
- Record: choice, response time, mouse tracker (later)
- Info: participant id, study id, question and responses (by id or by prompt?), response time (when to start the timer), finished time, number of options shown 

**To clarify** 
- Participant: 
    - Is participant ID automatically assigned or given through email (i.e. need a screen for them to enter their given id)? 
    - Will there be multiple study (or multiple versions of the same study) running at the same time? (i.e. do we need to ask them to enter the study number)
    - When to start the timer? As soon as the question appears or after a certain amount of time (to allow time for reading the question prompt)? 
    - We talked about randomizing the number of choices shown to participants. Should this number be fixed throughout the study? For example, will a participant be shown 3 options for each of the 10 questions of the study? Or will they be shown 5 options for some questions and 3 options for the rest?
    - How to record response data, such as the questions and responses? Should we record the question number or the question statement (or both)? How do we record the chosen image (by number -- option 1) or by description of the image (for ex. more lavish house)? 

##### Frontend  
- Change logo (to maybe Colgate instead of React logo)
- Work on researcher's side (create/edit/delete study/question/response, export response data)
    - Upload images and work with images in forms 
    - Response data is immutable 
    - Choose how to record data for export 

**Later** 
- [Homepage] Validate participant (no repeat) and study (exists) immediately on submit, before redirecting 
- [Homepage] Display error

**NOW**
- implement auto increment for study ID -- consider just using the object ID (for privacy concern as well)
    - URL use simple id 
    - Find use by ID 
    - Make image height equal 
    - May consider making the app slower