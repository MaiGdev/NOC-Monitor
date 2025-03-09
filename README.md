### 📌 Repository Description  

**NOC-Monitor** is an application designed to monitor the status of web services by checking URLs. If a service does not respond correctly, the system generates logs, sends email alerts, and stores events in a database with multiple data sources, including **filesystem, MongoDB, and PostgreSQL** (using Docker).  

### 🏗️ Architecture & Design  

- Based on **Clean Architecture**, ensuring modularity and ease of maintenance.  
- Implements the **Repository Pattern** and **Adapter Pattern** for better separation of concerns and abstraction of data access.  

### 📡 Key Features  

🔍 URL monitoring to detect service failures.  
📝 Event and error logging.  
📩 Email notifications when a service is down.  
💾 Event storage in a database with **multiple data sources**:  
   - **Filesystem** for local logs.  
   - **MongoDB** and **PostgreSQL** (managed via Docker) for structured and unstructured data storage.  
🚀 Ideal for **NOC teams** and **administrators** who need an automated monitoring and alert system.  

### 🔧 Setup  

1. Clone the repository from GitHub: [NOC-Monitor](https://github.com/MaiGdev/NOC-Monitor.git)  
2. Install dependencies: In the project folder, run `npm install` or `yarn install`.  
3. Configure environment variables.  
4. Start the databases (**MongoDB & PostgreSQL**) using `docker compose up -d`.  
5. Run the application using `npm run dev`.  
