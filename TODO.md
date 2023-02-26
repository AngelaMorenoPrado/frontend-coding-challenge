  * Assuming the list of names are fetched from an actual api, how would you implement authentication, rate limiting handling, error handling, api unavailability? - What kind of retry strategies you’d imagine implementing?
    Authentication: using a name and password, for example, so the actual api returns a token. Every time you want to GET some data (or POST) you have to use that api token.
    Check for HTTP status codes, and show messages to the user. If we control the codes, we can create personalised interfaces to let the user know what is happening.
    Optimize code to eliminate any unnecessary API calls, create users and set a maximum number of requests... Always letting the user know how many request they have left.
    For retry strategies we could use exponential backoff; so the application tries to reconnect to the API, then waits a short time before trying again. This time keeps exponentially increasing.
  * How can we protect the app from being abused?
    There are different ways to prevent this from happening, depending on what we want to do with the application:
    1- Provided we want the users to be registered before being able to ask for a prize (or introduce their name), we could simply implement a sign up/log in page. After asking for their email, and checking the email provided is valid, we could set a maximum number of times a user can introduce a name.
    2- If creating users is not an option, I would simply implement a reCAPTCHA, protecting the app from bots.
  * How can we deploy the app into a cloud environment?
  * How can we be sure the app is running with the latest version of code?
    1- I have never worked in a cloud environment, and therefore there must be a better answer than the one I'm about to provide, but how about displaying the current version on screen? That way we can check which version is running.
  * What techniques you can employ to ensure users are not disrupted when you make significant changes to code?
    Testing is key in this case. I would implement multiple unit tests, using tools such as Selenium.
  * What kind of accessibility best practices should we keep in mind?
    There are multiple tools that allow you to check whether your website is accesible or not; for example, WAVE. They provide a list of errors you need to improve to make the website accesible.
    Obviously, there are multiple practices we should keep in mind in order to make the application as accessible as possible from the beggining, such as adding proper alt text to images, using text (not pictures with text), checking color contrast between text and background, use labels with form fields and input, use heading markup, don't overuse hover states.
    Other ways to check if the website is accesible: try keyboard navigation.
  * How would you structure the css so that we have the most reusability but also the least leakage between components?
    I would create a general .css to define different variables that are going to be used in the majority -if not in all- of the components (for example: background, main text color); especially useful if there are plans to create light/dark themes. In addition, I would create a .css file for each component where I would define, using classes, the different styles. You can create styles for a specific id too, but I wouldn't use it unless completely necessary.
  * Any other improvements that you feel like could be added.
    I would have added a few graphs; for example, a pie chart to show the proportion between the total number of winners names for the day vs the ones that have been claimed.
    In addition, I would ask the user to include -with their name- their nationality or country where they live; this would allow us to show a map chart that displays that information.
    Filters/sorters in the table. We only have the names now, so it is not that important, but if the application continued growing, it would be extremely useful.
    A data history, so the user can check for their name and see how many times it has been claimed (and when).