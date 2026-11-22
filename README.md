# Reasoning slider model picker

A DSH Web Client plugin that replaces the composer's model seat with a Codex-style
reasoning control.

## Install

This directory is a DSH bundle. Install it into the `web` profile of a DSH
installation (for example from the Web GUI's Plugins page), then refresh the Web
GUI. The client occupies the composer's `conversation.input.model` seat.

## What it does

- The bottom-right model control becomes a compact row: a blue agent-team icon
  (only while team mode is on), the model name, and the current reasoning level.
  `High` is blue; the highest level is purple.
- Clicking the control opens a panel above it:
  - Left: agent-team toggle. It is gray while off; turning it on turns it blue
    with a short scale animation and a blue glow. Hovering reveals an explanation.
  - Center: the current reasoning level.
  - Right: reset, which returns reasoning effort to the adapter default.
  - The flat, full-width slider is 26 px thick with a 38 px white round handle
    (no drop shadow) and stops that follow the selected model's advertised
    reasoning levels. Dragging applies each level immediately: the handle, fill
    and effort text update before the pointer is released, with the handle and
    fill easing between stops (200 ms while dragging, 320 ms for keyboard
    changes). The text slides down when effort rises or up when it falls. A model
    without reasoning metadata shows the Low / High / Max fallback, in which
    effort cannot be applied.
  - Reset enables as soon as the selected effort differs from the default, so it
    does not flicker while a selection is being written.
  - The model name at the bottom opens the model picker with a 0.3 s upward
    ease-in/ease-out transition; going back slides down.
- At the highest level the label and slider turn purple, the label emits one
  radial glow, and white particles drift right to left through the solid purple
  with short trails. The panel uses an opaque surface in both themes.

## Usage

Open a session in the DSH Web GUI and click the composer's model control. The
reasoning level follows the pointer while dragging, so the selection is applied
without waiting for a release. The panel closes with Escape, an outside click, or
a second click on the trigger. Enabling agent teamwork stores the choice on the
Host and keeps it across reloads. Disabling it after a model request asks for
confirmation first.

## Limitations

- Only the root composer seat is replaced; the `/model` command keeps its
  built-in popup.
- Reasoning levels come from the model's adapter metadata. The Low / High /
  Max fallback is display-only when a model does not advertise reasoning effort.
- The panel requires the Web GUI's CSS Anchor Positioning support (the same
  requirement as the shipped model menu).