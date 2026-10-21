# Engineering Note 02 — Cloud Control and Evidence Workflow

**Status:** Conceptual reference design; not audited.  
**Business goal:** Turn cloud policy into owned configurations, observable exceptions and reviewable technical evidence.  
**Scope:** AWS and Azure cloud-control patterns. Applicability of legal and sector requirements must be determined separately.

## Proposed control lifecycle

1. **Define:** identify workloads, data types, applicable requirements, the specific control objective and the responsible owner.
2. **Enforce:** configure identity restrictions, policy guardrails, data-protection settings and approved changes.
3. **Detect:** observe exceptions and material configuration or access changes using correctly scoped cloud-native tools.
4. **Retain:** record useful configuration state, change history, access reviews, approvals and remediation outcomes.
5. **Remediate:** triage findings, track exceptions, verify fixes and periodically review effectiveness.

## Example implementation considerations

| Control question | AWS options to evaluate | Azure options to evaluate | Example evidence |
|---|---|---|---|
| Who has privileged access? | IAM policies, role assignments, IAM Identity Center where used | Azure RBAC, Entra ID, PIM where available | Access reviews, role exports, approval records |
| Can misconfigurations be detected? | AWS Config, security service findings | Azure Policy, resource compliance assessments | Findings, remediation tickets, updated config state |
| Is change history retained? | CloudTrail trail / event data stores as configured | Azure Activity Log with appropriate export/retention | Log configuration, event records, retention review |
| How is data protected? | KMS, storage encryption, access policies | Key Vault, storage encryption and RBAC | Settings, scoped permission records, backup review |

Native services help implement and verify controls, but do not guarantee complete audit evidence or compliance. Confirm log scope, permissions, retention, encryption, identity federation, backup recovery and ownership.

## Validation exercise

- Define a limited test account/subscription and a few explicit controls.
- Deliberately introduce safe, reversible test exceptions and verify detection.
- Record when each exception was generated, found, assigned and resolved.
- Run a simulated evidence request with an independent reviewer; list gaps.

## Assurance boundary

This is engineering guidance, **not** a HIPAA certification, ISO/IEC 27001 certification, SOC 2 report, independent audit opinion or legal advice. Framework-specific interpretation should be reviewed with qualified compliance professionals.
