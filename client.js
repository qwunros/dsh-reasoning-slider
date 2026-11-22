window.__ModuleLoader__.load({
  id: '@local/dsh-reasoning-slider',
  factory(require) {
    const React = require('react')
    const { createPortal } = require('react-dom')
    const h = React.createElement
    const { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } = React

    /** Locale namespace owned by this plugin. */
    const NS = 'reasoning-slider'

    const CSS = `
.dcx-trigger, .dcx-panel {
  --dcx-blue: var(--dsw-static-blue-600, #2563eb);
  --dcx-blue-bright: var(--dsw-static-blue-400, #60a5fa);
  --dcx-blue-text: var(--dsw-static-blue-600, #2563eb);
  --dcx-purple: var(--dsw-static-violet-600, #7c3aed);
  --dcx-purple-bright: var(--dsw-static-violet-400, #a78bfa);
  --dcx-purple-text: var(--dsw-static-violet-600, #7c3aed);
  --dcx-hover: var(--dsw-alias-interactive-bg-hover, rgba(127, 130, 135, 0.12));
}
body[data-ds-dark-theme] .dcx-trigger,
body[data-ds-dark-theme] .dcx-panel {
  --dcx-blue: var(--dsw-static-blue-400, #60a5fa);
  --dcx-blue-bright: var(--dsw-static-blue-300, #93c5fd);
  --dcx-blue-text: var(--dsw-static-blue-400, #60a5fa);
  --dcx-purple: var(--dsw-static-violet-400, #a78bfa);
  --dcx-purple-bright: var(--dsw-static-violet-400, #a78bfa);
  --dcx-purple-text: var(--dsw-static-violet-400, #a78bfa);
}
body[data-ds-dark-theme] .dcx-panel {
  --dcx-panel-bg: #26262a;
  --dcx-panel-border: rgba(255, 255, 255, 0.1);
  --dcx-rail: #3d3d43;
  --dcx-stop-off: #6f7278;
  --dcx-fill: #4da3ff;
  --dcx-fill-max: #a78bfa;
}

.dcx-trigger-wrap { position: relative; min-width: 0; display: inline-flex; }
.dcx-trigger {
  anchor-name: var(--dcx-anchor);
  display: inline-flex;
  align-items: center;
  gap: 5px;
  min-width: 0;
  max-width: 330px;
  height: 28px;
  padding: 0 6px;
  border: none;
  border-radius: var(--dsw-radius-sm, 8px);
  outline: none;
  background: transparent;
  color: var(--dsw-alias-label-secondary);
  font: inherit;
  font-size: 13px;
  line-height: 20px;
  font-weight: 400;
  cursor: pointer;
}
@media (hover: hover) {
  .dcx-trigger:hover:not(:disabled) { background: var(--dcx-hover); }
}
.dcx-trigger:focus-visible { box-shadow: 0 0 0 2px var(--dsw-focus-ring-color, var(--dcx-blue)); }
.dcx-trigger:disabled { opacity: 0.5; cursor: default; }
.dcx-trigger-team { flex: none; color: var(--dcx-blue); filter: drop-shadow(0 0 4px rgba(59, 130, 246, 0.35)); }
.dcx-trigger-compact {
  display: var(--dsh-composer-model-icon-display, none);
  flex: none;
  color: var(--dcx-blue-text);
}
.dcx-trigger-model {
  display: var(--dsh-composer-model-text-display, block);
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dcx-trigger-effort {
  display: var(--dsh-composer-model-text-display, block);
  flex: none;
  color: var(--dsw-alias-label-caption);
  white-space: nowrap;
}
.dcx-trigger-effort.is-high { color: var(--dcx-blue-text); }
.dcx-trigger-effort.is-max { color: var(--dcx-purple-text); font-weight: 500; }
.dcx-trigger-spinner { width: 11px; height: 11px; margin-left: 1px; color: var(--dsw-alias-label-caption); }

.dcx-panel {
  --dcx-pane: 184px;
  --dcx-panel-bg: #ffffff;
  --dcx-panel-border: rgba(15, 23, 42, 0.08);
  --dcx-rail: #e8e8ea;
  --dcx-stop-off: #b0b3b9;
  --dcx-fill: #3b9bf7;
  --dcx-fill-max: #8b5cf6;
  box-sizing: border-box;
  position: fixed;
  position-anchor: var(--dcx-anchor);
  top: auto;
  left: auto;
  right: anchor(right);
  bottom: calc(anchor(top) + 8px);
  z-index: 1200;
  width: 332px;
  max-width: calc(100vw - 24px);
  padding: 6px;
  border: 1px solid var(--dcx-panel-border);
  border-radius: var(--dsw-radius-lg, 16px);
  background: var(--dcx-panel-bg);
  box-shadow: var(--dsw-elevation-prominent, 0 18px 40px rgba(0, 0, 0, 0.18));
  color: var(--dsw-alias-label-primary);
  font-size: 13px;
  line-height: 20px;
  animation: dcx-panel-in 180ms ease-out;
}
.dcx-viewport {
  height: var(--dcx-pane);
  overflow: hidden;
  overflow: clip;
  border-radius: calc(var(--dsw-radius-lg, 16px) - 6px);
}
.dcx-track {
  display: flex;
  flex-direction: column;
  height: calc(var(--dcx-pane) * 2);
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}
.dcx-track.is-models { transform: translateY(calc(-1 * var(--dcx-pane))); }
.dcx-pane { box-sizing: border-box; flex: 0 0 var(--dcx-pane); height: var(--dcx-pane); display: flex; flex-direction: column; }

.dcx-reasoning {
  position: relative;
  justify-content: center;
  gap: 6px;
  padding: 6px 10px 4px;
}
.dcx-top {
  display: grid;
  grid-template-columns: 30px minmax(0, 1fr) 30px;
  align-items: center;
  gap: 8px;
}
.dcx-team-wrap { position: relative; display: flex; }
.dcx-icon-button {
  width: 28px;
  height: 28px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  outline: none;
  background: transparent;
  color: var(--dsw-alias-label-caption);
  cursor: pointer;
  transition: background 140ms ease, color 160ms ease, opacity 140ms ease;
}
@media (hover: hover) {
  .dcx-icon-button:hover:not(:disabled) { background: var(--dcx-hover); color: var(--dsw-alias-label-secondary); }
}
.dcx-icon-button:focus-visible { box-shadow: 0 0 0 2px var(--dsw-focus-ring-color, var(--dcx-blue)); }
.dcx-icon-button:disabled { opacity: 0.38; cursor: default; }
.dcx-reset-button { justify-self: end; }
.dcx-team-button {
  position: relative;
  width: 30px;
  height: 30px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 9px;
  outline: none;
  background: transparent;
  color: var(--dsw-alias-label-caption);
  cursor: pointer;
  transition: background 140ms ease, color 160ms ease;
}
@media (hover: hover) {
  .dcx-team-button:hover:not(:disabled) { background: var(--dcx-hover); color: var(--dsw-alias-label-secondary); }
}
.dcx-team-button:focus-visible { box-shadow: 0 0 0 2px var(--dsw-focus-ring-color, var(--dcx-blue)); }
.dcx-team-button:disabled { opacity: 0.5; cursor: default; }
.dcx-team-button.is-on {
  color: var(--dcx-blue-text);
  background: rgba(59, 130, 246, 0.1);
  background: color-mix(in srgb, var(--dcx-blue) 10%, transparent);
}
@media (hover: hover) {
  .dcx-team-button.is-on:hover:not(:disabled) { background: color-mix(in srgb, var(--dcx-blue) 16%, transparent); }
}
.dcx-team-icon { display: inline-flex; }
.dcx-team-button.just-on .dcx-team-icon { animation: dcx-team-pop 420ms cubic-bezier(0.34, 1.56, 0.64, 1); }
.dcx-team-glow {
  position: absolute;
  inset: -7px;
  border-radius: 50%;
  pointer-events: none;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.58), transparent 68%);
  animation: dcx-team-glow 620ms ease-out forwards;
}
body[data-ds-dark-theme] .dcx-team-glow { background: radial-gradient(circle, rgba(96, 165, 250, 0.55), transparent 68%); }
.dcx-tooltip {
  position: fixed;
  z-index: 1300;
  width: 208px;
  padding: 7px 9px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 9px;
  background: #ffffff;
  box-shadow: var(--dsw-elevation-prominent, 0 10px 24px rgba(0, 0, 0, 0.16));
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
  line-height: 16px;
  pointer-events: none;
  transform: translateY(-100%);
  animation: dcx-fade-in 120ms ease-out;
}
body[data-ds-dark-theme] .dcx-tooltip { background: #26262a; }
.dcx-tooltip.is-below { transform: none; }

.dcx-effort-center { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; min-width: 0; }
.dcx-effort-center > * { position: relative; z-index: 1; }
.dcx-effort-center.is-max::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 0;
  width: 132px;
  height: 52px;
  border-radius: 50%;
  pointer-events: none;
  opacity: 0;
  transform: translate(-50%, -50%);
  background: radial-gradient(closest-side, rgba(167, 139, 250, 0.6), rgba(167, 139, 250, 0) 72%);
  animation: dcx-heat-burst 760ms ease-out;
}
.dcx-effort-value {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 15px;
  line-height: 20px;
  font-weight: 600;
  color: var(--dsw-alias-label-primary);
  transition: color 180ms ease;
}
.dcx-effort-value.is-max { color: var(--dcx-purple-text); animation: dcx-heat-text 720ms ease-out; }
.dcx-effort-motion { display: flex; align-items: center; justify-content: center; max-width: 100%; min-width: 0; }
.dcx-effort-motion.is-motion-up { animation: dcx-effort-in-up 280ms cubic-bezier(0.4, 0, 0.2, 1); }
.dcx-effort-motion.is-motion-down { animation: dcx-effort-in-down 280ms cubic-bezier(0.4, 0, 0.2, 1); }

.dcx-slider {
  position: relative;
  height: 44px;
  margin: 0;
  border-radius: 999px;
  outline: none;
  cursor: pointer;
  touch-action: none;
}
.dcx-slider:focus-visible { box-shadow: 0 0 0 2px var(--dsw-focus-ring-color, var(--dcx-blue)); }
.dcx-slider.is-fallback { cursor: default; }
.dcx-slider.is-busy { cursor: default; }
.dcx-slider.is-dragging { cursor: grabbing; }

.dcx-slider-track {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 26px;
  border-radius: 999px;
  transform: translateY(-50%);
  background: var(--dcx-rail);
  overflow: hidden;
}

.dcx-slider-fill {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: calc(100% * var(--dcx-ratio, 0));
  border-radius: 999px;
  background: var(--dcx-fill);
  overflow: hidden;
  transition: width 320ms cubic-bezier(0.22, 1, 0.36, 1), background 200ms ease;
  will-change: width;
}
.dcx-slider.is-max .dcx-slider-fill { background: var(--dcx-fill-max); }
.dcx-slider.is-dragging .dcx-slider-fill {
  transition: width 200ms cubic-bezier(0.22, 1, 0.36, 1), background 200ms ease;
}

.dcx-stars {
  position: absolute;
  inset: 0;
  z-index: 1;
  border-radius: inherit;
  pointer-events: none;
  background-image:
    radial-gradient(circle at 7% 34%, rgba(255, 255, 255, 0.95) 0 1px, transparent 1.3px),
    radial-gradient(circle at 14% 68%, rgba(255, 255, 255, 0.68) 0 0.8px, transparent 1.1px),
    radial-gradient(circle at 22% 26%, rgba(255, 255, 255, 0.8) 0 0.7px, transparent 1px),
    radial-gradient(circle at 29% 58%, rgba(255, 255, 255, 0.95) 0 1.2px, transparent 1.5px),
    radial-gradient(circle at 37% 38%, rgba(255, 255, 255, 0.6) 0 0.8px, transparent 1.1px),
    radial-gradient(circle at 44% 72%, rgba(255, 255, 255, 0.85) 0 0.9px, transparent 1.2px),
    radial-gradient(circle at 52% 22%, rgba(255, 255, 255, 0.9) 0 1px, transparent 1.3px),
    radial-gradient(circle at 59% 54%, rgba(255, 255, 255, 0.65) 0 0.8px, transparent 1.1px),
    radial-gradient(circle at 67% 76%, rgba(255, 255, 255, 0.95) 0 0.9px, transparent 1.2px),
    radial-gradient(circle at 74% 30%, rgba(255, 255, 255, 0.7) 0 0.8px, transparent 1.1px),
    radial-gradient(circle at 81% 62%, rgba(255, 255, 255, 0.9) 0 1px, transparent 1.3px),
    radial-gradient(circle at 88% 24%, rgba(255, 255, 255, 0.65) 0 0.8px, transparent 1.1px),
    radial-gradient(circle at 94% 52%, rgba(255, 255, 255, 0.95) 0 0.9px, transparent 1.2px);
  animation: dcx-twinkle 2600ms ease-in-out infinite alternate;
}
.dcx-stars::after {
  content: '';
  position: absolute;
  left: 31%;
  top: 42%;
  width: 6px;
  height: 6px;
  background: #ffffff;
  clip-path: polygon(50% 0, 58% 42%, 100% 50%, 58% 58%, 50% 100%, 42% 58%, 0 50%, 42% 42%);
}

.dcx-particles {
  position: absolute;
  inset: 0;
  z-index: 2;
  border-radius: inherit;
  overflow: hidden;
  pointer-events: none;
}
.dcx-particle {
  position: absolute;
  top: var(--dcx-y, 50%);
  left: 100%;
  width: var(--dcx-w, 16px);
  height: var(--dcx-h, 2px);
  margin-top: calc(var(--dcx-h, 2px) / -2);
  border-radius: 999px;
  background: linear-gradient(90deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 18%, rgba(255, 255, 255, 0) 100%);
  opacity: 0;
  animation: dcx-stream var(--dcx-dur, 2200ms) linear infinite;
  animation-delay: var(--dcx-delay, 0ms);
  will-change: left, opacity;
}

.dcx-stop {
  position: absolute;
  top: 50%;
  z-index: 2;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background: var(--dcx-stop-off);
  pointer-events: none;
  transition: background 160ms ease, opacity 160ms ease;
  left: calc(19px + (100% - 38px) * var(--dcx-ratio, 0));
}
.dcx-stop.is-filled { background: rgba(255, 255, 255, 0.62); }
.dcx-stop.is-active { opacity: 0; }
.dcx-stop.is-pending {
  opacity: 1;
  background: #ffffff;
  animation: dcx-dot-pulse 900ms ease-in-out infinite;
}

.dcx-thumb {
  position: absolute;
  top: 50%;
  left: calc(19px + (100% - 38px) * var(--dcx-ratio, 0));
  z-index: 3;
  width: 38px;
  height: 38px;
  border: 1px solid rgba(15, 23, 42, 0.09);
  border-radius: 50%;
  box-sizing: border-box;
  transform: translate(-50%, -50%);
  background: #ffffff;
  pointer-events: none;
  transition: left 320ms cubic-bezier(0.22, 1, 0.36, 1);
}
body[data-ds-dark-theme] .dcx-thumb { border-color: rgba(255, 255, 255, 0.14); }
.dcx-slider.is-dragging .dcx-thumb {
  transition: left 200ms cubic-bezier(0.22, 1, 0.36, 1);
}
.dcx-slider.is-fallback .dcx-thumb { display: none; }

.dcx-model-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 100%;
  height: 34px;
  padding: 0 8px;
  border: none;
  border-radius: 9px;
  outline: none;
  background: transparent;
  color: var(--dsw-alias-label-secondary);
  font: inherit;
  font-size: 13px;
  cursor: pointer;
}
@media (hover: hover) {
  .dcx-model-button:hover:not(:disabled) { background: var(--dcx-hover); color: var(--dsw-alias-label-primary); }
}
.dcx-model-button:focus-visible { box-shadow: 0 0 0 2px var(--dsw-focus-ring-color, var(--dcx-blue)); }
.dcx-model-button:disabled { opacity: 0.5; cursor: default; }
.dcx-model-button-name {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
}
.dcx-model-chevron { flex: none; color: var(--dsw-alias-label-caption); }
.dcx-feedback {
  min-height: 0;
  max-width: 100%;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 11px;
  line-height: 15px;
  color: var(--dsw-alias-label-caption);
}
.dcx-feedback.is-error {
  color: var(--dsw-alias-state-error-primary);
  max-height: 46px;
  padding: 2px 6px;
  border-radius: 6px;
  white-space: normal;
  overflow-x: hidden;
  overflow-y: auto;
  background: rgba(239, 68, 68, 0.08);
  background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 9%, transparent);
}
.dcx-feedback.is-notice { color: var(--dcx-blue-text); }

.dcx-confirm {
  position: absolute;
  inset: 10px 12px;
  z-index: 20;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  padding: 14px;
  border: 1px solid var(--dcx-panel-border);
  border-radius: 12px;
  background: var(--dcx-panel-bg);
  box-shadow: var(--dsw-elevation-prominent, 0 12px 30px rgba(0, 0, 0, 0.18));
  animation: dcx-fade-in 140ms ease-out;
}
.dcx-confirm-title { font-size: 13px; font-weight: 600; }
.dcx-confirm-body { font-size: 11.5px; line-height: 17px; color: var(--dsw-alias-label-secondary); }
.dcx-confirm-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 2px; }
.dcx-confirm-button {
  height: 28px;
  padding: 0 12px;
  border: none;
  border-radius: 8px;
  font: inherit;
  font-size: 12px;
  cursor: pointer;
}
.dcx-confirm-cancel { background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-secondary); }
.dcx-confirm-danger {
  background: rgba(239, 68, 68, 0.1);
  background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 12%, transparent);
  color: var(--dsw-alias-state-error-primary);
  font-weight: 600;
}

.dcx-models { padding: 4px 4px 4px; }
.dcx-model-header {
  flex: 0 0 auto;
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr) 28px;
  align-items: center;
  gap: 6px;
  height: 28px;
  margin-bottom: 2px;
}
.dcx-search-row {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  min-width: 0;
  height: 28px;
  box-sizing: border-box;
  margin: 0;
  padding: 0 8px;
  border: 1px solid transparent;
  border-radius: 9px;
  background: rgba(127, 130, 135, 0.07);
  background: color-mix(in srgb, var(--dsw-alias-label-primary) 5%, transparent);
}
.dcx-search-row:focus-within { border-color: var(--dsw-alias-border-l2); }
.dcx-search-icon { flex: none; color: var(--dsw-alias-label-caption); }
.dcx-search-input {
  flex: 1;
  min-width: 0;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: var(--dsw-alias-label-primary);
  font: inherit;
  font-size: 12px;
}
.dcx-search-input::placeholder { color: var(--dsw-alias-label-caption); }
.dcx-model-list {
  flex: 1;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 2px 2px 4px;
  scrollbar-width: thin;
  scrollbar-color: var(--dsw-alias-border-l2) transparent;
}
.dcx-model-group { padding: 2px 0; }
.dcx-model-group-label {
  padding: 4px 8px 2px;
  font-size: 10px;
  line-height: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--dsw-alias-label-caption);
}
.dcx-model-row {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-height: 30px;
  padding: 3px 8px;
  border: none;
  border-radius: 8px;
  outline: none;
  background: transparent;
  color: var(--dsw-alias-label-primary);
  font: inherit;
  font-size: 13px;
  text-align: left;
  cursor: pointer;
}
@media (hover: hover) {
  .dcx-model-row:hover:not(:disabled) { background: var(--dcx-hover); }
}
.dcx-model-row:focus-visible { background: var(--dcx-hover); outline: 2px solid var(--dcx-blue); outline-offset: -2px; }
.dcx-model-row.is-selected { background: rgba(59, 130, 246, 0.1); background: color-mix(in srgb, var(--dcx-blue) 10%, transparent); }
.dcx-model-row:disabled { opacity: 0.55; cursor: default; }
.dcx-model-row-name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dcx-model-row-check {
  flex: none;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--dcx-blue-text);
}
.dcx-empty { padding: 18px 10px; text-align: center; font-size: 12px; line-height: 18px; color: var(--dsw-alias-label-caption); }
.dcx-empty.is-error { color: var(--dsw-alias-state-error-primary); }

.dcx-spinner {
  flex: none;
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1.5px solid color-mix(in srgb, currentColor 28%, transparent);
  border-top-color: currentColor;
  animation: dcx-spin 700ms linear infinite;
}

@keyframes dcx-panel-in {
  from { opacity: 0; transform: translateY(6px) scale(0.985); }
  to { opacity: 1; transform: none; }
}
@keyframes dcx-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes dcx-team-pop {
  0% { transform: scale(1); }
  38% { transform: scale(1.22); }
  68% { transform: scale(0.95); }
  100% { transform: scale(1); }
}
@keyframes dcx-team-glow {
  0% { opacity: 0; transform: scale(0.4); }
  20% { opacity: 0.85; }
  100% { opacity: 0; transform: scale(2.1); }
}
@keyframes dcx-heat-text {
  0% { text-shadow: 0 0 0 rgba(167, 139, 250, 0); }
  30% { text-shadow: 0 0 16px rgba(167, 139, 250, 0.8); }
  100% { text-shadow: 0 0 8px rgba(167, 139, 250, 0.35); }
}
@keyframes dcx-heat-burst {
  0% { opacity: 0; transform: translate(-50%, -50%) scale(0.35); }
  28% { opacity: 0.95; }
  100% { opacity: 0; transform: translate(-50%, -50%) scale(2.2); }
}
@keyframes dcx-twinkle {
  from { opacity: 0.62; }
  to { opacity: 1; }
}
@keyframes dcx-effort-in-up {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes dcx-effort-in-down {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes dcx-stream {
  0% { left: 100%; opacity: 0; }
  10% { opacity: 0.9; }
  72% { opacity: 0.55; }
  100% { left: -10%; opacity: 0; }
}
@keyframes dcx-spin {
  to { transform: rotate(360deg); }
}
@keyframes dcx-dot-pulse {
  0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.55; transform: translate(-50%, -50%) scale(0.82); }
}
@media (prefers-reduced-motion: reduce) {
  .dcx-panel,
  .dcx-team-button.just-on .dcx-team-icon,
  .dcx-team-glow,
  .dcx-effort-center.is-max::before,
  .dcx-effort-value.is-max,
  .dcx-effort-motion,
  .dcx-stars,
  .dcx-spinner,
  .dcx-stop.is-pending {
    animation: none !important;
  }
  .dcx-track { transition: none !important; }
  .dcx-slider-fill, .dcx-thumb, .dcx-stop { transition: none !important; }
  .dcx-particles { display: none !important; }
}
`

    const EN = {
      'panel.aria': 'Model and reasoning',
      'trigger.aria': 'Model {model}, reasoning {effort}',
      'trigger.select': 'Select a model',
      'trigger.loading': 'Loading models…',
      'trigger.fallback': 'Select model',
      'effort.default': 'Default',
      'effort.reset': 'Reset reasoning to default',
      'effort.sliderAria': 'Reasoning effort',
      'effort.unsupported': 'This model has no reasoning-effort configuration',
      'level.low': 'Low',
      'level.high': 'High',
      'level.max': 'Max',
      'model.select': 'Select model',
      'model.open': 'Open model selector',
      'model.back': 'Back to reasoning',
      'model.search': 'Search models…',
      'model.loading': 'Loading models…',
      'model.empty': 'No models available',
      'model.noResults': 'No matching models',
      'model.retry': 'Reload models',
      'model.error': 'Could not load models: {message}',
      'provider.account': 'DeepSeek account',
      'team.aria': 'Agent teamwork',
      'team.tooltip': 'Agent teamwork lets several subagents coordinate on complex tasks. It uses more tokens.',
      'team.failed': 'Could not change agent teamwork: {message}',
      'team.confirmTitle': 'Turn off agent teamwork?',
      'team.confirmBody': 'Existing tasks are kept, but agents will stop coordinating as a team.',
      'confirm.cancel': 'Cancel',
      'confirm.disable': 'Turn off',
      'error.sessionInUse': 'Another DSH instance is using this session. Quit it and try again.',
      'error.action': 'Could not change selection: {message}',
    }

    const ZH = {
      'panel.aria': '模型与思考强度',
      'trigger.aria': '模型 {model}，思考强度 {effort}',
      'trigger.select': '选择模型',
      'trigger.loading': '正在加载模型…',
      'trigger.fallback': '选择模型',
      'effort.default': '默认',
      'effort.reset': '将思考强度重置为默认',
      'effort.sliderAria': '思考强度',
      'effort.unsupported': '该模型未配置思考强度',
      'level.low': 'Low',
      'level.high': 'High',
      'level.max': 'Max',
      'model.select': '选择模型',
      'model.open': '打开模型选择器',
      'model.back': '返回思考强度',
      'model.search': '搜索模型…',
      'model.loading': '正在加载模型…',
      'model.empty': '暂无可用模型',
      'model.noResults': '没有匹配的模型',
      'model.retry': '重新加载模型',
      'model.error': '无法加载模型：{message}',
      'provider.account': 'DeepSeek 账号',
      'team.aria': '智能体团队协作',
      'team.tooltip': '开启后，多个子智能体可以协同处理复杂任务，会消耗更多 token。',
      'team.failed': '无法切换智能体团队协作：{message}',
      'team.confirmTitle': '关闭智能体团队协作？',
      'team.confirmBody': '已创建的任务会保留，但智能体将停止团队协作。',
      'confirm.cancel': '取消',
      'confirm.disable': '关闭',
      'error.sessionInUse': '其他 DSH 实例正在使用此会话，请退出后重试。',
      'error.action': '切换失败：{message}',
    }

    const DICTS = { en: EN, zh: ZH, ja: EN, es: EN, fr: EN, de: EN, ru: EN, pt: EN }

    const ICON = {
      width: 16,
      height: 16,
      viewBox: '0 0 16 16',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 1.3,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      'aria-hidden': true,
      focusable: false,
    }

    function TeamIcon({ size = 16, className }) {
      return h('svg', { ...ICON, width: size, height: size, className },
        h('circle', { cx: 6, cy: 5.2, r: 2.1 }),
        h('path', { d: 'M2.2 13.3c0-2.1 1.7-3.8 3.8-3.8s3.8 1.7 3.8 3.8' }),
        h('circle', { cx: 11.6, cy: 6.1, r: 1.6 }),
        h('path', { d: 'M9.9 13.3c0-1.8 1.1-3 2.6-3 .9 0 1.7.3 2.2.9' }),
      )
    }

    function ResetIcon({ size = 15, className }) {
      return h('svg', { ...ICON, width: size, height: size, className },
        h('path', { d: 'M3.3 6.1A5.2 5.2 0 1 1 2.9 9.7' }),
        h('path', { d: 'M3.3 2.9v3.3h3.3' }),
      )
    }

    function ChevronLeftIcon({ size = 15, className }) {
      return h('svg', { ...ICON, width: size, height: size, className }, h('path', { d: 'M9.8 3.6 5.4 8l4.4 4.4' }))
    }

    function ChevronUpIcon({ size = 12, className }) {
      return h('svg', { ...ICON, width: size, height: size, className }, h('path', { d: 'M3.6 10.2 8 5.8l4.4 4.4' }))
    }

    function CheckIcon({ size = 14, className }) {
      return h('svg', { ...ICON, width: size, height: size, className }, h('path', { d: 'M3.2 8.4 6.4 11.6 12.8 5.2' }))
    }

    function SearchIcon({ size = 14, className }) {
      return h('svg', { ...ICON, width: size, height: size, className },
        h('circle', { cx: 7.1, cy: 7.1, r: 4.6 }),
        h('path', { d: 'm10.6 10.6 3 3' }),
      )
    }

    function SparkIcon({ size = 14, className }) {
      return h('svg', { ...ICON, width: size, height: size, className },
        h('path', { d: 'M8 2.2 9.4 6.6 13.8 8 9.4 9.4 8 13.8 6.6 9.4 2.2 8 6.6 6.6Z' }),
      )
    }

    function RefreshIcon({ size = 14, className }) {
      return h('svg', { ...ICON, width: size, height: size, className },
        h('path', { d: 'M12.7 9.9A5.2 5.2 0 1 1 13.1 6.3' }),
        h('path', { d: 'M12.7 2.9v3.4h-3.4' }),
      )
    }

    function orderGroups(groups) {
      const rank = (id) => id === 'deepseek-account' ? 0 : id === 'deepseek-official' ? 1 : 2
      return groups
        .map((group, index) => ({ group, index }))
        .sort((left, right) => rank(left.group.id) - rank(right.group.id) || left.index - right.index)
        .map((entry) => entry.group)
    }

    function push(setter, text) {
      setter({ seq: Date.now() + Math.random(), text })
    }

    function ReasoningSlider(props) {
      const { locked, available, directory, load, select, setTeamEnabled, t } = props
      const subscribe = useCallback((listener) => directory.subscribe(listener), [directory])
      const getSnapshot = useCallback(() => directory.getSnapshot(), [directory])
      const state = React.useSyncExternalStore(subscribe, getSnapshot)
      const teamMode = props.useProjection('agentTeam')
      const modelSelection = props.useProjection('modelSelection')

      const [open, setOpen] = useState(false)
      const [view, setView] = useState('reasoning')
      const [query, setQuery] = useState('')
      const [notice, setNotice] = useState(null)
      const [selectionError, setSelectionError] = useState(null)
      const [teamError, setTeamError] = useState(null)
      const [teamPending, setTeamPending] = useState(false)
      const [teamPulse, setTeamPulse] = useState(0)
      const [confirmDisable, setConfirmDisable] = useState(false)
      const [tipOpen, setTipOpen] = useState(false)
      const [tipPos, setTipPos] = useState(null)
      const [dragIndex, setDragIndex] = useState(null)
      const [dragging, setDragging] = useState(false)
      const [selecting, setSelecting] = useState(false)
      const [effortMotion, setEffortMotion] = useState(null)

      const rootRef = useRef(null)
      const panelRef = useRef(null)
      const triggerRef = useRef(null)
      const trackRef = useRef(null)
      const searchRef = useRef(null)
      const teamButtonRef = useRef(null)
      const cancelRef = useRef(null)
      const confirmRef = useRef(null)
      const modelButtonRef = useRef(null)
      const tipTimer = useRef(0)
      const draggingRef = useRef(false)
      const queuedLevelRef = useRef(null)
      const previewIndexRef = useRef(null)
      const selectingRef = useRef(false)
      const prevDisplayRef = useRef(null)
      const chooseLevelRef = useRef(null)

      const id = useId()
      const panelId = `${id}-panel`
      const tipId = `${id}-team-tip`
      const anchorName = `--dcx-${id.replace(/[^a-zA-Z0-9_-]/g, '')}`
      const anchorStyle = { '--dcx-anchor': anchorName }

      const current = state.current
      const groups = orderGroups(state.groups)
      const currentGroup = current === null || current === undefined
        ? undefined
        : groups.find((group) => group.id === current.provider)
      const currentModel = currentGroup === undefined
        ? undefined
        : currentGroup.models.find((model) => model.id === current.model)
      const reasoning = currentModel === undefined ? undefined : currentModel.reasoning
      const configured = reasoning !== undefined
        && Array.isArray(reasoning.efforts)
        && reasoning.efforts.length > 0
      const levels = configured
        ? reasoning.efforts.map((effort) => ({ id: effort.id, name: effort.name, description: effort.description }))
        : [
          { id: undefined, name: t('level.low') },
          { id: undefined, name: t('level.high') },
          { id: undefined, name: t('level.max') },
        ]
      const defaultEffort = reasoning === undefined ? undefined : reasoning.defaultEffort
      const effectiveEffort = current === null || current === undefined
        ? undefined
        : current.reasoningEffort ?? defaultEffort
      const activeIndex = configured && effectiveEffort !== undefined
        ? levels.findIndex((level) => level.id === effectiveEffort)
        : -1
      const displayIndex = dragIndex === null ? activeIndex : dragIndex
      const isMax = configured && levels.length > 1 && displayIndex === levels.length - 1
      const displayEffortName = displayIndex >= 0 ? levels[displayIndex].name : undefined
      const effortName = displayEffortName
      const effortLabel = effortName
        ?? (currentModel === undefined && state.retainedEffort !== undefined
          ? state.retainedEffort
          : t('effort.default'))
      const displayedLevel = displayIndex >= 0 ? levels[displayIndex] : undefined
      const resetEnabled = !locked
        && configured
        && current !== null && current !== undefined
        && displayedLevel !== undefined
        && displayedLevel.id !== defaultEffort
      const modelName = currentModel !== undefined
        ? currentModel.name
        : current !== null && current !== undefined
          ? current.model
          : state.status === 'loading'
            ? t('trigger.loading')
            : t('trigger.fallback')
      const teamEnabled = teamMode !== undefined && teamMode.enabled === true
      const teamKnown = teamMode !== undefined
      const teamToggleDisabled = locked
        || teamPending
        || !teamKnown
        || (teamEnabled && modelSelection === undefined)
      const busy = selecting || state.pending !== null || state.status === 'selecting'
      const allModels = groups.reduce((count, group) => count + group.models.length, 0)
      const normalizedQuery = query.trim().toLowerCase()
      const filteredGroups = groups
        .map((group) => ({
          ...group,
          models: normalizedQuery === ''
            ? group.models
            : group.models.filter((model) =>
              model.name.toLowerCase().includes(normalizedQuery)
              || model.id.toLowerCase().includes(normalizedQuery)),
        }))
        .filter((group) => group.models.length > 0)
      const storeError = state.error !== null && state.status === 'error'
        ? t('error.action', { message: state.error })
        : null
      const feedback = teamError !== null
        ? teamError
        : selectionError !== null
          ? selectionError
          : notice !== null
            ? notice
            : storeError !== null
              ? { seq: 'store', text: storeError }
              : null
      const feedbackIsError = teamError !== null || selectionError !== null || storeError !== null
      const feedbackIsNotice = !feedbackIsError && notice !== null
      const fillPercent = displayIndex < 0
        ? 0
        : levels.length <= 1
          ? 100
          : (displayIndex / (levels.length - 1)) * 100
      const fillRatio = Math.max(0, Math.min(1, fillPercent / 100))
      const triggerAria = current === null || current === undefined
        ? state.status === 'loading'
          ? t('trigger.loading')
          : t('trigger.select')
        : t('trigger.aria', { model: modelName, effort: effortLabel })

      useEffect(() => { load() }, [load])

      useLayoutEffect(() => {
        const previous = prevDisplayRef.current
        if (previous === null) {
          prevDisplayRef.current = displayIndex
          return undefined
        }
        if (displayIndex === previous) return undefined
        prevDisplayRef.current = displayIndex
        setEffortMotion(displayIndex > previous ? 'down' : 'up')
        const timer = setTimeout(() => setEffortMotion(null), 320)
        return () => clearTimeout(timer)
      }, [displayIndex])

      useEffect(() => {
        if (dragIndex === null) return
        if (activeIndex === dragIndex) {
          previewIndexRef.current = null
          setDragIndex(null)
        }
      }, [activeIndex, dragIndex])

      useEffect(() => {
        if (busy) return
        const queued = queuedLevelRef.current
        if (queued === null) return
        queuedLevelRef.current = null
        if (queued === activeIndex) return
        chooseLevelRef.current?.(queued)
      }, [busy, activeIndex])

      useEffect(() => {
        if (!open) return undefined
        const closeOnOutside = (event) => {
          const target = event.target
          if (rootRef.current !== null && rootRef.current.contains(target)) return
          if (panelRef.current !== null && panelRef.current.contains(target)) return
          setOpen(false)
          setView('reasoning')
          setConfirmDisable(false)
          setQuery('')
        }
        document.addEventListener('mousedown', closeOnOutside)
        document.addEventListener('focusin', closeOnOutside)
        return () => {
          document.removeEventListener('mousedown', closeOnOutside)
          document.removeEventListener('focusin', closeOnOutside)
        }
      }, [open])

      useEffect(() => {
        if (!open) return undefined
        const onEscape = (event) => {
          if (event.key !== 'Escape') return
          if (confirmDisable) {
            setConfirmDisable(false)
            requestAnimationFrame(() => teamButtonRef.current?.focus())
            return
          }
          if (view === 'models') {
            setView('reasoning')
            setQuery('')
            requestAnimationFrame(() => modelButtonRef.current?.focus())
            return
          }
          setOpen(false)
          setView('reasoning')
          setQuery('')
          setConfirmDisable(false)
          requestAnimationFrame(() => triggerRef.current?.focus())
        }
        document.addEventListener('keydown', onEscape)
        return () => document.removeEventListener('keydown', onEscape)
      }, [open, view, confirmDisable])

      useEffect(() => {
        if (!open || view !== 'models') return undefined
        const finePointer = typeof window !== 'undefined'
          && typeof window.matchMedia === 'function'
          && window.matchMedia('(pointer: fine)').matches
        const timer = setTimeout(() => {
          const selected = panelRef.current === null
            ? null
            : panelRef.current.querySelector('.dcx-model-row.is-selected')
          if (selected !== null) selected.scrollIntoView({ block: 'nearest' })
          if (finePointer && searchRef.current !== null) {
            searchRef.current.focus({ preventScroll: true })
            return
          }
          const first = panelRef.current === null
            ? null
            : panelRef.current.querySelector('[data-dcx-model-row]:not([disabled])')
          if (first !== null) first.focus({ preventScroll: true })
        }, 60)
        return () => clearTimeout(timer)
      }, [open, view])

      useEffect(() => {
        if (notice === null) return undefined
        const timer = setTimeout(() => setNotice(null), 3500)
        return () => clearTimeout(timer)
      }, [notice])

      useEffect(() => {
        if (!confirmDisable) return undefined
        cancelRef.current?.focus({ preventScroll: true })
        return undefined
      }, [confirmDisable])

      useEffect(() => () => clearTimeout(tipTimer.current), [])

      if (!available) return null

      const showTip = () => {
        clearTimeout(tipTimer.current)
        tipTimer.current = setTimeout(() => {
          const button = teamButtonRef.current
          if (button !== null && typeof window !== 'undefined') {
            const rect = button.getBoundingClientRect()
            const below = rect.top <= 96
            setTipPos({
              top: below ? rect.bottom + 8 : rect.top - 8,
              left: Math.max(8, Math.min(rect.left, window.innerWidth - 216)),
              below,
            })
          }
          setTipOpen(true)
        }, 160)
      }
      const hideTip = () => {
        clearTimeout(tipTimer.current)
        setTipOpen(false)
        setTipPos(null)
      }
      const closePanel = (restoreFocus) => {
        hideTip()
        setOpen(false)
        setView('reasoning')
        setConfirmDisable(false)
        setQuery('')
        if (restoreFocus) {
          requestAnimationFrame(() => {
            if (triggerRef.current !== null) triggerRef.current.focus()
          })
        }
      }
      const openPanel = () => {
        if (locked) return
        hideTip()
        setOpen(true)
        setView('reasoning')
        setQuery('')
        setNotice(null)
        load()
        requestAnimationFrame(() => trackRef.current?.focus({ preventScroll: true }))
      }
      const submit = (selection) => {
        setSelectionError(null)
        setNotice(null)
        selectingRef.current = true
        setSelecting(true)
        const revertPreview = () => {
          if (queuedLevelRef.current !== null) return
          previewIndexRef.current = null
          setDragIndex(null)
        }
        let outcome
        try {
          outcome = select(selection)
        } catch (error) {
          selectingRef.current = false
          setSelecting(false)
          revertPreview()
          push(setSelectionError, t('error.action', {
            message: error instanceof Error ? error.message : String(error),
          }))
          return
        }
        void Promise.resolve(outcome).then((result) => {
          if (result === undefined || result.ok) return
          revertPreview()
          push(setSelectionError, result.error.code === 'session/writer-held'
            ? t('error.sessionInUse')
            : t('error.action', { message: `${result.error.code}: ${result.error.message}` }))
        }, (error) => {
          revertPreview()
          push(setSelectionError, t('error.action', {
            message: error instanceof Error ? error.message : String(error),
          }))
        }).finally(() => {
          selectingRef.current = false
          setSelecting(false)
        })
      }
      const chooseLevel = (index) => {
        if (locked) return
        if (!configured) {
          push(setNotice, t('effort.unsupported'))
          return
        }
        if (current === null || current === undefined) return
        const level = levels[index]
        if (level === undefined || level.id === undefined) return
        const hasPending = selectingRef.current || state.pending !== null || state.status === 'selecting'
        if (index === activeIndex && !hasPending) return
        if (hasPending) {
          queuedLevelRef.current = index
          return
        }
        submit({
          provider: current.provider,
          model: current.model,
          reasoningEffort: level.id,
        })
      }
      chooseLevelRef.current = chooseLevel
      const resetEffort = () => {
        if (locked || busy) return
        if (!configured || current === null || current === undefined) {
          push(setNotice, t('effort.unsupported'))
          return
        }
        if (current.reasoningEffort === undefined || current.reasoningEffort === defaultEffort) return
        queuedLevelRef.current = null
        previewIndexRef.current = null
        setDragIndex(null)
        submit({ provider: current.provider, model: current.model })
      }
      const toggleTeamMode = (enabled) => {
        setTeamPending(true)
        setTeamError(null)
        if (enabled) setTeamPulse((pulse) => pulse + 1)
        let outcome
        try {
          outcome = setTeamEnabled(enabled)
        } catch (error) {
          push(setTeamError, t('team.failed', {
            message: error instanceof Error ? error.message : String(error),
          }))
          setTeamPending(false)
          return
        }
        Promise.resolve(outcome).then((result) => {
          if (result === undefined || result.ok) return
          push(setTeamError, t('team.failed', {
            message: result.error === undefined ? 'unknown' : result.error.message,
          }))
        }, (error) => {
          push(setTeamError, t('team.failed', {
            message: error instanceof Error ? error.message : String(error),
          }))
        }).finally(() => setTeamPending(false))
      }
      const onTeamClick = () => {
        hideTip()
        if (teamToggleDisabled) return
        if (teamEnabled) {
          if (modelSelection !== undefined && modelSelection.lastUsed !== null) {
            setConfirmDisable(true)
            return
          }
          toggleTeamMode(false)
          return
        }
        toggleTeamMode(true)
      }
      const indexAt = (clientX) => {
        const rect = trackRef.current === null ? null : trackRef.current.getBoundingClientRect()
        if (rect === null || rect.width <= 38) return 0
        const ratio = Math.min(1, Math.max(0, (clientX - rect.left - 19) / (rect.width - 38)))
        return levels.length <= 1 ? 0 : Math.round(ratio * (levels.length - 1))
      }
      const showPreview = (index) => {
        previewIndexRef.current = index
        const hasPending = selectingRef.current || state.pending !== null || state.status === 'selecting'
        if (index === activeIndex && !hasPending) setDragIndex(null)
        else setDragIndex(index)
      }
      const onPointerDown = (event) => {
        if (locked) return
        if (!configured) {
          push(setNotice, t('effort.unsupported'))
          return
        }
        event.preventDefault()
        draggingRef.current = true
        setDragging(true)
        try {
          event.currentTarget.setPointerCapture(event.pointerId)
        } catch {
          // Pointer capture is best effort.
        }
        const index = indexAt(event.clientX)
        showPreview(index)
        chooseLevel(index)
      }
      const onPointerMove = (event) => {
        if (!draggingRef.current) return
        const index = indexAt(event.clientX)
        if (index === previewIndexRef.current) return
        showPreview(index)
        chooseLevel(index)
      }
      const finishDrag = (event) => {
        if (!draggingRef.current) return
        draggingRef.current = false
        setDragging(false)
        const index = indexAt(event.clientX)
        if (index === previewIndexRef.current) return
        showPreview(index)
        chooseLevel(index)
      }
      const cancelDrag = () => {
        draggingRef.current = false
        setDragging(false)
        previewIndexRef.current = null
        setDragIndex(null)
        queuedLevelRef.current = null
      }
      const onSliderKeyDown = (event) => {
        if (locked) return
        const maximum = levels.length - 1
        const base = displayIndex >= 0 ? displayIndex : activeIndex
        let next = null
        if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
          next = base < 0 ? 0 : Math.min(maximum, base + 1)
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
          next = base < 0 ? maximum : Math.max(0, base - 1)
        } else if (event.key === 'Home') {
          next = 0
        } else if (event.key === 'End') {
          next = maximum
        }
        if (next === null) return
        event.preventDefault()
        showPreview(next)
        chooseLevel(next)
      }
      const chooseModel = (group, model) => {
        if (busy) return
        queuedLevelRef.current = null
        previewIndexRef.current = null
        setDragIndex(null)
        setView('reasoning')
        setQuery('')
        requestAnimationFrame(() => modelButtonRef.current?.focus())
        if (current !== null && current !== undefined
          && current.provider === group.id && current.model === model.id) return
        submit({ provider: group.id, model: model.id })
      }
      const onPanelKeyDown = (event) => {
        if (event.key === 'Tab') {
          const scope = confirmDisable ? confirmRef.current : panelRef.current
          if (scope === null) return
          const focusables = Array.from(scope.querySelectorAll('button:not([disabled]), input:not([disabled]), [tabindex="0"]'))
            .filter((element) => element.closest('[inert]') === null)
          if (focusables.length === 0) return
          const first = focusables[0]
          const last = focusables[focusables.length - 1]
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault()
            last.focus()
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault()
            first.focus()
          }
          return
        }
        if (event.key !== 'Escape') return
        event.stopPropagation()
        if (confirmDisable) {
          setConfirmDisable(false)
          requestAnimationFrame(() => teamButtonRef.current?.focus())
          return
        }
        if (view === 'models') {
          setView('reasoning')
          setQuery('')
          requestAnimationFrame(() => modelButtonRef.current?.focus())
          return
        }
        closePanel(true)
      }
      const onTriggerKeyDown = (event) => {
        if (event.key === 'Escape' && open) {
          event.preventDefault()
          closePanel(true)
        }
      }
      const providerName = (group) => group.id === 'deepseek-account' ? t('provider.account') : group.name

      const trigger = h('div', { className: 'dcx-trigger-wrap', ref: rootRef },
        h('button', {
          ref: triggerRef,
          type: 'button',
          className: 'dcx-trigger',
          style: anchorStyle,
          disabled: locked,
          'aria-label': triggerAria,
          'aria-haspopup': 'dialog',
          'aria-expanded': open,
          'aria-controls': open ? panelId : undefined,
          'aria-busy': busy ? 'true' : undefined,
          title: triggerAria,
          onClick: () => {
            if (open) closePanel(false)
            else openPanel()
          },
          onKeyDown: onTriggerKeyDown,
        },
          teamEnabled ? h(TeamIcon, { size: 15, className: 'dcx-trigger-team' }) : null,
          h('span', { className: 'dcx-trigger-compact' }, h(SparkIcon, { size: 14 })),
          h('span', { className: 'dcx-trigger-model' }, modelName),
          h('span', {
            className: `dcx-trigger-effort${isMax ? ' is-max' : ''}${effortName !== undefined && effortName.toLowerCase() === 'high' ? ' is-high' : ''}`,
          }, effortLabel),
          busy ? h('span', { className: 'dcx-spinner dcx-trigger-spinner' }) : null,
        ),
      )

      const reasoningPane = h('div', {
        className: 'dcx-pane dcx-reasoning',
        inert: view === 'models' ? '' : undefined,
        'aria-hidden': view === 'models' ? 'true' : undefined,
      },
        h('div', {
          className: 'dcx-top',
          inert: confirmDisable ? '' : undefined,
          'aria-hidden': confirmDisable ? 'true' : undefined,
        },
          h('div', { className: 'dcx-team-wrap', onMouseEnter: showTip, onMouseLeave: hideTip },
            h('button', {
              ref: teamButtonRef,
              type: 'button',
              className: `dcx-team-button${teamEnabled ? ' is-on' : ''}${teamEnabled && teamPulse > 0 ? ' just-on' : ''}`,
              disabled: teamToggleDisabled,
              'aria-pressed': teamEnabled,
              'aria-label': t('team.aria'),
              'aria-describedby': tipOpen ? tipId : undefined,
              onClick: onTeamClick,
              onFocus: showTip,
              onBlur: hideTip,
            },
              h('span', { key: `team-${teamPulse}`, className: 'dcx-team-icon' },
                h(TeamIcon, { size: 16 }),
              ),
              teamEnabled && teamPulse > 0
                ? h('span', { key: `glow-${teamPulse}`, className: 'dcx-team-glow' })
                : null,
            ),
          ),
          h('div', { className: `dcx-effort-center${isMax ? ' is-max' : ''}`, 'aria-live': 'polite' },
            h('span', {
              key: `effort-${displayIndex}`,
              className: `dcx-effort-motion${effortMotion === null ? '' : ` is-motion-${effortMotion}`}`,
            },
              h('span', {
                className: `dcx-effort-value${isMax ? ' is-max' : ''}`,
              }, effortLabel),
            ),
          ),
          h('button', {
            type: 'button',
            className: 'dcx-icon-button dcx-reset-button',
            disabled: !resetEnabled,
            'aria-label': t('effort.reset'),
            title: t('effort.reset'),
            onClick: resetEffort,
          }, h(ResetIcon, { size: 15 })),
        ),
        h('div', {
          ref: trackRef,
          className: `dcx-slider${isMax ? ' is-max' : ''}${configured ? '' : ' is-fallback'}${locked ? ' is-busy' : ''}${dragging ? ' is-dragging' : ''}`,
          inert: confirmDisable ? '' : undefined,
          'aria-hidden': confirmDisable ? 'true' : undefined,
          role: 'slider',
          tabIndex: locked || !configured ? -1 : 0,
          title: levels.map((level) => level.name).join(' / '),
          'aria-label': t('effort.sliderAria'),
          'aria-disabled': !configured ? 'true' : undefined,
          'aria-valuemin': 0,
          'aria-valuemax': Math.max(0, levels.length - 1),
          'aria-valuenow': displayIndex < 0 ? 0 : displayIndex,
          'aria-valuetext': effortLabel,
          onKeyDown: onSliderKeyDown,
          onPointerDown,
          onPointerMove,
          onPointerUp: finishDrag,
          onPointerCancel: cancelDrag,
        },
          h('span', { className: 'dcx-slider-track' },
            h('span', {
              className: 'dcx-slider-fill',
              style: { '--dcx-ratio': String(fillRatio) },
            },
              isMax ? h('span', { className: 'dcx-stars', 'aria-hidden': 'true' }) : null,
              isMax
                ? h('span', { className: 'dcx-particles', 'aria-hidden': 'true' },
                  Array.from({ length: 10 }, (_, index) => h('span', {
                    key: `stream-${index}`,
                    className: 'dcx-particle',
                    style: {
                      '--dcx-y': `${25 + ((index * 17) % 50)}%`,
                      '--dcx-w': `${12 + (index % 4) * 4}px`,
                      '--dcx-h': `${index % 3 === 0 ? 3 : 2}px`,
                      '--dcx-dur': `${1800 + (index % 5) * 260}ms`,
                      '--dcx-delay': `${index * -340}ms`,
                    },
                  })),
                )
                : null,
            ),
          ),
          levels.map((level, index) => {
            const pendingThis = configured
              && state.pending !== null
              && current !== null && current !== undefined
              && state.pending.provider === current.provider
              && state.pending.model === current.model
              && state.pending.reasoningEffort === level.id
            const ratio = levels.length <= 1 ? 1 : index / (levels.length - 1)
            return h('span', {
              key: `${level.id === undefined ? 'fallback' : level.id}-${index}`,
              className: `dcx-stop${index < displayIndex ? ' is-filled' : ''}${index === displayIndex ? ' is-active' : ''}${pendingThis ? ' is-pending' : ''}`,
              style: { '--dcx-ratio': String(ratio) },
              'aria-hidden': 'true',
            })
          }),
          h('span', {
            className: 'dcx-thumb',
            style: { '--dcx-ratio': String(fillRatio) },
            'aria-hidden': 'true',
          }),
        ),
        h('button', {
          ref: modelButtonRef,
          type: 'button',
          className: 'dcx-model-button',
          disabled: locked,
          inert: confirmDisable ? '' : undefined,
          'aria-hidden': confirmDisable ? 'true' : undefined,
          title: t('model.open'),
          'aria-haspopup': 'dialog',
          'aria-expanded': view === 'models',
          'aria-controls': `${id}-models`,
          onClick: () => {
            queuedLevelRef.current = null
            previewIndexRef.current = null
            setDragIndex(null)
            setQuery('')
            setView('models')
            load()
          },
        },
          h('span', { className: 'dcx-model-button-name' }, modelName),
          h(ChevronUpIcon, { size: 12, className: 'dcx-model-chevron' }),
        ),
        feedback !== null
          ? h('div', { className: `dcx-feedback${feedbackIsError ? ' is-error' : ''}${feedbackIsNotice ? ' is-notice' : ''}`, role: feedbackIsError ? 'alert' : 'status', 'aria-live': feedbackIsError ? 'assertive' : 'polite', inert: confirmDisable ? '' : undefined, 'aria-hidden': confirmDisable ? 'true' : undefined, title: feedback.text },
            feedback.text,
          )
          : null,
        confirmDisable
          ? h('div', { className: 'dcx-confirm', ref: confirmRef, role: 'alertdialog', 'aria-modal': 'true', 'aria-label': t('team.confirmTitle') },
            h('div', { className: 'dcx-confirm-title' }, t('team.confirmTitle')),
            h('div', { className: 'dcx-confirm-body' }, t('team.confirmBody')),
            h('div', { className: 'dcx-confirm-actions' },
              h('button', {
                ref: cancelRef,
                type: 'button',
                className: 'dcx-confirm-button dcx-confirm-cancel',
                disabled: teamPending,
                onClick: () => {
                  setConfirmDisable(false)
                  requestAnimationFrame(() => teamButtonRef.current?.focus())
                },
              }, t('confirm.cancel')),
              h('button', {
                type: 'button',
                className: 'dcx-confirm-button dcx-confirm-danger',
                disabled: teamPending,
                onClick: () => {
                  setConfirmDisable(false)
                  requestAnimationFrame(() => teamButtonRef.current?.focus())
                  toggleTeamMode(false)
                },
              }, t('confirm.disable')),
            ),
          )
          : null,
      )

      const modelRows = []
      for (const group of filteredGroups) {
        const rows = []
        for (const model of group.models) {
          const selected = current !== null && current !== undefined
            && current.provider === group.id && current.model === model.id
          const pendingThis = state.pending !== null
            && state.pending.provider === group.id && state.pending.model === model.id
          rows.push(h('button', {
            key: `${group.id}/${model.id}`,
            type: 'button',
            'data-dcx-model-row': '',
            'aria-current': selected ? 'true' : undefined,
            className: `dcx-model-row${selected ? ' is-selected' : ''}`,
            disabled: busy || locked,
            title: model.name,
            onClick: () => chooseModel(group, model),
          },
            h('span', { className: 'dcx-model-row-name' }, model.name),
            h('span', { className: 'dcx-model-row-check' },
              pendingThis
                ? h('span', { className: 'dcx-spinner' })
                : selected
                  ? h(CheckIcon, { size: 14 })
                  : null,
            ),
          ))
        }
        modelRows.push(h('div', {
          key: group.id,
          className: 'dcx-model-group',
          role: 'group',
          'aria-label': providerName(group),
        },
          h('div', { className: 'dcx-model-group-label' }, providerName(group)),
          rows,
        ))
      }

      const modelPane = h('div', {
        className: 'dcx-pane dcx-models',
        inert: view === 'reasoning' ? '' : undefined,
        'aria-hidden': view === 'reasoning' ? 'true' : undefined,
      },
        h('div', { className: 'dcx-model-header' },
          h('button', {
            type: 'button',
            className: 'dcx-icon-button',
            'aria-label': t('model.back'),
            title: t('model.back'),
            onClick: () => {
              setView('reasoning')
              setQuery('')
              requestAnimationFrame(() => modelButtonRef.current?.focus())
            },
          }, h(ChevronLeftIcon, { size: 15 })),
          h('div', { className: 'dcx-search-row' },
            h(SearchIcon, { size: 14, className: 'dcx-search-icon' }),
            h('input', {
              ref: searchRef,
              className: 'dcx-search-input',
              type: 'text',
              role: 'searchbox',
              'aria-label': t('model.search'),
              placeholder: t('model.search'),
              value: query,
              readOnly: busy || locked,
              onChange: (event) => setQuery(event.target.value),
              onKeyDown: (event) => {
                if (event.key !== 'ArrowDown') return
                event.preventDefault()
                const first = panelRef.current === null
                  ? null
                  : panelRef.current.querySelector('[data-dcx-model-row]:not([disabled])')
                if (first !== null) first.focus()
              },
            }),
          ),
          h('button', {
            type: 'button',
            className: 'dcx-icon-button',
            'aria-label': t('model.retry'),
            title: t('model.retry'),
            onClick: load,
          }, h(RefreshIcon, { size: 14 })),
        ),
        h('div', { className: 'dcx-model-list', id: `${id}-models`, role: 'group', 'aria-label': t('model.select') },
          state.status === 'loading' && allModels === 0
            ? h('div', { className: 'dcx-empty', role: 'status' }, t('model.loading'))
            : null,
          state.status === 'error'
            ? h('div', { className: 'dcx-empty is-error', role: 'alert' },
              t('model.error', { message: state.error === null ? '' : state.error }))
            : null,
          modelRows,
          state.status === 'ready' && filteredGroups.length === 0
            ? h('div', { className: 'dcx-empty', role: 'status' },
              t(normalizedQuery === '' ? 'model.empty' : 'model.noResults'))
            : null,
        ),
      )

      const panel = h('div', {
        ref: panelRef,
        id: panelId,
        className: 'dcx-panel',
        style: anchorStyle,
        role: 'dialog',
        'aria-label': t('panel.aria'),
        onKeyDown: onPanelKeyDown,
      },
        h('div', { className: 'dcx-viewport' },
          h('div', { className: `dcx-track${view === 'models' ? ' is-models' : ''}` },
            reasoningPane,
            modelPane,
          ),
        ),
      )

      return h(React.Fragment, null,
        trigger,
        open ? createPortal(panel, document.body) : null,
        open && tipOpen && tipPos !== null
          ? createPortal(
            h('div', {
              id: tipId,
              className: `dcx-tooltip${tipPos.below ? ' is-below' : ''}`,
              role: 'tooltip',
              style: { top: tipPos.top, left: tipPos.left },
            }, t('team.tooltip')),
            document.body,
          )
          : null,
      )
    }

    function apply(ctx) {
      ctx.effect(() => {
        if (typeof document === 'undefined') return undefined
        const tag = document.createElement('style')
        tag.dataset.plugin = '@local/dsh-reasoning-slider'
        tag.dataset.pluginCss = '@local/dsh-reasoning-slider/client.css'
        tag.textContent = CSS
        document.head.appendChild(tag)
        return () => tag.remove()
      }, 'reasoning-slider: styles')
      ctx.effect(() => ctx.locale.register(NS, DICTS), 'reasoning-slider: dictionaries')
      let teamApi
      ctx.inject(['remote', 'remote.agentTeams'], (teamScope) => {
        teamApi = teamScope.remote.agentTeams
      })
      ctx.inject(['slots', 'modelDirectories', 'sessions'], (scope) => {
        const models = scope.modelDirectories
        const sessions = scope.sessions
        const setTeamEnabledFor = (sessionId, enabled) => {
          const teams = teamApi
          if (teams === undefined || teams === null || typeof teams.setEnabled !== 'function') {
            return Promise.resolve({
              ok: false,
              error: { code: 'unavailable', message: 'agent teamwork is unavailable' },
            })
          }
          return teams.setEnabled(sessionId, enabled)
        }
        scope.slots.inject('conversation.input.model', () => scope.slots.register({
          name: 'conversation.input.model',
          priority: -1,
          locale: NS,
          inject: (sessionId) => {
            const directory = models.directoryFor(sessionId)
            const available = sessions.subagentAddress(sessionId) === undefined
            return {
              available,
              directory: directory.store,
              load: () => {
                if (available) directory.load().catch(() => { /* the directory exposes the error */ })
              },
              select: (selection) => available
                ? directory.select(selection)
                : Promise.resolve(undefined),
              setTeamEnabled: (enabled) => setTeamEnabledFor(sessionId, enabled),
            }
          },
        }, ReasoningSlider))
      })
    }

    return { inject: ['locale'], apply }
  },
})