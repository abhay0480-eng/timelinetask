# Timeline Application

## Overview
This application visualizes participant activity over a specified time period using a timeline. It displays when participants were active (e.g., using a microphone, webcam, or screen sharing) and highlights errors.

## Structure
- **src/**: Contains the main application code.
  - **App.jsx**: The main component that renders the timeline and participant data.
  - **components/**: Contains reusable components such as `Header`, `ParticipantHeader`, and `Timeline`.
- **data.json**: Sample data used to populate the timeline.

## Approach
1. **Data Extraction**: The application extracts start and end times from the provided data and generates time slots for the timeline.
2. **Position Calculation**: It calculates the position of each participant's activity on the timeline based on their active duration.
3. **Rendering**: The timeline is rendered using a combination of absolute positioning for each participant's activity and icons to represent different states (on/off).

## Dependencies
- React: A JavaScript library for building user interfaces.
- Material-UI: A popular React UI framework for implementing Material Design components.

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage
- The timeline displays participant activity based on the data provided in `data.json`.
- Hover over the icons to see tooltips with additional information about each event.

## License
This project is licensed under the MIT License.