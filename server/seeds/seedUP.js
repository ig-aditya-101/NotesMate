import mongoose from "mongoose";
import College from "../models/College.js";
import Subject from "../models/Subject.js";
import dotenv from "dotenv";

dotenv.config();

// ==========================================
// 1. THE UNIVERSITIES OF UTTAR PRADESH
// ==========================================
const UNIVERSITIES = [
  "Dr. A.P.J. Abdul Kalam Technical University (AKTU)",
  "Board of Technical Education UP (BTEUP)",
  "Lucknow University",
  "Banaras Hindu University (BHU)",
  "Aligarh Muslim University (AMU)",
  "Chhatrapati Shahu Ji Maharaj University (Kanpur)"
];

// ==========================================
// 2. THE SYLLABUS DICTIONARY (RAW DATA)
// ==========================================
const SYLLABUS_MAP = {
  // === ENGINEERING BRANCHES (AKTU / AMU) ===
  "Computer Science & Engineering": {
    1: ["Engineering Physics", "Engineering Math I", "Basic Electrical Engg", "Programming for Problem Solving", "Soft Skills"],
    2: ["Engineering Chemistry", "Engineering Math II", "Basic Electronics Engg", "Mechanical Engineering Basics", "AI for Engineering"],
    3: ["Data Structures", "Computer Organization & Architecture", "Discrete Mathematics", "Cyber Security", "Python Programming"],
    4: ["Operating Systems", "Theory of Automata & Formal Languages", "Microprocessors", "Web Designing", "Universal Human Values"],
    5: ["Database Management Systems", "Design and Analysis of Algorithms", "Compiler Design", "Machine Learning Techniques", "Constitution of India"],
    6: ["Software Engineering", "Computer Networks", "Web Technology", "Data Analytics", "Indian Tradition & Culture"],
    7: ["Artificial Intelligence", "Cloud Computing", "Distributed Systems", "Cryptography", "Rural Development"],
    8: ["Deep Learning", "Internet of Things", "Project Management & Entrepreneurship", "Virtual Reality"]
  },
  "Mechanical Engineering": {
    1: ["Engineering Physics", "Engineering Math I", "Basic Electrical Engg", "Engineering Graphics", "Soft Skills"],
    2: ["Engineering Chemistry", "Engineering Math II", "Manufacturing Processes", "Mechanical Engineering Basics", "AI for Engineering"],
    3: ["Thermodynamics", "Fluid Mechanics", "Material Science", "Mechanics of Solids", "Python Programming"],
    4: ["Applied Thermodynamics", "Kinematics of Machines", "Manufacturing Technology", "Measurement and Metrology", "Universal Human Values"],
    5: ["Heat and Mass Transfer", "Dynamics of Machines", "Machine Design I", "IC Engines", "Constitution of India"],
    6: ["Refrigeration & Air Conditioning", "Machine Design II", "Fluid Machinery", "Mechatronics", "Indian Tradition & Culture"],
    7: ["Automobile Engineering", "CAD/CAM", "Operations Research", "Non-Destructive Testing", "Rural Development"],
    8: ["Power Plant Engineering", "Quality Control", "Project Management", "Energy Conservation"]
  },
  "Civil Engineering": {
    1: ["Engineering Physics", "Engineering Math I", "Basic Electrical Engg", "Engineering Graphics", "Soft Skills"],
    2: ["Engineering Chemistry", "Engineering Math II", "Basic Civil Engg", "Mechanical Engineering Basics", "AI for Engineering"],
    3: ["Building Materials & Construction", "Surveying & Geomatics", "Fluid Mechanics", "Solid Mechanics", "Python Programming"],
    4: ["Hydraulics & Hydraulic Machines", "Structural Analysis", "Geotechnical Engineering", "Environmental Engineering I", "Universal Human Values"],
    5: ["Design of Concrete Structures", "Transportation Engineering", "Quantity Surveying & Estimation", "Environmental Engineering II", "Constitution of India"],
    6: ["Design of Steel Structures", "Foundation Engineering", "Water Resources Engineering", "Disaster Management", "Indian Tradition & Culture"],
    7: ["Construction Engineering & Management", "Railway Engineering", "Airport & Harbour Engineering", "Solid Waste Management", "Rural Development"],
    8: ["Bridge Engineering", "Traffic Engineering", "Project Management", "Earthquake Resistance Design"]
  },

  // === DIPLOMA (BTEUP) ===
  "Diploma in Computer Science": {
    1: ["Communication Skills-I", "Applied Mathematics-I", "Applied Physics-I", "Applied Chemistry", "Fundamentals of Computer and IT"],
    2: ["Applied Mathematics-II", "Applied Physics-II", "Basics of Information Technology", "Electrical Engg Basics", "Concept of Programming using C"],
    3: ["Applied Mathematics-III", "Internet and Web Technology", "Environmental Studies", "Data Communication", "Data Structures Using C"],
    4: ["Communication Skills-II", "Database Management System", "Object Oriented Programming using Java", "Operating Systems", "E-Commerce"],
    5: ["Software Engineering", "Web Development using PHP", "Computer Programming using Python", "Computer Architecture and Hardware", "Internet of Things"],
    6: ["Development of Android Apps", "Cloud Computing", "Industrial Management and Entrepreneurship", "Advance Java", "Major Project"]
  },
  "Diploma in Civil Engineering": {
    1: ["Communication Skills-I", "Applied Mathematics-I", "Applied Physics-I", "Applied Chemistry", "Engineering Drawing-I"],
    2: ["Applied Mathematics-II", "Applied Physics-II", "Applied Mechanics", "Basics of Mechanical and Electrical Engg", "Civil Engg Materials"],
    3: ["Hydraulics", "Surveying-I", "Construction Materials", "Building Construction", "Concrete Technology"],
    4: ["Highway Engineering", "Surveying-II", "Irrigation Engineering", "Design of RCC Structures", "Water Supply Engg"],
    5: ["Soil Mechanics", "Railway, Bridge and Tunnels", "Earthquake Resistant Building Construction", "Estimating & Costing", "Survey Camp"],
    6: ["Steel Structures Design", "Construction Management", "Design of Steel Structures", "Plumbing Drawing", "Major Project"]
  },

  // === UNDERGRADUATE (LU / BHU / CSJM) ===
  "BCA (General)": {
    1: ["Principles of Management", "C Programming", "Business Communication", "Mathematics I", "Computer Fundamentals"],
    2: ["Data Structures in C", "System Analysis and Design", "Mathematics II", "Digital Electronics", "Organizational Behavior"],
    3: ["Object Oriented Programming using C++", "Operating Systems", "Business Economics", "Computer Architecture", "Financial Accounting"],
    4: ["Java Programming", "DBMS", "Computer Networks", "Software Engineering", "Optimization Techniques"],
    5: ["Web Design Basics", "Python Programming", "Visual Basic", "Numerical Methods", "Cyber Security"],
    6: ["E-Commerce", "Information Security", "PHP & MySQL", "Cloud Computing", "Project Work"]
  },
  "B.Sc (Mathematics / Physics)": {
    1: ["Mechanics and Wave Motion", "Differential Calculus", "Integral Calculus", "Inorganic Chemistry", "Communication Skills"],
    2: ["Kinetic Theory and Thermodynamics", "Differential Equations", "Matrices", "Organic Chemistry", "Environmental Studies"],
    3: ["Physical Optics and Lasers", "Advanced Calculus", "Algebra", "Physical Chemistry", "Electromagnetics"],
    4: ["Quantum Mechanics", "Linear Algebra", "Geometry", "Analytical Chemistry", "Modern Physics"],
    5: ["Solid State Physics", "Real Analysis", "Complex Analysis", "Spectroscopy", "Statistical Mechanics"],
    6: ["Nuclear Physics", "Numerical Analysis", "Tensor Analysis", "Bio-Chemistry", "Project Work"]
  },
  "B.A. (Arts / Humanities)": {
    1: ["English Literature I", "Hindi Sahitya", "Political Theory", "Ancient Indian History", "Sociology Concepts"],
    2: ["English Literature II", "Hindi Kavita", "Indian Constitution", "Medieval History", "Indian Society"],
    3: ["Modern English Writing", "Prayojanmulak Hindi", "Western Political Thought", "Modern Indian History", "Social Research"],
    4: ["Literary Criticism", "Hindi Natak", "International Relations", "European History", "Social Problems"],
    5: ["World Literature", "Hindi Upanyas", "Public Administration", "World History", "Sociology of Development"],
    6: ["Contemporary Literature", "Bhasha Vigyan", "Comparative Government", "Historical Methodology", "Dissertation"]
  }
};

// ==========================================
// 3. THE COLLEGES OF UTTAR PRADESH
// ==========================================
const COLLEGES = [
  // AKTU Colleges
  { name: "JSS Academy of Technical Education", university: "Dr. A.P.J. Abdul Kalam Technical University (AKTU)" },
  { name: "Ajay Kumar Garg Engineering College (AKGEC)", university: "Dr. A.P.J. Abdul Kalam Technical University (AKTU)" },
  { name: "KIET Group of Institutions", university: "Dr. A.P.J. Abdul Kalam Technical University (AKTU)" },
  { name: "Institute of Engineering and Technology (IET)", university: "Dr. A.P.J. Abdul Kalam Technical University (AKTU)" },
  { name: "Galgotias College of Engineering and Tech", university: "Dr. A.P.J. Abdul Kalam Technical University (AKTU)" },
  { name: "Pranveer Singh Institute of Technology (PSIT)", university: "Dr. A.P.J. Abdul Kalam Technical University (AKTU)" },

  // BTEUP 
  { name: "Government Polytechnic, Lucknow", university: "Board of Technical Education UP (BTEUP)" },
  { name: "Government Polytechnic, Kanpur", university: "Board of Technical Education UP (BTEUP)" },
  { name: "Hewett Polytechnic, Lucknow", university: "Board of Technical Education UP (BTEUP)" },

  // Lucknow University 
  { name: "University of Lucknow (Main Campus)", university: "Lucknow University" },
  { name: "National P.G. College", university: "Lucknow University" },
  { name: "Isabella Thoburn (IT) College", university: "Lucknow University" },

  // BHU
  { name: "Main Campus, Banaras Hindu University", university: "Banaras Hindu University (BHU)" },
  { name: "Faculty of Science, BHU", university: "Banaras Hindu University (BHU)" },

  // AMU
  { name: "Zakir Husain College of Engineering & Technology", university: "Aligarh Muslim University (AMU)" },

  // CSJM Kanpur
  { name: "Christ Church College", university: "Chhatrapati Shahu Ji Maharaj University (Kanpur)" },
  { name: "D.A.V. College", university: "Chhatrapati Shahu Ji Maharaj University (Kanpur)" }
];

// ==========================================
// 4. THE GENERATOR ENGINE
// ==========================================
const generateFinalSubjects = () => {
  const result = [];
  
  // Mapping University -> Enabled Courses
  const CONFIG = [
    // AKTU 
    { uni: "Dr. A.P.J. Abdul Kalam Technical University (AKTU)", course: "B.Tech", branches: ["Computer Science & Engineering", "Mechanical Engineering", "Civil Engineering"], sems: 8 },
    // BTEUP
    { uni: "Board of Technical Education UP (BTEUP)", course: "Diploma", branches: ["Diploma in Computer Science", "Diploma in Civil Engineering"], sems: 6 },
    // Lucknow University
    { uni: "Lucknow University", course: "BCA", branches: ["BCA (General)"], sems: 6 },
    { uni: "Lucknow University", course: "B.Sc", branches: ["B.Sc (Mathematics / Physics)"], sems: 6 },
    { uni: "Lucknow University", course: "B.A.", branches: ["B.A. (Arts / Humanities)"], sems: 6 },
    // BHU
    { uni: "Banaras Hindu University (BHU)", course: "B.Sc", branches: ["B.Sc (Mathematics / Physics)"], sems: 6 },
    { uni: "Banaras Hindu University (BHU)", course: "B.A.", branches: ["B.A. (Arts / Humanities)"], sems: 6 },
    // AMU
    { uni: "Aligarh Muslim University (AMU)", course: "B.Tech", branches: ["Computer Science & Engineering"], sems: 8 },
    { uni: "Aligarh Muslim University (AMU)", course: "B.Sc", branches: ["B.Sc (Mathematics / Physics)"], sems: 6 },
    // CSJM Kanpur 
    { uni: "Chhatrapati Shahu Ji Maharaj University (Kanpur)", course: "BCA", branches: ["BCA (General)"], sems: 6 },
    { uni: "Chhatrapati Shahu Ji Maharaj University (Kanpur)", course: "B.Sc", branches: ["B.Sc (Mathematics / Physics)"], sems: 6 }
  ];

  CONFIG.forEach(item => {
    item.branches.forEach(br => {
      const subjectMap = SYLLABUS_MAP[br] || SYLLABUS_MAP["BCA (General)"];
      for (let sem = 1; sem <= item.sems; sem++) {
        const names = subjectMap[sem] || [`Elective ${br} ${sem}`, `${br} Practical ${sem}`];
        names.forEach(name => {
          result.push({
            name,
            branch: br,
            course: item.course, // Fixed: accessing single string course instead of array
            university: item.uni,
            semester: sem
          });
        });
      }
    });
  });
  return result;
};

// ==========================================
// 5. THE SEEDER FUNCTION
// ==========================================
const runSeeder = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database Connected... 🚀");

    // Wipe old data
    await College.deleteMany({});
    await Subject.deleteMany({});
    console.log("Wiping complete. 🧼");

    // Seed Colleges
    await College.insertMany(COLLEGES);
    console.log(`Successfully Seeded ${COLLEGES.length} Top UP Colleges.`);

    // Seed Subjects
    const finalSubjects = generateFinalSubjects();
    await Subject.insertMany(finalSubjects);
    console.log(`Successfully Seeded ${finalSubjects.length} RAW UP Subjects. 📚`);

    console.log("NotesMate UP Mega-Seed Successful! 🏆");
    process.exit(0);
  } catch (err) {
    console.error("Critical Seeding Error! ❌", err);
    process.exit(1);
  }
};

runSeeder();
