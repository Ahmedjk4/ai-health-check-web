# Workbench revision · 20 November 2026

The user selected the practical-tool direction after finding the previous layout too generic. The checker now opens directly into an editor/report workspace. The other screens use compact app headings and rows. The prior display headline, tinted marketing canvas, promotional links and large gaps were removed.

Changes include the desktop report pane, normal stacked mobile report, keyboard submit shortcut, explicit report-empty and changed-text states, monochrome app icons, and network-first shell asset updates with an offline fallback. Provider settings and curated health rules remain separate from the visual changes.

Validation:

- Existing 33-test functional suite passed during this revision.
- Final HTML copy lint: 0 FAIL, 0 WARN; JavaScript syntax checks passed.
- Browser checks exercised harmful and corrected claims, Ctrl+Enter submit, changed-text invalidation, clearing, source filtering, all four screens, disconnected chat, the connection dialog and installation help.
- Responsive widths 320, 390, 768, 1024 and 1440 CSS pixels stayed within the viewport.
- Offline proof: stopped the local server, reloaded the new shell and checked the correction example successfully.
- Saved screenshots: desktop-workbench.jpg shows an example claim and its actual local report; mobile-workbench.jpg shows the empty workspace.

The examples are built-in test claims. No live AI response, independent medical verification or physical-phone installation is claimed. Live chat still requires the owner's API settings, and phone installation requires HTTPS.
