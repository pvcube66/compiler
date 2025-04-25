# 🧠 Online Compiler

An intuitive and lightweight web-based compiler that allows users to write, compile, and execute code directly from their browser. Built using HTML, CSS, and Spring Boot, this project is perfect for developers, students, and coding enthusiasts who want a simple, fast way to test code snippets.

This project features a clean and responsive UI for writing code, with backend support to compile and execute it using Java’s ProcessBuilder. It uses REST APIs to send user code from the frontend to the backend and returns the output or any compilation errors.

## Features

- Simple and clean web UI to write code
- Code is compiled and executed on the backend
- Output is shown on the same page
- Built using Spring Boot for backend
- HTML/CSS for the frontend
- Uses REST APIs to handle communication

## Tech Stack

Frontend:
- HTML
- CSS
- JavaScript (optional, for async requests)

Backend:
- Java
- Spring Boot
- ProcessBuilder for code execution

## How It Works

1. User writes code in the text area provided on the web page.
2. When the "Run" button is clicked, the code is sent to the Spring Boot backend via a POST API.
3. The backend temporarily saves the code into a `.java` file, compiles it, and executes it using `javac` and `java` commands.
4. The output or errors are captured and sent back to the frontend.
5. Output is displayed to the user in the browser.

## Project Structure

online-compiler/ ├── src/ │ └── main/ │ ├── java/ │ │ └── com/example/compiler/ │ │ └── CompilerController.java │ └── resources/ │ ├── static/ │ │ └── style.css │ └── templates/ │ └── index.html ├── pom.xml └── README.md

markdown
Copy code

## How to Run Locally

1. Make sure Java JDK 17+ and Maven are installed.
2. Clone the repository:

git clone https://github.com/your-username/online-compiler.git cd online-compiler

markdown
Copy code

3. Run the Spring Boot application:

./mvnw spring-boot:run

mathematica
Copy code

Or, open the project in your IDE and run `Application.java`.

4. Open your browser and go to:

http://localhost:8080

markdown
Copy code

You can now write code, hit "Run", and see the output instantly!

## Deployment

You can deploy this project on platforms like:

- Render
- Heroku
- Railway
- AWS Elastic Beanstalk
- Fly.io

## Author

**Vishnu Vardhan**  

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgements

Inspired by online compilers like Replit and JDoodle. Built with ❤️ using Spring Boot.
