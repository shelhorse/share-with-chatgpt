# Share with ChatGPT

A Firefox extension that prepares content from the current tab and opens ChatGPT with that content placed directly in a prompt. The prompt remains ready for the user to add a question and submit.

## Initial requirements

- Provide a simple browser action for sharing the current tab with ChatGPT.
- Extract and prepare the useful content from the active page.
- Place the prepared content directly into a new ChatGPT prompt.
- Leave the prompt unsubmitted so the user can add a question.
- Do not implement a fallback workflow.
- Minimize required user interaction.
- Support Firefox on desktop and Android where Firefox extension APIs permit it.
- Request only the permissions required for the extension to work.

## Project checklist

- [x] Confirm the initial behavior and remove the obsolete fallback requirement.
- [x] Create the private GitHub repository.
- [ ] Recover or recreate the previously working extension source.
- [ ] Review the implementation against these requirements.
- [ ] Review security, privacy, and requested permissions.
- [ ] Test on Firefox desktop.
- [ ] Test on Firefox for Android.
- [ ] Package an unsigned XPI for testing.
- [ ] Prepare the first release.
- [ ] Decide whether and when to make the repository public.

## Change-management approach

Use GitHub issues for discrete bugs or enhancements. Make implementation changes on short-lived branches and merge them through pull requests so each change has a clear record.
