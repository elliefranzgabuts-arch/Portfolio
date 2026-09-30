# Ellie Franz | Portfolio

### Personal Portfolio Website

A modern personal portfolio website developed to showcase my journey as a BSIT student, web developer, projects, technical skills, certificates, and ongoing progress in the field of Information Technology.

The website includes a public portfolio interface and a private administrative dashboard for managing portfolio content, monitoring visitor activity, viewing analytics, and managing project information.

## Key Features

* Responsive Personal Portfolio Website
* Personal Profile and About Section
* Technical Skills and Technology Stack Showcase
* Project Portfolio and Project Management
* Certificate Showcase
* Contact Form
* Visitor Tracking
* Unique Visitor Monitoring
* Page Traffic Analytics
* Recent Visitor Activity
* Contact Message Monitoring
* Secure Admin Authentication
* Administrative Dashboard
* Project CRUD Management
* Project Technology Stack Management
* Project Image Upload
* Real-Time Portfolio Statistics

## Technology Stack

### Frontend

* HTML
* CSS
* JavaScript
* Tailwind CSS

### Backend

* Node.js
* Express.js
* REST API

### Database

* MySQL
* Aiven

### Tools & Deployment

* Git
* GitHub
* VS Code
* Cloudflare
* Railway

## Website Modules

### Home

* Personal introduction
* Developer-focused hero section
* Introduction to current work and projects
* Navigation to portfolio sections

### About

* Personal background
* BSIT student information
* Web development focus
* Personal interests and activities

### Skills

* Frontend technologies
* Backend technologies
* Database technologies
* Development tools
* Technologies based on actual project experience

### Projects

* Personal and academic projects
* Project descriptions
* Technology stack used for each project
* Project links
* Project images

### Certificates

* Certificate showcase
* Organized certificate information
* Dedicated section for future certificate management

### Contact

* Contact form
* Visitor message submission
* Backend API integration
* Database storage for submitted messages

### Analytics

* Unique visitor count
* Total visit count
* Contact message count
* Project statistics
* Visitor activity monitoring
* Traffic and page-view monitoring
* Recent visitor records

### Admin Dashboard

The private administrative dashboard provides tools for managing and monitoring the portfolio website.

* Secure administrator authentication
* Portfolio statistics
* Visitor analytics
* Traffic monitoring
* Visitor activity
* Contact message monitoring
* Project management
* Project creation
* Project editing
* Project deletion
* Technology stack management
* Project image uploading
* Administrative activity monitoring

## Visitor Tracking System

The website includes a visitor tracking system designed to monitor portfolio traffic while distinguishing individual visitors from total visits.

The system records visitor identifiers and visit activity to provide information such as:

* Unique visitors
* Total visits
* Recent visitor activity
* Visited paths
* Page traffic distribution

Visitor information is processed through the backend API and stored in the MySQL database.

## Project Management System

The admin dashboard includes a project management system that allows portfolio projects to be managed without manually modifying the frontend project data.

Administrators can:

* Add projects
* Edit project information
* Delete projects
* Add project descriptions
* Add project links
* Define project technology stacks
* Upload project images

This allows the Projects section of the portfolio to be updated directly through the administrative interface.

## Analytics System

The analytics dashboard provides an overview of website activity.

It currently monitors:

* Unique visitors
* Total visits
* Contact messages
* Project records
* Visitor activity
* Page traffic

The dashboard also provides visual representations of visitor activity and traffic distribution.

## Project Structure

Portfolio/
├── src/
│   ├── components/
│   │   ├── About.jsx
│   │   ├── Analytics.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── Home.jsx
│   │   ├── Navbar.jsx
│   │   ├── Projects.jsx
│   │   ├── Skills.jsx
│   │   └── ...
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── server/
│   ├── index.js
│   └── package.json
│
├── public/
├── package.json
└── README.md


## Database

The backend uses MySQL as the primary database.

The production database is hosted through Aiven and contains tables responsible for different parts of the portfolio system.

admin_activity
certificates
contact_messages
projects
site_stats
unique_visitors
visitors

These tables support administrative activity tracking, portfolio content, contact messages, project management, website statistics, and visitor monitoring.

## API Integration

The frontend communicates with the backend through REST API endpoints.

The backend handles services including:

* Contact form submissions
* Visitor tracking
* Analytics data
* Admin authentication
* Project management
* Administrative activity

This separation allows the frontend and backend to operate as independent parts of the portfolio system.

## Deployment

The portfolio uses a separate frontend and backend deployment architecture.

### Frontend

The public portfolio interface is deployed through Cloudflare.

### Backend

The Node.js and Express.js backend is deployed through Railway.

### Database

The production MySQL database is hosted through Aiven.


User
 │
 ▼
Portfolio Website
 │
 │
 ▼
Cloudflare
 │
 │ REST API
 ▼
Railway Backend
 │
 ▼
Aiven MySQL


## Objective

The main objective of this project is to build a functional personal portfolio that goes beyond displaying static information.

The system is designed to present my background, technical skills, projects, and development journey while also providing practical experience in frontend development, backend development, database management, REST API integration, authentication, deployment, and website analytics.

The project also serves as an ongoing development environment where new features, improvements, and technologies can be introduced as my skills continue to grow.

## Development Status

The portfolio is an ongoing project.

New improvements, features, projects, and refinements may be added as development continues.

> The system is still in development.
