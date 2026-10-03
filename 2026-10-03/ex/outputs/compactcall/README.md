# CompactCall dashboard

A dependency-free, local prototype for compact LLM tool schemas, streamed call decoding, schema audits, evaluation output, and model-effectiveness comparison.

## Run in VS Code

1. Open this `compactcall` folder in VS Code.
2. Open the integrated terminal.
3. Run `npm start`.
4. Open `http://localhost:5173`.

No install step is required. The prototype uses only HTML, CSS, JavaScript, and Node.js (included with most VS Code developer setups).

## Included prototype views

- Workspace: original and compact schemas, token savings, call decoding and validation.
- Schema audit: preservation and bypass decisions.
- Stream simulator: chunked response parsing view.
- Effectiveness lab: native versus compact model metrics.
- Evaluation: deterministic JSONL demonstration and download.
- Run history and settings.

The dashboard demonstrates the future Rust backend contract. It does not yet replace the required `nasiko-tool-compact` crate or Nasiko evaluator implementation.
