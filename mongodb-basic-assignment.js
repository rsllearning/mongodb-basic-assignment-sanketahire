use company;

show dbs;

db.employees.drop();

db.employees.insertMany([
  { _id: "EMP001", name: "John", department: "Engineering", experience: 4, skills: ["Java", "Spring Boot"], active: true, address: { city: "Pune", country: "India" } },
  { _id: "EMP002", name: "Alice", department: "HR", experience: 3, skills: ["Recruitment", "Communication"], active: true, address: { city: "Mumbai", country: "India" } },
  { _id: "EMP003", name: "David", department: "Engineering", experience: 6, skills: ["Java", "MongoDB"], active: true, address: { city: "Bengaluru", country: "India" } },
  { _id: "EMP004", name: "Emma", department: "Finance", experience: 2, skills: ["Accounting", "Excel"], active: false, address: { city: "Pune", country: "India" } },
  { _id: "EMP005", name: "Robert", department: "Engineering", experience: 5, skills: ["Java", "Docker"], active: true, address: { city: "Delhi", country: "India" } }
]);

show collections;

db.employees.countDocuments();

db.employees.find();

db.employees.find({ department: "Engineering" }, { _id: 1, name: 1, experience: 1 }).sort({ name: 1 });

db.employees.find({ experience: { $gte: 5 } }, { _id: 0, name: 1, experience: 1 }).sort({ experience: -1 });

db.employees.find({ "address.city": "Pune" }, { _id: 0, name: 1, "address.city": 1 }).sort({ name: 1 });

db.employees.find({ skills: { $in: ["MongoDB", "Spring Boot"] } }).sort({ name: 1 });

db.employees.find({}, { _id: 0, name: 1, experience: 1 }).sort({ experience: -1 }).limit(2);
