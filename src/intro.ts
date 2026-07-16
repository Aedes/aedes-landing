/** Timing compartido de la animación de carga del hero. */

export const INTRO_EASE = [0.22, 1, 0.36, 1] as const;

/** Duración del logo subiendo desde abajo */
export const LOGO_RISE_DURATION = 1.2;

/** Cuándo empieza a subir el resto (un poco antes de que el logo termine) */
export const INTRO_REST_DELAY = 0.95;

/**
 * Título (AedesTech) + TrustedBy suben juntos.
 * Mismo offset en px (no %) para que el par se mantenga pegado.
 */
export const INTRO_BOTTOM_Y = 350;
export const INTRO_BOTTOM_DURATION = 0.95;
