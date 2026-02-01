# DocPort

**A unified doctor platform for multi-insurance OPD integration**

DocPort is a doctor-first infrastructure platform designed to simplify OPD onboarding for insurance providers and reduce operational complexity for doctors. It enables doctors to manage their profile, availability, and appointments through a single application, while allowing multiple insurance providers to integrate via APIs.

Doctors remain in control of where they appear. Insurance providers connect once and scale efficiently.

---

## Background

OPD insurance adoption remains limited because of structural inefficiencies:

- Insurance providers must individually onboard and manage doctors on their own platforms, which is costly and difficult to scale.
- Doctors are required to use multiple insurer-specific applications to manage appointments and availability.
- As a result, many insurers avoid offering OPD benefits, and doctors avoid insurer platforms.

This fragmentation increases cost, reduces adoption, and limits patient access.

---

## What DocPort Does

DocPort introduces a single, canonical doctor application that acts as the source of truth for doctor identity and availability.

- Doctors manage everything in one app
- Insurance providers integrate through standardized APIs
- Doctors explicitly opt in to the insurance platforms they want to participate in
- Doctor profiles and availability are synced to connected insurance platforms

The system shifts complexity away from doctors and removes redundant onboarding work for insurers.

---

## Core Model

Doctor  
→ DocPort (Doctor App & Registry)  
→ Multiple Insurance Provider Platforms  
→ Patients

DocPort is not a patient-facing booking application.  
It is an infrastructure layer that enables scalable OPD integration.

---

## Key Capabilities

- **Single Doctor Application**
  - Profile and credential management
  - Availability and schedule control
  - Appointment visibility

- **Insurance Integration Layer**
  - API-based provider onboarding
  - Standardized doctor data model
  - Availability and profile synchronization

- **Opt-In Control**
  - Doctors choose which insurance providers to integrate with
  - Consent-based visibility across platforms

- **Central Doctor Registry**
  - One source of truth for doctor identity
  - Eliminates repeated onboarding and data duplication

---

## Technology Stack

### Frontend
- React
- TypeScript

### Backend
- Spring Boot
- RESTful APIs
- Authentication and authorization services

### Database
- PostgreSQL

### DevOps
- Docker
- CI/CD pipelines
- Cloud-ready deployment architecture

---

## High-Level Architecture

- Doctor Application (Frontend)
- Backend Services
  - Doctor Registry Service
  - Consent and Integration Service
  - Scheduling Service
- Insurance Provider Integration Layer
  - APIs
  - Webhooks and sync mechanisms
- Persistent Data Layer

---

## Security and Compliance

- Role-based access control
- Secure API authentication (JWT / OAuth)
- Encrypted data storage
- Designed for compliance with healthcare integration requirements

---

## Project Status

This project is currently under active development.

Initial focus areas:
- Doctor onboarding and profile management
- Single insurance provider integration
- Availability synchronization
- Opt-in consent workflows

---

## Vision

DocPort aims to become the standard doctor identity and availability layer for OPD insurance platforms, enabling insurers to offer OPD benefits at scale while allowing doctors to work through a single, consistent system.

---

## License

This project is currently private and proprietary.  
License details will be defined as the project evolves.
