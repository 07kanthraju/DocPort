# DocPort

**One Doctor App. Many Insurance Platforms.**

DocPort is a doctor-first infrastructure platform that eliminates the need for doctors to manage multiple insurance provider applications. It provides a single canonical doctor app where insurance providers can plug in via APIs, allowing doctors to opt into multiple insurance platforms seamlessly.

---

## Problem Statement

In the current healthcare ecosystem:

- Insurance providers often avoid offering OPD benefits because onboarding doctors onto their individual platforms is expensive and operationally complex.
- Doctors are forced to manage multiple insurer-specific apps to handle appointments, availability, and workflows.
- This fragmentation increases cost for insurers, operational burden for doctors, and limits OPD accessibility for patients.

---

## Solution

DocPort solves this by acting as a central doctor registry and integration layer.

- Doctors manage their profile, availability, and appointments in one app.
- Insurance providers integrate with DocPort using standardized APIs.
- Doctors can opt into one or more insurance platforms.
- Doctor profiles and availability are synced automatically to connected insurance provider systems.

Control remains with the doctor, while integration complexity is handled by infrastructure.

---

## Core Concept

Doctor → DocPort (Canonical Doctor App) → Multiple Insurance Providers → Patients

DocPort is not a patient-facing booking app.  
It is infrastructure that normalizes doctor onboarding and availability across insurance platforms.

---

## Key Features

- Single Doctor Application
  - Profile management
  - Availability and scheduling
  - Appointment management

- Insurance Provider Plug-in System
  - API-based integration
  - Standardized doctor data model
  - Availability synchronization

- Opt-In Visibility
  - Doctors choose which insurance providers to integrate with
  - Consent-based platform access

- Central Doctor Registry
  - One source of truth for doctor identity and availability
  - Eliminates duplicate onboarding across insurers

---

## Technology Stack

### Frontend
- React
- TypeScript

### Backend
- Spring Boot
- REST APIs
- Authentication and authorization

### Database
- PostgreSQL

### DevOps & Deployment
- Docker
- CI/CD pipelines
- Cloud-ready deployment

---

## High-Level Architecture

- Doctor Application (Frontend)
- Core Backend Services
  - Doctor Registry Service
  - Consent and Opt-In Service
  - Scheduling Service
- Insurance Integration Layer
  - Provider APIs
  - Webhooks and sync services
- Database Layer

---

## Security and Compliance

- Role-based access control
- Secure API authentication (JWT / OAuth)
- Encrypted data storage
- Compliance-ready architecture for healthcare integrations

---

## Project Status

Under active development.

Planned milestones:
- Doctor onboarding MVP
- Single insurance provider integration
- Availability synchronization
- Opt-in consent workflow

---

## Vision

DocPort aims to become the default doctor identity and availability infrastructure for OPD insurance platforms, enabling scalable OPD benefits while keeping doctors in control.

---

## License

This project is currently private and proprietary. License details will be added in future releases.
