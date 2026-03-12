# Errors Log

Track command failures, exceptions, and unexpected errors.

## Format

```markdown
## [ERR-YYYYMMDD-XXX] skill_or_command_name

**Logged**: ISO-8601 timestamp
**Priority**: high
**Status**: pending
**Area**: frontend | backend | infra | tests | docs | config

### Summary
Brief description of what failed

### Error
```
Actual error message
```

### Context
- Command attempted
- Input/parameters used
- Environment details

### Suggested Fix
If identifiable

### Metadata
- Reproducible: yes | no | unknown
- Related Files: path/to/file.ext

---
```

## Entries

<!-- Append new entries above this line -->
