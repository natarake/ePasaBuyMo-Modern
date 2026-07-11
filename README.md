# ePasaBuyMo

![ePasaBuyMo](https://i.ibb.co/7Wgbk3Z/e-Pasa-Buy-Mo.png)

ePasaBuyMo is a capstone project that I developed during my participation in the Kodego bootcamp. The Kodego bootcamp is an intensive coding program that provides aspiring developers with the skills and knowledge necessary to become successful full-stack web developers.

As a capstone project, ePasaBuyMo represents the culmination of my learning journey in the bootcamp, where I was able to apply all the skills and concepts that I had acquired throughout the program. The project provided me with an opportunity to showcase my proficiency in web development technologies such as ReactJS, Tailwind CSS, MongoDB, and ExpressJS.

Through the development of ePasaBuyMo, I was able to gain hands-on experience in developing complex full-stack web applications. This involved designing and implementing the user interface, building the back-end infrastructure, and integrating the various components of the application into a cohesive and functional whole.

The development of ePasaBuyMo also allowed me to sharpen my problem-solving skills as I encountered various challenges and obstacles along the way. Through persistence, creativity, and collaboration with my fellow bootcamp participants, I was able to overcome these challenges and develop a high-quality web application that meets the needs of "pasa-buy" entrepreneurs who need a reliable and feature-rich web application to manage their business operations effectively.

## What are the features of ePasaBuyMo

The ePasaBuyMo web application offers two levels of access, namely the user level and the admin level, which cater to different functionalities and user requirements. The user level can register using their email and password or via Google popup, and can login using either their email and password or the Google popup option. Once users are logged in, they can access the homepage, which displays products stored in MongoDB, and is fetched using the ExpressJS framework. Users can filter products by category and search for specific products using the search bar.

The core functionality of the application is centered around the ability for users to add products to their cart, remove items from their cart, and calculate the total price of their purchases. When users are ready to checkout, they can do so using Stripe payment, which provides a secure and efficient payment gateway. In cases where users are unable to find a specific product, they can request it through the application, which will notify the admin level.

The admin level has all the functionalities of the user level except for requesting a specific product. However, the admin level has access to the dashboard, which offers comprehensive product management features. Admins can add new products, update the details of existing products, and delete products as needed, ensuring that the selection remains relevant and up-to-date.

Overall, the two levels of access, combined with the various functionalities and features, provide a comprehensive and user-friendly experience for both users and admins, making ePasaBuyMo a useful and efficient tool for "pasa-buy" entrepreneurs.

## What went well

Through building ePasaBuyMo, I gained valuable experience and strengthened my knowledge in integrating various technologies to develop a complex and user-friendly web application using MERN stack and redux-toolkit. I also learned how to secure sensitive data using hashing algorithms like CryptoJS and implement JWT.

Moreover, I gained proficiency in using UI libraries such as Material UI Data Grid and React Toastify to improve the user experience. Also strengthened understanding of cors concepts and using postman api for testing and debugging.

I was also able to implement a solid folder structure to enable easy navigation and modification of the codebase, ensuring that the application could be scaled for larger and more complex projects in the future.

## What are the challenges encountered

During the development of the ePasaBuyMo application, the design phase was a bit challenging as it was not my strong suit. However, I was able to overcome this challenge by seeking inspiration from various blogs and tutorials on the internet. These resources provided me with a better understanding of the principles of design, and I was able to incorporate these principles into the design of the application.

One of the biggest challenges that I encountered during the development of the application was implementing the Redux logic, especially on the update functionality. However, I was able to overcome this challenge thanks to the amazing support provided by the ReactJS community. The community provided me with helpful tips and advice, which helped me to better understand the intricacies of implementing Redux logic.

Another challenge that I encountered during the development process was with deployment. I encountered a CORS error, which prevented the application from being deployed. This was a challenging problem to solve, but I was able to overcome it by carefully reviewing the code and making some modifications to the configuration files. This process taught me the importance of testing and debugging applications thoroughly before deployment, as even small errors can have significant consequences when deploying applications to a production environment.


## Future improvements

There are several potential improvements that could be made to the ePasaBuyMo application to enhance its functionality and user experience.

One potential improvement would be to add the ability for users to update their profile information. This would allow users to easily modify their personal details, such as their name, address, and contact information.

Another potential improvement would be to require users to verify their email address before being able to checkout. This would help to prevent fraudulent purchases and ensure that orders are being placed by legitimate users. 

Adding cash on delivery functionality would also be a useful improvement to the application. This would allow users to pay for their orders with cash upon delivery, which can be a convenient payment option for users who do not have access to a credit card or prefer not to enter their payment information online.

Finally, checking if a product already exists in the database before adding a new product would help to prevent duplicate products from being added and ensure that the database remains organized and efficient.

## Developer notes

The code for the backend of this app is on [ePasaBuyMo-backend](https://github.com/natarake/ePasaBuyMo-backend)

### Liked this repository?

Please don't forget to leave a ⭐🙏🏻!

## Run this app on your local machine

In order to run this application on your local machine, you can run the following commands on the terminal:

### `yarn`

Installs the required package dependencies

### `yarn`

Runs the client in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
