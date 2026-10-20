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

## How to Run the Solution Script

You can execute the entire assignment script [`mongodb-basic-assignment.js`](mongodb-basic-assignment.js) directly against your local MongoDB instance using any of the following methods:

### Method 1: Input Redirection via Terminal (Recommended)
Because the script begins with `use company;`, redirecting the file directly into `mongosh` executes all tasks sequentially while echoing both the queries and formatted terminal outputs:

```bash
# Navigate to the repository directory
cd /path/to/mongodb-basic-assignment-sanketahire

# Execute via standard input redirection
mongosh < mongodb-basic-assignment.js
```

### Method 2: Pass Script Directly to `mongosh`
Run the script as an argument to `mongosh`:

```bash
# Execute against the company database
mongosh company mongodb-basic-assignment.js
```

*Or with an explicit connection string:*
```bash
mongosh "mongodb://127.0.0.1:27017/company" mongodb-basic-assignment.js
```

### Method 3: Execute from within `mongosh` Shell
If you already have an active `mongosh` session:

```javascript
// 1. Switch to the company database
use company;

// 2. Load and run the script file
load("mongodb-basic-assignment.js");
```

### Method 4: Interactive Step-by-Step Execution
Open the MongoDB Shell (`mongosh`) and execute the individual query blocks step-by-step as documented in the task-by-task sections below.

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

---

### Task 2: Read and Query Operations

#### 2.1 Engineering Employees
Retrieve employees whose department is Engineering. Return only `_id`, `name`, and `experience`, sorted by `name` in ascending order.

⚡ **Input Command:**
```javascript
db.employees.find({ department: "Engineering" }, { _id: 1, name: 1, experience: 1 }).sort({ name: 1 });
```
🖥️ **Terminal Output:**
```json
[
  { "_id": "EMP003", "name": "David", "experience": 6 },
  { "_id": "EMP001", "name": "John", "experience": 4 },
  { "_id": "EMP005", "name": "Robert", "experience": 5 }
]
```

#### 2.2 Employees with 5 or More Years of Experience
Retrieve employees whose experience is greater than or equal to 5. Return only `name` and `experience`, excluding `_id`, sorted by `experience` in descending order.

⚡ **Input Command:**
```javascript
db.employees.find({ experience: { $gte: 5 } }, { _id: 0, name: 1, experience: 1 }).sort({ experience: -1 });
```
🖥️ **Terminal Output:**
```json
[
  { "name": "David", "experience": 6 },
  { "name": "Robert", "experience": 5 }
]
```

#### 2.3 Nested Document Query (City: Pune)
Retrieve employees whose address city is Pune. Return only employee name and city, sorted by `name` in ascending order.

⚡ **Input Command:**
```javascript
db.employees.find({ "address.city": "Pune" }, { _id: 0, name: 1, "address.city": 1 }).sort({ name: 1 });
```
🖥️ **Terminal Output:**
```json
[
  { "name": "Emma", "address": { "city": "Pune" } },
  { "name": "John", "address": { "city": "Pune" } }
]
```

#### 2.4 Array Query with `$in` (MongoDB or Spring Boot)
Using `$in`, retrieve employees whose skills contain either MongoDB or Spring Boot, sorted by `name` in ascending order.

⚡ **Input Command:**
```javascript
db.employees.find({ skills: { $in: ["MongoDB", "Spring Boot"] } }).sort({ name: 1 });
```
🖥️ **Terminal Output:**
```json
[
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
    "_id": "EMP001",
    "name": "John",
    "department": "Engineering",
    "experience": 4,
    "skills": ["Java", "Spring Boot"],
    "active": true,
    "address": { "city": "Pune", "country": "India" }
  }
]
```

#### 2.5 Sorting and Limiting (Top 2 Highest Experience)
Retrieve the top 2 employees with the highest experience. Return only `name` and `experience`.

⚡ **Input Command:**
```javascript
db.employees.find({}, { _id: 0, name: 1, experience: 1 }).sort({ experience: -1 }).limit(2);
```
🖥️ **Terminal Output:**
```json
[
  { "name": "David", "experience": 6 },
  { "name": "Robert", "experience": 5 }
]
```

#### Visual Execution Proof:
* **Query and Read Operations:**  
  ![Task 2 Read Queries](screenshots/02_read_queries.png)

---

### Task 3: Update Operations

#### 3.1 Atomic Increment with `$inc` (Alice's Experience)
Increase Alice's experience by 1 (advances from 3 to 4).

⚡ **Input Command:**
```javascript
db.employees.updateOne({ name: "Alice" }, { $inc: { experience: 1 } });
```
🖥️ **Terminal Output:**
```json
{
  "acknowledged": true,
  "insertedId": null,
  "matchedCount": 1,
  "modifiedCount": 1,
  "upsertedCount": 0
}
```

**Verification:**
⚡ **Input Command:**
```javascript
db.employees.findOne({ name: "Alice" });
```
🖥️ **Terminal Output:**
```json
{
  "_id": "EMP002",
  "name": "Alice",
  "department": "HR",
  "experience": 4,
  "skills": ["Recruitment", "Communication"],
  "active": true,
  "address": { "city": "Mumbai", "country": "India" }
}
```

#### 3.2 Field Update with `$set` (Emma's Active Status)
Change Emma's active value from `false` to `true`.

⚡ **Input Command:**
```javascript
db.employees.updateOne({ name: "Emma" }, { $set: { active: true } });
```
🖥️ **Terminal Output:**
```json
{
  "acknowledged": true,
  "insertedId": null,
  "matchedCount": 1,
  "modifiedCount": 1,
  "upsertedCount": 0
}
```

**Verification:**
⚡ **Input Command:**
```javascript
db.employees.findOne({ name: "Emma" });
```
🖥️ **Terminal Output:**
```json
{
  "_id": "EMP004",
  "name": "Emma",
  "department": "Finance",
  "experience": 2,
  "skills": ["Accounting", "Excel"],
  "active": true,
  "address": { "city": "Pune", "country": "India" }
}
```

#### 3.3 Array Update with `$addToSet` (Robert's Skills)
Add `"MongoDB"` to Robert's skills array using `$addToSet`.

⚡ **Input Command:**
```javascript
db.employees.updateOne({ name: "Robert" }, { $addToSet: { skills: "MongoDB" } });
```
🖥️ **Terminal Output:**
```json
{
  "acknowledged": true,
  "insertedId": null,
  "matchedCount": 1,
  "modifiedCount": 1,
  "upsertedCount": 0
}
```

**Verification:**
⚡ **Input Command:**
```javascript
db.employees.findOne({ name: "Robert" });
```
🖥️ **Terminal Output:**
```json
{
  "_id": "EMP005",
  "name": "Robert",
  "department": "Engineering",
  "experience": 5,
  "skills": ["Java", "Docker", "MongoDB"],
  "active": true,
  "address": { "city": "Delhi", "country": "India" }
}
```

#### 3.3 Idempotency Proof (Executing `$addToSet` a Second Time)
Execute the exact same `$addToSet` operation again and verify that `"MongoDB"` is not duplicated (`modifiedCount: 0`).

⚡ **Input Command:**
```javascript
db.employees.updateOne({ name: "Robert" }, { $addToSet: { skills: "MongoDB" } });
```
🖥️ **Terminal Output:**
```json
{
  "acknowledged": true,
  "insertedId": null,
  "matchedCount": 1,
  "modifiedCount": 0,
  "upsertedCount": 0
}
```

**Verification:**
⚡ **Input Command:**
```javascript
db.employees.findOne({ name: "Robert" });
```
🖥️ **Terminal Output:**
```json
{
  "_id": "EMP005",
  "name": "Robert",
  "department": "Engineering",
  "experience": 5,
  "skills": ["Java", "Docker", "MongoDB"],
  "active": true,
  "address": { "city": "Delhi", "country": "India" }
}
```

#### Visual Execution Proof:
* **Update Operations (Alice, Emma, Robert):**  
  ![Task 3 Update Operations](screenshots/03a_update_operations.png)
* **Idempotency Verification ($addToSet Second Execution):**  
  ![Task 3 Idempotency Verification](screenshots/03b_idempotency_verification.png)

---

### Task 4: Delete Operation

#### Step 1: Baseline Count Verification
Assert the starting collection document count prior to insertion.

⚡ **Input Command:**
```javascript
db.employees.countDocuments();
```
🖥️ **Terminal Output:**
```text
5
```

#### Step 2: Insert Temporary Canary Document (`EMP999`)
Insert a temporary employee record into the collection.

⚡ **Input Command:**
```javascript
db.employees.insertOne({ _id: "EMP999", name: "Temporary Employee", department: "Training", experience: 0 });
```
🖥️ **Terminal Output:**
```json
{
  "acknowledged": true,
  "insertedId": "EMP999"
}
```

#### Step 3: Verify Count After Insertion
Assert that document count increased from 5 to 6.

⚡ **Input Command:**
```javascript
db.employees.countDocuments();
```
🖥️ **Terminal Output:**
```text
6
```

#### Step 4: Verify Canary Document Exists
Verify that `EMP999` is retrieved properly.

⚡ **Input Command:**
```javascript
db.employees.findOne({ _id: "EMP999" });
```
🖥️ **Terminal Output:**
```json
{
  "_id": "EMP999",
  "name": "Temporary Employee",
  "department": "Training",
  "experience": 0
}
```

#### Step 5: Delete Only the Canary Document
Delete only the temporary record using `deleteOne()`.

⚡ **Input Command:**
```javascript
db.employees.deleteOne({ _id: "EMP999" });
```
🖥️ **Terminal Output:**
```json
{
  "acknowledged": true,
  "deletedCount": 1
}
```

#### Step 6: Verification of Targeted Deletion
Assert that querying for `EMP999` returns `null`.

⚡ **Input Command:**
```javascript
db.employees.findOne({ _id: "EMP999" });
```
🖥️ **Terminal Output:**
```text
null
```

#### Step 7: Collection Integrity Check
Assert that the original 5 employee documents remain intact in the collection.

⚡ **Input Command:**
```javascript
db.employees.countDocuments();
```
🖥️ **Terminal Output:**
```text
5
```

#### Visual Execution Proof:
* **Canary Document Insertion, Deletion & Integrity Check:**  
  ![Task 4 Canary Delete](screenshots/04_canary_delete.png)

---

### Task 5: Indexing Strategy

#### Step 1: Baseline Index Inspection
Inspect existing indexes on the `employees` collection prior to creating custom indexes (default `_id_` index created by MongoDB).

⚡ **Input Command:**
```javascript
db.employees.getIndexes();
```
🖥️ **Terminal Output:**
```json
[
  {
    "v": 2,
    "key": {
      "_id": 1
    },
    "name": "_id_"
  }
]
```

#### Step 2: Create Ascending Index on `department`
Create a single-field index on the `department` field in ascending order (`1`) to optimize department-based filtering and grouping.

⚡ **Input Command:**
```javascript
db.employees.createIndex({ department: 1 });
```
🖥️ **Terminal Output:**
```text
department_1
```

#### Step 3: Verification of Created Index
Assert that `getIndexes()` now returns both the default primary key index `_id_` and the newly created `department_1` index.

⚡ **Input Command:**
```javascript
db.employees.getIndexes();
```
🖥️ **Terminal Output:**
```json
[
  {
    "v": 2,
    "key": {
      "_id": 1
    },
    "name": "_id_"
  },
  {
    "v": 2,
    "key": {
      "department": 1
    },
    "name": "department_1"
  }
]
```

#### Visual Execution Proof:
* **Single-Field Department Index Verification:**  
  ![Task 5 Indexing Verification](screenshots/05_indexing_verification.png)

---

### Task 6: Aggregation Pipelines

#### Step 1: Count Employees in Each Department
Group documents by the `department` field and calculate the total employee count per department using `$group` with `$sum: 1`, sorted alphabetically by department name (`{ _id: 1 }`).

⚡ **Input Command:**
```javascript
db.employees.aggregate([
  { $group: { _id: "$department", totalEmployees: { $sum: 1 } } },
  { $sort: { _id: 1 } }
]);
```
🖥️ **Terminal Output:**
```json
[
  { "_id": "Engineering", "totalEmployees": 3 },
  { "_id": "Finance", "totalEmployees": 1 },
  { "_id": "HR", "totalEmployees": 1 }
]
```

#### Step 2: Calculate Average Experience per Department
Calculate the average experience of employees in each department using `$group` with `$avg: "$experience"`, sorted alphabetically by department name (`{ _id: 1 }`).

⚡ **Input Command:**
```javascript
db.employees.aggregate([
  { $group: { _id: "$department", averageExperience: { $avg: "$experience" } } },
  { $sort: { _id: 1 } }
]);
```
🖥️ **Terminal Output:**
```json
[
  { "_id": "Engineering", "averageExperience": 5 },
  { "_id": "Finance", "averageExperience": 2 },
  { "_id": "HR", "averageExperience": 4 }
]
```

#### Step 3: Top 2 Highest-Experience Employees in Engineering
Find the top 2 employees with the highest experience in the `Engineering` department by chaining `$match` (filter `department: "Engineering"`), `$sort` (descending experience `{ experience: -1 }`), `$limit` (`2`), and `$project` (`_id: 0, name: 1, experience: 1`).

⚡ **Input Command:**
```javascript
db.employees.aggregate([
  { $match: { department: "Engineering" } },
  { $sort: { experience: -1 } },
  { $limit: 2 },
  { $project: { _id: 0, name: 1, experience: 1 } }
]);
```
🖥️ **Terminal Output:**
```json
[
  { "name": "David", "experience": 6 },
  { "name": "Robert", "experience": 5 }
]
```

#### Visual Execution Proof:
* **Aggregation Pipelines (Group Count, Average Experience, Top Engineers):**  
  ![Task 6 Aggregation Pipelines](screenshots/06_aggregation_pipelines.png)

---

### Task 7: MongoDB Fundamentals — Assessment Answers

The answers for the 10 assessment MCQs are recorded in [`answers.md`](answers.md):

| Question | Topic / Concept | Selected Answer | Technical Justification |
| :---: | :--- | :---: | :--- |
| **Q1** | Data Storage Model | **B** | MongoDB is a document-oriented database that stores records as flexible, self-describing BSON documents organized within collections. |
| **Q2** | Document Identification | **C** | MongoDB automatically assigns and uniquely indexes the `_id` field (defaulting to an `ObjectId`) as each document's primary key. |
| **Q3** | CRUD Update Operations | **C** | The `{ upsert: true }` option updates an existing matching document or inserts a new document if no match is found. |
| **Q4** | Array Update Modifiers | **C** | The `$addToSet` operator appends a value to an array only if it does not already exist, guaranteeing idempotent array modifications. |
| **Q5** | Aggregation Pipeline | **B** | The `$group` stage partitions input documents by a specified identifier expression and applies accumulators (`$sum`, `$avg`, etc.). |
| **Q6** | Nested Document Queries | **C** | Quoted dot notation (`"address.city"`) is required to traverse and query embedded document attributes in MongoDB. |
| **Q7** | Data Modeling Strategies | **B** | Embedding (denormalization) stores related sub-documents or arrays directly within parent documents for atomic, single-query retrieval. |
| **Q8** | Document Deletion | **C** | An empty filter `{}` in `deleteMany({})` deletes all documents from the collection while preserving collection metadata and indexes. |
| **Q9** | Database Security & Credentials | **C** | Credentials should never be hard-coded or committed to version control; they must be stored in environment variables or secrets vaults. |
| **Q10** | Indexing Architecture | **B** | MongoDB automatically indexes only the primary key `_id` by default; all secondary indexes must be explicitly defined. |


#### Detailed Question Breakdown & Technical Explanations

##### Q1. MongoDB primarily stores application data as:
* A. Rows
* **B. Documents**
* C. Worksheets
* D. Files

**Selected Answer:** **B (Documents)**  
**Technical Explanation:** MongoDB is a document-oriented NoSQL database system. It stores application records as flexible, self-describing BSON (Binary JSON) documents organized within collections, rather than rows in tabular schemas (RDBMS) or worksheets (spreadsheets).

---

##### Q2. Which field is automatically added and indexed by MongoDB to uniquely identify a document?
* A. `id`
* B. `key`
* **C. `_id`**
* D. `primaryKey`

**Selected Answer:** **C (`_id`)**  
**Technical Explanation:** Every MongoDB document requires a unique primary key stored in the `_id` field. If omitted during insertion, the driver or server automatically generates a 12-byte `ObjectId` and creates an immutable unique index on `_id` by default.

---

##### Q3. Which option makes `updateOne()` insert a document when no matching document exists?
* A. `{ insert: true }`
* B. `{ create: true }`
* **C. `{ upsert: true }`**
* D. `{ replace: true }`

**Selected Answer:** **C (`{ upsert: true }`)**  
**Technical Explanation:** In update operations (`updateOne`, `updateMany`), setting `{ upsert: true }` enables atomic update-or-insert behavior. If a document matches the query criteria, it is updated; if no match exists, MongoDB inserts a new document created from the query filter and update operators.

---

##### Q4. Which operator adds a value to an array only if the value is not already present?
* A. `$push`
* B. `$set`
* **C. `$addToSet`**
* D. `$inc`

**Selected Answer:** **C (`$addToSet`)**  
**Technical Explanation:** The `$addToSet` operator treats target arrays as mathematical sets, ensuring idempotency by appending an element only if it does not already exist. In contrast, `$push` unconditionally appends values, allowing duplicates.

---

##### Q5. Which aggregation stage is used to group documents?
* A. `$match`
* **B. `$group`**
* C. `$project`
* D. `$sort`

**Selected Answer:** **B (`$group`)**  
**Technical Explanation:** The `$group` pipeline stage separates input documents into groups according to a specified `_id` expression and applies accumulator expressions (such as `$sum`, `$avg`, `$min`, `$max`) to compute aggregated metrics over each group.

---

##### Q6. Which query correctly searches for employees whose address city is Pune?
* A. `{ address: "Pune" }`
* B. `{ city: "Pune" }`
* **C. `{ "address.city": "Pune" }`**
* D. `{ address.city: "Pune" }`

**Selected Answer:** **C (`{ "address.city": "Pune" }`)**  
**Technical Explanation:** MongoDB uses dot notation to query nested fields within embedded documents. When using dot notation, the path must be enclosed in quotes (`"address.city"`). Without quotes, JavaScript syntax interprets the period as an unquoted property access, causing a syntax error.

---

##### Q7. Which approach stores related data directly inside the parent MongoDB document?
* A. Referencing
* **B. Embedding**
* C. Indexing
* D. Aggregation

**Selected Answer:** **B (Embedding)**  
**Technical Explanation:** Embedding (denormalization) stores related sub-documents or arrays directly within the parent document. This approach optimizes read performance and atomicity by enabling single-query document retrieval without needing relational joins or multi-document lookups.

---

##### Q8. What does the following command do? `db.employees.deleteMany({})`
* A. Deletes no documents
* B. Deletes only one document
* **C. Deletes all documents in the collection**
* D. Deletes the collection itself

**Selected Answer:** **C (Deletes all documents in the collection)**  
**Technical Explanation:** Passing an empty filter `{}` to `deleteMany()` matches every document in the collection, removing all records. However, unlike `drop()`, the collection itself, along with its metadata and defined indexes, remains intact in the database.

---

##### Q9. Which is the recommended approach for application database credentials?
* A. Hard-code them in application source code
* B. Commit them to Git
* **C. Store them using secure configuration/environment variables or secrets management**
* D. Add them to comments in the source code

**Selected Answer:** **C (Store them using secure configuration/environment variables or secrets management)**  
**Technical Explanation:** Hard-coding or committing credentials to version control poses a critical security risk. Industry standard best practice requires managing database credentials through environment variables (`.env`), container secrets, or dedicated secrets management vaults (e.g., HashiCorp Vault, AWS Secrets Manager, GCP Secret Manager).

---

##### Q10. Which statement about MongoDB indexes is correct?
* A. Every field is automatically indexed.
* **B. Only `_id` is automatically indexed by default.**
* C. Indexes should always be created in every field.
* D. Indexes only work with aggregation queries.

**Selected Answer:** **B (Only `_id` is automatically indexed by default.)**  
**Technical Explanation:** MongoDB only automatically creates a unique index on the primary `_id` field upon collection creation. All secondary indexes must be explicitly created based on query patterns. Indexing every field would introduce severe write performance overhead and memory consumption.
