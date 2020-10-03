// require packages 
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

// prompt for the questions
function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            message: "Enter Project title",
            name: "title"
        },
        {
            type: "input",
            message: "Enter Project description",
            name: "description"
        },
        {
            type: "input",
            message: "Please list any installation instructions",
            name: "installation"
        },
        {
            type: "input",
            message: "Enter usage information.",
            name: "usage"
        },
        {
            type: "input",
            message: "Enter contribution guidelines",
            name: "contributing"
        },

        {
            type: "input",
            message: "Enter test information or instructions",
            name: "tests"
        },
        {
            type: "checkbox",
            message: "Select a license ",
            choices: [
                "Apache",
                "MIT",
                "ISC"
            ],
            name:"license"
        },
        {
            type: "input",
            message: "Enter your Github Repository URL",
            name: "github"
        },
        {
            type: "input",
            message: "Enter your LinkedIn profile URL",
            name: "linkedin"
        },
        {
            type: "input",
            message: "Enter your Email address",
            name: "email"
        },
    ])
};


function generateMarkdown (answers) {
    return `
    <!DOCTYPE html>
<html lang= "en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
<h1>${answers.title}</h1>
    <hr>
</head>
    
<body>

    <h2>Table of Contents:</h2>
    
    <ul>
    <li>Description</li>
    <li>Installation</li>
    <li>Usage</li>
    <li>Contributing</li>
    <li>Tests</li>
    <li>license</li>
    <li>Important Links and Contact Information</li>
    </ul>   

   <h2>Description:</h2>
        <p>${answers.description}

    ## Installation:
        - ${answers.installation}

    ## Usage:
        - ${answers.usage}

    ## Contributing:
        - ${answers.contributing}
    
    ## Tests:
        - ${answers.tests}

    ## License:
        - ${answers.license}

    ## Important links:
     
        My Github Repository URL: ${answers.github}

        My LinkedIn profile URL: ${answers.linkedin}

        Contact me at ${answers.email}
    </p>
    </body> 
        </html>
   
    `;
}

async function init() {
    try {
        const answers = await promptUser();

        const readMe = generateMarkdown(answers);

        await writeFileAsync("README.md", readMe);
        console.log("success");
    } catch(err) {
        console.log(err);
    }
}

init();



















