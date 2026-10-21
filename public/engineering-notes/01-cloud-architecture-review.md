# Engineering Note 01 — Change-Safe AWS Application Platform

**Status:** Conceptual reference design. Not deployed or measured.  
**Business goal:** More controlled releases, better service visibility and clearer runtime security boundaries.  
**Scope:** An illustrative stateless web API running on AWS; no customer system or employer information is represented.

## Proposed architecture

- Place a publicly reachable Application Load Balancer in public subnets with appropriate TLS, routing and health checks. AWS WAF may be added where threat model and budget justify it.
- Put ECS/Fargate tasks in private subnets in at least two Availability Zones. Carefully plan connectivity to required AWS services and outbound destinations using VPC endpoints and/or NAT, as appropriate.
- Use ECR for application images and a reviewed CI/CD pipeline with automated testing, deployment health gates and a documented rollback procedure.
- Scope task roles, deployment roles, secrets and network rules separately. Use Secrets Manager or another appropriately managed secret store.
- Collect useful structured application logs, platform metrics, service health signals and actionable alarms. Define incident ownership.

## ADR: Managed containers versus Kubernetes

**Option considered:** ECS on Fargate.  
**Rationale:** For a small team running ordinary stateless workloads, managed tasks can reduce cluster management responsibilities.  
**Alternatives:** EKS, ECS on EC2, Elastic Beanstalk, managed application platforms.  
**Trade-offs:** Fargate cost per workload, networking, feature requirements and team skills need review. Containerization is not automatically faster or cheaper.

## Evidence required before any production claim

1. Infrastructure source and change-review history.
2. IAM / security-group configuration review and validated outbound paths.
3. Pipeline deployment, failure, recovery and rollback records.
4. Representative load test, availability behavior and service alarms.
5. Documented costs and constraints based on the actual deployed configuration.

## Open decisions

- Database choice, retention and recovery objective depend on application data needs.
- Traffic profile, error budget, scaling policy and cost ceilings must be established.
- Regulatory and data-location constraints must be identified for the intended workload.

**Do not represent this note as a deployed implementation, client case study, verified security assessment or benchmark.**
