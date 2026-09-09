/**
 * @file apps/web/src/lib/state/landing-state.ts
 * @description Layer 2: Application / State - Landing Page Client Store & Types.
 * Encapsulates client-side filter selections, active playback state, and modal UI states.
 */

/**
 * Filter tags for the discography releases grid.
 */
export type ReleaseFilter = "all" | "vinyl" | "digital";

/**
 * Filter categories for live events and tour dates.
 */
export type EventFilter = "all" | "upcoming" | "past";

/**
 * Landing page client UI state contract.
 */
export interface LandingUiState {
  /** Active release category filter */
  selectedReleaseFilter: ReleaseFilter;
  /** Active event filter */
  selectedEventFilter: EventFilter;
  /** Catalog ID of release currently selected for preview */
  activeReleaseId: string | null;
  /** Video URL currently active in lightbox modal */
  activeVideoUrl: string | null;
  /** Global sound state */
  isSoundMuted: boolean;
}

/**
 * Default initial UI state for landing page.
 */
export const INITIAL_LANDING_UI_STATE: LandingUiState = {
  selectedReleaseFilter: "all",
  selectedEventFilter: "upcoming",
  activeReleaseId: null,
  activeVideoUrl: null,
  isSoundMuted: true,
};

/**
 * Composite landing page state contract.
 */
export interface LandingState {
  /** Sound activity status */
  isSoundActive: boolean;
  /** Fullscreen drawer menu status */
  isDrawerOpen: boolean;
  /** Active release category filter */
  activeFilter: string;
}

/**
 * Baseline initial state for landing page controller.
 */
export const INITIAL_LANDING_STATE: LandingState = {
  isSoundActive: false,
  isDrawerOpen: false,
  activeFilter: "all",
};
