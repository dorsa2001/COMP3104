const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Employee = require("../models/Employee");
const { ObjectId } = require("mongoose").Types;

const resolvers = {
  Query: {
    // Get all employees and map _id to id
    getAllEmployees: async () => {
      const employees = await Employee.find();
      return employees.map((emp) => ({
        id: emp._id.toString(),
        first_name: emp.first_name || "Unknown",
        last_name: emp.last_name || "Unknown",
        email: emp.email || "No Email",
        gender: emp.gender || "Not Specified",
        designation: emp.designation || "Not Assigned",
        salary: emp.salary || 0.0,
        date_of_joining: emp.date_of_joining || "Unknown",
        department: emp.department || "Not Assigned",
        employee_photo: emp.employee_photo || null,
      }));
    },

    // Get a single employee by ID
    getEmployeeById: async (_, { id }) => {
      console.log("Received ID:", id); // Debugging: Check incoming ID format

      if (!ObjectId.isValid(id)) {
        throw new Error("Invalid ID format");
      }

      const employee = await Employee.findById(id); // No need for new ObjectId(id)

      if (!employee) {
        throw new Error("Employee not found");
      }

      return {
        id: employee._id.toString(),
        first_name: employee.first_name || "Unknown",
        last_name: employee.last_name || "Unknown",
        email: employee.email || "No Email",
        designation: employee.designation || "Not Assigned",
        department: employee.department || "Not Assigned",
        date_of_joining: employee.date_of_joining || "Unknown",
      };
    },
  },

  Mutation: {
    // Signup Mutation
    signup: async (_, { username, email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("User already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        username,
        email,
        password: hashedPassword,
        created_at: new Date().toISOString(),
      });

      await user.save();
      return user;
    },

    // Login Mutation
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Incorrect password");
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return token;
    },

    // Add Employee
    addEmployee: async (_, args) => {
      const { first_name, last_name, email, designation } = args;
      if (!first_name || !last_name || !email || !designation) {
        throw new Error(
          "first_name, last_name, email, and designation are required."
        );
      }

      const newEmployee = new Employee({
        ...args,
        department: args.department || "Not Assigned",
        date_of_joining: args.date_of_joining || "Unknown",
        created_at: new Date().toISOString(),
      });

      return await newEmployee.save();
    },

    // Update Employee
    updateEmployee: async (_, { id, ...updates }) => {
      const employee = await Employee.findById(id);
      if (!employee) {
        throw new Error("Employee not found");
      }

      return await Employee.findByIdAndUpdate(id, updates, { new: true });
    },

    // Delete Employee
    deleteEmployee: async (_, { id }) => {
      const employee = await Employee.findById(id);
      if (!employee) {
        throw new Error("Employee not found");
      }

      await Employee.findByIdAndDelete(id);
      return "Employee deleted successfully";
    },
  },
};

module.exports = resolvers;
