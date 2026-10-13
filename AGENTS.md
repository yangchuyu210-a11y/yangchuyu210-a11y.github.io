# Repository rules

- Before every commit and push, run `/ponytail-review` on the exact staged or outgoing diff.
- Do not commit or push when the review reports removable complexity. Simplify first, then rerun it.
- Keep implementations minimal; prefer platform and standard-library features over new abstractions or dependencies.

