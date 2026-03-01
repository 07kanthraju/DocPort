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

# Database Design

## Overview

This document describes the database architecture for DocPort, a unified
doctor infrastructure platform for multi-insurance OPD integration.

The database is designed to:

-   Maintain a canonical doctor identity registry
-   Enable consent-based insurance provider integrations
-   Synchronize availability and appointments
-   Support scalable API integrations
-   Ensure auditability, security, and compliance

PostgreSQL is used as the primary relational database.

------------------------------------------------------------------------

## Design Principles

1.  Single Source of Truth -- Doctor identity and availability are
    managed centrally.
2.  Consent-Based Integration -- Doctors explicitly opt into insurance
    providers.
3.  Separation of Concerns -- Identity, availability, consent, and sync
    state are modeled independently.
4.  Infrastructure-Oriented Modeling -- The schema supports API-driven
    integrations and future scalability.
5.  Auditability & Compliance -- Changes are traceable and secure.

------------------------------------------------------------------------

## Core Entities

### 1. Doctors

**Table:** doctors

**Purpose:** - Central registry of doctors - Unique identifiers and
professional details - Platform-level status tracking

**Key Fields:** - id (UUID) -- Primary key - full_name - email
(unique) - phone (unique) - registration_number (unique) -
specialization - status - created_at, updated_at

------------------------------------------------------------------------

### 2. Doctor Credentials

**Table:** doctor_credentials

**Purpose:** - Capture degrees and certifications - Track verification
status - Support insurer compliance requirements

**Key Fields:** - id (UUID) - doctor_id (FK) - degree - institution -
certificate_url - verified

------------------------------------------------------------------------

### 3. Doctor Availability

**Table:** doctor_availability

**Purpose:** - Manage weekly availability schedules - Define time
windows and slot durations - Act as the source of truth for
synchronization

**Key Fields:** - id (UUID) - doctor_id (FK) - day_of_week -
start_time - end_time - slot_duration_minutes - is_active

------------------------------------------------------------------------

### 4. Appointments

**Table:** appointments

**Purpose:** - Mirror insurer-booked appointments - Track status
changes - Maintain external references

**Key Fields:** - id (UUID) - doctor_id (FK) - insurance_provider_id
(FK) - external_appointment_id - patient_reference - appointment_time -
status

------------------------------------------------------------------------

## Insurance Integration Layer

### 5. Insurance Providers

**Table:** insurance_providers

**Purpose:** - Manage provider-level configurations - Store API and
webhook endpoints - Track integration status

**Key Fields:** - id (UUID) - name - api_base_url - webhook_url -
integration_status

------------------------------------------------------------------------

### 6. Doctor Insurance Consent

**Table:** doctor_insurance_consent

**Purpose:** - Record explicit consent - Track active or revoked state -
Enforce one-to-one doctor-provider relationship

**Constraints:** - Unique constraint on (doctor_id,
insurance_provider_id)

**Key Fields:** - id (UUID) - doctor_id (FK) - insurance_provider_id
(FK) - consent_status - granted_at - revoked_at

------------------------------------------------------------------------

### 7. Provider Doctor Sync

**Table:** provider_doctor_sync

**Purpose:** - Monitor profile and availability sync status - Capture
sync failures - Enable operational debugging

**Key Fields:** - id (UUID) - doctor_id (FK) - insurance_provider_id
(FK) - last_profile_sync - last_availability_sync - sync_status -
last_error

------------------------------------------------------------------------

## Authentication & Authorization

### 8. Users

**Table:** users

**Purpose:** - Store login credentials - Assign system roles - Associate
doctors with platform accounts

**Roles:** - DOCTOR - ADMIN - INSURER

**Key Fields:** - id (UUID) - email (unique) - password_hash - role -
doctor_id (nullable FK)

------------------------------------------------------------------------

## Audit & Compliance

### 9. Audit Logs

**Table:** audit_logs

**Purpose:** - Record critical actions - Track entity modifications -
Support dispute resolution and compliance

**Key Fields:** - id (UUID) - entity_type - entity_id - action -
performed_by (FK users) - timestamp - metadata (JSONB)

------------------------------------------------------------------------

## Relationships Overview

Doctor → Availability\
Doctor → Credentials\
Doctor → Insurance Consent → Insurance Provider\
Doctor → Appointments\
Doctor + Insurance Provider → Sync State\
User → Doctor (optional association)\
User → Audit Logs

------------------------------------------------------------------------

## Indexing Strategy

Recommended indexes:

-   doctors(email)
-   doctors(registration_number)
-   doctor_insurance_consent(doctor_id, insurance_provider_id)
-   appointments(doctor_id, appointment_time)
-   provider_doctor_sync(doctor_id, insurance_provider_id)

------------------------------------------------------------------------

## Security Considerations

-   UUID primary keys to prevent enumeration
-   Encrypted password storage (bcrypt/argon2)
-   JWT/OAuth-based API authentication
-   Role-based access control (RBAC)
-   Audit logging for sensitive changes
-   Secure API communication with insurance providers

------------------------------------------------------------------------

## Scalability Considerations

Future enhancements may include:

-   Multi-location support (doctor_locations)
-   Event-driven sync architecture (Outbox pattern)
-   Versioned doctor profiles
-   API key management for insurers
-   Multi-tenant architecture

------------------------------------------------------------------------

## Summary

The DocPort database design establishes:

-   A canonical doctor registry
-   Consent-driven integration
-   Reliable availability synchronization
-   Structured provider connectivity
-   Auditability and compliance readiness

This schema supports the foundation for a scalable doctor-first OPD
infrastructure platform.


---

## License

This project is currently private and proprietary.  
License details will be defined as the project evolves.
