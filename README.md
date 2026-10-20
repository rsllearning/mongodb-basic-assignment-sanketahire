# MongoDB Basic Training Assignment

A comprehensive implementation of core MongoDB fundamentals, CRUD operations, indexing strategies, and aggregation pipelines using `mongosh`.

## Overview
This repository contains the completed assignment for the **MongoDB (Basic)** training module. The objective is to demonstrate proficiency in:
- Local database setup and collection lifecycle management
- Document-based CRUD operations with field-level projections and sorting
- Query operators (comparison, logical, element, array, and nested document queries)
- Atomic update operators (`$inc`, `$set`, `$addToSet`) and canary deletions
- Single-field indexing and query plan verification
- Multi-stage aggregation pipelines (`$match`, `$group`, `$sort`, `$limit`, `$project`)
- Schema design principles and MongoDB security best practices

## Environment & Prerequisites
- **Database Engine:** MongoDB Community Server (v6.0+)
- **Shell Interface:** MongoDB Shell (`mongosh`)
- **Node.js / JavaScript Runtime:** v18+ (optional, for script execution)

## Repository Structure
```
mongodb-basic-assignment-sanketahire/
├── .gitignore                     # Ignored operating system and log artifacts
├── README.md                      # Project documentation and execution guide
├── mongodb-basic-assignment.js    # Primary solution script for Tasks 1–6
├── answers.md                     # Assessment answers for Task 7 (MCQs)
├── screenshots/                   # Visual proof of successful execution
└── docs/                          # Assignment specifications and reference materials
    ├── Training.Assignment.Mongodb (Basic).pdf
    └── Training.Material.Mongdb (Basic),.pdf
```

## Solution Delivery
The full assignment solution, queries, outputs, and visual execution artifacts are implemented in the `feature/mongodb-basic-solution` branch and submitted via Pull Request.

---

## Task-by-Task Implementation & Verification

### Task 1: Local Setup and Data Creation

#### Step 1: Switch to Database
⚡ **Input Command:**
```javascript
use company;
```
🖥️ **Terminal Output:**
```text
switched to db company
```

#### Step 2: Verify Connection & List Databases
⚡ **Input Command:**
```javascript
show dbs;
```
🖥️ **Terminal Output:**
```text
admin     40.00 KiB
config   108.00 KiB
local     40.00 KiB
```

#### Step 3: Clean Slate Reset
⚡ **Input Command:**
```javascript
db.employees.drop();
```
🖥️ **Terminal Output:**
```text
true
```

#### Step 4: Insert the Seed Dataset (5 Employees)
⚡ **Input Command:**
```javascript
db.employees.insertMany([
  { _id: "EMP001", name: "John", department: "Engineering", experience: 4, skills: ["Java", "Spring Boot"], active: true, address: { city: "Pune", country: "India" } },
  { _id: "EMP002", name: "Alice", department: "HR", experience: 3, skills: ["Recruitment", "Communication"], active: true, address: { city: "Mumbai", country: "India" } },
  { _id: "EMP003", name: "David", department: "Engineering", experience: 6, skills: ["Java", "MongoDB"], active: true, address: { city: "Bengaluru", country: "India" } },
  { _id: "EMP004", name: "Emma", department: "Finance", experience: 2, skills: ["Accounting", "Excel"], active: false, address: { city: "Pune", country: "India" } },
  { _id: "EMP005", name: "Robert", department: "Engineering", experience: 5, skills: ["Java", "Docker"], active: true, address: { city: "Delhi", country: "India" } }
]);
```
🖥️ **Terminal Output:**
```json
{
  "acknowledged": true,
  "insertedIds": {
    "0": "EMP001",
    "1": "EMP002",
    "2": "EMP003",
    "3": "EMP004",
    "4": "EMP005"
  }
}
```

#### Step 5: Verify Collection Exists
⚡ **Input Command:**
```javascript
show collections;
```
🖥️ **Terminal Output:**
```text
employees
```

#### Step 6: Verify Total Document Count
⚡ **Input Command:**
```javascript
db.employees.countDocuments();
```
🖥️ **Terminal Output:**
```text
5
```

#### Step 7: View Seeded Documents
⚡ **Input Command:**
```javascript
db.employees.find();
```
🖥️ **Terminal Output:**
```json
[
  {
    "_id": "EMP001",
    "name": "John",
    "department": "Engineering",
    "experience": 4,
    "skills": ["Java", "Spring Boot"],
    "active": true,
    "address": { "city": "Pune", "country": "India" }
  },
  {
    "_id": "EMP002",
    "name": "Alice",
    "department": "HR",
    "experience": 3,
    "skills": ["Recruitment", "Communication"],
    "active": true,
    "address": { "city": "Mumbai", "country": "India" }
  },
  {
    "_id": "EMP003",
    "name": "David",
    "department": "Engineering",
    "experience": 6,
    "skills": ["Java", "MongoDB"],
    "active": true,
    "address": { "city": "Bengaluru", "country": "India" }
  },
  {
    "_id": "EMP004",
    "name": "Emma",
    "department": "Finance",
    "experience": 2,
    "skills": ["Accounting", "Excel"],
    "active": false,
    "address": { "city": "Pune", "country": "India" }
  },
  {
    "_id": "EMP005",
    "name": "Robert",
    "department": "Engineering",
    "experience": 5,
    "skills": ["Java", "Docker"],
    "active": true,
    "address": { "city": "Delhi", "country": "India" }
  }
]
```

#### Visual Execution Proof:
* **Setup, Database Selection & Seed Insertion:**  
  ![Task 1 Setup & Seed](screenshots/01a_setup_and_seed.png)
* **Collection & Count Verification:**  
  ![Task 1 Collection Verification](screenshots/01b_collection_verification.png)


