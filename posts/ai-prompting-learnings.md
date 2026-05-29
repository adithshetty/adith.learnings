---
title: "AI Prompting Learnings"
date: "2026-05-27"
category: "ai"
excerpt: "What I've learned about writing better prompts for AI models to get useful, accurate outputs."
---

## Getting Better Results from AI Models

After experimenting with various AI models, here are the prompting strategies that actually work.

### Be Specific About the Output Format

Instead of: *"Summarise this article"*

Try: *"Summarise this article in 3 bullet points, each under 20 words, focusing on actionable takeaways"*

### Give Context About Who You Are

> "I'm a solo developer building a SaaS app. Explain authentication flows assuming I know React but am new to backend development."

The model adjusts its vocabulary and assumptions accordingly.

### Chain of Thought for Complex Problems

Ask the model to reason step by step:

> "Think step by step about the trade-offs between using a monorepo vs separate repos for a startup with 3 engineers."

### Use Constraints to Sharpen Answers

- "In under 200 words..."
- "Without using jargon..."
- "List only the cons..."
- "Give me the counterargument to..."

### Iterative Refinement

Don't expect perfection on the first prompt. Treat it like a conversation:
1. First prompt: get a rough answer
2. Ask for clarification or deeper dive on specific parts
3. Ask it to critique its own answer

### Key Takeaways

- Specificity beats brevity in prompts
- Context about your background dramatically changes answer quality
- Iteration is part of the workflow, not a sign of failure
