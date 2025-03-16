import React from "react";

import styles from "./project.module.css";
import projectCoverImg from "../asset/Learnmate-logo.jpg";
import ProjectItem from "./ProjectItem";
import ProjectsData from "../../Data/ProjectsData";
import SocialData from "../../Data/SocialData";
import Button from "../UI/Button";

import ProgrammingSkills from "../Professional Skillset/ProgrammingSkills";
import { useSelector } from "react-redux";

const Projects = (props) => {
  const nonThemeColor = useSelector((state) => state.nonThemeColor);
  const uiColor = useSelector((state) => state.uiColor);
  let projects = ProjectsData.DUMMY_PROJECTS;
  return (
    <div id="projects">
      <div className={styles.projects}>
        <section className={styles.projectHeader}>
          <h1>
            <span style={{ color: nonThemeColor }}>My Capstone </span>
            <span style={{ color: uiColor }}>Project</span>
          </h1>
          <div>
            I am currently working on <strong>LearnMate</strong>, a web-based
            platform designed to connect students with tutors for personalized
            academic support. LearnMate allows students to find tutors based on
            subjects, availability, and ratings, while tutors can manage
            profiles and schedules. The project involves full-stack development
            with technologies like React, Node.js, and MongoDB, ensuring a
            seamless user experience for both students and tutors.
          </div>
          <br />
          <h2>Project Components:</h2>
          <ul>
            <li>
              <strong>Project Summary:</strong> LearnMate is a tutor-student
              connection platform designed to provide personalized academic
              assistance. The system enables students to find tutors based on
              subject expertise, availability, and reviews.
            </li>
            <li>
              <strong>Project Vision:</strong> The goal is to create an
              intuitive, efficient, and scalable web-based solution for academic
              mentoring. LearnMate simplifies the process of discovering and
              booking tutors while allowing tutors to manage their profiles and
              schedules.
            </li>
            <li>
              <strong>Project/Business Requirements:</strong> The platform must
              support tutor-student matchmaking, appointment scheduling, rating
              and review systems, and secure authentication using Google login.
            </li>
            <li>
              <strong>Project Plan:</strong> The project follows an Agile
              methodology with multiple sprints, including requirements
              gathering, UI/UX design, database structuring, front-end and
              back-end development, testing, and deployment.
            </li>
            <li>
              <strong>Requirements Analysis and Design:</strong> The system
              includes user roles (students, tutors, admins), database schema
              (MongoDB for user and booking data), and API endpoints for
              authentication, profile management, and booking functionalities.
            </li>
            <li>
              <strong>Wireframes/Mockups:</strong> The UI/UX is designed in
              Figma, ensuring an intuitive experience. Key pages include user
              registration, tutor search, profile management, and booking
              interfaces.
            </li>
            <li>
              <strong>Status Reports:</strong> The development team regularly
              updates progress, tracking completed tasks, pending features, and
              potential roadblocks using Trello.
            </li>
            <li>
              <strong>System Implementation:</strong> The application is built
              using React.js for the front-end, Node.js and Express for the
              back-end, and MongoDB for data storage. Authentication is managed
              via Firebase and OAuth for Google login.
            </li>
          </ul>
        </section>
      </div>
      <ProgrammingSkills />
      
    
    </div>
  );
};

export default Projects;
