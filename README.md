# VHAS
Vehicle hazard alert system
# Vehicle Hazard Alert System (VHAS)

## Overview
The Vehicle Hazard Alert System (VHAS) is designed to enhance safety and efficiency in vehicular environments by leveraging real-time data from cloud updates and embedded sensors. This system focuses on detecting anomalies and broadcasting alerts to nearby vehicles, enabling informed decision-making and swift response to potential hazards.

## Features
1. **Anomaly Detection**:
   - Alerts nearby vehicles within a 100-foot radius about car malfunctions (e.g., brake failure).
   - Highlights vehicles experiencing anomalies on the dashboard of nearby cars.

2. **Emergency Vehicle Integration**:
   - Sends real-time alerts to assist in making way for ambulances and other emergency vehicles.

3. **Theft Tracking**:
   - Tracks stolen vehicles and alerts nearby cars about their presence.

4. **Hybrid Data Retrieval**:
   - Combines real-time cloud updates with embedded sensor data for enhanced decision-making.

## Technologies Used
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Frontend**: HTML, CSS, JavaScript (integrated with the backend for seamless functionality)

## Installation

### Prerequisites
- Node.js and npm installed.
- MongoDB database set up locally or on a cloud service.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/vhas.git
   ```

2. Navigate to the project directory:
   ```bash
   cd vhas
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up the environment variables:
   - Create a `.env` file in the root directory.
   - Add the following:
     ```env
     PORT=3000
     MONGO_URI=your_mongodb_connection_string
     ```

5. Start the server:
   ```bash
   npm start
   ```

6. Open the application:
   - Access the frontend at `http://localhost:3000`.

## API Endpoints

### 1. **Anomaly Alerts**
   - **GET** `/api/anomalies`
   - Fetches a list of nearby vehicle anomalies.

### 2. **Emergency Alerts**
   - **POST** `/api/emergency`
   - Sends an emergency vehicle alert to nearby vehicles.

### 3. **Theft Alerts**
   - **POST** `/api/theft`
   - Broadcasts alerts about a stolen vehicle.

## Usage
- Ensure all devices are connected to the same network for testing local alerts.
- Integrate with sensors and cloud data for real-time updates in a production environment.

## Contribution
We welcome contributions to improve the Vehicle Hazard Alert System. Please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-branch-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Feature description"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-branch-name
   ```
5. Open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---
**Let's make the roads safer together with VHAS!**

